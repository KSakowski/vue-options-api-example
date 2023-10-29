<template>
    <section class="flex items-center justify-between">
        <pagination-info :index="index" :total="total" :size="size" />
        <ul class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px rounded overflow-hidden">
            <li v-if="hasPrev()" class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <a href="#" class="px-2 py-2" @click.prevent="changePage(prevPage)">
                    <hero-icon icon="arrow-left" />
                </a>
            </li>
            <li v-if="hasFirst()" class="relative inline-flex items-center border border-gray-300 bg-white text-sm font-medium text-gray-700">
                <a href="#" class="px-3 py-2" @click.prevent="changePage(1)">
                    1
                </a>
            </li>
            <li v-if="hasFirst()" class="relative inline-flex items-center border border-gray-300 bg-white text-sm font-medium text-gray-700 px-3 py-2">
                ...
            </li>
            <li v-for="page in pages" :key="page" class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center border text-sm font-medium">
                <a href="#" class="px-3 py-2" :class="{'bg-green-500 text-white': current === page}" @click.prevent="changePage(page)">
                    {{ page }}
                </a>
            </li>
            <li v-if="hasLast()" class="relative inline-flex items-center border border-gray-300 bg-white text-sm font-medium text-gray-700 px-3 py-2">
                ...
            </li>
            <li v-if="hasLast()" class="relative inline-flex items-center border border-gray-300 bg-white text-sm font-medium text-gray-700">
                <a href="#" class="px-3 py-2" @click.prevent="changePage(totalPages)">
                    {{ totalPages }}
                </a>
            </li>
            <li v-if="hasNext()" class="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <a href="#" class="px-2 py-2" @click.prevent="changePage(nextPage)">
                    <hero-icon icon="arrow-right" />
                </a>
            </li>
        </ul>
    </section>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from "@/helpers/decorators";
import PaginationInfo from "@/components/pagination/PaginationInfo.vue";
import HeroIcon from "@/components/common/icon/HeroIcon.vue";

@Options({
    components: {HeroIcon, PaginationInfo },
    emits: ['page-changed']
})
export default class Pagination extends Vue
{
    @Prop({ default: 1 }) private index: number;
    @Prop({ default: 1 }) private total: number;
    @Prop({ default: 1 }) private size: number;
    @Prop({ default: 1 }) private pageRange: number;

    public current = 1;

    private get pages(): number[] {
        const pages = []
        for (let i = this.rangeStart; i <= this.rangeEnd; i++) {
            pages.push(i)
        }
        return pages
    }

    private get rangeStart(): number {
        const start = this.current - this.pageRange
        return (start > 0) ? start : 1
    }

    private get rangeEnd(): number {
        const end = this.current + this.pageRange
        return (end < this.totalPages) ? end : this.totalPages
    }

    private get totalPages(): number {
        return Math.ceil(this.total / this.size)
    }

    private get nextPage(): number {
        return this.current + 1;
    }

    private get prevPage(): number {
        return this.current - 1;
    }

    private hasFirst(): boolean {
        return this.rangeStart !== 1
    }

    private hasLast(): boolean {
        return this.rangeEnd < this.totalPages
    }

    private hasPrev(): boolean {
        return this.current > 1
    }

    private hasNext(): boolean {
        return this.current < this.totalPages
    }

    private changePage(page: number): void {
        if (page > 0 && page <= this.totalPages) {
            this.current = page;
            this.$emit('page-changed', page);
        }
    }

}
</script>

