import { RouteComponent } from "vue-router";

export default [
    {
        path: 'login',
        name: 'login',
        component: (): Promise<RouteComponent> => import(/* webpackChunkName: "auth" */ '@/views/modules/auth/Login.vue'),
    },
    {
        path: 'register',
        name: 'register',
        component: (): Promise<RouteComponent> => import(/* webpackChunkName: "auth" */ '@/views/modules/auth/Register.vue'),
    },
    {
        path: 'thank-you',
        name: 'thankYou',
        component: (): Promise<RouteComponent> => import(/* webpackChunkName: "auth" */ '@/views/modules/auth/ThankYouPage.vue'),
    },
    {
        path: 'forgot-password',
        name: 'forgotPassword',
        component: (): Promise<RouteComponent> => import(/* webpackChunkName: "auth" */ '@/views/modules/auth/ForgotPassword.vue'),
    },
]
