<template>
    <div>
        <div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2 md:gap-4">
            <field-group :width="'w-full'" :title="$t('Płatność za samochód')">
                <!--<form-group :label="$t('Cena')" :error="form.errors.first('price_for_car')">
                    <form-input v-model="form.price_for_car" @update:modelValue="updateForm" />
                </form-group>-->
                <form-group :label="$t('Nazwa odbiorcy')" :error="form.errors.first('transfer_data.recipient_name')">
                    <form-textarea v-model="form.transfer_data.recipient_name" :rows="5" @update:modelValue="updateForm" />
                </form-group>
                <form-group :label="$t('Numer konta')" :error="form.errors.first('transfer_data.account_number')">
                    <form-input v-model="form.transfer_data.account_number" @update:modelValue="updateForm" />
                </form-group>
                <form-group :label="$t('Bank')" :error="form.errors.first('transfer_data.bank.name')">
                    <form-input v-model="form.transfer_data.bank.name" :rows="5" @update:modelValue="updateForm" />
                </form-group>
                <form-group :label="$t('Miasto')" :error="form.errors.first('transfer_data.bank.city')">
                    <form-input v-model="form.transfer_data.bank.city" :rows="5" @update:modelValue="updateForm" />
                </form-group>
                <form-group :label="$t('Kraj')" :error="form.errors.first('transfer_data.bank.country')">
                    <form-input v-model="form.transfer_data.bank.country" :rows="5" @update:modelValue="updateForm" />
                </form-group>
                <form-group :label="$t('Swift')" :error="form.errors.first('transfer_data.bank.swift')" :description="$t('Jeśli każe dopisać jeszcze trzy znaki to wpisujemy CHASUS33 XXX')">
                    <form-input v-model="form.transfer_data.bank.swift" :rows="5" @update:modelValue="updateForm" />
                </form-group>
                <form-group :label="$t('Informacje dodatkowe/numer banku')" :error="form.errors.first('transfer_data.bank.number')" :description="$t(swiftDescription)">
                    <form-input v-model="form.transfer_data.bank.number" :rows="5" @update:modelValue="updateForm" />
                </form-group>
                <form-group
                    :label="$t('Kwota przelewu')"
                    :error="form.errors.first('transfer_data.amount') || form.errors.first('transfer_data.currency')" class="w-full"
                >
                    <div class="flex">
                        <form-input v-model="form.transfer_data.amount" class="rounded-r-none" @update:modelValue="updateForm" />
                        <currencies-select v-model="form.transfer_data.currency" :options="currenciesOptions" @update:modelValue="updateForm" />
                    </div>
                </form-group>
                <form-group :label="$t('Tytuł przelewu')" :error="form.errors.first('transfer_data.title')">
                    <form-textarea v-model="form.transfer_data.title" @update:modelValue="updateForm" />
                </form-group>
                <div class="space-y-2">
                    <base-button :size="'full'" @click="$emit('invoice-generator')">
                        {{ $t('Generuj fakturę') }}
                        <template #icon>
                            <hero-icon icon="calculator" />
                        </template>
                    </base-button>
                    <download-file
                        :title="$t('Podgląd potwierdzenia przelewu')"
                        :file-id="payment_confirmation"
                        :disabled="!payment_confirmation.length"
                    />
                </div>
                <div class="space-y-2">
                    <base-button :size="'full'" @click="sendTransactionDataNotification">
                        {{ $t('Wyślij powiadomienie o płatności') }}
                        <template #icon>
                            <hero-icon icon="calculator" />
                        </template>
                    </base-button>
                </div>
            </field-group>
            <field-group :width="'w-full'" :title="$t('Płatność dodatkowa')">
                <!--<form-group :label="$t('Cena')" :error="form.errors.first('price_for_additional_payment')">
                    <form-input v-model="form.price_for_additional_payment" @update:modelValue="updateForm" />
                </form-group>-->
                <form-group :label="$t('Nazwa odbiorcy')" :error="form.errors.first('additional_payment_transfer_data.recipient_name')">
                    <form-textarea v-model="form.additional_payment_transfer_data.recipient_name" :rows="5" @update:modelValue="updateForm" />
                </form-group>
                <form-group :label="$t('Numer konta')" :error="form.errors.first('additional_payment_transfer_data.account_number')">
                    <form-input v-model="form.additional_payment_transfer_data.account_number" @update:modelValue="updateForm" />
                </form-group>
                <form-group :label="$t('Bank')" :error="form.errors.first('additional_payment_transfer_data.bank.name')">
                    <form-input v-model="form.additional_payment_transfer_data.bank.name" :rows="5" @update:modelValue="updateForm" />
                </form-group>
                <form-group :label="$t('Miasto')" :error="form.errors.first('additional_payment_transfer_data.bank.city')">
                    <form-input v-model="form.additional_payment_transfer_data.bank.city" :rows="5" @update:modelValue="updateForm" />
                </form-group>
                <form-group :label="$t('Kraj')" :error="form.errors.first('additional_payment_transfer_data.bank.country')">
                    <form-input v-model="form.additional_payment_transfer_data.bank.country" :rows="5" @update:modelValue="updateForm" />
                </form-group>
                <form-group :label="$t('Swift')" :error="form.errors.first('additional_payment_transfer_data.bank.swift')" :description="$t('Jeśli każe dopisać jeszcze trzy znaki to wpisujemy CHASUS33 XXX')">
                    <form-input v-model="form.additional_payment_transfer_data.bank.swift" :rows="5" @update:modelValue="updateForm" />
                </form-group>
                <form-group :label="$t('Informacje dodatkowe/numer banku')" :error="form.errors.first('additional_payment_transfer_data.bank.number')" :description="$t(swiftDescription)">
                    <form-input v-model="form.additional_payment_transfer_data.bank.number" :rows="5" @update:modelValue="updateForm" />
                </form-group>
                <form-group
                    :label="$t('Kwota przelewu')"
                    :error="form.errors.first('additional_payment_transfer_data.amount') || form.errors.first('additional_payment_transfer_data.currency')" class="w-full"
                >
                    <div class="flex">
                        <form-input v-model="form.additional_payment_transfer_data.amount" class="rounded-r-none" @update:modelValue="updateForm" />
                        <currencies-select v-model="form.additional_payment_transfer_data.currency" :options="currenciesOptions" @update:modelValue="updateForm" />
                    </div>
                </form-group>
                <form-group :label="$t('Tytuł przelewu')" :error="form.errors.first('additional_payment_transfer_data.title')">
                    <form-textarea v-model="form.additional_payment_transfer_data.title" @update:modelValue="updateForm" />
                </form-group>
                <div class="space-y-2">
                    <download-file
                        :title="$t('Podgląd potwierdzenia przelewu')"
                        :file-id="payment_additional_confirmation"
                        :disabled="!payment_additional_confirmation.length"
                    />
                </div>
            </field-group>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2 md:gap-4">
            <div class="col-span-2">
                <field-group :width="'w-full'" :title="$t('Dodatkowe informacje')">
                    <form-group :label="$t('Dodatkowe informacje')" :error="form.errors.first('additional_transport_information')">
                        <form-textarea v-model="form.additional_transport_information" :rows="25" @update:modelValue="updateForm" />
                    </form-group>
                </field-group>
            </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2 md:gap-4">
            <field-group :width="'w-full'">
                <form-file-upload
                    v-model="additional_transport_insurance_attachments"
                    :label="$t('Dodaj załączniki')"
                    :type="'document'"
                    :columns="false"
                    @update:modelValue="updateAttachments"
                >
                    <attachment-list
                        v-if="additional_transport_insurance_attachmentsIds.length"
                        :attachments-ids="additional_transport_insurance_attachmentsIds"
                        :type="'document'"
                        @removeFile="[(files) => additional_transport_insurance_attachmentsIds = files, updateAttachments]"
                    />
                </form-file-upload>
                <form-group
                    :label="$t('Opcjonalne ubezpieczenie transportu')"
                    :error="form.errors.first('price_for_additional_transport_insurance') || form.errors.first('currency_for_additional_transport_insurance')" class="w-full"
                >
                    <div class="flex">
                        <form-input v-model="form.price_for_additional_transport_insurance" class="rounded-r-none" @update:modelValue="updateForm" />
                        <currencies-select v-model="form.currency_for_additional_transport_insurance" :options="currenciesOptions" @update:modelValue="updateForm" />
                    </div>
                </form-group>
            </field-group>
        </div>
    </div>
