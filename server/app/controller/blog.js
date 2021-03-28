'use strict';

const Controller = require('egg').Controller;
const checkAgent = require('../utils/checkagent');

const pump = require('mz-modules/pump');
const path = require('path');
const fs = require('fs');

class BlogController extends Controller{
    async index(){
        const page = this.ctx.request.query.page;
        const blogs = await this.service.blog.getBlog(page);
        if(blogs) {
            this.ctx.body = {
                data: blogs,
                message: true,
                code: 20000
            }
        } else {
            this.ctx.body = {
                data: 'get blogs failed',
                message: false,
                code: 30000
            }
        }
    }

    async show(){
        const id = this.ctx.params.id;
        const blog = await this.service.blog.getBlogDetail(id);
        if(blog){
            this.ctx.body = {
                data: blog,
                message: true,
                code: 20000
            }
        } else {
            this.ctx.body = {
                data: 'get blog failed',
                message: false,
                code: 30000
            }
        }
    }

    async create(){
        const blog = this.ctx.request.body;
        blog.orderby = parseInt(blog.orderby);
        const result = await this.service.blog.createBlog(blog);
        if(result){
            this.ctx.body = {
                message: true,
                code: 20000
            }
        }else {
            this.ctx.body = {
                message: false,
                code: 30000
            }
        }
    }

    async destroy(){
        const id = this.ctx.params.id;
        const result = await this.service.blog.destroyBlog(id);
        if(result){
            this.ctx.body = {
                message: true,
                code: 20000
            };
        }else {
            this.ctx.body = {
                message: false,
                code: 30000
            }
        }
    }

    async update(){
        const id = this.ctx.params.id;
        const blog = this.ctx.request.body;
        const result = await this.service.blog.updateBlog(id, blog);
        if(result){
            this.ctx.body = {
                message: true,
                code: 20000
            };
        }else {
            this.ctx.body = {
                message: false,
                code: 30000
            }
        }
    }

    // for frontend
    async getBlogList(){
        let data = await this.service.website.getBlogList();
        await this.ctx.render('frontend/blog.html', data);
    }

    async getBlogDetail(){
        const id = this.ctx.params.id;
        let data = await this.service.website.getBlogDetail(id);
        await this.ctx.render('frontend/blog_detail.html', data);
    }

    // for image upload in blogEdit.vue
    async downloadImg(){  
        const stream = await this.ctx.getFileStream();
        const filename = new Date().getTime() + path.extname(stream.filename).toLowerCase();
        const target = path.join(this.config.baseDir, 'app/public/uploads/IMG/BlogImg', filename);
        const writeStream = fs.createWriteStream(target);
        await pump(stream, writeStream);
        this.ctx.body = {
          code: 20000,
          data: {
            name: filename,
            // file: `/public/uploads/IMG/DownloadImg/${filename}`  //正式地址
            // file: `http://127.0.0.1:7001/public/uploads/IMG/DownloadImg/${filename}`  //临时服务器地址
            file: `http://127.0.0.1:7001/uploads/IMG/BlogImg/${filename}`  //临时服务器地址
          }
        }
        console.log(this.ctx.body);
      }
}

module.exports = BlogController;