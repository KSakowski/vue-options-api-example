import { App, Plugin } from "vue";

export type Logger = (message: string, level?: 'info' | 'warn' | 'error') => void;

export function log(message: string, level?: 'info' | 'warn' | 'error'): void {
    if (process.env.NODE_ENV !== 'production') {
        switch (level) {
            case 'error':
                console.error(message);
                break;
            case 'warn':
                console.warn(message);
                break;
            default:
                console.log(message);
        }
    }
}

const LoggerPlugin: Plugin =
    {
        install: (app: App): void => {
            app.config.globalProperties.$log = log;
        }
    }

export default LoggerPlugin;

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $log: Logger;
    }
}
