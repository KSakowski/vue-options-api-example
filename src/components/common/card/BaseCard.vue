<template>
    <div class="flex flex-col relative px-4 md:px-8 py-8 bg-white rounded-xl shadow text-sm prose max-w-none text-left" :class="{'min-h-full': fullHeight}">
        <div class="content flex-grow">
            <slot />
        </div>
        <div class="mt-auto" :class="{'pt-10': hasFooterSLot}">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from "@/helpers/decorators";

@Options({
    components: {},
})
export default class BaseCard extends Vue {
    @Prop({ default: false })
    public fullHeight: boolean;

    private get hasFooterSLot(): boolean {
        return !!this.$slots['footer'];
    }

}
</script>
