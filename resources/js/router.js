import Vue from 'vue'
import VueRouter from 'vue-router'

// ページコンポーネントをインポート
import PhotoList from './pages/PhotoList.vue'
import Login from './pages/Login.vue'
import PhotoDetail from './pages/PhotoDetail.vue'

import SystemError from './pages/errors/System.vue'
import NotFound from './pages/errors/NotFound.vue'

import store from './store'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: PhotoList,
        props: route => {
            const page = route.query.page
            
            //console.log(/^[1-9][0-9]*$/.test(page))
            //console.log(page)
            return { page: /^[1-9][0-9]*$/.test(page) ? page * 1 : 1 }
        }
    },
    {
        path: '/photos/:id',
        component: PhotoDetail,
        props: true  //変数部分:id(写真IDの値)をpropsとして受け取る
    },
    {
        path: '/login',
        component: Login,
        beforeEnter (to, from, next) {
            if (store.getters['auth/check']) {
                next('/')
            } else {
                //そのままページコンポーネントが切り替わる
                next()
            }
        }
    },
    {
        path: '/500',
        component: SystemError
    },
    {
        path: '*',
        component: NotFound
    }
]

const router = new VueRouter({
    mode: 'history',
    scrollBehavior () {
        return { x: 0, y: 0 }
    },
    routes
})

export default router