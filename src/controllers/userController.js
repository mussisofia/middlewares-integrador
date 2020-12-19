const { validationResult } = require('express-validator');
const helper = require('../helpers/helpers');
const bcrypt = require('bcryptjs');

module.exports = {
    showRegister: (req, res) => {
        res.render('user/user-register-form');
    },
    processRegister: (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()){
            res.render('user/user-register-form', {errors: errors.errors})
        } 

        const newUser = {
            id: helper.generateNewId(),
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            avatar: req.files[0].filename
        }
        const users = helper.getAllUsers();
        const saveUser = [...users, newUser];


        helper.writeUsers(saveUser);

        return res.redirect('/user/login');
    },
    showLogin: (req, res) => {
        res.render('user/user-login-form');
    },
    processLogin: (req, res) => {
       
        return res.send('Do the magic');
    },
    showProfile: (req, res) => {
        res.render('user/profile');
    },
    logout: (req, res) => {
        // Do the magic
        return res.redirect('/');
    }

}

