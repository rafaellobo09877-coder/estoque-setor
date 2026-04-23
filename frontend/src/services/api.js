import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://estoque-backend-lc2x.onrender.com',
});