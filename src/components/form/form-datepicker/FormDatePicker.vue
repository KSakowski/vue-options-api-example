<template>
    <datepicker
        locale="pl"
        :format="displayFormat"
        :model-value="modelValue"
        :enable-time-picker="false"
        :clearable="true"
        :auto-apply="true"
        :input-class-name="'pl-8 pr-3 py-2 text-sm text-gray-900 focus:border-green-500'"
        @update:modelValue="updateInput"
        @cleared="clear"
    >
        <template #clear-icon>
            <div v-if="modelValue" class="pr-2" :title="$t('Zresetuj')">
                <hero-icon icon="x" class="text-gray-500" />
            </div>
        </template>
    </datepicker>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from '@/helpers/decorators';
import  dayjs from 'dayjs';
import HeroIcon from "@/components/common/icon/HeroIcon.vue";
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

@Options({
    components: { HeroIcon, Datepicker }
})
export default class FormDatePicker extends Vue
{
    @Prop({ default: '' })
    public modelValue: string | number;

    private displayFormat = 'yyyy-MM-dd';
    private outputFormat = 'YYYY-MM-DD';

    private updateInput(event: Date): void {
        this.$emit("update:modelValue", dayjs(event).format(this.outputFormat));
    }

    private clear(): void {
        this.$emit("update:modelValue", '');
    }
}
</script>

<style>
</style>
