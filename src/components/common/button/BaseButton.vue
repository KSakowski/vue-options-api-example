<template>
    <button
        :type="type"
        :class="`btn btn-${variant} w-${size} ${customClasses}`"
        :disabled="disabled || loading"
    >
        <slot name="default" />
        <span :class="{'pl-2': hasIcon}">
            <slot name="icon" />
        </span>
    </button>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from '@/helpers/decorators';

@Options({})
export default class BaseButton extends Vue
{
    @Prop({ default: 'button' })
    public type: string;

    @Prop({
        default: 'primary',
        validator: (value: string) => [
            'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light',
        ].includes(value)
    })
    public variant: string;

    @Prop({
        default: 'auto',
        validator: (value: string) => [
            'auto', 'full',
        ].includes(value)
    })
    public size: string;

    @Prop({ default: '' })
    public customClasses: string;

    @Prop({ default: false })
    public loading: boolean;

    @Prop({ default: false })
    public disabled: boolean;

    private get hasIcon() {
        return !!this.$slots['icon'];
    }
}
</script>
