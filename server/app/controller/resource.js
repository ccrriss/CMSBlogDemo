'use strict';

const Controller = require('egg').Controller;
const checkAgent = require('../utils/checkagent');

class ResourceController extends Controller {
    async index(){
        const resources = await this.service.resource.getResource();
        if(resources){
            this.ctx.body = {
                data: resources,
                message: true,
                code: 20000
            }
        }else {
            this.ctx.body = {
                data: 'get resources failed',
                message: false,
                code: 30000
            }
        }
    }

    async create(){
        const resource = this.ctx.request.body;
        resource.code = parseInt(resource.code);
        const result = await this.service.resource.createResource(resource);
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
        const result = await this.service.resource.destroyResource(id);
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
        const resource = this.ctx.request.body;
        //parseInt is for using number for checking ID
        resource.code = parseInt(resource.code);
        const result = await this.service.resource.updateResource(id, resource);
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

    //for front end
    async getResourceList(){
        const data = await this.service.website.getResourceList();
        await this.ctx.render('frontend/resource.html', data);
    }
}

module.exports = ResourceController;