<template>
    <section v-if="auction" class="auction">
        <user-breadcrumbs :title="auctionTitle" />
        <card>
            <h2>{{ title }}</h2>
            <router-view v-slot="{ Component }">
                <transition
                    name="fade"
                    mode="out-in"
                >
                    <component
                        :is="Component"
                        :key="$route.path"
                        :auction="auction"
                        @reload="auctionDetails"
                    />
                </transition>
            </router-view>
        </card>
    </section>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import DashboardComponent from "@/views/layouts/dasbhoard/components/Layout.vue";
import { Prop } from "@/helpers/decorators";
import { Auction } from "@/interfaces";
import { NavigationItem } from "@/interfaces/sitemap";
import { Sitemap } from "@/settings/sitemap";
import AuthService from "@/services/auth";
import UserBreadcrumbs from "@/views/partials/UserBreadcrumbs.vue";

@Options({
    components: { UserBreadcrumbs, DashboardComponent }
})
export default class UserDashboardLayout extends Vue {
    @Prop({default: true}) sidebar: boolean;
    @Prop({default: true}) showAuctionTitle: boolean;

    private auction: Auction | null = null;

    private get auctionId(): string {
        return this.$route.params?.auctionId?.toString() || "";
    }

    private get title(): string {
        const sitemap: NavigationItem[] = Sitemap.user;
        const path: string = this.$route.path;
        const title: NavigationItem | null = sitemap.find((item: NavigationItem) => item.path.split("/").pop() === path.split("/").pop() ) || null;
        return title?.displayName || "";
    }

    private get auctionTitle(): string {
        return this.auction ? `${this.auction.brand} ${this.auction.model}` : ``;
    }

    public async created(): Promise<void> {
        await this.auctionDetails();
    }

    private async auctionDetails(): Promise<void> {
        try {
            const { data } = await AuthService.auctionDetails(this.auctionId);
            this.auction = data;
        }
        catch (ex) {
            this.$log(ex);
        }
    }
}
</script>
