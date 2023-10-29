<template>
    <div class="grid sm:grid-cols-1 md:grid-cols-2 gap-2 mb-2">
        <div class="">
            {{ title }}:
        </div>
        <div class="font-bold">
            <slot />
        </div>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from '@/helpers/decorators';
import HeroIcon from "@/components/common/icon/HeroIcon.vue";

@Options({
    components: { HeroIcon }
})
export default class DetailsLabel extends Vue {
    @Prop({default: ''}) private title: string;
}
</script>
