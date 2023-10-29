<template>
    <div :style="`min-height: ${minHeight}px`">
        <slot />
        <div v-show="loading" class="absolute top-0 left-0 w-full h-full bg-white opacity-50 z-20"></div>
        <div v-show="loading" class="absolute top-0 left-0 w-full h-full z-30">
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <spinner />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from '@/helpers/decorators';

@Options({})
export default class Loading extends Vue
{
    @Prop({ default: false })
    public loading: boolean;

    @Prop({ default: 250 })
    public minHeight: number;
}
</script>
