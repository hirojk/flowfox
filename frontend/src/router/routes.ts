import type { RouteRecordRaw } from 'vue-router'

import MainLayout from '@layouts/MainLayout.vue'
import ComponentLayout from '@layouts/ComponentLayout.vue'
import Login from '@pages/LoginPage.vue'
import Home from '@pages/HomePage.vue'
import Project from '@pages/ProjectPage.vue'
import Component from '@pages/ComponentPage.vue'

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
        path: '',
        name: 'project',
        component: Project,
      },
      {
        path: ':componentId',
        name: 'component',
        component: Component,
      },
    ],
  },
]

export default routes
