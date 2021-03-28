'use strict';

const Controller = require('egg').Controller;

class ChapterController extends Controller {
    async index(){
        const book_id = this.ctx.request.query.book_id;
        const chapters = await this.service.chapter.getChapter(book_id);
        if(chapters){
            this.ctx.body = {
                data: chapters,
                message: true,
                code: 20000
            }
        } else{
            this.ctx.body = {
                data: 'get chapters failed',
                message: false,
                code: 30000
            }
        }
    }

    async create(){
        const chapter = this.ctx.request.body;
        chapter.orderby = parseInt(chapter.orderby);
        const result = await this.service.chapter.createChapter(chapter);
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

    async destroy(){
        const id = this.ctx.params.id;
        const result = await this.service.chapter.destroyChapter(id);
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
        const chapter = this.ctx.request.body;
        const result = await this.service.chapter.updateChapter(id, chapter);
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
}

module.exports = ChapterController;