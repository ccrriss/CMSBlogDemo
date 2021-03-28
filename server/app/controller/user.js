'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    async index(){
        const users = await this.service.user.getUser();
        if(users){
            this.ctx.body = {
                data: users,
                message: true,
                code: 20000
            }
        } else{
            this.ctx.body = {
                data: 'get users failed',
                message: false,
                code: 30000
            }
        }
    }

    async create(){
        const user = this.ctx.request.body;
        const result = await this.service.user.createUser(user);
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
        const result = await this.service.user.destroyUser(id);
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
        const user = this.ctx.request.body;
        const result = await this.service.user.updateUser(id, user);
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

module.exports = UserController;