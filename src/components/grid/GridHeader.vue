<template>
    <th scope="col"
        class="px-6 py-3 text-left text-sm text-gray-500 tracking-wider cursor-pointer"
        :class="{ 'w-full': $attrs.item.actions }"
        :style="`min-width:${$attrs.item.width}px;max-width:${$attrs.item.width}px;`"
    >
        <span v-if="$attrs.item" class="flex items-center">
            {{ $attrs.item.title }}
            <template v-if="$attrs.item.sort">
                <sort-icon v-bind="$attrs" class="ml-1" />
            </template>
        </span>
    </th>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import SortIcon from "@/components/grid/SortIcon.vue";

@Options({
    components: { SortIcon }
})
export default class GridHeader extends Vue
{
}
</script>
