<template>
    <p class="text-sm text-gray-700">
        {{ $t('Wyświetlam') }}
        <span class="font-medium">{{ fromRange }}</span>
        -
        <span class="font-medium">{{ toRange }}</span>
        {{ $t('z') }}
        <span class="font-medium">{{ total }}</span>
    </p>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from "@/helpers/decorators";

@Options({})
export default class PaginationInfo extends Vue
{
    @Prop({ default: 1 }) private index: number;
    @Prop({ default: 1 }) private total: number;
    @Prop({ default: 1 }) private size: number;

    private get fromRange(): number
    {
        return (this.index - 1) * this.size + 1;
    }

    private get toRange(): number
    {
        if (this.total < this.size)
            return this.total;

        const result = this.index * this.size

        if (result > this.total)
            return this.total;

        return result;
    }

}
</script>

