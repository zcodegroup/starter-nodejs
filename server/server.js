var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

app.start = function() {
    // start the web server
    return app.listen(function() {
        app.emit('started');
        console.log('Web server listening at: %s', app.get('url'));
    });
};



//*** set CURRENT USER *** //
app.use(loopback.context());
app.use(loopback.token());
app.use(function setCurrentUser(req, res, next) {
    if (!req.accessToken) {
        return next();
    }
    app.models.Account.findById(req.accessToken.userId, {
        include: ['roles', 'company']
    }, function(err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return next(new Error('No user with this access token was found.'));
        }
        var ctx = loopback.getCurrentContext();
        if (ctx) {
            ctx.set('currentUser', user);
        }
        next();
    });
});
//*** set CURRENT USER *** //






// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
    if (err) throw err;

    // start the server if `$ node server.js`
    if (require.main === module)
        app.start();
});
