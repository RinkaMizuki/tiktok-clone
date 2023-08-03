import axios from 'axios';
const rawToken = document.cookie.split('=')[1];
const TOKEN = `Bearer ${rawToken || process.env.FAKE_TOKEN_AUTH}`;
axios.defaults.headers.common['Authorization'] = TOKEN;

const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (path, options = {}) => {
  const res = await httpRequest.get(path, options);
  return res.data;
};

export const post = async (path, options = {}, params = {}) => {
  const res = await httpRequest.post(path, options, params);
  return res;
};

export default httpRequest;
