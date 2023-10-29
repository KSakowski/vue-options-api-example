<template>
    <input
        :checked="modelValue"
        type="checkbox"
        class="form-checkbox text-green-500 cursor-pointer w-4 h-4"
        @input="updateInput"
    >
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from '@/helpers/decorators';

@Options({})
export default class FormCheckbox extends Vue
{
    @Prop({ default: false })
    public modelValue: boolean;

    private updateInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.$emit("update:modelValue", input?.checked);
    }
}
</script>

<style lang="scss">
input[type="checkbox"] {
    appearance: none;
    background-color: #fff;
    margin: 0;
    font: inherit;
    color: currentColor;
    width: 1.15em;
    height: 1.15em;
    border: 0.15em solid #10b981;
    border-radius: 0.15em;
    transform: translateY(-0.075em);
    display: grid;
    place-content: center;
}

input[type="checkbox"]::before {
    content: "";
    width: 0.65em;
    height: 0.65em;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
    transform: scale(0);
    transform-origin: bottom left;
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em var(--form-control-color);
    background-color: #fff;
}

input[type="checkbox"]:checked {
    background-color: #10b981
}

input[type="checkbox"]:checked::before {
    transform: scale(1);
}

</style>
