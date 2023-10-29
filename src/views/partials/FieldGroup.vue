<template>
    <div>
        <h3 v-if="title">
            {{ title }}
        </h3>
        <div :class="width">
            <div :class="`my-8 space-y-6 lg:pl-${padding}`">
                <slot />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import SortIcon from "@/components/grid/SortIcon.vue";
import { Prop } from "@/helpers/decorators";

@Options({
    components: { SortIcon }
})
export default class FieldGroup extends Vue
{
    @Prop({default: ''})
    public title: string;

    @Prop({default: 10})
    public padding: number;

    @Prop({default: 'lg:w-1/2 xl:w-1/4'})
    public width: string;
}
</script>
