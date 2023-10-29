<template>
    <div class="tabs sm:flex sm:items-center mb-4 flex-wrap overflow-auto">
        <a
            v-for="tab in tabs"
            :key="tab.key"
            class="underline-none"
            :href="`#${tab.key}`"
            @click="activeTab.key = tab.key"
        >
            <div
                v-if="tab && tab.title"
                class="py-2 px-4 xl:px-8 2xl:px-10 text-gray-500 border-b-8 cursor-pointer min-w-max flex items-center"
                :class="{'text-green-500 border-green-500': tab.key === activeTab.key}"
            >
                {{ tab.title }}
                <span v-if="errors.includes(tab.key)" class="ml-2 text-red-500">
                    <hero-icon :icon="'exclamation-circle'" :size="4" />
                </span>
            </div>
        </a>
    </div>
    <div class="tab-content">
        <slot />
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { provide } from "vue";
import { VNode } from "@vue/runtime-core";
import { Prop } from "@/helpers/decorators";
import HeroIcon from "@/components/common/icon/HeroIcon.vue";

@Options({
    components: {HeroIcon}
})
export default class Tabs extends Vue {
    @Prop({ default: [] })
    private errors: string[];

    private activeTab: {key: string, title: string} = { key: '', title: '' };

    private get tabs(): {key: string, title: string}[] {
        try {
            const slots = (this.$slots as any).default() || [];
            return slots.map(({props}: VNode) =>
                props ?
                    { key: props.tab, title: props.title } :
                    this.activeTab
            );
        }
        catch {
            return [this.activeTab];
        }
    }

    public created(): void {
        const hash = window.location.hash?.substring(1) || "";
        provide("activeTab", this.activeTab);
        this.activeTab.key = hash ? hash : this.tabs[0]?.key;
    }

}
</script>
