<template>
    <div class="relative flex flex-col bg-white shadow overflow-x-auto border-b border-gray-200 sm:rounded-lg custom-scroll">
        <loading :loading="loading">
            <transition
                name="fade"
                mode="out-in"
            >
                <table v-show="items.length" class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <grid-header
                                v-for="item in headers" :key="item"
                                :item="item"
                                :is-active="sortKey === item.sort"
                                :sort-key="sortKey"
                                :sort-order="sortOrder"
                                @click="sortBy(item.sort)"
                            />
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        <tr v-for="item in items" :key="item" class="hover:bg-gray-50 cursor-pointer" @click="$emit('rowClick', item)">
                            <slot name="row" :item="item"></slot>
                        </tr>
                    </tbody>
                </table>
            </transition>
            <div v-show="noResults" class="py-28">
                {{ $t('Nie znaleziono wyników') }}
            </div>
        </loading>
        <div class="mt-auto bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
            <slot name="footer" />
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from "@/helpers/decorators";
import GridHeader from "@/components/grid/GridHeader.vue";
import { GridHeaderItem } from "@/interfaces";

@Options({
    emits: ['sortChanged', 'rowClick'],
    components: { GridHeader },
})
export default class Grid extends Vue
{
    @Prop({ default: [] }) private items: {[prop: string]: unknown }[];
    @Prop({ default: '' }) private title: string;
    @Prop({ default: true }) private loading: boolean;

    private headers: GridHeaderItem[] = [];
    private sortKey = "";
    private sortOrder = "ASC";

    public created(): void {
        const slots: Readonly<{[key: string]: any}> = this.$slots;
        const props = slots?.row({ title: this.title });
        this.headers = props.map( (item: {[key: string]: string}) => item.props );
    }

    private get sort(): {sort: string, order: string} {
        return { sort: this.sortKey, order: this.sortOrder }
    }

    private sortBy(key = ''): void {
        if (this.sortKey === key)
            this.sortOrder = this.sortOrder === "ASC" ? "DESC" : "ASC";
        else
            this.sortOrder = "ASC";

        this.sortKey = key;

        this.$emit('sortChanged', this.sort);
    }

    private get noResults(): boolean {
        return !this.items.length && !this.loading;
    }

}
</script>

