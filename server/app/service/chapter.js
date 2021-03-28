const Service = require('egg').Service;

class ChapterService extends Service {
    async getChapter(book_id){
        try {
            const chapters = await this.app.model.Chapter.findAll({
                where: {book_id},
                'order': [
                    ['orderby', 'asc']
                ],
            });
            return chapters;
        } catch(e){
            return false;
        }
    }

    async createChapter(body){
        try {
            const {title, orderby, book_id} = body;
            const result = await this.app.model.Chapter.create({title, orderby, book_id});
            return true;
        } catch(e){
            return false;
        }
    }

    async destroyChapter(id){
        try {
            const chapter = await this.app.model.Chapter.findByPk(id);
            await chapter.destroy();
            return true;
        } catch(e){
            return false;
        }
    }

    async updateChapter(id, body){
        try {
            const {title, orderby, book_id} = body;
            const chapter = await this.app.model.Chapter.findByPk(id);
            await chapter.update({title, orderby, book_id});
            return true;
        } catch(e){
            return false;
        }
    }
}

module.exports = ChapterService;