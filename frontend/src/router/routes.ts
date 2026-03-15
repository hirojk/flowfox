import type { RouteRecordRaw } from 'vue-router'

import MainLayout from '@layouts/MainLayout.vue'
import ComponentLayout from '@layouts/ComponentLayout.vue'
import Login from '@views/LoginPage.vue'
import Project from '@views/HomePage.vue'
import Board from '@views/BoardPage.vue'

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
        name: 'projects',
        component: Project,
      },
    ],
  },
  {
    path: '/project/:projectId',
    component: ComponentLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'board/:boardId',
        name: 'board',
        component: Board,
      },
    ],
  },
]

export default routes
