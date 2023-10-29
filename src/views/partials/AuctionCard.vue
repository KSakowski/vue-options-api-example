<template>
    <card class="flex shadow-lg border-t-2 border-gray-50 cursor-pointer transform transition duration-500 hover:scale-105">
        <div class="flex flex-col h-full">
            <h3>{{ model }}</h3>
            <loading :loading="isLoading" :min-height="0" class="relative mb-4">
                <img v-if="thumbnail" :src="thumbnail" class="w-full h-52 object-cover" alt="">
                <img v-else src="@/assets/placeholder.png" class="w-full h-52 object-cover" alt="" />
            </loading>
            <div class="grid grid-cols-3 gap-2 mb-2">
                <div>{{ $t('Marka') }}:</div>
                <div class="col-span-2 font-bold break-all">
                    {{ brand }}
                </div>
            </div>
            <div class="grid grid-cols-3 mb-2">
                <div class="">
                    {{ $t('Rocznik') }}:
                </div>
                <div class="col-span-2 font-bold break-all">
                    {{ year }}
                </div>
            </div>
            <div class="grid grid-cols-3 mb-2">
                <div class="">
                    {{ $t('VIN') }}:
                </div>
                <div class="col-span-2 font-bold break-all">
                    {{ vin }}
                </div>
            </div>
            <base-button class="mt-4" :size="'full'">
                {{ buttonLabel }}
                <template #icon>
                    <hero-icon :icon="icon" />
                </template>
            </base-button>
        </div>
    </card>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from '@/helpers/decorators';
import { Auction } from "@/interfaces";
import DetailsLabel from "@/views/partials/DetailsLabel.vue";
import FileService from "@/services/file";

@Options({
    components: { DetailsLabel }
})
export default class AuctionCard extends Vue
{
    @Prop() private auction: Auction;
    @Prop({default: ''}) private buttonLabel: string;
    @Prop({default: 'pencil-alt'}) private icon: string;

    private get brand(): string { return this.auction?.brand || "" }
    private get model(): string { return this.auction?.model || "" }
    private get year(): string { return this.auction?.year || "" }
    private get vin(): string { return this.auction?.vin || "" }
    private get thumbnailId(): string { return this.auction?.attachments?.auction_cover?.uuid || "" }

    private thumbnail = '';
    private isLoading = false;

    public async created(): Promise<void> {
        await this.loadThumbnail();
    }

    private async loadThumbnail(): Promise<void> {
        if (!this.thumbnailId)
            return;

        this.isLoading = true;

        try {
            await this.file(this.thumbnailId);
        }
        catch (ex) {
            this.$log(ex);
        }
        finally
        {
            this.isLoading = false;
        }
    }

    private async file(id: string): Promise<void> {
        try {
            const { data } = await FileService.file(id);
            this.thumbnail = URL.createObjectURL(data);
        }
        catch (ex) {
            this.$log(ex);
        }
    }
}
</script>
