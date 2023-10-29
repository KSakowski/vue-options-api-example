<template>
    <card>
        <loading :loading="isLoading">
            <div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2 md:gap-4">
                <field-group :title="$t('Dane klienta')" :width="'w-full'">
                    <form-group :label="$t('Imię')" :error="form.errors.first('first_name')">
                        <form-input v-model="form.first_name" />
                    </form-group>
                    <form-group :label="$t('Nazwisko')" :error="form.errors.first('last_name')">
                        <form-input v-model="form.last_name" />
                    </form-group>
                    <form-group :label="$t('Adres e-mail')" :error="form.errors.first('email')">
                        <form-input v-model="form.email" />
                    </form-group>
                    <form-group :error="form.errors.first('type')">
                        <div class="flex">
                            <form-radio v-model="form.type" :value="userType.person" :label="$t('Osoba prywatna')" />
                            <form-radio v-model="form.type" :value="userType.company" :label="$t('Firma')" />
                        </div>
                    </form-group>
                    <template v-if="form.type === userType.company">
                        <form-group :label="$t('Nazwa')" :error="form.errors.first('company_name')" required>
                            <form-input v-model="form.company_name" name="company_name" />
                        </form-group>
                        <form-group :label="$t('NIP')" :error="form.errors.first('tax_no')" required>
                            <form-input v-model="form.tax_no" name="tax_no" />
                        </form-group>
                    </template>
                    <template v-else>
                        <form-group :label="$t('PESEL')" :error="form.errors.first('pesel')" required>
                            <form-input v-model="form.pesel" name="pesel" />
                        </form-group>
                    </template>
                    <form-group :label="$t('Ulica')" :error="form.errors.first('address_street')" required>
                        <form-input v-model="form.address_street" />
                    </form-group>
                    <form-group :label="$t('Kod pocztowy')" :error="form.errors.first('address_zip_code')" required>
                        <form-input v-model="form.address_zip_code" />
                    </form-group>
                    <form-group :label="$t('Miasto')" :error="form.errors.first('address_city')" required>
                        <form-input v-model="form.address_city" />
                    </form-group>
                    <form-group :label="$t('Kraj')" :error="form.errors.first('address_country')" required>
                        <form-input v-model="form.address_country" />
                    </form-group>
                </field-group>
            </div>
            <template v-if="auctions.length">
                <h3>{{ $t('Aukcje') }}</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                    <auction-card
                        v-for="auction in auctions" :key="auction.id"
                        :auction="auction"
                        :button-label="$t('Edytuj')"
                        @click="$router.push({name: 'admin-auction-form-edit', params: { auctionId: auction.id }})"
                    />
                </div>
            </template>
        </loading>
        <template #footer>
            <button-group :variant="'end'">
                <base-button :variant="'secondary'" @click="$router.push({name: 'admin-users'})">
                    <hero-icon icon="arrow-left" class="pr-2" />
                    {{ $t('Powrót') }}
                </base-button>
                <base-button @click="editUser">
                    {{ $t('Zapisz') }}
                    <template #icon>
                        <hero-icon icon="check" />
                    </template>
                </base-button>
                <base-button @click="$router.push({name: 'admin-auction-form-add', params: { clientId: clientId }})">
                    {{ $t('Dodaj aukcje') }}
                    <template #icon>
                        <hero-icon icon="plus" />
                    </template>
                </base-button>
            </button-group>
        </template>
    </card>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import AuctionCard from '@/views/partials/AuctionCard.vue';
import ButtonGroup from "@/components/common/button/ButtonGroup.vue";
import AdminService from "@/services/admin";
import FieldGroup from "@/views/partials/FieldGroup.vue";
import Form from "@/helpers/form";
import {Auction, UserModel, UserUpdate} from "@/interfaces";
import {UserType} from "@/settings/enums";

@Options({
    components: {
        FieldGroup,
        ButtonGroup,
        AuctionCard
    }
})
export default class UserDetails extends Vue {
    private form: Form<UserModel> = new Form({
        id: null,
        created_at: '',
        updated_at: '',
        first_name: '',
        last_name: '',
        email: '',
        roles: [],
        type: this.userType.person,
        company_name: '',
        tax_no: '',
        pesel: '',
        address_street: '',
        address_zip_code: '',
        address_city: '',
        address_country: '',
    });
    private auctions: Auction[] = [];
    private isLoading = true;

    private get clientId(): string {
        return this.$route.params.id?.toString() || "";
    }

    private get userType(): {[key: string]: string} {
        return UserType;
    }

    public async created(): Promise<void> {
        await Promise.all([
            this.userDetails(),
            this.userAuctions(),
        ]);
        this.isLoading = false;
    }

    private async userDetails(): Promise<void> {
        try {
            const { data } = await AdminService.userDetails(this.clientId);
            this.form.setData(data);
        }
        catch (ex) {
            this.$log(ex);
        }
    }

    private async userAuctions(): Promise<void> {
        try {
            const { data } = await AdminService.userAuctions(this.clientId);
            this.auctions = data;
        }
        catch (ex) {
            this.$log(ex);
        }
    }

    private async editUser(): Promise<void> {
        this.isLoading = true;

        try {
            const userUpdate: UserUpdate = {
                first_name: this.form.first_name as string,
                last_name: this.form.last_name as string,
                email: this.form.email as string,
                type: this.form.type as string,
                company_name: this.form.company_name as string,
                pesel: this.form.pesel as string,
                tax_no: this.form.tax_no as string,
                address_street: this.form.address_street as string,
                address_zip_code: this.form.address_zip_code as string,
                address_city: this.form.address_city as string,
                address_country: this.form.address_country as string,
            };

            await AdminService.edit(this.clientId, userUpdate);
            this.$alert.success(this.$t('Zmiany zostały zapisane.'));
            this.form.errors.clearErrors();
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
