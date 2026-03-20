import type { RouteRecordRaw } from 'vue-router'

import MainLayout from '@layouts/MainLayout.vue'
import ComponentLayout from '@layouts/ComponentLayout.vue'
import Login from '@views/LoginPage.vue'
import Home from '@views/HomePage.vue'
import Component from '@views/ComponentPage.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '/login',
        name: 'login',
        component: Login,
      },
      {
        path: '',
        name: 'home',
        meta: { requiresAuth: true },
        component: Home,
      },
    ],
  },
  {
    path: '/:projectId',
    component: ComponentLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: ':componentId',
        name: 'component',
        component: Component,
      },
    ],
  },
]

export default routes
