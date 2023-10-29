import { RouteComponent } from "vue-router";

export default [
    {
        path: 'users',
        name: 'admin-users',
        component: (): Promise<RouteComponent> => import(/* webpackChunkName: "admin" */ '@/views/modules/admin/users/List.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: 'user/details/:id',
        name: 'admin-user-details',
        component: (): Promise<RouteComponent> => import(/* webpackChunkName: "admin" */ '@/views/modules/admin/users/Form.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: 'auctions',
        name: 'admin-auctions',
        component: (): Promise<RouteComponent> => import(/* webpackChunkName: "admin" */ '@/views/modules/admin/auctions/List.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: 'auction/add/:clientId',
        name: 'admin-auction-form-add',
        component: (): Promise<RouteComponent> => import(/* webpackChunkName: "admin" */ '@/views/modules/admin/auctions/Form.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: 'auction/edit/:auctionId',
        name: 'admin-auction-form-edit',
        component: (): Promise<RouteComponent> => import(/* webpackChunkName: "admin" */ '@/views/modules/admin/auctions/Form.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: 'auction/invoice/:auctionId',
        name: 'admin-auction-invoice-generator',
        component: (): Promise<RouteComponent> => import(/* webpackChunkName: "admin" */ '@/views/modules/admin/auctions/InvoiceGenerator.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: 'permissions',
        name: 'admin-permissions',
        component: (): Promise<RouteComponent> => import(/* webpackChunkName: "admin" */ '@/views/modules/admin/Permissions.vue'),
        meta: { requiresAuth: true }
    },
]
