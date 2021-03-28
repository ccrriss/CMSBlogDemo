const Service = require('egg').Service;

class WebsiteService extends Service {
    async getHomePageData(){
        try {
            const blogList = await this.service.blog.getBlogList({page:1, total:100});
            const bookList = await this.service.book.getBookList({page:1, total:100});
            const videoList = await this.service.video.getVideoList({page:1, total:100});
            const recommendBlog = await this.service.blog.getBlogList({page:1,total:3});
            const recommendBook = await this.service.book.getBookList({page:1,total:3});
            const recommendVideo = await this.service.video.getVideoList({page:1, total:3});
            const title = 'homepage, cms system';
            return {
                blogList,
                bookList,
                videoList,
                recommendBlog,
                recommendBook,
                recommendVideo,
                title
            };
        }catch(e){
            return false;
        }
    }

    async getBlogList(){
        let blogList = await this.service.blog.getBlogList({page:1,total:100});
        let recommendBlog = await this.service.blog.getBlogList({page:1,total:3});
        let recommendBook = await this.service.book.getBookList({page:1,total:3});
        let title = 'blog, cms system';
        return {
            blogList,
            recommendBlog,
            recommendBook,
            title
        };
    }

    async getBlogDetail(id){
        let blog = await this.service.blog.getBlogDetail(id);
        let recommendBlog = await this.service.blog.getBlogList({page:1,total:3});
        let recommendBook = await this.service.book.getBookList({page:1,total:3});
        let title = blog.title + 'cms system';
        return {
            blog,
            recommendBlog,
            recommendBook,
            title
        };
    }

    async getVideoList(){
        let videoList = await this.service.video.getVideoList({page:1, total:100});
        let recommendBlog = await this.service.blog.getBlogList({page:1,total:3});
        let recommendBook = await this.service.book.getBookList({page:1,total:3});
        let recommendVideo = await this.service.video.getVideoList({page:1, total:3});
        let title = 'video, cms system';
        return {
            videoList,
            recommendBlog,
            recommendBook,
            recommendVideo,
            title
        };
    }

    async getVideoDetail(id){
        const video = await this.service.video.getVideoDetail(id);
        const videoList = await this.service.video.getVideoList({page:1, total:100});
        const title = 'video detail, cms system';
        return {
            video,
            videoList,
            title
        }
    }

    async getResourceList(){
        let resourceList = await this.service.resource.getResourceList({page:1, total:100});
        let recommendBlog = await this.service.blog.getBlogList({page:1,total:3});
        let recommendBook = await this.service.book.getBookList({page:1,total:3});
        let title = 'resourceList, cms system';
        return {
            resourceList,
            recommendBlog,
            recommendBook,
            title
        };
    }

    async getBookList(){
        let bookList = await this.service.book.getBookList({page:1,total:100});
        let recommendBlog = await this.service.blog.getBlogList({page:1,total:3});
        let recommendBook = await this.service.book.getBookList({page:1,total:3});
        let recommendVideo = await this.service.video.getVideoList({page:1, total:3});
        let title = 'book, cms system'; 
        return {
            bookList,
            recommendBlog,
            recommendBook,
            recommendVideo,
            title
        };
    }

    async getSectionDetail(id){
        let section = await this.service.section.getSectionDetail(id);
        let menu = await this.service.section.getMenuBySectionId(id); // get table of contents
        let bookList = await this.service.book.getBookList({page:1, total:100});
        let title = section? section.title + 'cms system': 'no content'
        return {
            section,
            menu,
            bookList,
            title
        };
    }

    async getSectionContent(id){
        let content = await this.service.section.getSectionContent(id);
        let section = await this.service.section.getSectionDetail(id);
        let menu = await this.service.section.getMenuBySectionId(id); // get table of contents
        let bookList = await this.service.book.getBookList({page:1, total:100});
        let title = section? section.title + 'cms system': 'no content'
        return {
            content,
            section,
            menu,
            bookList,
            title
        };
    }

}

module.exports = WebsiteService;