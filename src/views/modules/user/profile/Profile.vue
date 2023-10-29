<template>
    <card>
        <loading :loading="isLoading">
            <form class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2 md:gap-4" @submit.prevent>
                <field-group :title="$t('Profil użytkownika')" :width="'w-full'">
                    <form-group :label="$t('Imię')" :error="form.errors.first('first_name')" required>
                        <form-input v-model="form.first_name" />
                    </form-group>
                    <form-group :label="$t('Nazwisko')" :error="form.errors.first('last_name')" required>
                        <form-input v-model="form.last_name" />
                    </form-group>
                    <form-group :label="$t('Adres e-mail')" :error="form.errors.first('email')" required>
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
                        <form-group :label="$t('PESEL')" :error="form.errors.first('pesel')">
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
            </form>
        </loading>
        <template #footer>
            <button-group :variant="'end'">
                <base-button :variant="'secondary'" @click="$router.back()">
                    <hero-icon icon="arrow-left" class="pr-2" />
                    {{ $t('Powrót') }}
                </base-button>
                <base-button :type="'submit'" @click="updateProfile">
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
import Form from "@/helpers/form";
import { UserUpdate } from "@/interfaces";
import FieldGroup from "@/views/partials/FieldGroup.vue";
import AuthService from "@/services/auth";
import {UserType} from "@/settings/enums";

@Options({
    components: { FieldGroup }
})
export default class Profile extends Vue {
    private form: Form<UserUpdate> = new Form({
        first_name: '',
        last_name: '',
        email: '',
        type: '',
        company_name: '',
        tax_no: '',
        pesel: '',
        address_street: '',
        address_zip_code: '',
        address_city: '',
        address_country: '',
    });
    private isLoading = true;

    private get userType(): {[key: string]: string} {
        return UserType;
    }

    public async created(): Promise<void> {
        await this.userDetails();
    }

    private async userDetails(): Promise<void> {
        try {
            const { data } = await AuthService.currentUser();
            this.form.setData(data);
        }
        catch (ex) {
            this.$log(ex);
        }
        finally {
            this.isLoading = false;
        }
    }

    private async updateProfile(): Promise<void>
    {
        this.isLoading = false;

        try {
            const { data } = await AuthService.updateProfile(this.form.data());
            this.$store.commit('auth/updateProfile', data);
            this.$alert.success(this.$t('Zmiany zostały zapisane'));
        }
        catch ({code, errors, message}) {
            this.form.displayErrors(code, errors, message);
        }
        finally
        {
            this.isLoading = false;
        }
    }
}
</script>
