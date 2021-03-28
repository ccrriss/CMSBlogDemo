const Service = require('egg').Service;

class ResourceService extends Service {
    async getResource(){
        try {
            const resources = await this.app.model.Resource.findAll();
            return resources;
        }catch(e){
            return false;
        }
    }

    async createResource(body){
        try {
            const {title, code, url, img} = body;
            const result = await this.app.model.Resource.create({title, code, url, img});
            return true;
        }catch(e) {
            return false;
        }
    }

    async destroyResource(id){
        try {
            const resource = await this.app.model.Resource.findByPk(id)
            await resource.destroy();
            return true; 
        }catch(e) {
            return false;
        }
    }

    async updateResource(id, body){
        try {
            const {title, code, url, img} = body;
            const resource = await this.app.model.Resource.findByPk(id);
            await resource.update({title, code, url, img});
            return true;
        }catch(e) {
            return false;
        }
    }

    //for frontend
    async getResourceList(query){
        try {
            const number = parseInt(query.page);
            const start = number * 10 - 10;
            const degree = parseInt(query.total);
            const resourceList = await this.app.model.Resource.findAll({
                limit: [start, degree]
            });
            return resourceList;
        }catch(e) {
            return false;
        }
    }
}

module.exports = ResourceService;