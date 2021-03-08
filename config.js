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
    privateKey: './private/privkey.pem',
    certificate: './private/fullchain.pem',
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

  devices_path: "./devices.json",
};
