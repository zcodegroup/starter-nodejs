var loopback = require('loopback');
module.exports = function(Common) {
    Common.observe('before save', function updateTimestamp(ctx, next) {
    	var loopbackCtx = loopback.getCurrentContext();
    	var currentUser = loopbackCtx && loopbackCtx.get('currentUser');
    	var userId = currentUser == undefined ? null : currentUser.id;

    	var data = ctx.instance ? ctx.instance : ctx.data;
    	var now = new Date();
        if (ctx.isNewInstance){
        	data.created = now;
        	data.updated = now;
        	data.createdBy = userId;
        	data.updatedBy = userId;
        }else {
        	data.updated = now;
        	data.updatedBy = userId;
        }
        next();
    });
};
