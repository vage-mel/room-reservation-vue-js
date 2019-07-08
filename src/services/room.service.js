import axios from 'axios'
import {API_URL} from '../env.js'

export function getRooms () {
  return new Promise((resolve, reject) => {
    axios.get(`${API_URL}/rooms`)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  });
}

export function getRoomById (id) {
  return new Promise((resolve, reject) => {
    axios.get(`${API_URL}/rooms/${id}`)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  });
}

export function updateRoom (room) {
  return new Promise((resolve, reject) => {
    axios.put(`${API_URL}/rooms/${room.id}/`, room)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  });
}

export function getRequestsByRoom (roomId, status) {
  return new Promise((resolve, reject) => {
    axios.get(`${API_URL}/rooms/${roomId}/requests?status=${status}`)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  });
}

export function makeReservation (roomId, startDateTime, endDateTime) {
  return new Promise((resolve, reject) => {
    axios.post(`${API_URL}/rooms/${roomId}/requests/`, { startDateTime, endDateTime })
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  });
}

export function getRoomsRequests (status) {
  return new Promise((resolve, reject) => {
    axios.get(`${API_URL}/requests/?status=${status}`)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  });
}

export function acceptRoomRequest (roomRequestId) {
  return new Promise((resolve, reject) => {
    axios.put(`${API_URL}/requests/${roomRequestId}/`, { status: { id: 2, name: 'Подтвержден' } })
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  });
}

export function rejectRoomRequest (roomRequestId) {
  return new Promise((resolve, reject) => {
    axios.put(`${API_URL}/requests/${roomRequestId}/`, { status: { id: 3, name: 'Отклонен' } })
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  });
}
