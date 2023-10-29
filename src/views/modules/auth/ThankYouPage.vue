<template>
    <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {{ $t('Dziękujemy za rejestracje') }}
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
            {{ $t('Sprawdź wiadomość przesłaną na podany przez Ciebie adres mailowy podczas rejestracji.') }}
        </p>
        <form class="mt-8 space-y-6">
            <base-button :size="'full'" @click="$router.push({name: 'login'})">
                {{ $t('Zaloguj się') }}
            </base-button>
        </form>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    components: {},
})
export default class ThankYouPage extends Vue {}
</script>
