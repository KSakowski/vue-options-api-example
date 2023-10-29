<template>
    <div class="relative h-full">
        <card class="mb-5">
            <filters-wrapper @submit="getUsers">
                <form-group :label="$t('Imię')">
                    <form-input v-model="filter.first_name" />
                </form-group>
                <form-group :label="$t('Nazwisko')">
                    <form-input v-model="filter.last_name" />
                </form-group>
                <form-group :label="$t('E-mail')">
                    <form-input v-model="filter.email" />
                </form-group>
            </filters-wrapper>
        </card>
        <grid
            :items="users"
            :loading="isLoading"
            @sort-changed="({sort, order}) => [
                pager.sort = sort,
                pager.order = order,
                getUsers()
            ]"
            @rowClick="({id}) => $router.push({name: 'admin-user-details', params: { id: id }})"
        >
            <template #row="{item}">
                <grid-cell :title="$t('Imię i nazwisko')" :sort="'last_name'" :width="220">
                    <div class="flex items-center">
                        <avatar :username="`${item.first_name} ${item.last_name}`" :size="24" :font-size="12" />
                        <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">
                                {{ item.first_name }} {{ item.last_name }}
                            </div>
                        </div>
                    </div>
                </grid-cell>
                <grid-cell :title="$t('E-mail')" :sort="'email'">
                    <div class="text-sm text-gray-500">
                        {{ item.email }}
                    </div>
                </grid-cell>
                <grid-cell :title="$t('Data rejestracji')" :sort="'created_at'" :width="220">
                    <div class="text-sm text-gray-500">
                        {{ $filters.dateTime(item.created_at) }}
                    </div>
                </grid-cell>
                <grid-cell class="flex justify-end items-center" :actions="true">
                    <button class="text-green-500 hover:text-green-900" @click="$router.push({name: 'admin-user-details', params: { id: item.id }})">
                        <hero-icon icon="pencil-alt" :size="'6'" />
                    </button>
                </grid-cell>
            </template>
            <template #footer>
                <pagination
                    :index="pager.page"
                    :total="pager.total"
                    :size="pager.perPage"
                    @page-changed="page => [pager.page = page, getUsers()]"
                />
            </template>
        </grid>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import AdminService from "@/services/admin";
import { UserModel } from "@/interfaces";
import Pager from "@/helpers/pager";
import { Filter } from "@/interfaces/pager";
import FiltersWrapper from "@/views/partials/FiltersWrapper.vue";

@Options({
    components: { FiltersWrapper }
})
export default class UsersList extends Vue {
    private users: UserModel[] = [];
    private pager: Pager = new Pager(1, 10, '', 'ASC');
    private filter: Filter = {
        first_name: '',
        last_name: '',
        email: '',
        role: 'client'
    };
    private isLoading = true;

    public async created(): Promise<void> {
        await this.getUsers();
    }

    private async getUsers(): Promise<void> {
        this.isLoading = true;
        try {
            const { data, meta } = await AdminService.users(this.pager.data(), this.$filters.removeFalsy(this.filter));
            this.users = data;
            this.pager.setMeta(meta);
        }
        catch {
            this.$alert.error(this.$t('Nie udało się wczytać listy użytkowników.'));
        }
        finally {
            this.isLoading = false;
        }
    }
}
</script>
