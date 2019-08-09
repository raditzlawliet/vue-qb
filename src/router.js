import ExPage from '@/pages/ExPage'
import Ex from '@/pages/Ex'
import ExBs3 from '@/pages/ExBs3'
import ExBs4 from '@/pages/ExBs4'

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: '/example', component: ExPage, alias: '/',
            children: [
                {
                    path: '/',
                    component: Ex,
                },
                {
                    path: 'bs3',
                    component: ExBs3
                },
                {
                    path: 'bs4',
                    component: ExBs4
                }
            ]
        },
    ]
})

export default router;