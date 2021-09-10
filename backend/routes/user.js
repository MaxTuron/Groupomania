const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup); // Création d'un compte
router.post('/login', userCtrl.login);
router.get('/getOneUser/:id',auth, userCtrl.getOneUser);
router.get('/getAllUser',auth, userCtrl.getAllUser);
router.delete('/deleteUser/:id', auth, userCtrl.deleteUser);
router.delete('/deleteOneUser/', auth, userCtrl.deleteOneUser);
router.put('/updateLastName/:id', auth, userCtrl.updateLastName);
router.put('/updateName/:id', auth, userCtrl.updateName);
router.put('/updateEmail/:id', auth, userCtrl.updateEmail);
router.put('/updatePassword/:id', auth, userCtrl.updatePassword);



module.exports = router;  //Export vers app.js