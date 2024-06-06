import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://backend1.tiktoc.pro',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
