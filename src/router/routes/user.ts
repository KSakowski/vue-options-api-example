import { RouteComponent } from "vue-router";
import DashboardLayout from "@/views/layouts/dasbhoard/Dashboard.vue";
import AuctionDashboard from "@/views/modules/user/Auction.vue";

export default [
    {
        path: '/user',
        component: DashboardLayout,
        children: [
            {
                path: 'auctions',
                name: 'user-auctions',
                component: (): Promise<RouteComponent> => import(/* webpackChunkName: "user" */ '@/views/modules/user/auctions/Auctions.vue'),
                meta: { requiresAuth: true, defaultSitemap: true },
            },
            {
                path: 'profile',
                name: 'user-profile',
                component: (): Promise<RouteComponent> => import(/* webpackChunkName: "user" */ '@/views/modules/user/profile/Profile.vue'),
                meta: { requiresAuth: true, defaultSitemap: true  },
            },
            {
                path: '/auction',
                component: AuctionDashboard,
                children: [
                    {
                        path: ':auctionId/status',
                        name: 'user-auction-status',
                        component: (): Promise<RouteComponent> => import(/* webpackChunkName: "user" */ '@/views/modules/user/status/Status.vue'),
                        meta: { requiresAuth: true },
                    },
                    {
                        path: ':auctionId/payment',
                        name: 'user-auction-payment',
                        component: (): Promise<RouteComponent> => import(/* webpackChunkName: "user" */ '@/views/modules/user/payment/Payment.vue'),
                        meta: { requiresAuth: true },
                    },
                    {
                        path: ':auctionId/gallery',
                        name: 'user-auction-gallery',
                        component: (): Promise<RouteComponent> => import(/* webpackChunkName: "user" */ '@/views/modules/user/gallery/AuctionGallery.vue'),
                        meta: { requiresAuth: true },
                    },
                    {
                        path: ':auctionId/deliveryGallery',
                        name: 'user-auction-delivery-gallery',
                        component: (): Promise<RouteComponent> => import(/* webpackChunkName: "user" */ '@/views/modules/user/gallery/DeliveryGallery.vue'),
                        meta: { requiresAuth: true },
                    },
                    {
                        path: ':auctionId/tracking',
                        name: 'user-auction-tracking',
                        component: (): Promise<RouteComponent> => import(/* webpackChunkName: "user" */ '@/views/modules/user/tracking/Tracking.vue'),
                        meta: { requiresAuth: true },
                    },
                    {
                        path: ':auctionId/customs',
                        name: 'user-auction-customs',
                        component: (): Promise<RouteComponent> => import(/* webpackChunkName: "user" */ '@/views/modules/user/customs/Customs.vue'),
                        meta: { requiresAuth: true },
                    },
                    {
                        path: ':auctionId/carFax',
                        name: 'user-auction-car-fax',
                        component: (): Promise<RouteComponent> => import(/* webpackChunkName: "user" */ '@/views/modules/user/tax/CarFax.vue'),
                        meta: { requiresAuth: true },
                    },
                    {
                        path: ':auctionId/excise',
                        name: 'user-auction-excise',
                        component: (): Promise<RouteComponent> => import(/* webpackChunkName: "user" */ '@/views/modules/user/excise/Excise.vue'),
                        meta: { requiresAuth: true },
                    },
                    {
                        path: ':auctionId/contacts',
                        name: 'user-auction-contacts',
                        component: (): Promise<RouteComponent> => import(/* webpackChunkName: "user" */ '@/views/modules/user/contacts/Contacts.vue'),
                        meta: { requiresAuth: true },
                    },
                ],
            },
        ],
    },
]
