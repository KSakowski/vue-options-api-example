<template>
    <div>
        <h2 class="mt-6 text-center text-3xl font-bold text-gray-900">
            {{ $t('Logujesz się do Panelu klienta') }}
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
            {{ $t('Logujesz się do panelu, w którym możesz sprawdzić status dostawy swojego samochodu.') }}
        </p>
        <form class="mt-8 space-y-6" @submit.prevent>
            <form-group :label="$t('Email')" :error="form.errors.first('email')" required>
                <form-input v-model="form.email" name="email" />
            </form-group>
            <form-group :label="$t('Hasło')" :error="form.errors.first('password')" required>
                <form-input v-model="form.password" type="password" name="password" />
            </form-group>
            <div class="flex items-center justify-end">
                <!--<div class="flex items-center">
                    <base-form-checkbox id="remember" v-model="form.remember" />
                    <label class="ml-2 block text-sm text-gray-900" for="remember">{{ $t('Zapamiętaj logowanie') }}</label>
                </div>-->
                <div class="text-sm">
                    <a href="#" class="font-medium text-green-600 hover:text-green-500" @click="$router.push({name: 'forgotPassword'})">
                        {{ $t('Nie pamiętasz hasła ?') }}
                    </a>
                </div>
            </div>
            <base-button :type="'submit'" :size="'full'" @click="login">
                <template #icon>
                    <spinner v-show="isLoading" :size="'5'" />
                </template>
                {{ $t('Zaloguj') }}
            </base-button>
        </form>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import AuthService from "@/services/auth";
import { UserLogin } from "@/interfaces";
import Form from "@/helpers/form";

@Options({})
export default class LoginForm extends Vue {
    private form: Form<UserLogin> = new Form({
        email: '',
        password: '',
        remember: false
    });

    private isLoading = false;

    private async login(): Promise<void> {
        this.form.clearErrors();
        this.isLoading = true;

        try {
            const { data } = await AuthService.login(this.form.data());
            this.$auth.login(data);
        }
        catch ({code, errors, message}) {
            if (code === 401)
                this.$alert.error(this.$t('Nieprawidłowa nazwa użytkownika lub hasło.'));
            else
                this.form.displayErrors(code, errors, message);
        }
        finally
        {
            this.isLoading = false;
        }
    }
}
</script>
