module.exports = {
  debug: 'y2m.*',
  db_path: './loki.json',

  mqtt: {
    host: '192.168.1.132',
    port: 1883,
    user: 'mqtt-writer',
    password: '***REMOVED***',
  },

  https: {
    privateKey: '/mnt/winshare/privkey.pem',
    certificate: '/mnt/winshare/fullchain.pem',
    port: 8443,
  },

  clients: [
    {
      id: '1',
      name: 'Yandex',
      clientId: 'yandex-manoliHome',
      clientSecret: '***REMOVED***',
      isTrusted: false,
    },
  ],

  users: [
    {
      id: '1',
      username: 'admin',
      password: 'admin',
      name: 'Administrator',
    },
  ],

  valueMappings: {
    default: {
      true: 'ON',
      false: 'OFF',
      ON: 'true',
      OFF: 'false',
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
            split: false,
          },
          state: {
            instance: 'on',
            publish: 'yandex/devices/servantBacklight/set',
            query: 'yandex/devices/servantBacklight/get',
            mappingRef: 'default',
          },
        },
      ],
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
            split: false,
          },
          state: {
            instance: 'on',
          },
        },
      ],
      complexState: {
        publish: 'yandex/devices/hallCeilingLamp/set',
        query: 'yandex/devices/hallCeilingLamp/get',
      },
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
            split: false,
          },
          state: {
            instance: 'on',
          },
        },
        {
          type: 'devices.capabilities.range',
          retrievable: true,
          parameters: {
            instance: 'brightness',
            random_access: true,
            range: {
              min: 0,
              max: 100,
            },
            unit: 'unit.percent',
          },
          state: {
            instance: 'brightness',
          },
        },
      ],
      complexState: {
        publish: 'yandex/devices/bedroomCeilingLamp/set',
        query: 'yandex/devices/bedroomCeilingLamp/get',
      },
    },
    {
      name: 'Ночник',
      room: 'Спальня',
      type: 'devices.types.light',
      capabilities: [
        {
          type: 'devices.capabilities.on_off',
          retrievable: true,
          parameters: {
            split: false,
          },
          state: {
            instance: 'on',
          },
        },
        {
          type: 'devices.capabilities.range',
          retrievable: true,
          parameters: {
            instance: 'brightness',
            random_access: true,
            range: {
              min: 0,
              max: 100,
            },
            unit: 'unit.percent',
          },
          state: {
            instance: 'brightness',
          },
        },
      ],
      complexState: {
        publish: 'yandex/devices/hallNightLight/set',
        query: 'yandex/devices/hallNightLight/get',
      },
    },
  ],
};
