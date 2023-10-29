<template>
    <card>
        <loading :loading="isLoading">
            <user-card v-if="editMode" :user="userInfo" />
            <form class="relative">
                <tabs :errors="tabErrors">
                    <tab :title="$t('Dane aukcji')" tab="auction">
                        <auction-tab
                            :auction-data="form.data()"
                            :errors="form.errors"
                            @update:modelValue="(data) => auctionTabData(data)"
                        />
                    </tab>
                    <tab v-if="editMode" :title="$t('Płatność')" tab="payment">
                        <payment-tab
                            :auction-data="form.data()"
                            :payment_confirmation="payment_confirmationId"
                            :payment_additional_confirmation="payment_additional_confirmationId"
                            :errors="form.errors"
                            :currencies-options="currenciesOptions"
                            :auction-id="auctionId"
                            :additional-transport-insurance-attachments-ids="additional_transport_insurance_attachmentsIds"
                            @invoice-generator="redirectToInvoiceGenerator"
                            @update:modelValue="(data) => auctionTabData(data)"
                            @update:attachments="(data) => {
                                additional_transport_insurance_attachments = data.additional_transport_insurance_attachments,
                                additional_transport_insurance_attachmentsIds = data.additional_transport_insurance_attachmentsIds
                            }"
                        />
                    </tab>
                    <tab v-if="editMode" :title="$t('Zdjęcia')" tab="auction-images">
                        <images-tab
                            :auction-image-ids="auctionImageIds"
                            :pickup-image-ids="pickupImageIds"
                            @update:modelValue="(data) => {
                                auctionImages = data.auctionImages,
                                auctionImageIds = data.auctionImageIds,
                                pickupImages = data.pickupImages,
                                pickupImageIds = data.pickupImageIds
                            }"
                        />
                    </tab>
                    <tab v-if="editMode" :title="$t('Śledzenie')" tab="tracking">
                        <tracking-tab
                            :auction-data="form.data()"
                            :delivery-data="deliveryData"
                            :errors="form.errors"
                            @update:modelValue="(data) => auctionTabData(data)"
                        />
                    </tab>
                    <tab v-if="editMode" :title="$t('Odprawa celna')" tab="customs">
                        <customs-tab
                            :customs-id="customsId"
                            :customs-template-id="customs_templateId"
                            @update:modelValue="(data) => {
                                customs_template = data.customs_template,
                                customs_templateId = data.customs_templateId
                            }"
                        />
                    </tab>
                    <tab v-if="editMode" :title="$t('Akcyza')" tab="excise">
                        <excise-tab
                            :auction-data="form.data()"
                            :errors="form.errors"
                            :currencies-options="currenciesOptions"
                            :akcus-template-id="akc_u_s_templateId"
                            :payment-confirmation-id="payment_confirmation_exciseId"
                            :expert-opinion-images-ids="expert_opinion_images"
                            :requests-document-translation="requests_document_translation"
                            :requests-expert-opinion="requests_expert_opinion"
                            @update:modelValue="(data) => auctionTabData(data)"
                            @update:akcus="(data) => {
                                akc_u_s_template = data.akc_u_s_template,
                                akc_u_s_templateId = data.akc_u_s_templateId
                            }"
                        />
                    </tab>
                    <tab v-if="editMode" :title="$t('Załączniki')" tab="attachments">
                        <attachments-tab
                            :car-fax-id="car_fax_templateId"
                            :attachments-ids="attachmentsIds"
                            :errors="form.errors"
                            @update:modelValue="(data) => {
                                car_fax_template = data.car_fax_template,
                                car_fax_templateId = data.car_fax_templateId
                            }"
                            @update:attachments="(data) => {
                                attachments = data.attachments,
                                attachmentsIds = data.attachmentsIds
                            }"
                        />
                    </tab>
                </tabs>
            </form>
        </loading>
        <template #footer>
            <button-group :variant="'end'">
                <base-button v-if="userInfo?.id" :variant="'secondary'" @click="$router.push({name: 'admin-user-details', params: { id: userInfo?.id }})">
                    <hero-icon icon="arrow-left" class="pr-2" />
                    {{ $t('Powrót') }}
                </base-button>
                <base-button @click="saveAuction()">
                    {{ $t('Zapisz') }}
                    <template #icon>
                        <hero-icon icon="check" />
                    </template>
                </base-button>
            </button-group>
        </template>
    </card>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Tabs from "@/components/common/tabs/Tabs.vue";
