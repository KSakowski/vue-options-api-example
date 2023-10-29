<template>
    <header class="flex items-center justify-between px-6 py-3 bg-white shadow z-10">
        <div class="flex items-center">
            <button
                class="text-gray-500 focus:outline-none lg:hidden"
                @click="$emit('openSidebar', !isOpen)"
            >
                <svg
                    class="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M4 6H20M4 12H20M4 18H11"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </button>
        </div>
        <dropdown>
            <template #button>
                <user-avatar :username="userName" class="object-cover w-full h-full" />
            </template>
            <template #content>
                <dropdown-item :icon="'user-group'" @click="$router.push({name: 'user-profile'})">
                    {{ $t('Profil') }}
                </dropdown-item>
                <dropdown-item :icon="'logout'" @click="$auth.logout()">
                    {{ $t('Wyloguj') }}
                </dropdown-item>
            </template>
        </dropdown>
    </header>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from "@/helpers/decorators";
import UserAvatar from "@/components/common/avatar/Avatar.vue";
import { UserModel } from "@/interfaces";
import DropdownItem from "@/components/common/dropdown/DropdownItem.vue";

@Options({
    components: {DropdownItem, UserAvatar}
})
export default class DashboardHeader extends Vue {
    @Prop({ default: false })
    public isOpen: boolean;

    private get userName(): string {
        const { first_name = '', last_name = '' }: UserModel = this.$store.state.auth?.profile;
        return `${first_name} ${last_name}`;
    }
}
</script>
