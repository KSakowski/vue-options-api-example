<template>
    <div class="flex bg-gray-100">
        <sidebar v-if="sidebar" :is-open="isOpen" @open-sidebar="(value) => isOpen = value" />
        <div class="flex-1 flex flex-col overflow-hidden">
            <dashboard-header :is-open="isOpen" @open-sidebar="(value) => isOpen = value" />
            <main class="w-full h-full px-2 md:px-6 py-6 flex-1 overflow-auto custom-scroll">
                <div class="container mx-auto">
                    <slot />
                </div>
            </main>
            <dashboard-footer />
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Sidebar from "@/views/layouts/dasbhoard/components/Sidebar.vue";
import DashboardHeader from "@/views/layouts/dasbhoard/components/Header.vue";
import DashboardFooter from "@/views/layouts/dasbhoard/components/Footer.vue";
import { Prop } from "@/helpers/decorators";

@Options({
    components: { Sidebar, DashboardHeader, DashboardFooter }
})
export default class DashboardComponent extends Vue {
    @Prop({default: true}) sidebar: boolean;
    private isOpen = false;
}
</script>
