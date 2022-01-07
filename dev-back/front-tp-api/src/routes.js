import { createRouter, createWebHistory } from 'vue-router';
import Auth from './pages/Auth.vue';
import Home from './pages/Home.vue';
import { loggedIn } from './store/auth';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('./pages/admin/Index.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/new-quiz',
    name: 'NewQuiz',
    component: () => import('./pages/admin/NewQuiz.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/edit-quiz/:quizId',
    name: 'EditQuiz',
    component: () => import('./pages/admin/EditQuiz.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/take-quiz/:quizId',
    name: 'TakeQuiz',
    component: () => import('./pages/TakeQuiz.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/scores',
    name: 'Scores',
    component: () => import('./pages/Scores.vue'),
  },
  // ! Should be last
  {
    path: '/:catchAll(.*)',
    redirect: '/',
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth && !loggedIn.value) {
    next({
      path: '/auth',
    });
  } else {
    next();
  }
});

export default router;
