'use strict';

const Controller = require('egg').Controller;
const checkAgent = require('../utils/checkagent');

class ResourceController extends Controller {
    //for front end
    async getSearchList(){
      await this.ctx.render('frontend/search.html');
    }
}

module.exports = ResourceController;