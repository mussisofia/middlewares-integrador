const express = require('express');
const router = express.Router();
const multer = require('multer');

//requerir a los middles
const validador = require('../middlewares/validaciones');
const auth = require('../middlewares/auth');
const guest = require('../middlewares/guest');

//configuracion de multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/users');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + ' - ' + file.originalname);
    }
})

const upload = multer({ 
    storage: storage
})

const userController = require('../controllers/userController');

// Muestra la vista de registro
router.get('/register', guest, userController.showRegister);

// Procesa la vista de registro
router.post('/register', guest, upload.any(), validador.registro, userController.processRegister);

// Muestra la vista de login
router.get('/login', guest, userController.showLogin);

// Procesa la vista de login
router.post('/login', guest, validador.login, userController.processLogin);

// Muestra el perfil del usuario
router.get('/profile', auth, userController.showProfile);

// Cierra la sesión
router.get('/logout', auth, userController.logout);

module.exports = router;