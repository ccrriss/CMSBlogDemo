'use strict';

const Controller = require('egg').Controller;
const checkAgent = require('../utils/checkagent');

const pump = require('mz-modules/pump');
const path = require('path');
const fs = require('fs');

class SectionEditController extends Controller {
    async index(){
      try {
        const section_id = this.ctx.request.query.section_id;
        const content = await this.service.sectionEdit.getContent(section_id);
        if(content){
            this.ctx.body = {
                data: content,
                message: true,
                code: 20000
            }
        } else {
          this.ctx.body = {
              data: null,
              message: false,
              code: 20000
          }
        }
      } catch(e){
        this.ctx.body = {
          data: 'get content failed',
          message: false,
          code: 30000
        }
      }
    }

    async create(){
        const content = this.ctx.request.body;
        content.section_id = parseInt(content.section_id);
        const result = await this.service.sectionEdit.createContent(content);
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
        const result = await this.service.sectionEdit.destroyContent(id);
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
        const content = this.ctx.request.body;
        const result = await this.service.sectionEdit.updateContent(id, content);
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

    // for image upload in sectionEdit.vue
    async downloadImg(){  
      const stream = await this.ctx.getFileStream();
      const filename = new Date().getTime() + path.extname(stream.filename).toLowerCase();
      const target = path.join(this.config.baseDir, 'app/public/uploads/IMG/SectionContentImg', filename);
      const writeStream = fs.createWriteStream(target);
      await pump(stream, writeStream);
      this.ctx.body = {
        code: 20000,
        data: {
          name: filename,
          // file: `/public/uploads/IMG/DownloadImg/${filename}`  //for production
          file: `http://127.0.0.1:7001/uploads/IMG/SectionContentImg/${filename}`  //local
        }
      }
      console.log(this.ctx.body);
    }


}

module.exports = SectionEditController;