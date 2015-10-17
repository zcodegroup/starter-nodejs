var log = require('debug')('model:account');
var loopback = require('loopback');

module.exports = function(Account) {
    /**
     * Return accounts by role
     * @param role
     * @param callback
     */
    Account.getAccountsByRole = function(role, callback) {

        Account.app.models.RoleMapping.usersIDByRole(role, function(err, accounts) {

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

    Account.getRoleByAccount = function(account, callback) {
        Account.app.models.RoleMapping.roleByUserId(account, callback);
    }


    /*=============== REMOTE METHOD =================*/
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
            http: {
                verb: 'get'
            }
        }
    );

    Account.remoteMethod('getRoleByAccount', {
        accepts: {
            arg: 'accountId',
            type: 'string'
        },
        returns: {
            arg: 'roles',
            type: 'object'
        },
        http: {
            verb: 'get'
        }
    });




    /*==================== OPERATION HOOKS ====================*/

    Account.observe('access', function limitToCompany(ctx, next) {
        var loopbackCtx = loopback.getCurrentContext();
        var currentUser = loopbackCtx && loopbackCtx.get('currentUser');
        var isExist = false;
        log(currentUser);
        if (currentUser){
        	if (currentUser.type == 0) return next();
            ctx.query.where.companyId = currentUser.companyId;
        }
        next();
    });
};
