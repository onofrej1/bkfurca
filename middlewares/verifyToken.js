var jwt = require('jsonwebtoken');

module.exports = function(req,res,next) {
  console.log(req.headers);
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
    // verifies secret and checks exp
        jwt.verify(token, 'pwd', function(err, decoded) {
          console.log(decoded);
            if (err) { //failed verification.
                return res.json({"error": "wrong token"});
            }
            req.decoded = decoded;

            next(); //no error, proceed
        });
    } else {
        console.log('no token');
        // forbidden without token
        return res.status(403).send({
            "error": "no token"
        });
    }
}
