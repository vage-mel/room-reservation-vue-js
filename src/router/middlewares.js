import {store} from '../store'

export function checkAccessMiddleware(to, from, next){
  let toIsAuth = to.matched.some(record => record.meta.isAuth);

  if(toIsAuth){
    if(store.getters['auth/isAuth']){
      if(store.getters['auth/isUserExist']){
        next()
      }else{
        store.dispatch('auth/getUser')
          .then( () => {
            next()
          })
          .catch( () => {
            store.commit('auth/removeToken')
            next({name: 'signIn'})
          })
      }
    }
    else{
      next({name: 'signIn'})
    }
  }else{
    if(store.getters['auth/isAuth'] && to.name == 'signIn'){
        next({name:'home'})
    }else{
      next()
    }
  }
}

export function setDocumentTitle(to, from, next){
    if(to.meta){
      document.title = to.meta.title || '';
    }
    next();
}
