import * as authService from '../../services/auth.service.js'

export default {
  namespaced: true,
  state: {
      token: localStorage.getItem('token') || '',
      user: {}
  },
  getters: {
    token (state) {
      return state.token;
    },
    isAuth (state) {
      return !!state.token;
    },
    isUserExist (state) {
      return !!state.user.username
    },
    user (state) {
      return state.user;
    },
    isUserStaff (state, getters) {
      return getters.isUserExist && state.user.isStaff
    }
  },
  mutations: {
    setToken (state, response) {
      localStorage.setItem('token', response.data.token)
      state.token = response.data.token
    },
    removeToken (state) {
      localStorage.setItem('token', '')
      state.token = ''
    },
    setUser (state, user) {
      state.user = user
    },
    removeUser (state, user) {
      state.user = {}
    }
  },
  actions: {
    signIn ({commit, dispatch}, {username, password}) {
      return new Promise((resolve, reject) => {
        authService.getTokens({username, password})
          .then(response => {
            commit('setToken', response)
          })
          .then(() => {
            return dispatch('getUser', {})
          })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            commit('removeToken', error)
            reject(error)
          });
      });
    },
    signOut ({commit}) {
      return new Promise((resolve, reject) => {
        commit('removeToken')
        resolve()
      });
    },
    getUser ({commit}) {
      return new Promise((resolve, reject) => {
        authService.getUser()
          .then(response => {
            commit('setUser', response.data)
            resolve(response)
          })
          .catch(error => {
            commit('removeUser', error.data)
            reject(error)
          })
      })
    }
  }
}
