var {verifyPermission} = require("jwt-permissions");

module.exports = function(req, res, next) {
  var token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (token) {
    // verifies secret and checks exp
    let roles = [/other/, /manager/];

    //console.log(verifyPermission);
    verifyPermission({requiredRoles: roles, accessToken: token, secret: 'pwd'})
      .then(() => {
        console.log('has permisson');
        // token is good and has all needed roles
      })
      .catch(() => {
        console.log('no permission');
        // either a bad token or missing roles
      });
  } else {
    // forbidden without token
    return res.status(403).send({
      error: true
    });
  }
};
