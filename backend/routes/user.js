const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const isOwner = require('../middleware/isOwner');
const isAdmin = require('../middleware/isAdmin');

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup); // Création d'un compte
router.post('/login', userCtrl.login);
router.get('/getOneUser',auth, userCtrl.getOneUser);
router.get('/getAllUser',auth,isOwner,isAdmin, userCtrl.getAllUser);
router.delete('/deleteUser/:id',auth,isOwner, userCtrl.deleteUser);
router.delete('/deleteOneUser/:id',auth,isOwner, userCtrl.deleteOneUser);
router.put('/updateLastName',auth,isOwner, userCtrl.updateLastName);
router.put('/updateName',auth,isOwner, userCtrl.updateName);
router.put('/updateEmail',auth,isOwner, userCtrl.updateEmail);
router.put('/updatePassword',auth,isOwner, userCtrl.updatePassword);



module.exports = router;  //Export vers app.js