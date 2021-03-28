'use strict';

module.exports = app => {
    const {STRING, INTEGER} = app.Sequelize;

    const Book = app.model.define('book', {
        title: STRING,
        img: STRING,
        orderby: INTEGER
    })

    return Book;
};

