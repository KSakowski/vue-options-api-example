<template>
    <loading :loading="isLoading">
        <div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2 md:gap-4">
            <field-group :title="$t('Akcyza')" :width="'w-full'">
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
                    <download-file
                        :title="$t('Pobierz druk AKC-U/S')"
                        :file-id="akc_u_s_templateId"
                        :file-name="akc_u_s_templateName"
                        :normalize-name="false"
                        :disabled="!akc_u_s_templateId"
                    />
                    <form-file-upload
                        v-model="payment_confirmation_excise"
                        :multiple="false"
                        :label="$t('Załącz potwierdzenie przelewu')"
                        :type="'document'"
                        :columns="false"
                        @update:model-value="payment_confirmation_exciseId = []"
                    >
                        <attachment-list
                            v-if="payment_confirmation_exciseId.length"
                            :attachments-ids="payment_confirmation_exciseId"
                            :type="'document'"
                            @removeFile="[(files) => payment_confirmation_exciseId = files]"
                        />
                    </form-file-upload>
                </div>
            </field-group>
            <field-group :title="$t('Tłumaczenia i opinia rzeczoznawcy')" :width="'w-full'" class="2xl:col-span-2">
                <div>
                    <div class="flex items-center">
                        <form-checkbox id="translation" v-model="requests_document_translation" />
                        <label class="ml-2 block text-sm text-gray-900" for="translation">{{ $t('Tak, chcę tłumaczenia dokumentów') }}</label>
                    </div>
                    <p class="text-xs text-gray-500">
                        {{ $t('Decydując się na usługę tłumaczenia zgadzasz się na pokrycie kosztów związanych z realizacją tej usługi') }}
                    </p>
                </div>
                <details-label :title="$t('Cena usługi')">
                    {{ translationData.price_for_document_translation }} <span class="uppercase">{{ translationData.currency_for_document_translation }}</span>
                </details-label>
                <div>
                    <div class="flex items-center">
                        <form-checkbox id="expert" v-model="requests_expert_opinion" />
                        <label class="ml-2 block text-sm text-gray-900" for="expert">{{ $t('Tak, chcę opinii rzeczoznawcy') }}</label>
                    </div>
                    <p class="text-xs text-gray-500">
                        {{ $t('Decydując się na usługi rzeczoznawcy zgadzasz się na pokrycie kosztów związanych z realizacją tej usługi') }}
                    </p>
                </div>
                <details-label :title="$t('Cena usługi')">
                    {{ translationData.price_for_expert_opinion }} <span class="uppercase">{{ translationData.currency_for_expert_opinion }}</span>
                </details-label>
                <form-file-upload
                    v-model="expert_opinion_images"
                    :label="$t('Załącz zdjęcia')"
                    :button-size="'md:max-w-xs lg:max-w-sm'"
                    :accept="'image/*'"
                >
                    <attachment-list
                        v-if="expert_opinion_imagesIds.length"
                        :attachments-ids="expert_opinion_imagesIds"
                        @removeFile="[(files) => expert_opinion_imagesIds = files]"
                    />
                </form-file-upload>
                <p class="text-gray-500">
                    {{ $t('Proszę o załączenie zdjęć koniecznych do realizacji usługi rzeczoznawcy.') }}<br>
                    {{ $t('Uwaga! Proszę o dołączenie zdjęć zgodnie z poniższą instrukcją:') }}
                </p>
                <ol>
                    <li>
                        <span class="block">{{ $t('Ogólny widok pojazdu') }}</span>
                        <span class="text-xs">
                            {{ $t('Zdjęcia pojazdu na około z wysokości środka pojazdu + zdjęcia po skosie z góry.') }}
                        </span>
                    </li>
                    <li>
                        {{ $t('Wnętrze pojazdu') }}
                        <span class="text-xs">
                            {{ $t('Widok przez otwarte drzwi kierowcy, kokpit, przednie oraz tylne fotele, stan licznika przebiegu.') }}
                        </span>
                    </li>
                    <li>
                        {{ $t('Uszkodzenia - ilość zdjęć zależna od rozmiaru uszkodzeń') }}
                        <span class="text-xs">
                            {{ $t('Maksymalna ilość zdjęć możliwych do załączenia wynosi 40 szt.') }}
                        </span>
                    </li>
                </ol>
            </field-group>
        </div>
        <button-group :variant="'end'">
            <base-button @click="saveExciseTranslationsData">
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
import { Auction, OtherFile, TransferData } from "@/interfaces";
import DetailsLabel from "@/views/partials/DetailsLabel.vue";
import DownloadFile from "@/views/partials/DownloadFile.vue";
import AuthService from "@/services/auth";
import AttachmentList from "@/views/modules/admin/auctions/partials/AttachmentList.vue";

