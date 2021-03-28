const Service = require('egg').Service;

class VideoService extends Service {
    async getVideo(page){
        try {
            const number = parseInt(page);
            const start = number * 10 - 10;
            const videos = await this.app.model.Video.findAll({
                limit: [start, 100]
            });
            return videos;
        }catch(e) {
            return false;
        }
    }

    async getVideoDetail(id){
        try {
            const video = await this.app.model.Video.findOne({
                where: {id}
            });
            return video;
        }catch(e) {
            return false;
        }
    }

    async createVideo(body) {
        try {
            const {title, iframe_url, img} = body;
            const result = await this.app.model.Video.create({
                title, iframe_url, img
            });
            return true;
        }catch(e) {
            return false;
        }
    }

    async destroyVideo(id){
        try {
            const video = await this.app.model.Video.findByPk(id);
            await video.destroy();
            return true;
        } catch(e) {
            return false;
        }
    }

    async updateVideo(id, body){
        try{
            const {title, iframe_url, img} = body;
            const video = await this.app.model.Video.findByPk(id);
            await video.update({title, iframe_url, img});
            return true;
        } catch(e){
            return false;
        }
    }

    //for frontend
    async getVideoList(query){
        try {
            const number = parseInt(query.page);
            const start = number * 10 - 10;
            const degree = query.total;
            const videoList = await this.app.model.Video.findAll({
                limit: [start, degree]
            });
            return videoList;
        } catch(e){
            return false;
        }
    }

    async getVideoDetail(id){
        try {
            const video = await this.app.model.Video.findOne({
                where: {id}
            });
            return video;
        } catch(e){
            return false;
        }
    }
}

module.exports = VideoService;