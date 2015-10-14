module.exports = function(app) {
    var User = app.models.user;
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
        	console.log(err);
        	return;
        }
        console.log('Created users:', users);
        Role.create(adminRole, function(err, role) {
            if (err) {
            	console.log(err);
            	return;
            }
            role.principals.create({
                principalType: RoleMapping.USER,
                principalId: users[0].id
            }, function(err, principal) {
                if (err) {
                	console.log(err);
                	return;
                }
                console.log('Created principal:', principal);
            });
        });
    });
};