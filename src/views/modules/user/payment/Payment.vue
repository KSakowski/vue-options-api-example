
<template>
    <loading :loading="isLoading">
        <div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2 md:gap-4">
            <field-group :title="$t('Płatność za samochód')" :width="'w-full'">
                <div>
                    <details-label :title="$t('Tytuł przelewu')">
                        {{ transferData.title }}
                    </details-label>
                    <details-label :title="$t('Bank')">
                        {{ transferData.bank?.name }}
                    </details-label>
                    <details-label :title="$t('Miasto')">
                        {{ transferData.bank?.city }}
                    </details-label>
                    <details-label :title="$t('Kraj')">
                        {{ transferData.bank?.country }}
                    </details-label>
                    <details-label :title="$t('Swift')">
                        {{ transferData.bank?.swift }}
                    </details-label>
                    <details-label :title="$t('Informacje dodatkowe/numer banku')">
                        {{ transferData.bank?.number }}
                    </details-label>
                    <details-label :title="$t('Nazwa odbiorcy')">
                        {{ transferData.recipient_name }}
                    </details-label>
                    <details-label :title="$t('Numer konta')">
                        {{ transferData.account_number }}
                    </details-label>
                    <details-label :title="$t('Kwota do zapłaty')">
                        {{ transferData.amount }} {{ transferData.currency }}
                    </details-label>
                </div>
                <div class="space-y-2">
                    <download-invoice
                        :title="$t('Pobierz fakturę')"
                        :invoice-url="invoiceUrl"
                        :file-name="`${invoiceNumber}.pdf`"
                        :disabled="!invoiceUrl"
                    />
                    <form-file-upload
                        v-model="payment_confirmation"
                        :multiple="false"
                        :label="$t('Załącz potwierdzenie przelewu')"
                        :type="'document'"
                        :columns="false"
                        @update:model-value="payment_confirmationId = []"
                    >
                        <attachment-list
                            v-if="payment_confirmationId.length"
                            :attachments-ids="payment_confirmationId"
                            :type="'document'"
                            @removeFile="[(files) => payment_confirmationId = files]"
                        />
                    </form-file-upload>
                </div>
            </field-group>
            <field-group v-if="addidionalPayment?.amount" :title="$t('Płatność dodatkowa')" :width="'w-full'">
                <div>
                    <details-label :title="$t('Tytuł przelewu')">
                        {{ addidionalPayment.title }}
                    </details-label>
                    <details-label :title="$t('Bank')">
                        {{ addidionalPayment.bank?.name }}
                    </details-label>
                    <details-label :title="$t('Miasto')">
                        {{ addidionalPayment.bank?.city }}
                    </details-label>
                    <details-label :title="$t('Kraj')">
                        {{ addidionalPayment.bank?.country }}
                    </details-label>
                    <details-label :title="$t('Swift')">
                        {{ addidionalPayment.bank?.swift }}
                    </details-label>
                    <details-label :title="$t('Informacje dodatkowe/numer banku')">
                        {{ addidionalPayment.bank?.number }}
                    </details-label>
                    <details-label :title="$t('Nazwa odbiorcy')">
                        {{ addidionalPayment.recipient_name }}
                    </details-label>
                    <details-label :title="$t('Numer konta')">
                        {{ addidionalPayment.account_number }}
                    </details-label>
                    <details-label :title="$t('Kwota do zapłaty')">
                        {{ addidionalPayment.amount }} {{ transferData.currency }}
                    </details-label>
                </div>
                <div class="space-y-2">
                    <form-file-upload
                        v-model="payment_additional_confirmation"
                        :multiple="false"
                        :label="$t('Załącz potwierdzenie przelewu')"
                        :type="'document'"
                        :columns="false"
                        @update:model-value="payment_additional_confirmationId = []"
                    >
                        <attachment-list
                            v-if="payment_additional_confirmationId.length"
                            :attachments-ids="payment_additional_confirmationId"
                            :type="'document'"
                            @removeFile="[(files) => payment_additional_confirmationId = files]"
                        />
                    </form-file-upload>
                </div>
            </field-group>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2 md:gap-4">
            <div class="col-span-2">
                <field-group :title="$t('Informacje dodatkowe')" :width="'w-full'">
                    <div class="mb-2 mt-5 font-bold whitespace-pre-line" v-text="auction?.additional_transport_information"></div>
                </field-group>
            </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2 md:gap-4">
            <field-group :width="'w-full'">
                <div>
                    <div v-if="attachments && attachments.length" class="space-y-2 mb-5">
                        <download-file
                            v-for="(file, index) in attachments" :key="index"
                            :title="`${$t('Pobierz załącznik')} ${index + 1}`"
                            :file-id="file.uuid"
                            :file-name="file.file_name"
                        />
                    </div>
                    <details-label :title="$t('Opcjonalne ubezpieczenie transportu')">
                        {{ auction?.price_for_additional_transport_insurance }} {{ auction?.currency_for_additional_transport_insurance }}
                    </details-label>
                </div>
            </field-group>
        </div>
        <button-group :variant="'end'">
            <base-button @click="savePaymentData">
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
import FieldGroup from "@/views/partials/FieldGroup.vue";
import { Prop } from "@/helpers/decorators";
import {Auction, OtherFile, TransferData} from "@/interfaces";
import DetailsLabel from "@/views/partials/DetailsLabel.vue";
import AttachmentList from "@/views/modules/admin/auctions/partials/AttachmentList.vue";
import DownloadFile from "@/views/partials/DownloadFile.vue";
import AuthService from "@/services/auth";
import DownloadInvoice from "@/views/partials/DownloadInvoice.vue";

