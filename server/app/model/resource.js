'use strict';

module.exports = app => {
    const {STRING} = app.Sequelize;

    const Resource = app.model.define('resource', {
        title: STRING,
        img: STRING,
        code: STRING,
        url: STRING,
    });

    return Resource;
}