import Tab from "@/components/common/tabs/Tab.vue";
import UserCard from "@/views/partials/UserCard.vue";
import FieldGroup from "@/views/partials/FieldGroup.vue";
import Form from "@/helpers/form";
import { Auction, AuctionCreate, AuctionExcise, AuctionPayment, AuctionTracking, DeliveryData, KeyValue, OtherFile, UserModel } from "@/interfaces";
import AuctionsService from "@/services/auctions";
import AdminService from "@/services/admin";
import BaseButton from "@/components/common/button/BaseButton.vue";
import FormSelect from "@/components/form/form-select/FormSelect.vue";
import MiscService from "@/services/misc";
import AuctionTab from "@/views/modules/admin/auctions/tabs/AuctionTab.vue";
import PaymentTab from "@/views/modules/admin/auctions/tabs/PaymentTab.vue";
import TrackingTab from "@/views/modules/admin/auctions/tabs/TrackingTab.vue";
import ExciseTab from "@/views/modules/admin/auctions/tabs/ExciseTab.vue";
import ImagesTab from "@/views/modules/admin/auctions/tabs/ImagesTab.vue";
import AttachmentsTab from "@/views/modules/admin/auctions/tabs/AttachmentsTab.vue";
import CustomsTab from "@/views/modules/admin/auctions/tabs/CustomsTab.vue";
import { TabErrors } from "@/views/modules/admin/auctions/inc/settings";
import { BANK } from "@/settings/enums";

@Options({
    components: {
        Tabs, Tab, CustomsTab, AttachmentsTab, ImagesTab, ExciseTab, PaymentTab, AuctionTab, TrackingTab,
        FormSelect, BaseButton, UserCard, FieldGroup,
    }
})
export default class AuctionsForm extends Vue {
    private form: Form<Auction> = new Form({
        id: null,
        brand: "",
        model: "",
        year: "",
        vin: "",
        purchased_at: "",
        client_id: "",
        price_for_car: null,
        price_for_excise: null,
        price_for_additional_payment: null,
        price_for_document_translation: null,
        price_for_expert_opinion: null,
        tracking_link: "",
        contractor_number: "",
        currency_for_car: "",
        currency_for_excise: "",
        currency_for_additional_payment: "",
        currency_for_document_translation: "",
        currency_for_expert_opinion: "",
        transfer_data: { title: "", account_number: "", bank: { ...BANK }, recipient_name: "", amount: "", currency: "" },
        excise_transfer_data: { title: "", account_number: "", bank: { ...BANK }, recipient_name: "", amount: "", currency: "" },
        additional_payment_transfer_data: { title: "", account_number: "", bank: { ...BANK }, recipient_name: "", amount: "", currency: "" },
        eta: '',
        price_for_additional_transport_insurance: null,
        currency_for_additional_transport_insurance: "",
        additional_transport_information: "",
    });

    private userInfo: UserModel | null = null;
    private auctionImages: FileList | [] = [];
    private auctionImageIds: string[] = [];
    private pickupImages: FileList | [] = [];
    private pickupImageIds: string[] = [];
    private customs_template: FileList | [] = [];
    private customs_templateId: string[] = [];
    private akc_u_s_template: FileList | [] = [];
    private akc_u_s_templateId: string[] = [];
    private car_fax_template: FileList | [] = [];
    private car_fax_templateId:  string[] = [];
    private attachments: FileList | [] = [];
    private attachmentsIds:  string[] = [];
    private additional_transport_insurance_attachments: FileList | [] = [];
    private additional_transport_insurance_attachmentsIds:  string[] = [];
    private currenciesOptions: string[] = [];

