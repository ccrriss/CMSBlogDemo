'use strict';

const Controller = require('egg').Controller;
const checkAgent = require('../utils/checkagent');

const pump = require('mz-modules/pump');
const path = require('path');
const fs = require('fs');

class BookController extends Controller {
  async index() {
      const books = await this.service.book.getBook();
      if(books) {
          this.ctx.body = {
              data: books,
              message: true,
              code: 20000
          }
      } else {
          this.ctx.body = {
              data: 'get books failed',
              message: false,
              code: 30000
          }
      }
  }

  async create(){
      const book = this.ctx.request.body;
      book.orderby = parseInt(book.orderby);
      const result = await this.service.book.createBook(book);
      if(result) {
        this.ctx.body = {
            message: true,
            code: 20000
        }
      } else {
          this.ctx.body = {
              message: false,
              code: 30000
          }
      }
  }

  async destroy(){
      const id = this.ctx.params.id;
      const result = await this.service.book.destroyBook(id);
      if(result){
        this.ctx.body = {
            message: true,
            code: 20000
        }
      } else {
          this.ctx.body = {
              message: false,
              code: 30000
          }
      }
  }

  async update(){
      const id = this.ctx.params.id;
      const book = this.ctx.request.body;
      const result = await this.service.book.updateBook(id, book);
      if(result){
          this.ctx.body = {
              message: true,
              code: 20000
          }
      }else {
          this.ctx.body = {
              message:false,
              code: 30000
          }
      }
  }

  //for frontend
  async getBookList(){
    const data = await this.service.website.getBookList();
    await this.ctx.render('frontend/book.html', data);
  }

  async toFirstSection(){
    const id = this.ctx.params.id;
    const section_id = await this.ctx.service.book.getFirstSectionIdByBookId(id);
    await this.ctx.redirect(`/section/${section_id}`);
  }

  // for image upload in book.vue
  async downloadImg(){  
    const stream = await this.ctx.getFileStream();
    const filename = new Date().getTime() + path.extname(stream.filename).toLowerCase();
    const target = path.join(this.config.baseDir, 'app/public/uploads/IMG/BookImg', filename);
    const writeStream = fs.createWriteStream(target);
    await pump(stream, writeStream);
    this.ctx.body = {
      code: 20000,
      data: {
        name: filename,
        // file: `/public/uploads/IMG/DownloadImg/${filename}`  //for production
        file: `http://127.0.0.1:7001/uploads/IMG/BookImg/${filename}`  //local
      }
    }
  }
}

module.exports = BookController;
