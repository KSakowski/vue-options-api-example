<template>
    <div :class="{'hidden': activeTab.key !== tab}">
        <slot />
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from "@/helpers/decorators";

@Options({
    inject: ['activeTab'],
})
export default class Tab extends Vue {
    @Prop({ default: '' }) private title: string;
    @Prop({ default: '' }) private tab: string;
}
</script>
