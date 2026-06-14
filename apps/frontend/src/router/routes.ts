import type { RouteRecordRaw } from 'vue-router'

import MainLayout from '@layouts/MainLayout.vue'
import SidebarLayout from '@layouts/SidebarLayout.vue'
import Login from '@pages/LoginPage.vue'
import Home from '@pages/MainPage.vue'
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
    component: SidebarLayout,
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
