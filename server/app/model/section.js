'use strict';

module.exports = app => {
    const {STRING, INTEGER, TEXT} = app.Sequelize;

    const Section = app.model.define('section', {
        title: STRING,
        orderby: INTEGER,
    });

    Section.associate = function(){
        app.model.Section.belongsTo(app.model.Chapter, {
            as: 'chapter',
            foreignKey: 'chapter_id',
        })
    };

    return Section;
}