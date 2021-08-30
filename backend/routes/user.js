const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup); // Création d'un compte
router.post('/login', userCtrl.login);
router.get('/getOneUser/:id', userCtrl.getOneUser);
router.post('/getAllUser', userCtrl.getAllUser);
router.delete('/deleteUser/:id', auth, userCtrl.deleteUser);
router.put('/updateUser/:id', auth, userCtrl.updateUser);



module.exports = router;  //Export vers app.js