@Options({
    components: {
        DownloadInvoice,
        DetailsLabel,
        FieldGroup,
        AttachmentList,
        DownloadFile,
    }
})
export default class Payment extends Vue {
    @Prop() private auction: Auction;

    private get auctionId(): string {
        return this.auction?.id?.toString() || '';
    }

    private get transferData(): TransferData {
        const { transfer_data } = this.auction;
        return {
            title: transfer_data?.title || '',
            account_number: transfer_data?.account_number || '',
            bank: transfer_data?.bank || null,
            recipient_name: transfer_data?.recipient_name || '',
            amount: transfer_data?.amount || '',
            currency: transfer_data?.currency || '',
        }
    }

    private get addidionalPayment(): TransferData {
        const { additional_payment_transfer_data } = this.auction;
        return {
            title: additional_payment_transfer_data?.title || '',
            account_number: additional_payment_transfer_data?.account_number || '',
            bank: additional_payment_transfer_data?.bank || null,
            recipient_name: additional_payment_transfer_data?.recipient_name || '',
            amount: additional_payment_transfer_data?.amount || '',
            currency: additional_payment_transfer_data?.currency || '',
        }
    }

    private get attachments(): OtherFile[] {
        const attachments = this.auction?.attachments?.additional_transport_insurance_attachments || [];
        return Object.values(attachments) || [];
    }

    private payment_confirmation: FileList | [] = [];
    private payment_confirmationId: string[] = [];
    private payment_additional_confirmation: FileList | [] = [];
    private payment_additional_confirmationId: string[] = [];

    private invoiceUrl = '';
    private invoiceNumber = '';
    private isLoading = true;

    public async created(): Promise<void> {
        await this.loadPaymentData();
    }

    private async loadPaymentData(): Promise<void> {
        if (!this.auctionId)
            return;

        try {
            const { data } = await AuthService.paymentData(this.auctionId);
            this.payment_confirmationId = [(data?.attachments?.payment_confirmation as OtherFile)?.uuid || ''];
            this.payment_additional_confirmationId = [(data?.attachments?.payment_additional_confirmation as OtherFile)?.uuid || ''];

            this.invoiceUrl = data?.invoice?.download_url || '';
            this.invoiceNumber = data?.invoice?.invoice_no || '';
        }
        catch (ex) {
            this.$log(ex);
        }
        finally {
            this.isLoading = false;
        }
    }

    private async savePaymentData(): Promise<void> {
        this.isLoading = true;

        try {
            const data = new FormData();
            data.append('_method', 'PUT');
            Array.from(this.payment_confirmation).map((file: File) => data.append('files[payment_confirmation]', file));
            this.$filters.formatAttachmentsIds(data, this.payment_confirmationId, 'payment_confirmation');
            Array.from(this.payment_additional_confirmation).map((file: File) => data.append('files[payment_additional_confirmation]', file));
            this.$filters.formatAttachmentsIds(data, this.payment_additional_confirmationId, 'payment_additional_confirmation');

            await AuthService.updatePaymentData(this.auctionId, data);
            this.$alert.success(this.$t('Zmiany zostały zapisane.'));
            this.$emit('reload');
        }
        catch (ex) {
            this.$alert.error(this.$t('Nie wszystkie pola zostały wypełnione prawidłowo.'));
        }
        finally {
            this.isLoading = false;
        }
    }
}
</script>
