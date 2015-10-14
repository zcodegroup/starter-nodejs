module.exports = function(Propinsi) {
    Propinsi.greet = function(msg, cb) {
        cb(null, 'Greetings... ' + msg);
    }

    var greetMethod = {
        http: {
            path: '/greet',
            verb: 'get'
        },
        accepts: {
            arg: 'msg',
            type: 'string'
        },
        returns: {
            arg: 'greeting',
            type: 'string'
        }
    }

    Propinsi.remoteMethod('greet', greetMethod);
};
