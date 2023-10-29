<template>
    <loading :loading="isLoading">
        <gallery class="mt-8" :images="images" />
        <p v-if="!images.length && !isLoading">
            {{ $t('Zdjęcia nie zostały jeszcze dodane.') }}
        </p>
    </loading>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from "@/helpers/decorators";
import Gallery from "@/components/common/gallery/Gallery.vue";
import {Attachments, Auction} from "@/interfaces";
import FileService from "@/services/file";
import Loading from "@/components/common/loading/Loading.vue";

@Options({
    components: {Loading, Gallery }
})
export default class DeliveryGallery extends Vue {
    @Prop() private auction: Auction;

    private images: {src: string, title: string}[] = [];
    private isLoading = true;

    public async created(): Promise<void> {
        await this.loadImages();
    }

    private async loadImages(): Promise<void> {
        try {
            const { attachments } : Auction = this.auction;
            const attachmentsIds = Object.keys((attachments as Attachments)?.pickup_images || '');

            await Promise.all(
                attachmentsIds.map(async(fileId) => {
                    await this.file(fileId);
                })
            );
        }
        catch (ex) {
            this.$log(ex);
        }
        finally
        {
            this.isLoading = false;
        }

    }

    private async file(id: string): Promise<void> {
        try {
            const { data } = await FileService.file(id);
            this.images.push({
                src: URL.createObjectURL(data),
                title: '',
            });
        }
        catch (ex) {
            this.$log(ex);
        }
    }
}
</script>
