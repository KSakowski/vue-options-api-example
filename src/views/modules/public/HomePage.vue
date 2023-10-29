<template>
    <div
        class="w-full flex flex-col h-screen prose max-w-none"
        :style="`background: url(${background}) center center / cover`"
    >
        <nav class="container mx-auto">
            <div class="md:flex items-center justify-between py-2 px-8 md:px-12">
                <div class="flex justify-center items-center mb-3 md:mb-0">
                    <div class="text-2xl font-bold text-white md:text-3xl">
                        <img src="@/assets/logo-lg.png" alt="" style="max-width: 275px" />
                    </div>
                </div>
                <div class="flex flex-col md:flex-row md:block -mx-2">
                    <button-group>
                        <base-button class="md:text-lg" @click="$router.push({name: 'register' })">
                            {{ $t('Zarejestruj') }}
                        </base-button>
                        <base-button class="md:text-lg" :variant="'light'" @click="$router.push({name: 'login' })">
                            {{ $t('Panel klienta') }}
                        </base-button>
                    </button-group>
                </div>
            </div>
        </nav>
        <div class="container mx-auto flex h-4/5">
            <div class="flex items-center text-center lg:text-left px-8 md:px-12">
                <div>
                    <h1>
                        <span class="md:text-5xl text-white">{{ $t('Samochody z') }}</span> <span class="md:text-5xl text-green-600">{{ $t('USA') }}</span><br><span class="md:text-5xl text-white">{{ $t('Import i sprzedaż samochodów z USA i Kanady') }}</span>
                    </h1>
                    <p class="mt-2 text-lg text-white">
                        {{ $t('Miejsce w którym sprawdzisz na jakim etapie jest transakcja związana z zakupem i transportem Twojego pojazdu.') }}
                    </p>
                </div>
            </div>
        </div>
        <footer class="bottom-0 mt-auto px-6 bg-green-600 text-white text-right">
            <div class="container mx-auto">
                <p>{{ $t('Copyright') }} {{ new Date().getFullYear() }} {{ $t('© AutoDiscover Logistics Sp. z o.o.') }}</p>
            </div>
        </footer>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import ButtonGroup from "@/components/common/button/ButtonGroup.vue";
import DashboardFooter from "@/views/layouts/dasbhoard/components/Footer.vue";

@Options({
    components: { ButtonGroup, DashboardFooter },
})
export default class HomePage extends Vue {
    private get background(): string {
        return require("@/assets/home-bg.jpg");
    }
}
</script>
