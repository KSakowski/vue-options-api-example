<template>
    <div>
        <h2 class="text-center text-3xl font-extrabold text-gray-900">
            {{ $t('Weryfikacja adresu e-mail') }}
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
            <!--{{ $t('Lorem ipsum dolor sit amet.') }}-->
        </p>
        <div class="relative mt-10">
            <loading :loading="true" />
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import AuthService from "@/services/auth";

@Options({
    components: {},
})
export default class VerifyEmail extends Vue {
    private get token(): string {
        return this.$route.params.token?.toString() || '';
    }

    public async created(): Promise<void> {
        await this.verifyEmail();
    }

    private async verifyEmail(): Promise<void>
    {
        try {
            await AuthService.verifyEmail(this.token);
            this.$alert.success('Konto zostało aktywowane.');
            await this.$router.push({name: 'login'});
        }
        catch {
            this.$alert.warning('Link aktywacyjny jest nieprawidłowy lub został już użyty do aktywacji konta.');
            await this.$router.push({path: '/'});
        }
    }
}
</script>
