/* eslint valid-jsdoc: "off" */

'use strict';

const path = require('path');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1614496651412_3807';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.security = {
    csrf: {
      enable: false,
    }
  };

  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    }
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  config.jwt = {
    secret: "blog"
  };

  config.sequelize = {
    dialect: "mysql",
    host: 'localhost',
    database: 'blog',
    port: 3306,
    username: 'root',
    password: '12345678',
    timezone: '+8:00'
  };

  config.static = {
    prefix: '/',
    dir: path.join(appInfo.baseDir, 'app/public')
  }

  return {
    ...config,
    ...userConfig,
  };
};
