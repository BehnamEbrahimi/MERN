import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER
});

instance.interceptors.request.use(
  config => {
    const authToken = localStorage.authToken || '';
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

export default instance;
