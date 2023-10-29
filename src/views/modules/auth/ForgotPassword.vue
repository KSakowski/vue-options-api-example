<template>
    <div>
        <h2 class="mt-6 text-center text-3xl font-bold text-gray-900">
            {{ $t('Nie pamiętasz hasła?') }}
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
            {{ $t('Jeśli na ten e-mail jest założone konto, to wyślemy na niego wiadomość.') }}
        </p>
        <form class="mt-8 space-y-6" @submit.prevent>
            <form-group :label="$t('Email')" :error="form.errors.first('email')" required>
                <form-input v-model="form.email" name="email" />
            </form-group>
            <base-button :type="'submit'" :size="'full'" @click="sendEmail">
                <template #icon>
                    <spinner v-show="isLoading" :size="'5'" />
                </template>
                {{ $t('Wyślij') }}
            </base-button>
        </form>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Form from "@/helpers/form";
import AuthService from "@/services/auth";
import { AppPages } from "@/settings/sitemap";

@Options({
})
export default class ForgotPassword extends Vue {
    private form: Form<{email: string}> = new Form({
        email: '',
    });
    private isLoading = false;

    private async sendEmail(): Promise<void> {
        this.form.clearErrors();
        this.isLoading = true;

        try {
            await AuthService.sendEmail(this.form.email as string);
            this.$alert.success(this.$t('Sprawdź wiadomość przesłaną na podany przez Ciebie adres mailowy.'));
            this.$router.push(AppPages.login.path);
        }
        catch ({code, errors, message}) {
            if (Array.isArray(errors)) {
                this.$alert.error(message);
                return;
            }
            this.form.displayErrors(code, errors, message);
        }
        finally
        {
            this.isLoading = false;
        }
    }
}
</script>
