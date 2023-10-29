<template>
    <div class="pt-5 ">
        <div class="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 px-10 max-w-7xl">
            <status-item
                v-for="(item, index) in statusList"
                :key="item.step"
                :item="item"
                :active="active"
                :step="index + 1"
            />
            <div class="hidden lg:block w-full border border-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-10" style="height: 1px;">
                <div class="w-4 h-4 absolute top-1/2 transform -translate-y-1/2 -left-1 bg-green-500 rounded-full border-2 border-gray-200"></div>
                <div class="w-4 h-4 absolute top-1/2 transform -translate-y-1/2 -right-1 bg-green-500 rounded-full border-2 border-gray-200"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from "@/helpers/decorators";
import { Auction, StatusListItem } from "@/interfaces";
import StatusItem from "@/views/modules/user/status/StatusItem.vue";
import { Status } from "@/settings/enums";

@Options({
    components: {StatusItem}
})
export default class AuctionStatus extends Vue {
    @Prop() private auction: Auction;

    private get activeStatus(): string {
        return this.auction?.status || '';
    }

    private get statusList(): StatusListItem[] {
        return [
            { step: Status.new, title: this.$t('Dodano nową aukcję'), description: this.$t('Wprowadzono aukcję Twojego samochodu'), icon: require('@/assets/1.png') },
            { step: Status.payment_completed, title: this.$t('Płatność zrealizowana'), description: this.$t('Dokonano płatności za fakturę'), icon: require('@/assets/2.png') },
            { step: Status.pickup_images_added, title: this.$t('Zdjęcia z odbioru'), description: this.$t('Dodano zdjęcia z odbioru Twojego samochodu'), icon: require('@/assets/3.png') },
            { step: Status.customs, title: this.$t('Odprawa celna'), description: this.$t('Dokonano odprawy celnej'), icon: require('@/assets/4.png') },
            { step: Status.finished, title: this.$t('Samochód gotowy do odbioru'), description: this.$t('Wszystkie formalności zostały zakończone'), icon: require('@/assets/5.png') },
        ];
    }

    private get active(): number {
        const status: StatusListItem | null = this.statusList.find((status: StatusListItem) => status.step === this.activeStatus) || null;
        return status ? this.statusList.indexOf(status) + 1 : 0;
    }
}
</script>
