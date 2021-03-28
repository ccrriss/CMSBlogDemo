'use strict';

module.exports = app => {
    const {TEXT} = app.Sequelize;

    const Content = app.model.define('content', {
        md_text: TEXT,
        html_text: TEXT,
    });

    Content.associate = function(){
        app.model.Content.belongsTo(app.model.Section, {
            as: 'section',
            foreignKey: 'section_id',
        })
    };

    return Content;
}