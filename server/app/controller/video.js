'use strict';

const Controller = require('egg').Controller;
const checkAgent = require('../utils/checkagent');

class VideoController extends Controller {
    async index(){
        const page = this.ctx.request.query.page;
        const videos = await this.service.video.getVideo(page);
        if(videos) {
            this.ctx.body = {
                data: videos,
                message: true,
                code: 20000
            }
        } else {
            this.ctx.body = {
                data: 'get videos failed',
                message: false,
                code: 30000
            }
        }
    }

    async show(){
        const id = this.ctx.params.id;
        const video = await this.service.video.getVideoDetail(id);
        if(video){
            this.ctx.body = {
                data: video,
                message: true,
                code: 20000
            }
        } else {
            this.ctx.body = {
                data: 'get video failed',
                message: false,
                code: 30000
            }
        }
    }

    async create(){
        const video = this.ctx.request.body;
        const result = await this.service.video.createVideo(video);
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
        const result = await this.service.video.destroyVideo(id);
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
        const video = this.ctx.request.body;
        const result = await this.service.video.updateVideo(id, video);
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
    async getVideoList() {
        const data = await this.service.website.getVideoList();
        await this.ctx.render("frontend/video.html", data);
    }

    async getVideoDetail(){
        const id = this.ctx.params.id;
        const data = await this.service.website.getVideoDetail(id);
        await this.ctx.render('frontend/video_detail.html', data);
    }
}

module.exports = VideoController;