const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const isOwnerComment = require('../middleware/isOwnerComment');
const isAdmin = require('../middleware/isAdmin');

const CommentsCtrl = require('../controllers/Comments');

router.post('/createComment',auth, CommentsCtrl.createComment);
router.get('/getOneComment/:id',auth, CommentsCtrl.getOneComment);
router.get('/getAllComment',auth, CommentsCtrl.getAllComment);
router.delete('/deleteComment/:id',auth,isOwnerComment, CommentsCtrl.deleteComment);
router.delete('/deleteOneComment/:id',auth,isAdmin, CommentsCtrl.deleteOneComment);


module.exports = router;  //Export vers app.js