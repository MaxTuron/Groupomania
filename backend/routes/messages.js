const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const messagesCtrl = require('../controllers/messages');

router.post('/createMessage', auth, multer, messagesCtrl.createMessage); // Création d'un compte
router.get('/getAllMessages',auth, messagesCtrl.getAllMessages);
router.delete('/deleteMessage/:id', auth, multer, messagesCtrl.deleteMessage);


module.exports = router;  //Export vers app.js