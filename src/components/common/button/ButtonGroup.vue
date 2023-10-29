<template>
    <div :class="`flex flex-col md:flex-row justify-${variant} space-y-2 md:space-y-0 space-x-0 md:space-x-2`">
        <slot />
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from '@/helpers/decorators';

@Options({})
export default class BaseButton extends Vue
{
    @Prop({
        default: 'start',
        validator: (value: string) => [
            'start', 'center', 'end',
        ].includes(value)
    })
    public variant: string;
}
</script>
