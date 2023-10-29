<template>
    <div
        class="pr-3"
        :class="{'text-red-500': !value, 'text-green-500': value}"
    >
        <hero-icon :icon="icon" />
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from '@/helpers/decorators';
import HeroIcon from "@/components/common/icon/HeroIcon.vue";

@Options({
    components: { HeroIcon }
})
export default class TrueFalseIcon extends Vue {
    @Prop({default: false}) private value: boolean;

    private get icon(): string {
        return this.value ? 'check-circle' : 'x-circle';
    }
}
</script>
