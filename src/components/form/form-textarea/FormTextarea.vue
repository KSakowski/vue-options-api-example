<template>
    <textarea
        :value="modelValue"
        :placeholder="placeholder"
        class="w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
        @input="updateInput"
    />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from '@/helpers/decorators';

@Options({})
export default class FormTextarea extends Vue
{
    @Prop({ default: '' })
    public modelValue: string | number;

    @Prop({ default: '' })
    public placeholder: string;

    private updateInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.$emit("update:modelValue", input?.value);
    }
}
</script>
