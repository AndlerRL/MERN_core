/* eslint-disable newline-per-chained-call */
import axios from 'axios';
import { createHash } from 'crypto';

const token = localStorage.getItem('token');

const service = {};

service.getPosts = (offset, limit) => axios.get(`/api/posts${offset ? `?offset=${offset}` : ''}${limit ? `&limit=${limit}` : ''}`);
service.getPost = id => axios.get(`/api/posts/${id}`);
service.createPost = post => axios.post('/api/posts', post, {
  headers: {
    Authorization: token
  }
});
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
