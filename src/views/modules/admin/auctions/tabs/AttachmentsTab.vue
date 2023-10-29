<template>
    <div>
        <div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2 md:gap-4">
            <field-group :width="'w-full'" :title="$t('CARFAX')">
                <div class="space-y-2">
                    <form-file-upload
                        v-model="car_fax_template"
                        :label="$t('Dodaj CARFAX')"
                        :type="'document'"
                        :columns="false"
                        @update:modelValue="updateForm"
                    >
                        <attachment-list
                            v-if="car_fax_templateId.length"
                            :attachments-ids="car_fax_templateId"
                            :type="'document'"
                            @removeFile="[(files) => car_fax_templateId = files, updateForm]"
                        />
                    </form-file-upload>
                </div>
            </field-group>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2 md:gap-4">
            <field-group :width="'w-full'" :title="$t('Załączniki')">
                <div class="space-y-2">
                    <form-file-upload
                        v-model="attachments"
                        :label="$t('Dodaj załączniki')"
                        :type="'document'"
                        :columns="false"
                        @update:modelValue="updateAttachments"
                    >
                        <attachment-list
                            v-if="attachmentsIdList.length"
                            :attachments-ids="attachmentsIdList"
                            :type="'document'"
                            @removeFile="[(files) => attachmentsIdList = files, updateAttachments]"
                        />
                    </form-file-upload>
                    <!--<p class="text-sm text-gray-900 small">{{ $t('Max 3 załączniki') }}</p>-->
                    <p v-if="errors && errors.first('files.attachments')" class="text-red-500">
                        {{ errors.first('files.attachments') }}
                    </p>
                </div>
            </field-group>
        </div>
    </div>
</template>


<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import FieldGroup from "@/views/partials/FieldGroup.vue";
import { Prop, Watch } from "@/helpers/decorators";
import AttachmentList from "@/views/modules/admin/auctions/partials/AttachmentList.vue";
import Errors from "@/helpers/errors";

@Options({
    components: { FieldGroup, AttachmentList }
})
export default class AttachmentsTab extends Vue {
    @Prop({ default: [] })
    private carFaxId: string[];

    @Prop({ default: [] })
    private attachmentsIds: string[];

    @Prop({ default: null })
    private errors: Errors;

    private car_fax_template: FileList | [] = [];
    private car_fax_templateId: string[] = [];

    private attachments: FileList | [] = [];
    private attachmentsIdList: string[] = [];

    @Watch('carFaxId', { immediate: true })
    private onAuctionImageIdsChanged(): void {
        this.car_fax_templateId = this.carFaxId;
    }

    @Watch('attachmentsIds', { immediate: true })
    private onAttachmentsIdsChanged(): void {
        this.attachmentsIdList = this.attachmentsIds;
    }

    private updateForm(): void {
        this.$emit('update:modelValue', {
            car_fax_template: this.car_fax_template,
            car_fax_templateId: this.car_fax_templateId,
        });
    }

    private updateAttachments(): void {
        this.$emit('update:attachments', {
            attachments: this.attachments,
            attachmentsIds: this.attachmentsIdList,
        });
    }
}
</script>
