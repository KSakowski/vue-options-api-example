<template>
    <h2 class="mt-6 text-center text-3xl font-bold text-gray-900">
        {{ $t('Zarejestruj się') }}
    </h2>
    <p class="mt-2 text-center text-sm text-gray-600">
        {{ $t('Zarejestruj się, aby korzystać z możliwości platformy. Po utworzeniu konta otrzymasz link z potwierdzeniem rejestracji') }}
    </p>
    <form class="mt-8 space-y-6" @submit.prevent>
        <form-group :label="$t('Imię')" :error="form.errors.first('first_name')" required>
            <form-input v-model="form.first_name" name="first_name" />
        </form-group>
        <form-group :label="$t('Nazwisko')" :error="form.errors.first('last_name')" required>
            <form-input v-model="form.last_name" name="last_name" />
        </form-group>
        <form-group :label="$t('Email')" :error="form.errors.first('email')" required>
            <form-input v-model="form.email" name="email" />
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
        <form-group :label="$t('Hasło')" :error="form.errors.first('password')" required>
            <form-input v-model="form.password" type="password" name="password" />
        </form-group>
        <form-group :label="$t('Potwierdzenie hasła')" :error="form.errors.first('password_confirmed')" required>
            <form-input v-model="form.password_confirmation" type="password" name="password_confirmation" />
        </form-group>
        <base-button :type="'submit'" :size="'full'" @click="register">
            <template #icon>
                <spinner v-show="isLoading" :size="'5'" />
            </template>
            {{ $t('Utwórz konto') }}
        </base-button>
    </form>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { UserStore } from "@/interfaces/auth";
import AuthService from "@/services/auth";
import Form from "@/helpers/form";
import { UserType } from "@/settings/enums";

@Options({})
export default class RegisterForm extends Vue {
    private form: Form<UserStore> = new Form({
        first_name: '',
        last_name: '',
        type: this.userType.person,
        company_name: '',
        tax_no: '',
        pesel: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    private isLoading = false;

    private get userType(): {[key: string]: string} {
        return UserType;
    }

    private async register(): Promise<void> {
        this.form.clearErrors();
        this.isLoading = true;

        try {
            await AuthService.register(this.form.data());
            await this.$router.push({name: 'thankYou'});
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
