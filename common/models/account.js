module.exports = function(Account) {
    /**
     * Return accounts by role
     * @param role
     * @param callback
     */
    Account.getAccountsByRole = function(role, callback) {

        Account.app.models.RoleMapping.accountsIDByRole(role, function(err, accounts) {

            if (err || !accounts) return callback(err);

            Account.find({
                where: {
                    _id: {
                        inq: accounts
                    }
                }
            }, callback);
        });
    };

    Account.remoteMethod(
        'getAccountsByRole', {
            accepts: {
                arg: 'role',
                type: 'string'
            },
            returns: {
                arg: 'accounts',
                type: 'object'
            },
            http: {verb: 'get'}
        }
    );
};
