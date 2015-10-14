module.exports = function(Test) {
    Test.observe('before save', function updateTimestamp(ctx, next) {
    	console.log(ctx)
    	var data = ctx.instance ? ctx.instance : ctx.data;
    	var now = new Date();
        if (ctx.isNewInstance){
        	data.created = now;
        	data.updated = now;
        }else data.updated = now;
        next();
    });
};
