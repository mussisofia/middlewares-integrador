module.exports = (req, res, next) => {

    res.locals.userLog = false;

    if (!req.session.userLogueado) {
        return next();
    }

    res.locals.userLog = req.session.userLogueado;

    return next();
}