module.exports = {
  debug: '',
  db_path: './loki.json',

  mqtt: {
    host: 'localhost',
    port: 1883,
    user: '',
    password: '',
  },

  https: {
    privateKey: '/path/to/privkey.pem',
    certificate: '/path/to/fullchain.pem',
    port: 8443,
  },

  clients: [
    {
      id: '1',
      name: 'Yandex',
      clientId: 'yandex-client-id',
      clientSecret: 'client-secret',
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
      mqtt: [
        {
          type: 'devices.capabilities.on_off',
          publish: 'zigbee2mqtt/0x00158d0003xxxxxx/set',
          query: 'zigbee2mqtt/0x00158d0003xxxxxx/set',
          valueMapRef: 'default',
        },
      ],
      capabilities: [
        {
          type: 'devices.capabilities.on_off',
          retrievable: true,
          state: {
            instance: 'on',
            value: true,
          },
        },
      ],
    },
    {
      name: 'Свет',
      room: 'Прихожая',
      type: 'devices.types.light',
      mqtt: [
        {
          type: 'devices.capabilities.on_off',
          publish: 'yandex/devices/hallCeilingLamp/set',
          query: 'yandex/devices/hallCeilingLamp/set',
        },
      ],
      capabilities: [
        {
          type: 'devices.capabilities.on_off',
          retrievable: true,
          state: {
            instance: 'on',
            value: true,
          },
        },
      ],
    },
    {
      name: 'Свет',
      room: 'Спальня',
      type: 'devices.types.light',
      mqtt: [
        {
          type: 'devices.capabilities.on_off',
          publish: 'yandex/devices/bedroomCeilingLamp/set',
          query: 'yandex/devices/bedroomCeilingLamp/set',
        },
      ],
      capabilities: [
        {
          type: 'devices.capabilities.on_off',
          retrievable: true,
          state: {
            instance: 'on',
            value: true,
          },
        },
      ],
    },
  ],
};
