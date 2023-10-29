<template>
    <div class="flex shadow-lg">
        <!-- Backdrop -->
        <div
            :class="isOpen ? 'block' : 'hidden'"
            class="fixed inset-0 z-100 transition-opacity bg-black opacity-50 lg:hidden"
            @click="$emit('openSidebar', !isOpen)"
        ></div>
        <!-- End Backdrop -->
        <div
            :class="isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
            class="fixed inset-y-0 left-0 z-100 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 text-white lg:translate-x-0 lg:static lg:inset-0"
        >
            <div class="py-5">
                <router-link
                    v-slot="{ href, navigate }"
                    :to="{ path: $auth.getDashboardUrl() }"
                    custom
                >
                    <a
                        class="flex justify-center"
                        :href="href"
                        @click="navigate"
                    >
                        <img src="@/assets/logo.png" alt="" />
                    </a>
                </router-link>
                <p v-if="$auth.isAdmin()" class="text-xs mt-2">
                    {{ $t('Panel administratora') }}
                </p>
            </div>
            <navigation @click="$emit('openSidebar', !isOpen)" />
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from "@/helpers/decorators";
import Navigation from "@/views/layouts/dasbhoard/components/Menu.vue";

@Options({
    components: { Navigation }
})
export default class Sidebar extends Vue {
    @Prop({ default: false })
    public isOpen: boolean;
}
</script>
