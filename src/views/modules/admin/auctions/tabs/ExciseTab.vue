<template>
    <div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2 md:gap-4">
        <field-group :width="'w-full'" :title="$t('Akcyza')">
            <form-group :label="$t('Wartość akcyzy')" :error="form.errors.first('price_for_excise')">
                <form-input v-model="form.price_for_excise" @update:modelValue="updateForm" />
            </form-group>
            <form-group :label="$t('Tytuł przelewu')" :error="form.errors.first('excise_transfer_data.title')">
                <form-textarea v-model="form.excise_transfer_data.title" @update:modelValue="updateForm" />
            </form-group>
            <form-group :label="$t('Bank')" :error="form.errors.first('excise_transfer_data.bank.name')">
                <form-input v-model="form.excise_transfer_data.bank.name" :rows="5" @update:modelValue="updateForm" />
            </form-group>
            <form-group :label="$t('Miasto')" :error="form.errors.first('excise_transfer_data.bank.city')">
                <form-input v-model="form.excise_transfer_data.bank.city" :rows="5" @update:modelValue="updateForm" />
            </form-group>
            <form-group :label="$t('Kraj')" :error="form.errors.first('excise_transfer_data.bank.country')">
                <form-input v-model="form.excise_transfer_data.bank.country" :rows="5" @update:modelValue="updateForm" />
            </form-group>
            <form-group :label="$t('Swift')" :error="form.errors.first('excise_transfer_data.bank.swift')" :description="$t('Jeśli każe dopisać jeszcze trzy znaki to wpisujemy CHASUS33 XXX')">
                <form-input v-model="form.excise_transfer_data.bank.swift" :rows="5" @update:modelValue="updateForm" />
            </form-group>
            <form-group :label="$t('Informacje dodatkowe/numer banku')" :error="form.errors.first('excise_transfer_data.bank.number')" :description="$t(swiftDescription)">
                <form-input v-model="form.excise_transfer_data.bank.number" :rows="5" @update:modelValue="updateForm" />
            </form-group>
            <form-group :label="$t('Nazwa odbiorcy')" :error="form.errors.first('excise_transfer_data.recipient_name')">
                <form-input v-model="form.excise_transfer_data.recipient_name" @update:modelValue="updateForm" />
            </form-group>
            <form-group :label="$t('Numer konta')" :error="form.errors.first('excise_transfer_data.account_number')">
                <form-input v-model="form.excise_transfer_data.account_number" @update:modelValue="updateForm" />
            </form-group>
            <form-group
                :label="$t('Kwota przelewu')"
                :error="form.errors.first('excise_transfer_data.amount') || form.errors.first('excise_transfer_data.currency')"
                class="w-full"
            >
                <div class="flex">
                    <form-input v-model="form.excise_transfer_data.amount" class="rounded-r-none" @update:modelValue="updateForm" />
                    <currencies-select v-model="form.excise_transfer_data.currency" :options="currenciesOptions" />
                </div>
            </form-group>
            <div class="space-y-2">
                <download-file
                    :title="$t('Podgląd potwierdzenia przelewu')"
                    :file-id="paymentConfirmationId"
                    :disabled="!paymentConfirmationId.length"
                />
            </div>
            <div class="space-y-2">
                <form-file-upload
                    v-model="akc_u_s_template"
                    :multiple="false"
                    :label="$t('Dodaj druk AKC-U/S')"
                    :type="'document'"
                    :columns="false"
                    @update:modelValue="updateAkcus"
                >
                    <attachment-list
                        v-if="akc_u_s_templateId.length"
                        :attachments-ids="akc_u_s_templateId"
                        :type="'document'"
                        @removeFile="[(files) => akc_u_s_templateId = files, updateAkcus]"
                    />
                </form-file-upload>
                <!--<base-button :size="'full'" :disabled="true">
                    {{ $t('Podgląd udostępnionego dokumentu AKC-U/S') }}
                    <template #icon>
                        <hero-icon :icon="'document-download'" />
                    </template>
                </base-button>-->
            </div>
        </field-group>
        <div class="2xl:col-span-2">
            <div class="grid 2xl:grid-cols-2">
                <field-group :width="'w-full'" :title="$t('Tłumaczenia')">
                    <div class="">
                        <details-label :title="$t('Tłumaczenia dokumentów')">
                            <true-false-icon :value="requestsDocumentTranslation" />
                        </details-label>
                        <div class="flex mb-4">
                            <form-group :label="$t('Cena')" class="w-full">
                                <form-input v-model="form.price_for_document_translation" class="rounded-r-none" @update:modelValue="updateForm" />
                            </form-group>
                            <currencies-select v-model="form.currency_for_document_translation" :options="currenciesOptions" @update:modelValue="updateForm" />
                        </div>
                        <details-label :title="$t('Opinia rzeczoznawcy')">
                            <true-false-icon :value="requestsExpertOpinion" />
                        </details-label>
                        <div class="flex mb-4">
                            <form-group :label="$t('Cena')" class="w-full">
                                <form-input v-model="form.price_for_expert_opinion" class="rounded-r-none" @update:modelValue="updateForm" />
                            </form-group>
                            <currencies-select v-model="form.currency_for_expert_opinion" :options="currenciesOptions" @update:modelValue="updateForm" />
                        </div>
                    </div>
                </field-group>
            </div>
            <div class="lg:pl-10">
                <details-label :title="$t('Załączone zdjęcia')"></details-label>
                <gallery
                    v-if="expertOpinionImagesIds.length"
                    :images="expertOpinionImages"
                    :download-button="true"
                    :zip-name="`${$t('Akcyza zdjecia')} ${auctionData?.brand} ${auctionData?.model}`"
                />
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import {Prop, Watch} from "@/helpers/decorators";
import Form from "@/helpers/form";
import FieldGroup from "@/views/partials/FieldGroup.vue";
import { AuctionExcise, TransferData } from "@/interfaces";
import Errors from "@/helpers/errors";
import TrueFalseIcon from "@/views/partials/TrueFalseIcon.vue";
import DetailsLabel from "@/views/partials/DetailsLabel.vue";
import CurrenciesSelect from "@/views/partials/CurrenciesSelect.vue";
import AttachmentList from "@/views/modules/admin/auctions/partials/AttachmentList.vue";
import Gallery from "@/components/common/gallery/Gallery.vue";
import FileService from "@/services/file";
import DownloadFile from "@/views/partials/DownloadFile.vue";
import { BANK } from "@/settings/enums";

