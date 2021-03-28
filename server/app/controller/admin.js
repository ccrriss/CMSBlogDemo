'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {
    async login(){
        const user = this.ctx.request.body;
        const token = await this.service.user.login(user);
        if(token){
            this.ctx.body = {
                token,
                message: true,
                code:20000
            }
        } else {
            this.ctx.body = {
                message: false,
                code: 30000
            }
        }
    }

    async userinfo(){
        const token = this.ctx.request.query.token;
        console.log('query',this.ctx.request.query);
        console.log('queries',this.ctx.request.queries);
        const user = await this.app.jwt.verify(token, this.app.config.jwt.secret);
        console.log(user);
        if(user.username && user.password){
            this.ctx.body = {
                user,
                code: 20000
            }
        }
    }
}

module.exports = AdminController;