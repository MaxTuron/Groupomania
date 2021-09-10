const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const CommentsCtrl = require('../controllers/Comments');

router.post('/createComment',auth, CommentsCtrl.createComment); // Création d'un compte
router.get('/getOneComment/:id',auth, CommentsCtrl.getOneComment);
router.get('/getAllComment',auth, CommentsCtrl.getAllComment);
router.delete('/deleteComment/:id', auth, CommentsCtrl.deleteComment);


module.exports = router;  //Export vers app.js