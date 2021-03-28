const Service = require('egg').Service;

class SectionEditService extends Service {
    async getContent(section_id){
        try {
            const content = await this.app.model.Content.findOne({
                where: {section_id},
            });
            return content;
        } catch(e){
            return false;
        }
    }

    async createContent(body){
        try {
            const {md_text, html_text, section_id} = body;
            const result = await this.app.model.Content.create({
              md_text, html_text, section_id
            });
            return true;
        } catch(e){
            return false;
        }
    }

    async destroyContent(id){
        try {
            const content = await this.app.model.Section.findByPk(id);
            await content.destroy();
            return true;
        } catch(e) {
            return false;
        }
    }

    async updateContent(id, body){
        try{
            const {md_text, html_text, section_id} = body;
            const content = await this.app.model.Content.findByPk(id);
            await content.update({md_text, html_text, section_id});
            return true;
        } catch(e){
            return false;
        }
    }
}

module.exports = SectionEditService;