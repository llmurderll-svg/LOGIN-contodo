const express = require('express');
const router = express.Router();
//cargar los controladores
const {registerController} = require('../controllers/auth.controller.js');
router.post('/register',registerController);

module.exports = router;