const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts');
const userCtrl = require('../controllers/users');

router.get('/posts', postsCtrl.listPosts);
router.get('/posts/:id', postsCtrl.getPost);
router.post('/posts', postsCtrl.createPost);
router.delete('/posts', postsCtrl.deletePost);

router.get('/users', userCtrl.listUsers);
router.get('/users/:id', userCtrl.getUser);
router.post('/user', userCtrl.loginUser);
router.post('/users', userCtrl.createUser);
router.delete('/users', userCtrl.deleteUser);

module.exports = router;
