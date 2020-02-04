import axios from 'axios';

const service = {};

service.getPosts = (page, limit) => axios.get(`/api/posts${page ? `?offset=${page}` : ''}${limit ? `&limit=${limit}` : ''}`);
service.createPost = post => axios.post('/api/posts', post);
service.deletePost = post => axios.delete(`/api/posts/${post.id}`);

service.getUsers = () => axios.get('/api/users');
service.getUser = id => axios.get(`/api/users/${id}`);
service.createUser = user => axios.post('/api/users', user);
service.deleteUser = id => axios.delete(`/api/users/${id}`);

export default service;
