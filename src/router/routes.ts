import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('src/pages/Home.vue')
      },
      {
        path: '/Settings',
        name: 'Settings',
        component: () => import('src/pages/Settings.vue')
      },
      {
        path: '/MyAccount',
        name: 'MyAccount',
        component: () => import('src/pages/MyAccount.vue')
      }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
