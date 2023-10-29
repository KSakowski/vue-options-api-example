<template>
    <div class="flex items-center mr-2">
        <input
            class="cursor-pointer"
            type="radio"
            :checked="value === modelValue"
            @change="$emit('update:modelValue', value)"
        >
        <span class="ml-1 cursor-pointer" @click="$emit('update:modelValue', value)">
            {{ label }}
        </span>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from '@/helpers/decorators';

@Options({})
export default class FormRadio extends Vue
{
    @Prop({ default: false })
    public modelValue: boolean;

    @Prop({ default: null })
    public value: boolean;

    @Prop({ default: '' })
    public label: boolean;
}
</script>

<style lang="scss">
input[type="radio"] {
    appearance: none;
    background-color: #fff;
    margin: 0;
    font: inherit;
    color: currentColor;
    width: 1.15em;
    height: 1.15em;
    border: 0.15em solid #10b981;
    border-radius: 50%;
    transform: translateY(-0.075em);
    display: grid;
    place-content: center;
}

input[type="radio"]::before {
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

input[type="radio"]:checked {
    background-color: #10b981
}

input[type="radio"]:checked::before {
    transform: scale(1);
}

</style>
