<template>
    <select
        class="px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm uppercase"
        :value="modelValue"
        :placeholder="$t('PLN')"
        @input="updateInput"
    >
        <option
            v-if="placeholder"
            class="hover:bg-green-500"
            value=""
            disabled selected hidden
        >
            {{ placeholder }}
        </option>
        <option
            v-for="option in options"
            :key="option"
            class="hover:bg-green-500"
            :value="option"
        >
            {{ option }}
        </option>
    </select>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from '@/helpers/decorators';

@Options({})
export default class FormSelect extends Vue
{
    @Prop({ default: '' })
    public modelValue: string | number;

    @Prop({ default: () => [] })
    public options: string[];

    @Prop({ default: '' })
    public placeholder: string;

    private updateInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.$emit("update:modelValue", input?.value);
    }
}
</script>
