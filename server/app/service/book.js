const Service = require('egg').Service;

class BookService extends Service {
    async getBook(){
        try {
            const books = await this.app.model.Book.findAll({
                'order': [
                    ['orderby', 'asc']
                ],
            });
            return books;
        }catch(e) {
            return false;
        }
    }

    async createBook(body){
        try {   
            const {title, orderby, img} = body;
            const result = await this.app.model.Book.create({title, orderby, img});
            return true;
        }catch(e) {
            return false;
        }
    }

    async destroyBook(id){
        try {
            const book = await this.app.model.Book.findByPk(id);
            await book.destroy();
            return true;
        }catch(e){
            return false;
        }
    }

    async updateBook(id, body) {
        try {
            const {title, orderby, img} = body;
            const book = await this.app.model.Book.findByPk(id);
            await book.update({title, orderby, img});
            return true;
        }catch(e){
            return false;
        }
    }

    //for frontend
    async getBookList(query) {
        try {
            const number = parseInt(query.page);
            const start = number * 10 - 10;
            const degree = parseInt(query.total);
            const bookList = await this.app.model.Book.findAll({
                limit: [start, degree],
                'order': [
                    ['orderby', 'asc']
                ],
                // /* where: { } 
            });
            return bookList;
        }catch (e) {
            return false;
        }
    }

    async getFirstSectionIdByBookId(id){
        const chapters = await this.app.model.Chapter.findAll({
            'order': [
                ['orderby', 'asc']
            ],
            where: {book_id: id}
        });
        let firstChapterId = chapters[0].dataValues.id;
        const sections = await this.app.model.Section.findAll({
            'order': [
                ['orderby', 'asc']
            ],
            where: {
                chapter_id: firstChapterId
            }
        });
        return sections[0].dataValues.id;
    }
}

module.exports = BookService;