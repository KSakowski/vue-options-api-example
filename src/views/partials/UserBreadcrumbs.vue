<template>
    <nav class="bg-grey-light rounded font-sans text-xs md:text-base w-full mb-5">
        <ol class="list-reset flex text-grey-dark">
            <li>
                <router-link
                    v-slot="{ href, navigate }"
                    :to="{ name: 'user-auctions' }"
                    custom
                >
                    <a
                        class="font-bold"
                        :href="href"
                        @click="navigate"
                    >
                        {{ $t('Twoje samochody') }}
                    </a>
                </router-link>
            </li>
            <li><span class="mx-2">/</span></li>
            <li>{{ title }}</li>
        </ol>
    </nav>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from "@/helpers/decorators";

@Options({
    components: {}
})
export default class UserBreadcrumbs extends Vue
{
    @Prop({default: ''}) title: string;
}
</script>
