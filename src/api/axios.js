import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8888', // Thay đổi URL này thành URL của backend Node.js
});

export default api


