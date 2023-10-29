<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <card class="max-w-md w-full">
            <router-view v-slot="{ Component }">
                <component
                    :is="Component"
                    :key="$route.path"
                />
            </router-view>
        </card>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
})
export default class AuthLayout extends Vue {
}
</script>