</template>


<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop, Watch } from "@/helpers/decorators";
import Form from "@/helpers/form";
import FieldGroup from "@/views/partials/FieldGroup.vue";
import CurrenciesSelect from "@/views/partials/CurrenciesSelect.vue";
import { AuctionPayment, TransferData } from "@/interfaces";
import Errors from "@/helpers/errors";
import DownloadFile from "@/views/partials/DownloadFile.vue";
import FormTextarea from "@/components/form/form-textarea/FormTextarea.vue";
import AttachmentList from "@/views/modules/admin/auctions/partials/AttachmentList.vue";
import { BANK } from "@/settings/enums";
import AuctionsService from "@/services/auctions";

@Options({
    components: {FormTextarea, FieldGroup, CurrenciesSelect, DownloadFile, AttachmentList }
})
export default class PaymentTab extends Vue {
    @Prop({ default: null })
    private auctionData: AuctionPayment;

    @Prop({ default: '' })
    private auctionId: string;

    @Prop({ default: '' })
    private payment_confirmation: string;

    @Prop({ default: '' })
    private payment_additional_confirmation: string;

    @Prop({ default: [] })
    private additionalTransportInsuranceAttachmentsIds: string[];

    @Prop({ default: null })
    private errors: Errors;

    @Prop({ default: [] })
    private currenciesOptions: string[];

