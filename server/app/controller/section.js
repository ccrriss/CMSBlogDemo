'use strict';

const Controller = require('egg').Controller;
const checkAgent = require('../utils/checkagent');

class SectionController extends Controller {
    async index(){
        const chapter_id = this.ctx.request.query.chapter_id;
        const sections = await this.service.section.getSection(chapter_id);
        if(sections){
            this.ctx.body = {
                data: sections,
                message: true,
                code: 20000
            }
        } else {
            this.ctx.body = {
                data: 'get sections failed',
                message: false,
                code: 30000
            }
        }
    }

    async create(){
        const section = this.ctx.request.body;
        section.orderby = parseInt(section.orderby);
        const result = await this.service.section.createSection(section);
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
        const id  = this.ctx.params.id;
        const result = await this.service.section.destroySection(id);
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

    async update(){
        const id = this.ctx.params.id;
        const section = this.ctx.request.body;
        const result = await this.service.section.updateSection(id, section);
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

    //for frontend
    async getSectionDetail(){
        const id = this.ctx.params.id;
        const data = await this.service.website.getSectionDetail(id);
        await this.ctx.render('frontend/section_detail.html', data);
    }

    async getSectionContent(){
        const id = this.ctx.params.id;
        const data = await this.service.website.getSectionContent(id);
        await this.ctx.render('frontend/section_content.html', data);
    }

}

module.exports = SectionController;