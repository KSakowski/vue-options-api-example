<template>
    <loading :loading="isLoading">
        <div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2 md:gap-4">
            <field-group :width="'w-full'">
                <div class="space-y-2">
                    <template v-if="fileId && fileId.length">
                        <download-file
                            v-for="(file, index) in fileId" :key="index"
                            :title="file.file_name"
                            :file-id="file.uuid"
                            :file-name="file.file_name"
                        />
                    </template>
                    <template v-else>
                        <download-file
                            :title="$t('Pobierz szablon dokumentu')"
                            :file-id="''"
                            :file-name="''"
                            :disabled="true"
                        />
                    </template>
                    <div class="pb-24"></div>
                    <form-file-upload
                        v-model="customs"
                        :label="$t('Załącz udostępniony dokument')"
                        :type="'document'"
                        :columns="false"
                    >
                        <attachment-list
                            v-if="customsId.length"
                            :attachments-ids="customsId"
                            :type="'document'"
                            @removeFile="[(files) => customsId = files]"
                        />
                    </form-file-upload>
                </div>
            </field-group>
        </div>
        <button-group :variant="'end'">
            <base-button @click="saveCustomsData">
                {{ $t('Zapisz') }}
                <template #icon>
                    <hero-icon icon="check" />
                </template>
            </base-button>
        </button-group>
    </loading>
</template>


<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import FieldGroup from "@/views/partials/FieldGroup.vue";
import { Prop } from "@/helpers/decorators";
import {Auction, OtherFile} from "@/interfaces";
import DetailsLabel from "@/views/partials/DetailsLabel.vue";
import DownloadFile from "@/views/partials/DownloadFile.vue";
import AuthService from "@/services/auth";
import AttachmentList from "@/views/modules/admin/auctions/partials/AttachmentList.vue";

@Options({
    components: {
        FieldGroup,
        DetailsLabel,
        DownloadFile,
        AttachmentList,
    }
})
export default class Customs extends Vue {
    @Prop() private auction: Auction;

    private customs: FileList | [] = [];
    private customsId: string[] = [];
    private isLoading = true;

    private get auctionId(): string {
        return this.auction?.id?.toString() || '';
    }

    private get fileId(): OtherFile[] {
        const attachments = this.auction?.attachments?.customs_template || [];
        return Object.values(attachments) || [];
    }

    private get fileName(): string{
        return this.auction?.attachments?.customs_template?.file_name || "";
    }

    public async created(): Promise<void> {
        await this.loadCustomsData();
    }

    private async loadCustomsData(): Promise<void> {
        if (!this.auctionId)
            return;

        try {
            const { data } = await AuthService.customsData(this.auctionId);
            this.customsId = Object.keys(data?.attachments?.customs || {});
        }
        catch (ex) {
            this.$log(ex);
        }
        finally {
            this.isLoading = false;
        }
    }

    private async saveCustomsData(): Promise<void> {
        this.isLoading = true;

        try {
            const data = new FormData();
            data.append('_method', 'PUT');
            Array.from(this.customs).map((file: File) => data.append('files[customs][]', file));
            this.$filters.formatAttachmentsIds(data, this.customsId, 'customs[]');
            await AuthService.updateCustomsData(this.auctionId, data);
            this.$alert.success(this.$t('Zmiany zostały zapisane.'));
        }
        catch (ex) {
            this.$alert.error(this.$t('Nie wszystkie pola zostały wypełnione prawidłowo.'));
        }
        finally {
            this.isLoading = false;
        }
    }
}
</script>
