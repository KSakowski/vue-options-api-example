<template>
    <td class="px-6 py-2 whitespace-nowrap text-left">
        <slot />
    </td>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
})
export default class GridCell extends Vue
{
}
</script>
