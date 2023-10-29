import { App, Plugin } from "vue";
import { createToastInterface, PluginOptions, POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

export interface Alert {
    success: (message: string) => void;
    info: (message: string) => void;
    error: (message: string) => void;
    warning: (message: string) => void;
}

const options: PluginOptions = {
    timeout: 4000,
    position: POSITION.TOP_CENTER
};

const AlertPlugin: Plugin =
    {
        install: (app: App): void => {
            const toast = createToastInterface(options);
            app.config.globalProperties.$alert = toast;
        }
    }

export default AlertPlugin;

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $alert: Alert;
    }
}
