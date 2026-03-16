import type { RouteRecordRaw } from 'vue-router'

import MainLayout from '@layouts/MainLayout.vue'
import ComponentLayout from '@layouts/ComponentLayout.vue'
import Login from '@views/LoginPage.vue'
import Home from '@views/HomePage.vue'
import Component from '@views/ComponentPage.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/',
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'home',
        component: Home,
      },
    ],
  },
  {
    path: '/:projectSlug',
    component: ComponentLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: ':componentSlug',
        name: 'component',
        component: Component,
      },
    ],
  },
]

export default routes
