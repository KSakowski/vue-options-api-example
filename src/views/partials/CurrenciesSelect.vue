<template>
    <form-select :options="options" :placeholder="$t('Waluta')" class="rounded-l-none w-32" />
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from "@/helpers/decorators";

@Options({})
export default class CurrenciesSelect extends Vue
{
    @Prop({ default: null })
    private options: string[];
}
</script>
