<template>
    <div class="text-center">
        <h1>
            403
        </h1>
        <p class="text-secondary mb-4 text-center">
            {{ $t('Nie masz uprawnień dostępu do tej strony') }}
        </p>
        <div class="flex text-sm mb-4 justify-center">
            <base-button @click="$router.push({path: '/' })">
                {{ $t('Powrót') }}
            </base-button>
        </div>
    </div>
</template>

