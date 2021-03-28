const Service = require('egg').Service;

class UserService extends Service {
    async getUser(){
        try {
            const users = await this.app.model.User.findAll();
            return users;
        } catch(e){
            return false;
        }
    }

    async createUser(body){
        try {
            const {username, password} = body;
            const result = await this.app.model.User.create({
                username, password
            });
            return true;
        }catch(e) {
            return false;
        }
    }

    async destroyUser(id){
        try {
            const user = await this.app.model.User.findByPk(id);
            await user.destroy();
            return true;
        } catch(e) {
            return false;
        }
    }

    async updateUser(id, body){
        try {
            const {password} = body;
            const user = await this.app.model.User.findByPk(id);
            await user.update({password});
            return true;
        } catch(e){
            return false;
        }
    }

    async login(body){
        try {
            const {username, password} = body;
            const user = await this.app.model.User.findOne({
                where: {username}
                // where: {username, password}
            });
            if(user){
                const token = this.app.jwt.sign({username, password}, this.app.config.jwt.secret);
                return token;
            } else {
                return false;
            }
        } catch(e){
            return false;
        }
    }
}

module.exports = UserService;