<template>
    <div>
        <div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2 md:gap-4">
            <field-group :width="'w-full'" :title="$t('Odprawa celna')">
                <div class="space-y-2">
                    <form-file-upload
                        v-model="customs_template"
                        :label="$t('Dodaj szablon dokumentu')"
                        :type="'document'"
                        :columns="false"
                        @update:modelValue="updateForm"
                    >
                        <attachment-list
                            v-if="customs_templateId.length"
                            :attachments-ids="customs_templateId"
                            :type="'document'"
                            @removeFile="[(files) => customs_templateId = files, updateForm]"
                        />
                    </form-file-upload>
                </div>
            </field-group>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2 md:gap-4">
            <field-group :width="'w-full'" :title="$t('Podgląd udostępnionych dokumentów')">
                <div class="space-y-2">
                    <div v-if="customsId?.length">
                        <download-file
                            v-for="item in customsId"
                            class="mb-2"
                            :key="item.uuid"
                            :title="item.file_name"
                            :file-id="item.uuid"
                        />
                    </div>

                    <download-file
                        v-else
                        :title="$t('Podgląd udostępnionego dokumentu')"
                        :file-id="''"
                        :disabled="true"
                    />
                </div>
            </field-group>
        </div>
    </div>
</template>


<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop, Watch } from "@/helpers/decorators";
import FieldGroup from "@/views/partials/FieldGroup.vue";
import AttachmentList from "@/views/modules/admin/auctions/partials/AttachmentList.vue";
import DownloadFile from "@/views/partials/DownloadFile.vue";

@Options({
    components: { FieldGroup, AttachmentList, DownloadFile }
})
export default class CustomsTab extends Vue {
    @Prop({ default: [] })
    private customsId: FileList[];

    @Prop({ default: [] })
    private customsTemplateId: string[];

    private customs_template: FileList | [] = [];
    private customs_templateId: string[] = [];

    @Watch('customsTemplateId', { immediate: true })
    private onAuctionImageIdsChanged(): void {
        this.customs_templateId = this.customsTemplateId;
    }

    private updateForm(): void {
        this.$emit('update:modelValue', {
            customs_template: this.customs_template,
            customs_templateId: this.customs_templateId,
        });
    }
}
</script>
