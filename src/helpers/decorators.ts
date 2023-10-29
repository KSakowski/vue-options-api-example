import { createDecorator, PropOptions, VueDecorator } from 'vue-class-component';
import { WatchOptions } from "vue";

export function Prop(options: PropOptions = {}): VueDecorator
{
    return createDecorator((componentOptions, propName) =>
    {
        componentOptions.props = componentOptions.props || {};
        componentOptions.props[propName] = options;
    });
}

export function Watch(path: string, watchOptions: WatchOptions = {}): VueDecorator
{
    return createDecorator((componentOptions, handler) =>
    {
        if (typeof componentOptions.watch !== 'object')
        {
            componentOptions.watch = Object.create(null);
        }

        const watch: any = componentOptions.watch;

        if (typeof watch[path] === 'object' && !Array.isArray(watch[path]))
        {
            watch[path] = [watch[path]];
        }
        else if (typeof watch[path] === 'undefined')
        {
            watch[path] = [];
        }

        watch[path].push({ handler, ...watchOptions });
    });
}
