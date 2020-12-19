const { validationResult } = require('express-validator');
const helper = require('../helpers/helpers');
const bcrypt = require('bcryptjs');
const session = require('express-session');

module.exports = {
    showRegister: (req, res) => {
        res.render('user/user-register-form');
    },
    processRegister: (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()){
            res.render('user/user-register-form', {errors: errors.errors})
        } else {

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
    }
    },
    showLogin: (req, res) => {
        res.render('user/user-login-form');
    },
    processLogin: (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()){
            res.render('user/user-login-form', {errors: errors.errors})
        } else {
        
        users = helper.getAllUsers();
        user = users.find(user => user.email = req.body.email)
        req.session.userLogueado = user;
        
        if (req.body.remember) {
            res.cookie('user', user.id);
        }
        res.redirect('/user/profile')
        } 
            
    },
    showProfile: (req, res) => {
        res.render('user/profile');
    },
    logout: (req, res) => {
       //
    }

}

