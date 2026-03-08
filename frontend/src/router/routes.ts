import type { RouteRecordRaw } from 'vue-router'

import MainLayout from '@layouts/MainLayout.vue'
import Board from '@views/BoardPage.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/board/97649491',
    component: MainLayout,

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
