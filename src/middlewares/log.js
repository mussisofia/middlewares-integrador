const helper = require('../helpers/helpers');

module.exports = (req, res, next) => {
    
    if(req.session.userLogueado){
        return next();
    } else if (req.cookies.user){
        const users = helper.getAllUsers();
        const userOk = users.find(user => user.id == req.cookies.user);
        if(userOk){
            req.session.user = userOk;
            return next();
        }
       
    } else {
        return next();
    }

}