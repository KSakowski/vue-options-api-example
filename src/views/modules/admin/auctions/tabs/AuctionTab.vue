<template>
    <div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2 md:gap-4">
        <field-group :width="'w-full'" :title="$t('Dane aukcji')">
            <form-group :label="$t('Marka')" :error="form.errors.first('brand')" required>
                <form-input v-model="form.brand" @input="updateForm" />
            </form-group>
            <form-group :label="$t('Model')" :error="form.errors.first('model')" required>
                <form-input v-model="form.model" @input="updateForm" />
            </form-group>
            <form-group :label="$t('Rocznik')" :error="form.errors.first('year')" required>
                <form-input v-model="form.year" type="number" @input="updateForm" />
            </form-group>
            <form-group :label="$t('VIN')" :error="form.errors.first('vin')" required>
                <form-input v-model="form.vin" @input="updateForm" />
            </form-group>
            <form-group :label="$t('Data zakupu')" :error="form.errors.first('purchased_at')" required>
                <form-date-picker v-model="form.purchased_at" @update:modelValue="updateForm" />
            </form-group>
        </field-group>
    </div>
</template>


<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import {Prop, Watch} from "@/helpers/decorators";
import Form from "@/helpers/form";
import FieldGroup from "@/views/partials/FieldGroup.vue";
import { AuctionCreate } from "@/interfaces";
import Errors from "@/helpers/errors";

@Options({
    components: { FieldGroup },
    emits: ['update:modelValue'],
})
export default class AuctionTab extends Vue {
    @Prop({ default: null })
    private auctionData: AuctionCreate;

    @Prop({ default: null })
    private errors: Errors;

    private form: Form<AuctionCreate> = new Form({
        brand: "",
        model: "",
        year: "",
        vin: "",
        purchased_at: "",
    });

    @Watch('auctionData', { immediate: true })
    private onAuctionDataChanged(): void {
        this.form.setData(this.auctionData);
        this.form.errors = this.errors;
    }

    private updateForm(): void {
        this.$emit('update:modelValue', this.form.data());
    }
}
</script>
