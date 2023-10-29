<template>
    <card>
        <loading :loading="isLoading">
            <div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2 md:gap-4">
                <div>
                    <field-group :title="$t('Dane sprzedawcy')" :width="'w-full'">
                        <form-group :label="$t('Data wystawienia')" :error="form.errors.first('invoiced_at')">
                            <form-date-picker v-model="form.invoiced_at" />
                        </form-group>
                        <form-group :label="$t('Nazwa')" :error="form.errors.first('seller_name')">
                            <form-input v-model="form.seller_name" />
                        </form-group>
                        <form-group :label="$t('Adres')" :error="form.errors.first('seller_address')">
                            <form-textarea v-model="form.seller_address" :rows="5" />
                        </form-group>
                    </field-group>
                </div>
                <div>
                    <field-group :title="$t('Dane nabywcy')" :width="'w-full'">
                        <form-group :label="$t('Nazwa')" :error="form.errors.first('buyer_name')">
                            <form-input v-model="form.buyer_name" />
                        </form-group>
                        <form-group :label="$t('Imię')" :error="form.errors.first('buyer_first_name')">
                            <form-input v-model="form.buyer_first_name" />
                        </form-group>
                        <form-group :label="$t('Nazwisko')" :error="form.errors.first('buyer_last_name')">
                            <form-input v-model="form.buyer_last_name" />
                        </form-group>
                        <form-group :label="$t('Ulica')" :error="form.errors.first('buyer_address_street')">
                            <form-input v-model="form.buyer_address_street" />
                        </form-group>
                        <form-group :label="$t('Kod pocztowy')" :error="form.errors.first('buyer_address_zip_code')">
                            <form-input v-model="form.buyer_address_zip_code" />
                        </form-group>
                        <form-group :label="$t('Miasto')" :error="form.errors.first('buyer_address_city')">
                            <form-input v-model="form.buyer_address_city" />
                        </form-group>
                        <form-group :label="$t('Kraj')" :error="form.errors.first('buyer_address_country')">
                            <form-input v-model="form.buyer_address_country" />
                        </form-group>
                        <form-group :label="$t('NIP')" :error="form.errors.first('buyer_tax_no')">
                            <form-input v-model="form.buyer_tax_no" />
                        </form-group>
                    </field-group>
                </div>
            </div>
            <field-group :title="$t('Pozycje na fakturze')" :width="'w-full'">
                <div
                    v-for="(item, index) in form.items"
                    :key="index"
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                >
                    <template v-if="form.items[index]">
                        <form-group :label="$t('Nazwa')" :error="form.errors.first(`items.${index}.name`)">
                            <form-input v-model="form.items[index].name" />
                        </form-group>
                        <form-group :label="$t('Ilość')" :error="form.errors.first(`items.${index}.quantity`)">
                            <form-input v-model="form.items[index].quantity" />
                        </form-group>
                        <form-group :label="$t('Cena netto')" :error="form.errors.first(`items.${index}.price_net`)">
                            <form-input v-model="form.items[index].price_net" />
                        </form-group>
                        <form-group :label="$t('Waluta')" :error="form.errors.first(`items.${index}.currency`)">
                            <currencies-select v-model="form.items[index].currency" :options="currencies" />
                        </form-group>
                        <div class="flex items-start">
                            <base-button class="px-2" :title="$t('Dodaj linię')" @click="addLine">
                                <hero-icon :icon="'plus'" />
                            </base-button>
                            <base-button v-if="index >= 1" class="px-2 ml-1" :variant="'danger'" :title="$t('Usuń linię')" @click="removeLine(index)">
                                <hero-icon :icon="'trash'" />
                            </base-button>
                        </div>
                    </template>
                </div>
            </field-group>
        </loading>
        <template #footer>
            <button-group :variant="'end'">
                <base-button :variant="'secondary'" @click="$router.back()">
                    {{ $t('Powrót') }}
                </base-button>
                <base-button @click="generateInvoice">
                    {{ $t('Zapisz') }}
                </base-button>
                <div>
                    <download-invoice
                        :title="$t('Podgląd faktury')"
                        :invoice-url="invoiceUrl"
                        :file-name="`${invoiceNumber}.pdf`"
                        :disabled="!invoiceNumber"
                    />
                </div>
            </button-group>
        </template>
    </card>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import ButtonGroup from "@/components/common/button/ButtonGroup.vue";
