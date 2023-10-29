<template>
    <nav v-if="sitemap" class="mt-10 text-sm">
        <div v-for="(item, index) in sitemap" :key="index">
            <router-link
                v-slot="{ href, navigate, isActive }"
                :to="formatLink(item)"
                custom
            >
                <a
                    class="flex items-center px-4 py-3 mx-3 my-1 rounded-lg duration-200 hover:bg-gray-800"
                    :class="[isActive && 'bg-gray-800']"
                    :href="href"
                    @click="navigate"
                >
                    <hero-icon :icon="item.icon" />
                    <span class="mx-3">{{ item.displayName }}</span>
                </a>
            </router-link>
        </div>
    </nav>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Sitemap } from "@/settings/sitemap";
import { Roles } from "@/settings/enums";
import { NavigationItem } from "@/interfaces/sitemap";

@Options({})
export default class Navigation extends Vue {

    private get defaultSitemap(): boolean {
        return !!(this.$route.meta?.defaultSitemap);
    }

    private get sitemap(): NavigationItem[] {
        if (!this.$auth.isLoggedIn()) {
            return [];
        }
        const role = this.$auth.isAdmin() ? Roles.admin : Roles.user;
        return this.defaultSitemap && !this.$auth.isAdmin() ? Sitemap['default'] : Sitemap[role];
    }

    private formatLink(item: NavigationItem): string {
        return this.defaultSitemap && !this.$auth.isAdmin() ?
            item.path :
            item.path.replace('{id}', this.$route?.params[item?.params?.key || '']?.toString());
    }
}
</script>
