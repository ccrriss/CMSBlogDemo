const Service = require('egg').Service;

class BlogService extends Service {
    async getBlog(page){
        try {
            const number = parseInt(page);
            const start = number * 10 - 10;
            const blogs = await this.app.model.Blog.findAll({
               limit: [start, 100]
            });
            return blogs;
        }catch(e) {
            return false;
        }
    }

    async getBlogDetail(id){
        try {
            const blog = await this.app.model.Blog.findOne({
                where: {id}
            });
            return blog;
        }catch(e) {
            return false;
        }
    }

    async createBlog(body){
        try {
            const {title, img, md_text, html_text} = body;
            const result = await this.app.model.Blog.create({title, img, md_text, html_text});
            return true;
        } catch(e){
            return false;
        }
    }

    async destroyBlog(id){
        try {
            const blog = await this.app.model.Blog.findByPk(id);
            await blog.destroy();
            return true;
        } catch(e){
            return false;
        }
    }

    async updateBlog(id, body){
        try {
            const {title, img, md_text, html_text} = body;
            const blog = await this.app.model.Blog.findByPk(id);
            await blog.update({title,img, md_text, html_text});
            return true;
        }catch(e) {
            return false;
        }
    }
    
    //for frontend
    async getBlogList(query) {
        try {
            const number = parseInt(query.page);
            const start = number * 10 - 10;
            const degree = parseInt(query.total);
            const blogList = await this.app.model.Blog.findAll({
                limit: [start, degree]
            })
            return blogList;
        } catch (e) {
            return false;
        }
    }
}

module.exports = BlogService;