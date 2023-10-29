import { RouteComponent } from "vue-router";

export default [
    {
        path: '',
        name: 'homePage',
        component: (): Promise<RouteComponent> => import(/* webpackChunkName: "public" */ '@/views/modules/public/HomePage.vue'),
    },
    {
        path: 'contact',
        name: 'contact',
        component: (): Promise<RouteComponent> => import(/* webpackChunkName: "public" */ '@/views/modules/public/Contact.vue'),
    },
]
