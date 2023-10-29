import {
    createRouter,
    createWebHistory,
    NavigationGuardNext,
    RouteComponent,
    RouteLocationNormalized,
    RouteRecordRaw
} from 'vue-router';
import DefaultLayout from "@/views/layouts/Default.vue";
import AuthLayout from "@/views/layouts/Auth.vue";
import DashboardLayout from "@/views/layouts/dasbhoard/Dashboard.vue";
import Public from "@/router/routes/public";
import User from "@/router/routes/user";
import Auth from "@/router/routes/auth";
import Admin from "@/router/routes/admin";
import { appSettings } from "@/settings/config";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        redirect: 'homePage',
        component: DefaultLayout,
        children: [
            ...Public,
        ],
    },
    {
        path: '/auth',
        name: 'auth',
        component: AuthLayout,
        children: [
            ...Auth,
        ],
    },
    {
        path: '/admin',
        component: DashboardLayout,
        children: [
            ...Admin,
        ]
    },
    ...User,
    {
        path: '/',
        name: 'verify',
        redirect: 'verifyEmail',
        component: AuthLayout,
        children: [
            {
                path: '/verify-email/:token',
                name: 'verifyEmail',
                component: (): Promise<RouteComponent> => import(/* webpackChunkName: "auth" */ '@/views/modules/auth/VerifyEmail.vue'),
            }
        ],
    },
    {
        path: '/',
        name: 'reset',
        redirect: 'resetPassword',
        component: AuthLayout,
        children: [
            {
                path: '/reset-password/:token',
                name: 'resetPassword',
                component: (): Promise<RouteComponent> => import(/* webpackChunkName: "auth" */ '@/views/modules/auth/ResetPassword.vue'),
            },
        ],
    },
    {
        // Error pages
        path: '/error',
        redirect: '/error/404',
        component: AuthLayout,
        children: [
            {
                path: '403',
                name: 'error-403',
                component: () => import(/* webpackChunkName: "errors" */ '@/views/errors/403.vue'),
            },
            {
                path: '404',
                name: 'error-404',
                component: () => import(/* webpackChunkName: "errors" */ '@/views/errors/404.vue'),
            },
        ]
    },
    {
        // 404 Not found handler
        path: '/:pathMatch(.*)*',
        redirect: '/error/404'
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach( (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    document.title = `${appSettings.title}`;
    next();
});

export default router;
