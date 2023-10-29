<template>
    <div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2 md:gap-4">
        <field-group :width="'w-full'" :title="$t('Śledzenie')">
            <form-group :label="$t('Link do śledzenia')" :error="form.errors.first('tracking_link')">
                <form-input v-model="form.tracking_link" @update:modelValue="updateForm" />
            </form-group>
            <form-group :label="$t('Nr kontenera')" :error="form.errors.first('contractor_number')">
                <form-input v-model="form.contractor_number" @update:modelValue="updateForm" />
            </form-group>
            <form-group :label="$t('ETA')" :error="form.errors.first('eta')">
                <form-date-picker v-model="form.eta" @update:modelValue="updateForm" />
            </form-group>
        </field-group>
        <field-group :width="'w-full'" :title="$t('Dane dostawy')">
            <div>
                <details-label :title="$t('Imię i Nazwisko')">
                    {{ deliveryDetails.delivery_address_name }}
                </details-label>
                <details-label :title="$t('Ulica')">
                    {{ deliveryDetails.delivery_address_street }}
                </details-label>
                <details-label :title="$t('Miasto')">
                    {{ deliveryDetails.delivery_address_city }}
                </details-label>
                <details-label :title="$t('Kod pocztowy')">
                    {{ deliveryDetails.delivery_address_zip_code }}
                </details-label>
                <details-label :title="$t('Telefon')">
                    {{ deliveryDetails.delivery_address_phone }}
                </details-label>
                <details-label :title="$t('Naprawa autodiscover')">
                    <true-false-icon :value="deliveryDetails.autodiscover_repair" />
                </details-label>
                <details-label :title="$t('Odbiór własny')">
                    <true-false-icon :value="deliveryDetails.self_pickup" />
                </details-label>
                <template v-if="deliveryDetails.self_pickup">
                    <details-label :title="$t('Imię i Nazwisko kierowcy')">
                        {{ deliveryDetails.pickup_name }}
                    </details-label>
                    <details-label :title="$t('Nr rejestracyjny')">
                        {{ deliveryDetails.pickup_plate }}
                    </details-label>
                </template>
            </div>
        </field-group>
    </div>
</template>


<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import {Prop, Watch} from "@/helpers/decorators";
import Form from "@/helpers/form";
import FieldGroup from "@/views/partials/FieldGroup.vue";
import {AuctionTracking, DeliveryData} from "@/interfaces";
import Errors from "@/helpers/errors";
import DetailsLabel from "@/views/partials/DetailsLabel.vue";
import TrueFalseIcon from "@/views/partials/TrueFalseIcon.vue";

@Options({
    components: { FieldGroup, DetailsLabel, TrueFalseIcon }
})
export default class TrackingTab extends Vue {
    @Prop({ default: null })
    private auctionData: AuctionTracking;

    @Prop({ default: null })
    private deliveryData: DeliveryData;

    @Prop({ default: null })
    private errors: Errors;

    private form: Form<AuctionTracking> = new Form({
        tracking_link: '',
        contractor_number: '',
        eta: '',
    });

    private get deliveryDetails(): any {
        return {
            delivery_address_city: this.deliveryData?.delivery_address_city || "-",
            delivery_address_name: this.deliveryData?.delivery_address_name || "-",
            delivery_address_phone: this.deliveryData?.delivery_address_phone || "-",
            delivery_address_street: this.deliveryData?.delivery_address_street || "-",
            delivery_address_zip_code: this.deliveryData?.delivery_address_zip_code || "-",
            autodiscover_repair: this.deliveryData?.autodiscover_repair || false,
            self_pickup: this.deliveryData?.self_pickup || false,
            pickup_name: this.deliveryData?.pickup_name || "-",
            pickup_plate: this.deliveryData?.pickup_plate || "-",
        }
    }

    @Watch('auctionData', { immediate: true })
    private onAuctionDataChanged(): void {
        this.form.setData(this.auctionData);
        this.form.errors = this.errors;
    }

    private updateForm(): void {
        this.$emit('update:modelValue', this.form.data());
    }
}
</script>
