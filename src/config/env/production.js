module.exports = {
  port: 1337,
  datastores: {
    default: {
      adapter: 'sails-postgresql',
      url: 'database_techflex_user:MJTr9oxfm8BMNIXcDW3I7OQWRZTCzu1G@dpg-cojqr363e1ms73bgjlf0-a.ohio-postgres.render.com/database_techflex',
    },
  },
  sockets: {
    onlyAllowOrigins: [
      'https://two024-1b-t12-in02-g02.onrender.com',
    ],
  },
  session: {
    cookie: {
      secure: true,
    }
  },
  http: {
    trustProxy: true,
  }
};

