const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const isOwnerMessage = require('../middleware/isOwnerMessage');
const isAdmin = require('../middleware/isAdmin');

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup); // Création d'un compte
router.post('/login', userCtrl.login);
router.get('/getOneUser',auth, userCtrl.getOneUser);
router.get('/getAllUser',auth, userCtrl.getAllUser);
router.delete('/deleteUser/:id',auth, userCtrl.deleteUser);
router.delete('/deleteOneUser/:id',auth,isAdmin, userCtrl.deleteOneUser);
router.put('/updateLastName',auth, userCtrl.updateLastName);
router.put('/updateName',auth, userCtrl.updateName);
router.put('/updateEmail',auth, userCtrl.updateEmail);
router.put('/updatePassword',auth, userCtrl.updatePassword);



module.exports = router;  //Export vers app.js