<template>
    <card>
        <loading :loading="isLoading">
            <h3>{{ $t('Twoje samochody') }}</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                <auction-card
                    v-for="auction in auctions" :key="auction.id"
                    :auction="auction"
                    :button-label="$t('Szczegóły')"
                    :icon="'search'"
                    @click="$router.push({name: 'user-auction-status', params: { auctionId: auction.id }})"
                />
                <p v-if="!auctions.length && !isLoading">
                    {{ $t('Brak samochodów do wyświetlenia.') }}
                </p>
            </div>
        </loading>
    </card>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import AuctionCard from "@/views/partials/AuctionCard.vue";
import { Auction } from "@/interfaces";
import AuthService from "@/services/auth";

@Options({
    components: {AuctionCard}
})
export default class UserAuctions extends Vue {
    private auctions: Auction[] = [];
    private isLoading = true;

    public async created(): Promise<void> {
        await this.userAuctions();
    }

    private async userAuctions(): Promise<void> {
        this.isLoading = true;
        try {
            const { data } = await AuthService.userAuctions();
            this.auctions = data;
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
