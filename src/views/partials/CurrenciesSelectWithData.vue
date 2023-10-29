<template>
    <form-select :options="options" :placeholder="$t('Waluta')" class="rounded-l-none w-32" />
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import MiscService from "@/services/misc";

@Options({})
export default class CurrenciesSelectWithData extends Vue
{
    private options: string[] = [];

    public async created(): Promise<void> {
        await this.loadCurrencies();
    }

    private async loadCurrencies(): Promise<void> {
        try {
            const { data } = await MiscService.currencies();
            this.options = Object.keys(data);
        }
        catch (ex) {
            this.$log(ex);
        }
    }
}
</script>
