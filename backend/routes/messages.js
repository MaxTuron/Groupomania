const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const isOwnerMessage = require('../middleware/isOwnerMessage');

const messagesCtrl = require('../controllers/messages');

router.post('/createMessage',auth, multer, messagesCtrl.createMessage);
router.get('/getOneMessage/:id',auth, messagesCtrl.getOneMessage);
router.get('/getAllMessages',auth, messagesCtrl.getAllMessages);
router.delete('/deleteMessage/:id',auth,isOwnerMessage, messagesCtrl.deleteMessage);
router.put('/updateMessage/:id',auth,isOwnerMessage, multer, messagesCtrl.updateMessage);


module.exports = router;  //Export vers app.js