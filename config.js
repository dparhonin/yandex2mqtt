module.exports = {
    debug: "y2m.*",
    db_path: "./loki.json",

    mqtt: {
        host: '192.168.1.132',
        port: 1883,
        user: 'mqtt',
        password: 'mqtt'
    },

    https: {
        privateKey: '/etc/letsencrypt/live/home.manoli.me/privkey.pem',
        certificate: '/etc/letsencrypt/live/home.manoli.me/fullchain.pem',
        port: 443
    },

    clients: [
        {
            id: '1',
            name: 'Yandex',
            clientId: 'yandex-manoliHome',
            clientSecret: '***REMOVED***',
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
        "default": {
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
            capabilities: [
                {
                    type: 'devices.capabilities.on_off',
                    retrievable: true,
                    parameters: {
                        split: false
                    },
                    state: {
                        instance: 'on',
                        value: false,
                        publish: 'yandex/devices/servantBacklight/set',
                        query: 'yandex/devices/servantBacklight/get',
                        mappingRef: 'default'
                    }
                }
            ]
        },
        {
            name: 'Свет',
            room: 'Прихожая',
            type: 'devices.types.light',
            capabilities: [
                {
                    type: 'devices.capabilities.on_off',
                    retrievable: true,
                    parameters: {
                        split: false
                    },
                    state: {
                        instance: 'on',
                        value: false
                    }
                },
            ],
            complexState: {
                publish: 'yandex/devices/hallCeilingLamp/set',
                query: 'yandex/devices/hallCeilingLamp/get'
            }
        },
        {
            name: 'Свет',
            room: 'Спальня',
            type: 'devices.types.light',
            capabilities: [
                {
                    type: 'devices.capabilities.on_off',
                    retrievable: true,
                    parameters: {
                        split: false
                    },
                    state: {
                        instance: 'on',
                        value: false
                    }
                },
                {
                    type: 'devices.capabilities.range',
                    retrievable: true,
                    parameters: {
                        instance: 'brightness',
                        random_access: true,
                        range: {
                            min: 0,
                            max: 100
                        },
                        unit: 'unit.percent'
                    },
                    state: {
                        instance: 'brightness',
                        value: 100
                    }
                },
                {
                    type: 'devices.capabilities.color_setting',
                    retrievable: true,
                    parameters: {
                        temperature_k: {
                            min: 2700,
                            max: 6500
                        }
                    },
                    state: {
                        instance: 'temperature_k',
                        value: 4500
                    }
                }
            ],
            complexState: {
                publish: 'yandex/devices/bedroomCeilingLamp/set',
                query: 'yandex/devices/bedroomCeilingLamp/get'
            }
        },
        {
            name: 'Телевизор',
            room: 'Спальня',
            type: 'devices.types.media_device.tv',
            capabilities: [
                {
                    type: 'devices.capabilities.on_off',
                    retrievable: false,
                    state: {
                        instance: 'on',
                        publish: 'yandex/devices/tvset/set'
                    }
                }
            ]
        }
    ]
}