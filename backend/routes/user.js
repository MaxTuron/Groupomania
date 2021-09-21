const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const isOwnerOrAdmin = require('../middleware/isOwnerOrAdmin');

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup); // Création d'un compte
router.post('/login', userCtrl.login);
router.get('/getOneUser',auth, userCtrl.getOneUser);
router.get('/getAllUser',auth,isOwnerOrAdmin, userCtrl.getAllUser);
router.delete('/deleteUser/:id',auth,isOwnerOrAdmin, userCtrl.deleteUser);
router.delete('/deleteOneUser/:id',auth,isOwnerOrAdmin, userCtrl.deleteOneUser);
router.put('/updateLastName',auth,isOwnerOrAdmin, userCtrl.updateLastName);
router.put('/updateName',auth,isOwnerOrAdmin, userCtrl.updateName);
router.put('/updateEmail',auth,isOwnerOrAdmin, userCtrl.updateEmail);
router.put('/updatePassword',auth,isOwnerOrAdmin, userCtrl.updatePassword);



module.exports = router;  //Export vers app.js