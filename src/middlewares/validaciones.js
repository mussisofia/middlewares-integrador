const { body } = require('express-validator');
const path = require('path');
const bcrypt = require('bcryptjs');
const helper = require('../helpers/helpers');

module.exports = {
    registro: [
        body('email').notEmpty().withMessage('El campo e-mail no puede estar vacío').bail()
        .isEmail().withMessage('El e-mail ingresado es inválido').bail()
        .custom(value => {
            users = helper.getAllUsers();
            userExiste = users.find(user => user.email == value);
            if (userExiste){
                return false;
            } 
            return true;

        }).withMessage('Usuario ya existente').bail(),
        body('password').notEmpty().withMessage('El campo contraseña no puede estar vacío').bail()
        .isLength({min: 6, max:99}).withMessage('La contraseña debe tener como mínimo 6 caracteres')
        .custom((value, {req} )=> {
            return value == req.body.retype;
        }).withMessage('Las contraseñas ingresadas no son iguales').bail(),
        body('retype').notEmpty().withMessage('Debes repetir la contraseña ingresada'),
        body('avatar').custom((value, {req}) => {
            return req.files[0];
        }).withMessage('La imagen de perfil es obligatoria').bail()
        .custom((value, {req}) => {
            return true;
              //formato debe ser > jpg, jpeg, png
        }).withMessage('El formato es invalido').bail()

    ],
    
    login: [
        body('email').notEmpty().withMessage('El campo e-mail es obligatorio').bail()
        .custom((value, {req}) => {
            users = helper.getAllUsers();
            userExiste = users.find(user => user.email == value);
            if(userExiste) {
                return bcrypt.compareSync(req.body.password, userExiste.password);
            } else {
                return false;
            } 
            
        }).withMessage('El email y la contraseña no coinciden').bail()
    ]
}