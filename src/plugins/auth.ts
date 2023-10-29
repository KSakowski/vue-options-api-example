import { App } from "vue";
import { Store } from "vuex";
import {Auth, UserModelWithToken, UserModel} from "@/interfaces";
import { Roles } from "@/settings/enums";
import  { NavigationGuardNext, RouteLocationNormalized, Router, RouteRecordNormalized } from "vue-router";
import { AppPages } from "@/settings/sitemap";
import Cookies from 'js-cookie';
import AuthService from "@/services/auth";
import { Logger } from "@/plugins/logger";

export class AuthHelper implements Auth
{
    private store: Store<{auth: { profile: UserModel }}>;
    private router: Router;
    public $log: Logger;

    public constructor(app: App)
    {
        const { config: { globalProperties: { $store, $router } } } = app;
        this.store = $store;
        this.router = $router;

        this.initSession();
    }

    private initSession(): void
    {
        this.router.beforeEach( async(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
            const requiresAuth = to.matched.some((record: RouteRecordNormalized) => record.meta.requiresAuth);

            await this.refreshToken();

            if (requiresAuth && !this.getToken()) {
                next(AppPages.login.path)
            }
            if (to.path === AppPages.login.path && this.getToken()) {
                next(this.getDashboardUrl())
            }

            next()
        });
    }

    public getToken(): string
    {
        return Cookies.get('auth-token') || '';
    }

    public setToken(token: string, expires: number): void
    {
        const expireInDays = (expires / 60) / 1440; // 1440 minutes in a day

        Cookies.set('auth-token', token, { expires: expireInDays })
        Cookies.set('token-expires', (Date.now() / 1000 + expires).toString(), { expires: expireInDays })
    }

    private clearToken(): void
    {
        Cookies.remove('auth-token');
        Cookies.remove('token-expires');
    }

    private async refreshToken(): Promise<void>
    {
        if (!this.getToken())
            return;

        const nowInSecs = Date.now() / 1000;
        const tokenExpiresInSecs = Number(Cookies.get('token-expires'));
        const isExpiring = (tokenExpiresInSecs - nowInSecs) < 60 * 60;

        if (!isExpiring) return;

        try {
            const { data: { access_token, expires_in } } = await AuthService.refreshToken();
            this.setToken(access_token, expires_in);
        }
        catch (ex) {
            this.$log(ex);
        }
    }

    public login({ access_token, user, expires_in }: UserModelWithToken): void
    {
        this.setToken(access_token, expires_in);
        this.store.commit('auth/updateProfile', user);

        this.router.push(this.getDashboardUrl());
    }

    public isLoggedIn(): boolean
    {
        return !!this.getToken();
    }

    public isAdmin(): boolean
    {
        const profile = this.store.getters['auth/getProfile'];
        const isAdmin = profile.roles.includes(Roles.admin);
        return isAdmin;
    }

    public getDashboardUrl(): string
    {
        const route = this.isAdmin() ? AppPages.admin : AppPages.user;
        return route.path;
    }

    public logout(): void
    {
        this.clearToken();
        this.store.commit('auth/resetProfile');
        this.router.push(AppPages.home);
    }
}


export default {
    install: (app: App): void => {
        app.config.globalProperties.$auth = new AuthHelper(app);
    }
}

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $auth: Auth;
    }
}
