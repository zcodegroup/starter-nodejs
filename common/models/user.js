module.exports = function(User) {
    /**
     * Return users by role
     * @param role
     * @param callback
     */
    User.getUsersByRole = function(role, callback) {

        User.app.models.RoleMapping.usersIDByRole(role, function(err, users) {

            if (err || !users) return callback(err);

            User.find({
                where: {
                    _id: {
                        inq: users
                    }
                }
            }, callback);
        });
    };

    User.remoteMethod(
        'getUsersByRole', {
            accepts: {
                arg: 'role',
                type: 'string'
            },
            returns: {
                arg: 'users',
                type: 'object'
            },
            http: {verb: 'get'}
        }
    );
};
