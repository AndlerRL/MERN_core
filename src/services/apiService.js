import axios from 'axios';

const service = {};

service.getPosts = () => axios.get('/api/posts');

service.createPost = post => axios.post('/api/posts', post);

service.deletePost = post => axios.delete(`/api/posts/${post.id}`);

export default service;
