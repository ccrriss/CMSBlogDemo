const Service = require('egg').Service;

class SectionService extends Service {
    async getSection(chapter_id){
        try {
            const sections = await this.app.model.Section.findAll({
                where: {chapter_id},
                'order': [
                    ['orderby', 'asc']
                ],
            });
            return sections;
        } catch(e){
            return false;
        }
    }

    async createSection(body){
        try {
            const {title, orderby, chapter_id} = body;
            const result = await this.app.model.Section.create({
                title, orderby, chapter_id
            });
            return true;
        } catch(e){
            return false;
        }
    }

    async destroySection(id){
        try {
            const section = await this.app.model.Section.findByPk(id);
            await section.destroy();
            return true;
        } catch(e) {
            return false;
        }
    }

    async updateSection(id, body){
        try{
            const {title, orderby, chapter_id} = body;
            const section = await this.app.model.Section.findByPk(id);
            await section.update({title, orderby, chapter_id});
            return true;
        } catch(e){
            return false;
        }
    }

    //for frontend 
    async getSectionDetail(id){
        try {
            const section = await this.app.model.Section.findOne({
                where: {id}
            });
            return section;
        }catch(e) {
            return false;
        }
    }

    async getSectionContent(id){
        try {
            const content = await this.app.model.Content.findOne({
                where: {section_id: id}
            });
            return content;
        }catch(e) {
            return false;
        }
    }

    async getMenuBySectionId(id){
        try {
            const section = await this.app.model.Section.findOne({
                where: {id},
                include: {
                    model: this.app.model.Chapter,
                    as: 'chapter',
                    include: {
                        model: this.app.model.Book,
                        as: 'book'
                    }
                }
            },
            );
            const book_id = section.dataValues.chapter.dataValues.book.dataValues.id;
            let chapters = await this.app.model.Chapter.findAll({
                where: {book_id}
            });

            for(let item of chapters){
                let chapter_id = item.dataValues.id;
                const sections = await this.app.model.Section.findAll({
                    where: {chapter_id}
                });
                item.dataValues.sectionList = sections;
            }
            return chapters;
        }catch(e) {
            return false;
        }
    }
}

module.exports = SectionService;