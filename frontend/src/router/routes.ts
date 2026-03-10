import type { RouteRecordRaw } from 'vue-router'

import MainLayout from '@layouts/MainLayout.vue'
import Board from '@views/BoardPage.vue'
import Login from '@views/LoginPage.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/',
    redirect: '/board/97649491',
    component: MainLayout,
    meta: { requiresAuth: true },

    children: [
      {
        path: 'board/:projectId',
        name: 'board',
        component: Board,
      },
    ],
  },
]

export default routes
