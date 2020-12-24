module.exports = (req,res,next) => {
    if (!req.session.userLogueado) {
       return next();
    }

    res.redirect('/');
}