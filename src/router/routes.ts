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
  {
    path: '/Advanced',
    component: () => import('layouts/AdvancedLayout.vue'),
    redirect: '/Advanced/Match',
    children: [
      {
        path: '/Advanced/Match',
        name: 'Match',
        component: () => import('src/pages/Advanced/Match.vue')
      },
      {
        path: '/Advanced/TeamA',
        name: 'TeamA',
        component: () => import('src/pages/Advanced/TeamA.vue')
      },
      {
        path: '/Advanced/TeamB',
        name: 'TeamB',
        component: () => import('src/pages/Advanced/TeamB.vue')
      },
      {
        path: '/Advanced/Statistics',
        name: 'Statistics',
        component: () => import('src/pages/Advanced/Statistics.vue')
      },
      {
        path: '/Advanced/Scores',
        name: 'Scores',
        component: () => import('src/pages/Advanced/Scores.vue')
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
