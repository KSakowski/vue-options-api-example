<template>
    <form :class="`grid grid-cols-1 md:grid-cols-${columns} gap-4`" @submit.prevent>
        <slot />
        <base-button :type="'submit'" @click="$emit('submit')">
            {{ $t('Filtruj') }}
            <template #icon>
                <hero-icon icon="pencil-alt" />
            </template>
        </base-button>
    </form>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import SortIcon from "@/components/grid/SortIcon.vue";
import { Prop } from "@/helpers/decorators";

@Options({
    components: { SortIcon }
})
export default class FiltersWrapper extends Vue
{
    @Prop({default: 5})
    public columns: number;
}
</script>
