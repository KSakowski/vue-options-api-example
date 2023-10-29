<template>
    <loading :loading="isLoading">
        <div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2 md:gap-4">
            <field-group :title="$t('Dane śledzenia')" :width="'w-full'">
                <div>
                    <details-label :title="$t('Link do śledzenia')">
                        <a :href="auctionData.tracking_link" target="_blank">{{ auctionData.tracking_link }}</a>
                    </details-label>
                    <details-label :title="$t('Nr kontenera')">
                        {{ auctionData.contractor_number }}
                    </details-label>
                    <details-label :title="$t('ETA')">
                        {{ $filters.date(auctionData.eta) }}
                    </details-label>
                </div>
            </field-group>
            <field-group :title="$t('Dane dostawy')" :width="'w-full'">
                <form-group :label="$t('Imię i Nazwisko')" :error="form.errors.first('delivery_address_name')">
                    <form-input v-model="form.delivery_address_name" />
                </form-group>
                <form-group :label="$t('Ulica')" :error="form.errors.first('delivery_address_street')">
                    <form-input v-model="form.delivery_address_street" />
                </form-group>
                <form-group :label="$t('Miasto')" :error="form.errors.first('delivery_address_city')">
                    <form-input v-model="form.delivery_address_city" />
                </form-group>
                <form-group :label="$t('Kod pocztowy')" :error="form.errors.first('delivery_address_zip_code')">
                    <form-input v-model="form.delivery_address_zip_code" />
                </form-group>
                <form-group :label="$t('Telefon')" :error="form.errors.first('delivery_address_phone')">
                    <form-input v-model="form.delivery_address_phone" />
                </form-group>
                <div>
                    <div class="flex items-center">
                        <form-checkbox id="autodiscover" v-model="form.autodiscover_repair" />
                        <label class="ml-2 block text-sm text-gray-900" for="autodiscover">{{ $t('Naprawa autodiscover') }}</label>
                    </div>
                    <div class="flex items-center">
                        <form-checkbox id="own" v-model="form.self_pickup" />
                        <label class="ml-2 block text-sm text-gray-900" for="own">{{ $t('Odbiór własny') }}</label>
                    </div>
                </div>
                <template v-if="form.self_pickup">
                    <form-group :label="$t('Imię i Nazwisko kierowcy')" :error="form.errors.first('pickup_name')">
                        <form-input v-model="form.pickup_name" />
                    </form-group>
                    <form-group :label="$t('Nr rejestracyjny')" :error="form.errors.first('pickup_plate')">
                        <form-input v-model="form.pickup_plate" />
                    </form-group>
                </template>
            </field-group>
        </div>
        <button-group :variant="'end'">
            <base-button @click="saveTrackingDeliveryData">
                {{ $t('Zapisz') }}
                <template #icon>
                    <hero-icon icon="check" />
                </template>
            </base-button>
        </button-group>
    </loading>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from "@/helpers/decorators";
import FieldGroup from "@/views/partials/FieldGroup.vue";
import { Auction, TrackingDelivery } from "@/interfaces";
import FormTextarea from "@/components/form/form-textarea/FormTextarea.vue";
import DetailsLabel from "@/views/partials/DetailsLabel.vue";
import Form from "@/helpers/form";
import AuthService from "@/services/auth";

@Options({
    components: {
        FormTextarea,
        FieldGroup,
        DetailsLabel,
    }
})
export default class Tracking extends Vue {
    @Prop() private auction: Auction;

    private form: Form<TrackingDelivery> = new Form({
        tracking_link: '',
        contractor_number: '',
        eta: '',
        delivery_address_name: '',
        delivery_address_street: '',
        delivery_address_city: '',
        delivery_address_zip_code: '',
        delivery_address_phone: '',
        pickup_name: '',
        pickup_plate: '',
        self_pickup: false,
        autodiscover_repair: false,
    });

    private isLoading = true;

    private get auctionId(): string {
        return this.auction?.id?.toString() || '';
    }

    private get auctionData(): any {
        const { tracking_link = '', contractor_number = '', eta = '' } = this.auction;
        return {
            tracking_link: tracking_link,
            contractor_number: contractor_number,
            eta: eta
        }
    }

    public async created(): Promise<void> {
        await this.loadTrackingDeliveryData();
    }

    private async loadTrackingDeliveryData(): Promise<void> {
        if (!this.auctionId)
            return;

        try {
            const { data } = await AuthService.trackingDeliveryData(this.auctionId);
            data.self_pickup = !!data.self_pickup;
            data.autodiscover_repair = !!data.autodiscover_repair;
            this.form.setData(data);
        }
        catch (ex) {
            this.$log(ex);
        }
        finally {
            this.isLoading = false;
        }
    }

    private async saveTrackingDeliveryData(): Promise<void> {
        this.isLoading = true;
        this.form.clearErrors();
        if (!this.auctionId)
            return;

        try {
            await AuthService.updateTrackingDeliveryData(this.auctionId, this.form.data());
            this.$alert.success(this.$t('Zmiany zostały zapisane pomyślnie.'))
        }
        catch ({code, errors, message}) {
            this.form.displayErrors(code, errors, message);
        }
        finally {
            this.isLoading = false;
        }
    }

}
</script>