@Options({
    components: { FieldGroup, TrueFalseIcon, DetailsLabel, CurrenciesSelect, AttachmentList, Gallery, DownloadFile }
})
export default class ExciseTab extends Vue {
    @Prop({ default: null })
    private auctionData: AuctionExcise;

    @Prop({ default: [] })
    private currenciesOptions: string[];

    @Prop({ default: [] })
    private akcusTemplateId: string[];

    @Prop({ default: [] })
    private paymentConfirmationId: string[];

    @Prop({ default: [] })
    private expertOpinionImagesIds: string[];

    @Prop({ default: false })
    private requestsDocumentTranslation: boolean;

    @Prop({ default: false })
    private requestsExpertOpinion: boolean;

    @Prop({ default: null })
    private errors: Errors;

    private form: Form<AuctionExcise> = new Form({
        price_for_excise: null,
        excise_transfer_data: {
            title: "",
            account_number: "",
            bank: { ...BANK },
            recipient_name: "",
            amount: "",
            currency: "",
        },
        price_for_document_translation: null,
        price_for_expert_opinion: null,
        currency_for_document_translation: "pln",
        currency_for_expert_opinion: "pln",
    });

    private akc_u_s_template: FileList | [] = [];
    private akc_u_s_templateId: string[] = [];

    private expertOpinionImages: any[] = [];

    /* eslint-disable */
    private swiftDescription: string = `
        Jeśli nie ma takiego pola to nie wpisujemy, ale jeśli jest to bardzo ważne aby wpisać - jest to numer kierunkowy banku JPMORGAN.
        W przypadku płatności REVOLUT / WISE.COM / BANK AMERYKAŃSKI jako numer
        banku / ROUTING NUMBER / numer oddziału banku ACH wpisujemy: 071000013
    `;

    @Watch('auctionData', { immediate: true })
    private onAuctionDataChanged(): void {
        const data = this.auctionData;
        if (!data.excise_transfer_data?.bank) {
            (data.excise_transfer_data as TransferData).bank = { ...BANK };
        }
        this.form.setData(data);
        this.form.errors = this.errors;
    }

    @Watch('akcusTemplateId', { immediate: true })
    private onAuctionImageIdsChanged(): void {
        this.akc_u_s_templateId = this.akcusTemplateId;
    }

    private updateForm(): void {
        this.$emit('update:modelValue', this.form.data());
    }

    private updateAkcus(): void {
        this.$emit('update:akcus', {
            akc_u_s_template: this.akc_u_s_template,
            akc_u_s_templateId: [],
        });
    }

    @Watch('expertOpinionImagesIds', { immediate: true })
    private async onExpertOpinionImagesIds(): Promise<void> {
        try {
            await Promise.all(
                this.expertOpinionImagesIds.map(async(id) => {
                    const { data } = await FileService.file(id);
                    this.expertOpinionImages.push({
                        src: URL.createObjectURL(data),
                        title: '',
                        id,
                    });
                })
            );
        }
        catch (ex) {
            this.$log(ex);
        }
    }
}
</script>
