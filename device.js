const debug = require('debug')('y2m-device');

function fixEncoding(str) {
    str = ""+str;
    if (str.includes('"'))
        return str;
    else
        return eval('"'+str+'"');
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
      custom_data: {
        mqtt: options.mqtt || [{}]
      },
      capabilities: options.capabilities,
    }
    global.devices.push(this);
  }

  getInfo() {
    return this.data;
  };

  findDevIndex(arr, elem) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].type === elem) {
            return i;
        }
    }
    return false;
  };



  setState(val, type, inst) {
    var mqttVal;
    var topic;
    var capabilityIndex = this.findDevIndex(this.data.capabilities, type);
    var mqttIndex = this.findDevIndex(this.data.custom_data.mqtt, inst);
    switch (inst) {
      case 'on':
          try {
            var valueMapping = this.data.custom_data.mqtt[mqttIndex].valueMapping || false;
            debug("Using value mapping: %s", valueMapping);
            if (valueMapping && global.valueMappings[valueMapping]) {
                mqttVal = global.valueMappings[valueMapping][val];
                debug("Value mapped: %s -> %s", val, mqttVal);
            } else
                mqttVal = val ? '1' : '0';
            this.data.capabilities[capabilityIndex].state.instance = inst;
            this.data.capabilities[capabilityIndex].state.value = val;
            topic = this.data.custom_data.mqtt[mqttIndex].set || false;
            break; 
          } 
          catch (err) {              
            topic = false;
            console.log(err);
          }
      case 'mute':
          try {
            mqttVal = val ? '1' : '0';
            this.data.capabilities[capabilityIndex].state.instance = inst;
            this.data.capabilities[capabilityIndex].state.value = val;
            topic = this.data.custom_data.mqtt[mqttIndex].set || false;
            break; 
          } 
          catch (err) {              
            topic = false;
            console.log(err);
          }          
      default:
          try {
            mqttVal = JSON.stringify(val);
            this.data.capabilities[capabilityIndex].state.instance = inst;
            this.data.capabilities[capabilityIndex].state.value = val;
            topic = this.data.custom_data.mqtt[mqttIndex].set || false;
          } 
          catch (err) {              
            topic = false;
            console.log(err);
          }  
    };

    if (topic) {
      this.client.publish(topic, mqttVal);
    }
    return [
      {
      	'type': type,
        'state': {
          'instance': inst,
          'action_result': {
            'status': 'DONE'
          }
        }
      }
    ];
  };
}
module.exports = device;
