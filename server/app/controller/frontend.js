'use strict';

const Controller = require('egg').Controller;

class frontendController extends Controller {
    async index(){
        await this.ctx.render('frontend/login.html');
    }
}

module.exports = frontendController;