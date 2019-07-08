import { store } from '../store'
import axios from 'axios'

import WordCase from '../utils/word-case.js'

axios.interceptors.request.use(function (request) {

  if (request.data){
    request.data = WordCase.objCamelKeysToSnakeCase(request.data)
  }

  if(store.getters['auth/isAuth']){
    request.headers = {
      'Authorization': 'token ' + store.getters['auth/token']
    }
  }

  return request

}, function (error) {
  error.response && WordCase.objSnakeKeysToCamelCase(error.response.data)

  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  response.data && WordCase.objSnakeKeysToCamelCase(response.data);

  return response;
}, function (error) {
    error.response && WordCase.objSnakeKeysToCamelCase(error.response.data);

  return Promise.reject(error);
});
