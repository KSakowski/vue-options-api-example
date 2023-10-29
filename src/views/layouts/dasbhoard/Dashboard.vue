<template>
    <dashboard-component :sidebar="sidebar">
        <router-view v-slot="{ Component }">
            <transition
                name="fade"
                mode="out-in"
            >
                <component :is="Component" />
            </transition>
        </router-view>
    </dashboard-component>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import DashboardComponent from "@/views/layouts/dasbhoard/components/Layout.vue";
import { Prop } from "@/helpers/decorators";

@Options({
    components: { DashboardComponent }
})
export default class DashboardLayout extends Vue {
    @Prop({default: true}) sidebar: boolean;
}
</script>
