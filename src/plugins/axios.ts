import { Plugin } from 'vue';
import axios from 'axios';
import qs from 'qs';
import { Exception } from "@/interfaces";

const AxiosPlugin: Plugin =
    {
        install(app)
        {
            const vue = app.config.globalProperties;

            axios.defaults.baseURL = process.env.VUE_APP_API_URL;
            axios.interceptors.request.use(config =>
            {
                config.headers.common['Accept-Language'] = 'pl-PL';
                config.headers.common['Authorization'] = `Bearer ${vue.$auth.getToken()}` || '';

                config.paramsSerializer = p => {
                    return qs.stringify(p, {arrayFormat: 'brackets'})
                };

                return config;
            });
            axios.interceptors.response.use(
                response => {
                    return response;
                },
                error => {
                    const ex: Exception = {
                        code: 500,
                        message: 'Unexpected exception occurred.',
                        errors: null,
                    };

                    if (error.response)
                    {
                        ex.code = error.response.status;
                        ex.message = error.response.data.message;
                        ex.errors = error.response.data.errors;
                    }

                    // if (ex.code === 401) {
                    //     vue.$auth.logout();
                    // }

                    if (ex.code === 403)
                    {
                        vue.$router.push({ name: 'error-403' });
                    }

                    if (ex.code === 404)
                    {
                        vue.$alert.error('404');
                    }

                    if (ex.code === 500)
                    {
                        vue.$alert.error('500');
                    }

                    return Promise.reject(ex);
                }
            );

            vue.axios = axios;
        }
    };

export default AxiosPlugin;
