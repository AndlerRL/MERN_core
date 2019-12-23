const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts');

router.get('/posts', postsCtrl.listPosts);
router.get('/posts/:id', postsCtrl.getPost);
router.post('/posts', postsCtrl.createPost);
router.delete('/posts', postsCtrl.deletePost);

module.exports = router;
