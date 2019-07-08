import Vue from 'vue'
import VueRouter from 'vue-router'
import {checkAccessMiddleware, setDocumentTitle} from './middlewares'
import Error404Page from '../pages/Error404.vue'
import SignInPage from '../pages/SignInPage.vue'
import HomePage from '../pages/HomePage.vue'
import RoomDescriptionPage from '../pages/RoomDescriptionPage.vue'

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: `/`,
      name: 'home',
      component: HomePage,
      meta: {
        isAuth: true,
        title: 'Главная',
      }
    },
    {
      path: '/room/:roomId',
      name: 'roomDescription',
      component: RoomDescriptionPage,
      props: true,
      meta: {
        isAuth: true,
        title: 'Описание комнаты',
      }
    },
    {
      path: `/signIn`,
      name: 'signIn',
      component: SignInPage,
      meta: {
        title: 'Вход',
      }
    },
    {
      path: '*',
      component: Error404Page,
      meta: {
        title: 'Страница не найдена'
      }
    }
  ]

})
router.beforeEach(checkAccessMiddleware)
router.beforeEach(setDocumentTitle)
