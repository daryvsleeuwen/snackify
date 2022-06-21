import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8040/api/',
  timeout: 10000,
  params: {},
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default instance;
