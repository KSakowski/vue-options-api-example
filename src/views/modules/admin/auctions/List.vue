<template>
    <div class="relative h-full">
        <card class="mb-5">
            <filters-wrapper @submit="userAuctions">
                <form-group :label="$t('Marka')">
                    <form-input v-model="filter.brand" />
                </form-group>
                <form-group :label="$t('VIN')">
                    <form-input v-model="filter.vin" />
                </form-group>
                <form-group :label="$t('Data zakupu')">
                    <form-date-picker v-model="filter.purchased_at" />
                </form-group>
            </filters-wrapper>
        </card>
        <grid
            :items="auctions"
            :loading="isLoading"
            @sort-changed="({sort, order}) => [
                pager.sort = sort,
                pager.order = order,
                userAuctions()
            ]"
            @rowClick="({id}) => $router.push({name: 'admin-auction-form-edit', params: { auctionId: id }})"
        >
            <template #row="{item}">
                <grid-cell :title="$t('Marka')" :sort="'brand'">
                    <div class="text-sm text-gray-500">
                        {{ item.brand }}
                    </div>
                </grid-cell>
                <grid-cell :title="$t('Model')" :sort="'model'">
                    <div class="text-sm text-gray-500">
                        {{ item.model }}
                    </div>
                </grid-cell>
                <grid-cell :title="$t('Rocznik')" :sort="'year'">
                    <div class="text-sm text-gray-500">
                        {{ item.year }}
                    </div>
                </grid-cell>
                <grid-cell :title="$t('VIN')" :sort="'vin'">
                    <div class="text-sm text-gray-500">
                        {{ item.vin }}
                    </div>
                </grid-cell>
                <grid-cell :title="$t('Data zakupu')" :sort="'purchased_at'" :width="180">
                    <div class="text-sm text-gray-500">
                        {{ $filters.date(item.purchased_at) }}
                    </div>
                </grid-cell>
                <grid-cell class="flex justify-end items-center" :actions="true">
                    <button class="text-green-500 hover:text-green-900" @click="$router.push({name: 'admin-auction-form-edit', params: { auctionId: item.id }})">
                        <hero-icon icon="pencil-alt" :size="'6'" />
                    </button>
                </grid-cell>
            </template>
            <template #footer>
                <pagination
                    :index="pager.page"
                    :total="pager.total"
                    :size="pager.perPage"
                    @page-changed="page => [pager.page = page, userAuctions()]"
                />
            </template>
        </grid>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Auction } from "@/interfaces";
import Pager from "@/helpers/pager";
import { Filter } from "@/interfaces/pager";
import AuctionsService from "@/services/auctions";
import FiltersWrapper from "@/views/partials/FiltersWrapper.vue";

@Options({
    components: {FiltersWrapper}
})
export default class AuctionsList extends Vue {
    private auctions: Auction[] = [];
    private pager: Pager = new Pager(1, 10, 'purchased_at', 'DESC');
    private filter: Filter = {
        brand: '',
        model: '',
        year: '',
        vin: '',
        purchased_at: '',
    };
    private isLoading = true;

    public async created(): Promise<void> {
        await this.userAuctions();
    }

    private async userAuctions(): Promise<void> {
        this.isLoading = true;
        try {
            const { data, meta } = await AuctionsService.auctions(this.pager.data(), this.filter);
            this.auctions = data;
            this.pager.setMeta(meta);
        }
        catch {
            this.$alert.error(this.$t('Nie udało się wczytać listy aukcji.'));
        }
        finally {
            this.isLoading = false;
        }
    }
}
</script>
