const debug = require('debug')('y2m-device');

//При сохранении конфигурации HA сохраняет её в Latin1, кодируя все все русские символы в виде, например:
// Комната -> \u041a\u043e\u043c\u043d\u0430\u0442\u0430
//Делаем воркэраунд, декодируя UTF-8
function fixEncoding(str) {
    if (str) {
        str = "" + str;
        if (str.includes('"')) //
            return str;
        else
            return eval('"' + str + '"');
    }
}

function convertValue(valueMapping, val) {
    var mqttVal;
    if (valueMapping && global.valueMappings[valueMapping]) {
        debug("Using value mapping: %s", valueMapping);
        mqttVal = global.valueMappings[valueMapping][val];
        debug("Value mapped: %s -> %s", val, mqttVal);
    } else {
        if (valueMapping) {
            debug("Config error: unknown value mapping: " + valueMapping);
        }
        mqttVal = "" + val;
    }
    return mqttVal;
}

function convertYandexValueToString(val, capabilityType, instance) {
    switch(instance) {
//        case 'on':
//            return val? "true": "false";
        default:
            return val;
    }
}

function convertToYandexValue(val, capabilityType, instance) {
    var capType = capabilityType;
    if (capType.startsWith('devices.capabilities.')) {
        capType = capType.slice(21);
    }
    switch(capType) {
        case 'on_off': {
            if (val == null) return false;
            val = "" + val;
            switch(val.toLowerCase()) {
                case 'true':
                case 'ON':
                case '1':
                    return true;
                default:
                    return false;
            }
        }
        case 'range': {
            if (val == null) return 0.0;
            try {
                return parseFloat(val);
            }
            catch(err){
                debug("Cannot parse the range state value: " + val);
                return 0.0;
            }
        }
        case 'color_setting': {
            return val;
        }
        case 'mode': {
            return val;
        }
        case 'toggle': {
            return val;
        }
        default: {
            debug("Unsupported capability type: " + capabilityType);
            return val;
        }
    }
}

class device {
    constructor(options) {
        var id = global.devices.length;
        this.data = {
            id: String(id),
            name: fixEncoding(options.name) || 'Без названия',
            description: fixEncoding(options.description) || '',
            room: fixEncoding(options.room) || '',
            type: options.type || 'devices.types.light',
            capabilities: options.capabilities,
            complexState: options.complexState || {},
        }
        global.devices.push(this);
    }

    //Returns all capability definitions (to Yandex).
    getDefinition() {
        var definition = {};
        definition.id = this.data.id;
        definition.name = this.data.name;
        definition.description = this.data.description;
        definition.room = this.data.room;
        definition.type = this.data.type;
        definition.capabilities = [];
        this.data.capabilities.forEach(capability => {
            var capDef = {};
            capDef.type = capability.type;
            capDef.retrievable = capability.retrievable;
            capDef.parameters = capability.parameters;
            definition.capabilities.push(capDef);
        });
        return definition;
    }

    //Returns the current capability states (to Yandex).
    getState() {
        var state = {};
        state.id = this.data.id;
        state.capabilities = [];
        this.data.capabilities.forEach(capability => {
            var capState = {};
            capState.type = capability.type;
            capState.state = {};
            capState.state.instance = capability.state.instance;
            capState.state.value = capability.state.value;
            state.capabilities.push(capState);
        });
        return state;
    }

    findCapability(type) {
        return this.data.capabilities.find(capability => capability.type==type);
    }

    //Кешируем значение, переданное нам Яндексом, и пропихиваем его в MQTT
    setState(type, val) {
        var mqttVal;
        var topic;
        var instance;
        try {
            var capability = this.findCapability(type);
            capability.state.value = val;
            topic = capability.state.publish || false;
            instance = capability.state.instance;
            mqttVal = convertValue(capability.state.mappingRef, "" + val);
        }
        catch (err) {
            topic = false;
            console.log(err);
        }
        if (topic) {
            debug("MQTT publish: '" + mqttVal + "' -> " + topic);
            this.client.publish(topic, mqttVal, { retain: true });
        }
        return {
            'type': type,
            'state': {
                'instance': instance,
                'action_result': {
                    'status': 'DONE'
                }
            }
        };
    }

    //Collects all capability states and construct a complex state that should be sent via MQTT (if required)
    propagateComplexState() {
        var topic = this.data.complexState.publish || false;
        if (topic) {
            var complexState = {};
            this.data.capabilities.forEach( capability => {
                if (!capability.state.publish) {
                    complexState[capability.state.instance] = capability.state.value; //convertValue(capability.state.mappingRef, val);
                }
            });
            var complexStateStr = JSON.stringify(complexState);
            debug("MQTT publish: " + complexStateStr + " -> " + topic);
            this.client.publish(topic, complexStateStr, { retain: true });
        }
    }

    updateState(type, val){
        debug("Updating cached state for device '" + this.data.name + "' (ID=" + this.data.id + ")");
        try {
            var capability = this.findCapability(type);
            val = convertValue(capability.state.mappingRef, val);
            val = convertToYandexValue(val, capability.type, capability.state.instance);
            capability.state.value = val;
            debug(".. updated cached state for device '" + this.data.name + "' (ID=" + this.data.id + "): " + val);
        }
        catch (err) {
            console.log(err);
            console.log("Cannot update capability state for device='" + this.data.name +
                "' (ID=" + this.data.id + "), capability type='" + type + "'");
        }
    }

    updateComplexState(complexStateStr) {
        try {
            debug("-- Parsing: "+complexStateStr);
            var complexState = JSON.parse(complexStateStr);
            this.data.capabilities.forEach( capability => {
                if (!capability.state.query) {
                    var val = complexState[capability.state.instance];
                    if (val !== undefined) {
                        debug("-- complexState["+capability.state.instance+"]="+val);
                        capability.state.value = convertToYandexValue(
                            val,
                            capability.type,
                            capability.state.instance
                        );
                    }
                }
            });
        } catch(err) {
            debug("Cannot parse the complex state string: " + complexStateStr);
        }
    }
}
module.exports = device;