@Options({
    components: {
        FieldGroup,
        DetailsLabel,
        DownloadFile,
        AttachmentList,
    }
})
export default class Excise extends Vue {
    @Prop() private auction: Auction;

    private requests_document_translation = false;
    private requests_expert_opinion = false;

    private akc_u_s: FileList | [] = [];
    private akc_u_sId: string[] = [];

    private payment_confirmation_excise: FileList | [] = [];
    private payment_confirmation_exciseId: string[] = [];

    private expert_opinion_images: FileList | [] = [];
    private expert_opinion_imagesIds: string[] | [] = [];

    private isLoading = true;

    private get auctionId(): string {
        return this.auction?.id?.toString() || '';
    }

    private get akc_u_s_templateId(): string{
        return this.auction?.attachments?.akc_u_s_template?.uuid || "";
    }

    private get akc_u_s_templateName(): string{
        return this.auction?.attachments?.akc_u_s_template?.file_name || "";
    }

    private get transferData(): TransferData {
        const { excise_transfer_data } = this.auction;
        return {
            title: excise_transfer_data?.title || '',
            account_number: excise_transfer_data?.account_number || '',
            bank: excise_transfer_data?.bank || null,
            recipient_name: excise_transfer_data?.recipient_name || '',
            amount: excise_transfer_data?.amount || '',
            currency: excise_transfer_data?.currency || '',
        }
    }

    private get translationData(): {[key: string]: string | number} {
        const {
            price_for_document_translation, price_for_expert_opinion,
            currency_for_document_translation, currency_for_expert_opinion,
        } = this.auction;
        return {
            price_for_document_translation: price_for_document_translation || '',
            currency_for_document_translation: currency_for_document_translation || '',
            price_for_expert_opinion: price_for_expert_opinion || '',
            currency_for_expert_opinion: currency_for_expert_opinion || '',
        }
    }

    public async created(): Promise<void> {
        await this.loadExciseTranslationsData();
    }

    private async loadExciseTranslationsData(): Promise<void> {
        if (!this.auctionId)
            return;

        try {
            const { data, data: { requests_expert_opinion, requests_document_translation } } = await AuthService.exciseTranslationsData(this.auctionId);
            this.akc_u_sId = [(data?.attachments?.akc_u_s as OtherFile)?.uuid || ''];
            this.payment_confirmation_exciseId = [(data?.attachments?.payment_confirmation_excise as OtherFile)?.uuid || ''];
            this.expert_opinion_imagesIds = Object.keys(data.attachments?.expert_opinion_images || {});
            this.requests_expert_opinion = requests_expert_opinion;
            this.requests_document_translation = requests_document_translation;
        }
        catch (ex) {
            this.$log(ex);
        }
        finally {
            this.isLoading = false;
        }
    }

    private async saveExciseTranslationsData(): Promise<void> {
        this.isLoading = true;

        try {
            const data = this.$filters.toFormData({
                requests_document_translation: this.requests_document_translation,
                requests_expert_opinion: this.requests_expert_opinion,
            });
            data.append('_method', 'PUT');
            Array.from(this.payment_confirmation_excise).map((file: File) => data.append('files[payment_confirmation_excise]', file));
            this.$filters.formatAttachmentsIds(data, this.payment_confirmation_exciseId, 'payment_confirmation_excise');

            Array.from(this.expert_opinion_images).forEach((file: File) => data.append('files[expert_opinion_images][]', file));
            this.$filters.formatAttachmentsIds(data, this.expert_opinion_imagesIds, 'expert_opinion_images[]');

            await AuthService.updateExciseTranslationsData(this.auctionId, data);
            this.$alert.success(this.$t('Zmiany zostały zapisane.'));
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