    private form: Form<AuctionPayment> = new Form({
        price_for_car: null,
        price_for_additional_payment: null,
        price_for_additional_transport_insurance: null,
        currency_for_additional_transport_insurance: "",
        additional_transport_information: "",
        transfer_data: {
            title: "",
            account_number: "",
            bank: { ...BANK },
            recipient_name: "",
            amount: "",
            currency: "",
        },
        additional_payment_transfer_data: {
            title: "",
            account_number: "",
            bank: { ...BANK },
            recipient_name: "",
            amount: "",
            currency: "",
        },
    });

    private additional_transport_insurance_attachments: FileList | [] = [];
    private additional_transport_insurance_attachmentsIds: string[] = [];

    @Watch('additionalTransportInsuranceAttachmentsIds', { immediate: true })
    private onAttachmentsIdsChanged(): void {
        this.additional_transport_insurance_attachmentsIds = this.additionalTransportInsuranceAttachmentsIds;
    }

    /* eslint-disable */
    private swiftDescription: string = `
        Jeśli nie ma takiego pola to nie wpisujemy, ale jeśli jest to bardzo ważne aby wpisać - jest to numer kierunkowy banku JPMORGAN.
        W przypadku płatności REVOLUT / WISE.COM / BANK AMERYKAŃSKI jako numer
        banku / ROUTING NUMBER / numer oddziału banku ACH wpisujemy: 071000013
    `;

    @Watch('auctionData', { immediate: true })
    private onAuctionDataChanged(): void {
        const data = this.auctionData;
        if (!data.additional_payment_transfer_data?.bank) {
            (data.additional_payment_transfer_data as TransferData).bank = { ...BANK };
        }
        this.form.setData(data);
        this.form.errors = this.errors;
    }

    private updateForm(): void {
        this.form.price_for_car = (this.form.transfer_data as Record<string , string>)?.amount;
        this.form.price_for_additional_payment = (this.form.additional_payment_transfer_data as Record<string , string>)?.amount;

        this.$emit('update:modelValue', this.form.data());
    }

    private updateAttachments(): void {
        this.$emit('update:attachments', {
            additional_transport_insurance_attachments: this.additional_transport_insurance_attachments,
            additional_transport_insurance_attachmentsIds: this.additional_transport_insurance_attachmentsIds,
        });
    }

    private async sendTransactionDataNotification(): Promise<void> {
        try {
            await AuctionsService.sendTransactionDataNotification(this.auctionId);
            this.$alert.success(this.$t('Powiadomienie zostało wysłane'));
        }
        catch (ex) {
            this.$log(ex);
        }
    }
}
</script>
