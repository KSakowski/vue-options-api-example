<template>
    <div class="relative" :class="{'invalid': error }">
        <slot name="default" />
        <label v-if="label" class="absolute -top-2 left-4 px-1 bg-white text-green-500 text-xs z-10">{{ label }} <var v-if="isRequired(required)">*</var></label>
        <small v-if="description">{{ description }}</small>
        <small v-if="error" class="block text-red-500 font-sm text-left">{{ error }}</small>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from '@/helpers/decorators';

@Options({})
export default class FormGroup extends Vue
{
    @Prop()
    public label: string;

    @Prop()
    public description: string;

    @Prop()
    public error: string;

    @Prop({ default: false })
    public required: boolean;

    private isRequired(value: boolean): boolean
    {
        return value !== false;
    }
}
</script>
