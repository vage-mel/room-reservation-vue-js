import axios from 'axios'
import {API_URL} from '../env.js'

export function getTokens ({username, password}) {
  return new Promise((resolve, reject) => {
    axios.post(`${API_URL}/token/`, {username, password})
      .then(response => {
        return resolve(response)
      })
      .catch(error => {
        return reject(error);
      })
  });
}

export function getUsers () {
  return new Promise((resolve, reject) => {
    axios.get(`${API_URL}/users/`)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  });
}

export function getUser () {
  return new Promise((resolve, reject) => {
    axios.get(`${API_URL}/users/me`)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  });
}

export function updateUser (user) {
  return new Promise((resolve, reject) => {
    axios.put(`${API_URL}/users/${user.id}/`, { ...user })
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  });
}
