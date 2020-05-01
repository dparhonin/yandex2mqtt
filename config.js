module.exports = {
    debug: "",
    db_path: "./loki.json",

    mqtt: {
        host: 'localhost',
        port: 1883,
        user: '',
        password: ''
    },

    https: {
        privateKey: '/path/to/privkey.pem',
        certificate: '/path/to/fullchain.pem',
        port: 443
    },

    clients: [
        {
            id: '1',
            name: 'Yandex',
            clientId: 'yandex-client-id',
            clientSecret: 'client-secret',
            isTrusted: false
        }
    ],

    users: [
        {
            id: '1',
            username: 'admin',
            password: 'admin',
            name: 'Administrator'
        }
    ],

    valueMappings: {
        "yeelight": {
            "true": "ON",
            "false": "OFF",
            "ON": "true",
            "OFF": "false"
        },
    },

    devices: [
        {
            name: 'Сервант',
            room: 'Кухня',
            type: 'devices.types.switch',
            mqtt: [
                 {
                    type: 'on',
                    set: 'zigbee2mqtt/0x00158d00035f843c/set',
                    stat: 'zigbee2mqtt/0x00158d00035f843c/set'
                }
            ],
            capabilities: [
                {
                    type: 'devices.capabilities.on_off',
                    retrievable: true,
                    state: {
                        instance: 'on',
                        value: true
                    }
                }
            ]
        },
        {
            name: 'Свет',
            room: 'Прихожая',
            type: 'devices.types.light',
            mqtt: [
                 {
                    type: 'on',
                    set: 'yandex/devices/hallCeilingLamp/set',
                    stat: 'yandex/devices/hallCeilingLamp/set',
                    valueMapping: "yeelight"
                 }
            ],
            capabilities: [
                {
                    type: 'devices.capabilities.on_off',
                    retrievable: true,
                    state: {
                        instance: 'on',
                        value: true
                    }
                }
            ]
        },
        {
            name: 'Свет',
            room: 'Спальня',
            type: 'devices.types.light',
            mqtt: [
                 {
                    type: 'on',
                    set: 'yandex/devices/bedroomCeilingLamp/set',
                    stat: 'yandex/devices/bedroomCeilingLamp/set',
                    valueMapping: "yeelight"
                 }
            ],
            capabilities: [
                {
                    type: 'devices.capabilities.on_off',
                    retrievable: true,
                    state: {
                        instance: 'on',
                        value: true
                    }
                }
            ]
        },
    ]
}