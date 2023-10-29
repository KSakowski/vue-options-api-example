import { createApp } from 'vue';
import i18n from "@/plugins/i18n";
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import axios from "@/plugins/axios";
import AuthPlugin from "@/plugins/auth";
import AlertPlugin from "@/plugins/alert";
import LoggerPlugin from "@/plugins/logger";
import Components from "@/plugins/components";
import { filters } from "@/helpers/filters";
import '@/assets/css/index.css';

export const app = createApp(App);

app.config.globalProperties.$filters = filters;

app
    .use(store)
    .use(router)
    .use(LoggerPlugin)
    .use(AuthPlugin)
    .use(AlertPlugin)
    .use(Components)
    .use(axios)
    .use(i18n);

export const Vue = app.mount('#app');
