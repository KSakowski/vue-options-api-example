<template>
    <div
        style="border-top-color:transparent"
        :class="`w-${size} h-${size} border-4 border-${variant} border-solid rounded-full animate-spin`"
    ></div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from '@/helpers/decorators';

@Options({
    components: {}
})
export default class Spinner extends Vue
{
    @Prop({ default: '8' })
    public size: boolean;

    @Prop({ default: 'green-400' })
    public variant: boolean;
}
</script>
