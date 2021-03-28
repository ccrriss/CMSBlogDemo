'use strict';

const Controller = require('egg').Controller;
const pump = require('mz-modules/pump');
const path = require('path');
const fs = require('fs');

class DownloadController extends Controller {
  async downloadImg(){  
    const stream = await this.ctx.getFileStream();
    const filename = new Date().getTime() + path.extname(stream.filename).toLowerCase();
    const target = path.join(this.config.baseDir, 'app/public/uploads/img/downloadimg', filename);
    const writeStream = fs.createWriteStream(target);
    await pump(stream, writeStream);
    this.ctx.body = {
      code: 20000,
      data: {
        name: filename,
        // file: `/public/uploads/IMG/DownloadImg/${filename}`  //for production
        file: `http://127.0.0.1:7001/uploads/IMG/DownloadImg/${filename}`  //local
      }
    }
    console.log(this.ctx.body);
  }
}

module.exports = DownloadController;