import { AuthRedirects } from "@/interfaces";
import { Navigation } from "@/interfaces/sitemap";

export const Sitemap: Navigation = {
    user: [
        {
            path: '/auction/{id}/status',
            displayName: 'Status',
            icon: 'information-circle',
            params: { key: "auctionId"},
        },
        {
            path: '/auction/{id}/payment',
            displayName: 'Płatność',
            icon: 'credit-card',
            params: { key: "auctionId"},
        },
        {
            path: '/auction/{id}/gallery',
            displayName: 'Zdjęcia z aukcji',
            icon: 'folder-open',
            params: { key: "auctionId"},
        },
        {
            path: '/auction/{id}/deliveryGallery',
            displayName: 'Zdjęcia z portu',
            icon: 'clipboard-check',
            params: { key: "auctionId"},
        },
        {
            path: '/auction/{id}/tracking',
            displayName: 'Śledzenie i dostawa',
            icon: 'truck',
            params: { key: "auctionId"},
        },
        {
            path: '/auction/{id}/customs',
            displayName: 'Odprawa celna',
            icon: 'document-report',
            params: { key: "auctionId"},
        },
        {
            path: '/auction/{id}/carFax',
            displayName: 'CARFAX',
            icon: 'ticket',
            params: { key: "auctionId"},
        },
        {
            path: '/auction/{id}/excise',
            displayName: 'Akcyza i tłumaczenia',
            icon: 'refresh',
            params: { key: "auctionId"},
        },
        {
            path: '/auction/{id}/contacts',
            displayName: 'Kontakty',
            icon: 'user-group',
            params: { key: "auctionId"},
        },
        {
            path: '/user/auctions',
            displayName: 'Powrót do listy aukcji',
            icon: 'arrow-circle-left',
            params: {},
        },
    ],
    admin: [
        {
            path: '/user/profile',
            displayName: 'Profil',
            icon: 'user-group',
        },
        {
            path: '/admin/auctions',
            displayName: 'Lista aukcji',
            icon: 'shopping-cart',
        },
        {
            path: '/admin/users',
            displayName: 'Lista klientów',
            icon: 'user-group',
        },
        // {
        //     path: '/admin/permissions',
        //     displayName: 'Uprawnienia',
        //     icon: 'cogs',
        // },
    ],
    default: [
        {
            path: '/user/profile',
            displayName: 'Profil',
            icon: 'user-group',
        },
        {
            path: '/user/auctions',
            displayName: 'Lista aukcji',
            icon: 'shopping-cart',
        },
    ],
};

export const AppPages: AuthRedirects = {
    home: { path: '/' },
    login: { path: '/auth/login' },
    user: { path: '/user/auctions' },
    admin: { path: '/admin/users' },
    forbidden: { path: '/error/403' },
    notFound: { path: '/error/404' },
};
