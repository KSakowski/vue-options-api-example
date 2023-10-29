<template>
    <button class="flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-green-500 hover:text-white">
        <hero-icon v-if="icon" :icon="icon" class="mr-2" />
        <slot />
    </button>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from "@/helpers/decorators";

@Options({})
export default class DropdownItem extends Vue
{
    @Prop({ default: '' })
    public icon: string;
}
</script>
