/* eslint-disable newline-per-chained-call */
import axios from 'axios';
import { createHash } from 'crypto';

const service = {};

service.getPosts = (page, limit) => axios.get(`/api/posts${page ? `?offset=${page}` : ''}${limit ? `&limit=${limit}` : ''}`);
service.createPost = post => axios.post('/api/posts', post);
service.deletePost = post => axios.delete(`/api/posts/${post.id}`);

service.getUsers = () => axios.get('/api/users');
service.loginUser = (email, password) => axios.post('/api/user', {
  email,
  password: createHash('md5').update(password, 'utf8').digest('hex')
}, {
  headers: {
    Authorization: `Basic ${btoa(`${email}:${password}`)}`
  }
});
service.getUser = id => axios.get(`/api/users/${id}`);
service.createUser = (user, password) => axios.post('/api/users', user, {
  headers: {
    Authorization: `Basic ${btoa(`${user.email}:${password}`)}`
  }
});
service.deleteUser = id => axios.delete(`/api/users/${id}`);

export default service;