    private customsId: string[] | [] = [];
    private payment_confirmationId: string[] | [] = [];
    private payment_additional_confirmationId: string[] | [] = [];
    private payment_confirmation_exciseId: string[] | [] = [];

    private expert_opinion_images: string[] | [] = [];

    private deliveryData: DeliveryData | null = null;
    private requests_document_translation = false;
    private requests_expert_opinion = false;

    private tabErrors: string[] = [];
    private isLoading = false;

    private get clientId(): string {
        return this.$route.params.clientId?.toString() || '';
    }

    private get auctionId(): string {
        return this.$route.params.auctionId?.toString() || '';
    }

    public async created(): Promise<void> {
        await Promise.all([
            this.loadData(),
            this.loadCurrencies()
        ]);
    }

    private get editMode(): boolean {
        const routeName: string = this.$route.name?.toString() || '';
        return routeName.includes('edit');
    }

    private async saveAuction(ignoreAlert = false): Promise<boolean> {
        this.form.clearErrors();
        this.tabErrors = [];
        this.isLoading = true;

        try {
            if (!this.editMode) {
                this.form.client_id = this.clientId;
                this.form.transfer_data = null;
                await AuctionsService.create(this.form.data());
                this.$alert.success(this.$t('Aukcja została pomyślnie dodana.'));
                await this.$router.push({name: 'admin-auctions'})
            }
            else {
                const form = this.$filters.removeFalsy(this.form.data());
                const data = this.$filters.toFormData(form);
                data.append('_method', 'PUT');

                this.formatTransferData(data, form.transfer_data,'transfer_data');
                this.formatTransferData(data, form.transfer_data.bank,'transfer_data[bank]');
                this.formatTransferData(data, form.excise_transfer_data,'excise_transfer_data');
                this.formatTransferData(data, form.excise_transfer_data.bank,'excise_transfer_data[bank]');
                this.formatTransferData(data, form.additional_payment_transfer_data,'additional_payment_transfer_data');
                this.formatTransferData(data, form.additional_payment_transfer_data.bank,'additional_payment_transfer_data[bank]');

                Array.from(this.auctionImages).forEach((file: File) => data.append('files[auction_images][]', file));
                Array.from(this.pickupImages).forEach((file: File) => data.append('files[pickup_images][]', file));
                Array.from(this.attachments).forEach((file: File) => data.append('files[attachments][]', file));
                Array.from(this.additional_transport_insurance_attachments).forEach((file: File) => data.append('files[additional_transport_insurance_attachments][]', file));
                Array.from(this.customs_template).forEach((file: File) => data.append('files[customs_template][]', file));
                Array.from(this.akc_u_s_template).forEach((file: File) => data.append('files[akc_u_s_template]', file));
                Array.from(this.car_fax_template).map((file: File) => data.append('files[car_fax][]', file));

                this.formatAttachmentsIds(data, this.auctionImageIds, 'auction_images[]');
                this.formatAttachmentsIds(data, this.pickupImageIds, 'pickup_images[]');
                this.formatAttachmentsIds(data, this.attachmentsIds, 'attachments[]');
                this.formatAttachmentsIds(data, this.additional_transport_insurance_attachmentsIds, 'additional_transport_insurance_attachments[]');
                this.formatAttachmentsIds(data, this.customs_templateId, 'customs_template[]');
                this.formatAttachmentsIds(data, this.akc_u_s_templateId, 'akc_u_s_template');
                this.formatAttachmentsIds(data, this.car_fax_templateId, 'car_fax[]');

                await AuctionsService.edit(this.auctionId, data);

                if (!ignoreAlert)
                    this.$alert.success(this.$t('Zmiany zostały zapisane.'));
            }
        }
        catch ({code, errors, message}) {
            this.form.displayErrors(code, errors, message);
            const tabErrors = Object.keys(errors).map((key: string) => {
                const tab: KeyValue<string> | null = TabErrors.find((item: KeyValue<string>) => item.key === key) || null;
                return tab?.value || '';
            });

            this.tabErrors = [...new Set(tabErrors)];

            return false;
        }
        finally
        {
            this.isLoading = false;
        }

        return true;
    }