import FieldGroup from "@/views/partials/FieldGroup.vue";
import Form from "@/helpers/form";
import { InvoiceItem, InvoiceUpdate } from "@/interfaces";
import AuctionsService from "@/services/auctions";
import FormTextarea from "@/components/form/form-textarea/FormTextarea.vue";
import FormDatePicker from "@/components/form/form-datepicker/FormDatePicker.vue";
import CurrenciesSelect from "@/views/partials/CurrenciesSelect.vue";
import BaseButton from "@/components/common/button/BaseButton.vue";
import HeroIcon from "@/components/common/icon/HeroIcon.vue";
import MiscService from "@/services/misc";
import DownloadInvoice from "@/views/partials/DownloadInvoice.vue";

@Options({
    components: {
        HeroIcon,
        BaseButton,
        FormTextarea,
        FormDatePicker,
        FieldGroup,
        ButtonGroup,
        CurrenciesSelect,
        DownloadInvoice,
    }
})
export default class InvoiceGenerator extends Vue {
    private get auctionId(): string {
        return this.$route.params.auctionId?.toString() || '';
    }

    private isLoading = true;

    private form: Form<InvoiceUpdate> = new Form({
        buyer_name:	'',
        buyer_first_name: '',
        buyer_last_name: '',
        buyer_email: '',
        buyer_tax_no: '',
        buyer_address_country: '',
        buyer_address_city: '',
        buyer_address_street: '',
        buyer_address_zip_code: '',
        seller_name: '',
        seller_first_name: '',
        seller_last_name: '',
        seller_email: '',
        seller_address: '',
        seller_address_country: '',
        seller_address_city: '',
        seller_address_street: '',
        invoiced_at: '',
        items: [{
            uuid: '',
            created_at: '',
            updated_at: '',
            invoice_id: 0,
            name: '',
            quantity: 0,
            price_net: 0,
            price_gross: 0,
            currency: 'usd',
            comment: '',
        }],
    });

    private defaultInvoiceItem: InvoiceItem = {
        uuid: '',
        created_at: '',
        updated_at: '',
        invoice_id: 0,
        name: '',
        quantity: 0,
        price_net: 0,
        price_gross: 0,
        currency: 'usd',
        comment: '',
    };

    private invoiceUrl = '';
    private invoiceNumber = '';

    private currencies: string[] = [];

    public async created(): Promise<void> {
        await Promise.all([
            this.loadInvoiceData(),
            this.loadCurrencies()
        ]);
    }

    private async loadInvoiceData(): Promise<void> {
        try {
            const { data, data: { download_url = '', invoice_no = '' } } = await AuctionsService.invoiceData(this.auctionId);
            if (!data.items.length)
                data.items.push(this.defaultInvoiceItem);

            [this.invoiceUrl, this.invoiceNumber] = [ download_url, invoice_no ];

            this.form.setData(data);
        }
        catch (ex) {
            this.$log(ex);
        }
        finally {
            this.isLoading = false;
        }
    }

    private async loadCurrencies(): Promise<void> {
        try {
            const { data } = await MiscService.currencies();
            this.currencies = Object.keys(data);
        }
        catch (ex) {
            this.$log(ex);
        }
    }

    private async generateInvoice(): Promise<void> {
        const { buyer_address_city, buyer_address_street, buyer_address_country, buyer_address_zip_code } = this.form;
        const isAddressNotFilled = [ buyer_address_city, buyer_address_street, buyer_address_country, buyer_address_zip_code].some (x => !x);

        if (isAddressNotFilled) {
            this.$alert.error(this.$t('Adres nabywcy w profilu użytkownika jest wymagany do wygenerowania faktury.'));
            return;
        }

        this.isLoading = true;

        try {
            await AuctionsService.createInvoice(this.auctionId, this.form.data());
            this.$alert.success(this.$t('Faktura została zapisana.'));
            this.form.errors.clearErrors();

            await this.loadInvoiceData();
        }
        catch ({code, errors, message}) {
            this.form.displayErrors(code, errors, message);
        }
        finally {
            this.isLoading = false;
        }
    }

    private addLine(): void {
        (this.form.items as InvoiceItem[]).push({...this.defaultInvoiceItem});
    }

    private removeLine(index: number): void {
        (this.form.items as InvoiceItem[]).splice(index, 1);
    }

}
</script>
