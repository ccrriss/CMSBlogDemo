module.exports = () => {
    return async function checktoken(ctx, next){
        try {
            const token = ctx.request.header.token;
            const user = await ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);
            if(user.username && user.password){
                await next();
                console.log('token verified successfully!');
            }else {
                ctx.body = {
                    message: false,
                    code: 40000
                }
            }
        }catch(e) {
            console.log(e);
            ctx.body = {
                message: false,
                code: 40001
            }
        }
    }
}