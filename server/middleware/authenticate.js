const {Users} = require("./../models/Users");

var authenticate = (request, response, next) => {
    var token = request.header("x-auth");
    Users.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject();
        }
        request.user = user;
        request.token = token;
        next();
    }).catch((error) => {
        response.status(401).send();
    });
};
module.exports = {authenticate};