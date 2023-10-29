<template>
    <div>
        <div class="text-center mb-4">
            <h2>
                {{ $t('Resetowanie hasła') }}
            </h2>
        </div>
        <form class="mt-8 space-y-6" @submit.prevent>
            <form-group :label="$t('Hasło')" :error="form.errors.first('password')" required>
                <form-input v-model="form.password" type="password" name="password" />
            </form-group>
            <form-group :label="$t('Potwierdzenie hasła')" :error="form.errors.first('password_confirmed')" required>
                <form-input v-model="form.password_confirmation" type="password" name="password_confirmation" />
            </form-group>
            <base-button :type="'submit'" :size="'full'" @click="resetPassword">
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
import { PasswordResetToken } from "@/interfaces";
import AuthService from "@/services/auth";

@Options({})
export default class ResetPassword extends Vue {
    private form: Form<PasswordResetToken> = new Form({
        token:'',
        password: '',
        password_confirmation: '',
    });
    private isLoading = false;

    private get token(): string {
        return this.$route.params.token?.toString() || '';
    }

    private async resetPassword(): Promise<void> {
        this.form.clearErrors();
        this.isLoading = true;

        try {
            this.form.token = this.token;
            await AuthService.resetPassword(this.form.data());
            this.$alert.success('Hasło zostało zmienione pomyślnie');
            await this.$router.push({name: 'login' });
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
