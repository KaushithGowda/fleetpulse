import axios from 'axios';
import { env } from '@/src/constants/env';

// Public axios instance (no auth headers)
export const axiosPublic = axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Private axios instance (with auth headers)
export const axiosPrivate = axios.create({
  baseURL: env.apiBaseUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosPublic.interceptors.request.use(request => {
  console.log('Request:', request);
  return request;
});

axiosPublic.interceptors.response.use(response => {
  console.log('Response:', response);
  return response;
}, error => {
  console.error('Axios Error:', error);
  return Promise.reject(error);
});
