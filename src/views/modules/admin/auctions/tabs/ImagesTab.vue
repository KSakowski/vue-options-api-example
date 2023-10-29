<template>
    <div>
        <h3>{{ $t('Zdjęcia z aukcji') }}</h3>
        <form-file-upload
            v-model="auctionImages"
            :label="$t('Dodaj pliki')"
            :button-size="`w-48`"
            class="mb-10"
            :accept="'image/*'"
            @update:modelValue="updateForm"
        >
            <attachment-list
                v-if="auctionImageIdList.length"
                :attachments-ids="auctionImageIdList"
                @removeFile="[(files) => auctionImageIdList = files, updateForm]"
            />
        </form-file-upload>
        <h3>{{ $t('Zdjęcia z portu') }}</h3>
        <form-file-upload
            v-model="pickupImages"
            :label="$t('Dodaj pliki')"
            :button-size="`w-48`"
            :accept="'image/*'"
            @update:modelValue="updateForm"
        >
            <attachment-list
                v-if="pickupImageIdList.length"
                :attachments-ids="pickupImageIdList"
                @removeFile="[(files) => pickupImageIdList = files, updateForm]"
            />
        </form-file-upload>
    </div>
</template>


<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop, Watch } from "@/helpers/decorators";
import FieldGroup from "@/views/partials/FieldGroup.vue";
import AttachmentList from "@/views/modules/admin/auctions/partials/AttachmentList.vue";

@Options({
    components: { FieldGroup, AttachmentList }
})
export default class ImagesTab extends Vue {
    @Prop({ default: [] })
    private auctionImageIds: string[];

    @Prop({ default: [] })
    private pickupImageIds: string[];

    private auctionImages: FileList | [] = [];
    private auctionImageIdList: string[] = [];
    private pickupImages: FileList | [] = [];
    private pickupImageIdList: string[] = [];

    @Watch('auctionImageIds', { immediate: true })
    private onAuctionImageIdsChanged(): void {
        this.auctionImageIdList = this.auctionImageIds;
    }

    @Watch('pickupImageIds', { immediate: true })
    private onPickupImageIds(): void {
        this.pickupImageIdList = this.pickupImageIds;
    }

    private updateForm(): void {
        this.$emit('update:modelValue', {
            auctionImages: this.auctionImages,
            auctionImageIds: this.auctionImageIdList,
            pickupImages: this.pickupImages,
            pickupImageIds: this.pickupImageIdList,
        });
    }
}
</script>
