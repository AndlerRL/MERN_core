import axios from 'axios';

const service = {};

service.getPosts = (page, limit) => axios.get(`/api/posts${page ? `?offset=${page}` : ''}${limit ? `&limit=${limit}` : ''}`);

service.createPost = post => axios.post('/api/posts', post);

service.deletePost = post => axios.delete(`/api/posts/${post.id}`);

export default service;
