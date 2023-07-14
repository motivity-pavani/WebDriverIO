module.exports = {
  saltRounds: 10,
  SENDGRID_API_KEY: "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",
  jwtPrivateKey: "MIIBVQIBADA//NBgkqhkiG9w@0BA^QEFA&AS*CAT8wggE7AgEAAkEAsuYYLv2/UVG5c5Ga",
  endpoint: '/api/v1',
  UI_URL: "http://localhost:3000/",
  port: 5505,
  // config: {
  //   user: 'vgopari',
  //   database: 'postgres',
  //   password: 'password',
  //   port: 5432,
  //   host: 'localhost',
  // },
  // config: {
  //   user: 'qamaster',
  //   database: 'qa',
  //   password: 'qamaster',
  //   port: 5432,
  //   host: 'localhost',
  // },
  // config: {
  //   user: 'postgres',
  //   database: 'postgres',
  //   password: 'admin',
  //   port: 5432,
  //   host: '192.168.0.6',
  //   // host: '49.207.12.156',
  // },

  config: {
    user: 'postgres',
    database: 'qa_automation_dev',
    password: 'Testing123!', port: 5432,
    host: 'qa-automation-dev.cpvhw7w0kbf5.us-east-1.rds.amazonaws.com'
  },


  // dbtables: {
  //   actions_config: "actions_config_demo",
  //   testcases: "testcases_demo",
  //   TestCaseGroup: "TestCaseGroup_demo",
  //   GroupMapping: "GroupMapping_demo",
  //   selecttests: 'SelectTests_demo',
  // },
  // dbtables: {
  //   actions_config: "actions_config",
  //   testcases: "testcases_dev",
  //   TestCaseGroup: "TestCaseGroup_dev",
  //   GroupMapping: "GroupMapping_dev",
  //   selecttests: 'SelectTests_dev',
  // },

  dbtables: {
    actions_config: "actions_config_test",
    testcases: "testcases_test",
    TestCaseGroup: "TestCaseGroup_test",
    GroupMapping: "GroupMapping_test",
    selecttests: 'SelectTests_test',
  },

  // noAuthRequired: ["/api/v1/signUp", "/api/v1/signIn", "/api/v1/verify"],
  noAuthRequired: ["/api/v1/signIn", "/api/v1/verify"],
  DBError: ['does not exist']
}