    private async loadData(): Promise<void> {
        if (!this.editMode) return;

        this.isLoading = true;

        try {
            const { data, data: { attachments, requests_document_translation = false, requests_expert_opinion = false } } = await AuctionsService.details(this.auctionId);
            this.form.setData(data);
            this.auctionImageIds = Object.keys(attachments?.auction_images || {});
            this.pickupImageIds = Object.keys(attachments?.pickup_images || {});
            this.attachmentsIds = Object.keys(attachments?.attachments || {});
            this.additional_transport_insurance_attachmentsIds = Object.keys(attachments?.additional_transport_insurance_attachments || {});
            this.customs_templateId = Object.keys(attachments?.customs_template || {});
            this.akc_u_s_templateId = attachments?.akc_u_s_template ? [(attachments?.akc_u_s_template as OtherFile)?.uuid] : [];
            this.car_fax_templateId = Object.keys(attachments?.car_fax || {});

            this.customsId = Object.values(attachments?.customs || {});
            this.payment_confirmationId = attachments?.payment_confirmation ? [(attachments?.payment_confirmation as OtherFile)?.uuid] : [];
            this.payment_additional_confirmationId = attachments?.payment_additional_confirmation ? [(attachments?.payment_additional_confirmation as OtherFile)?.uuid] : [];
            this.payment_confirmation_exciseId = attachments?.payment_confirmation_excise ? [(attachments?.payment_confirmation_excise as OtherFile)?.uuid] : [];
            this.expert_opinion_images = Object.keys(attachments?.expert_opinion_images || {});

            this.requests_document_translation = requests_document_translation;
            this.requests_expert_opinion = requests_expert_opinion;

            this.deliveryData = data;

            await this.loadUserDetails(data.client_id);
        }
        catch (ex) {
            this.$log(ex);
        }
        finally
        {
            this.isLoading = false;
        }
    }

    private async loadUserDetails(client_id: string): Promise<void> {
        try {
            const { data } = await AdminService.userDetails(client_id);
            this.userInfo = data;
        }
        catch (ex) {
            this.$log(ex);
        }
    }

    private async loadCurrencies(): Promise<void> {
        try {
            const { data } = await MiscService.currencies();
            this.currenciesOptions = Object.keys(data);
        }
        catch (ex) {
            this.$log(ex);
        }
    }

    private formatTransferData(data: FormData, transferData: {[key: string] : string}, key: string): FormData {
        data.delete(key);
        const transferDataKeys: string[] = Object.keys(transferData);
        transferDataKeys.forEach((item: string) => {
            if (transferData[item]) {
                data.append(`${key}[${item}]`, transferData[item]);
            }
        });
        return data;
    }

    private formatAttachmentsIds(data: FormData, ids:string[], key: string): FormData {
        ids.length ?
            ids.map( (fileUuid: string) => data.append(key, fileUuid)) :
            data.append(key, '');

        return data;
    }

    private auctionTabData(data: AuctionCreate | AuctionPayment | AuctionTracking | AuctionExcise): void {
        Object.assign(this.form, data);
    }

    private async redirectToInvoiceGenerator(): Promise<void> {
        try {
            const isValid = await this.saveAuction(true);

            if (!isValid)
                return;

            await this.$router.push({name: 'admin-auction-invoice-generator', params: { auctionId: this.auctionId }})
        }
        catch (ex) {
            this.$log(ex);
        }
    }
}
</script>
