<template>
    <div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2 md:gap-4">
        <field-group :width="'w-full'">
            <div class="space-y-2">
                <download-file
                    :title="$t('Pobierz CARFAX')"
                    :file-id="fileId"
                    :file-name="fileName"
                    :disabled="!fileId"
                />
                <template v-if="attachments && attachments.length">
                    <download-file
                        v-for="(file, index) in attachments" :key="index"
                        :title="`${$t('Pobierz załącznik')} ${index + 1}`"
                        :file-id="file.uuid"
                        :file-name="file.file_name"
                    />
                </template>
            </div>
        </field-group>
    </div>
</template>


<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import FieldGroup from "@/views/partials/FieldGroup.vue";
import {Prop} from "@/helpers/decorators";
import {Auction, OtherFile} from "@/interfaces";
import DownloadFile from "@/views/partials/DownloadFile.vue";

@Options({
    components: {
        FieldGroup,
        DownloadFile,
    }
})
export default class CarFax extends Vue {
    @Prop() private auction: Auction;

    private get fileId(): string{
        const carFax = this.auction?.attachments?.car_fax || null;
        const [id] = carFax ? Object.keys(carFax) : "";
        return id;
    }

    private get fileName(): string{
        const carFax = this.auction?.attachments?.car_fax || null;
        const [id] = carFax ? Object.keys(carFax) : "";
        return (this.auction?.attachments?.car_fax as Record<string, any>)[id]?.file_name || "";
    }

    private get attachments(): OtherFile[] {
        const attachments = this.auction?.attachments?.attachments || [];
        return Object.values(attachments) || [];
    }
}
</script>
