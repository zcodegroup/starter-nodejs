'user strict';

// to enable these logs set `DEBUG=boot:01-loaduser` or `DEBUG=boot:*`
var log = require('debug')('boot:01-loaduser');
module.exports = function(app) {
    var User = app.models.Account;
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;

    var users = [{
        username: 'jokotingkir',
        email: 'jokotingkir@zcodegroup.com',
        password: 'gagah'
    }];

    var adminRole = {
        name: 'admin'
    };

    User.create(users, function(err, users) {
        if (err){
        	log(err);
        	return;
        }
        log('Created users:', users);
        Role.create(adminRole, function(err, role) {
            if (err) {
            	log(err);
            	return;
            }
            role.principals.create({
                principalType: RoleMapping.USER,
                principalId: users[0].id
            }, function(err, principal) {
                if (err) {
                	log(err);
                	return;
                }
                log('Created principal:', principal);
            });
        });
    });
};