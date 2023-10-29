import {createStore, Store} from 'vuex';
import { AuthModule } from './modules/auth';
import createPersistedState from 'vuex-persistedstate';
import { UserModel} from "@/interfaces";

export default createStore({
    modules: {
        'auth': AuthModule
    },
    plugins: [
        createPersistedState({
            reducer: (persistedState: any) =>
            {
                const stateFilter = { ...persistedState };
                const states = ['auth']; // states which we want to persist.

                Object.keys(stateFilter).forEach(key =>
                {
                    if (!states.includes(key))
                    {
                        delete stateFilter[key];
                    }
                });

                return stateFilter;
            }
        })
    ]

});

declare module "@vue/runtime-core"
{
    interface ComponentCustomProperties
    {
        $store: Store<{auth: { profile: UserModel }}>;
    }
}
