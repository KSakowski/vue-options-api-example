<template>
    <component
        :is="type"
        v-for="{src, name, id, size} in thumbnails"
        :id="id"
        :key="src"
        :name="name"
        :src="src"
        :size="size"
        @removeFile="(id) => removeFile(id)"
    />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from "@/helpers/decorators";
import FileService from "@/services/file";
import Thumbnail from "@/components/form/form-file-upload/Thumbnail.vue";
import Document from "@/components/form/form-file-upload/Document.vue";
import { FileThumbnail } from "@/interfaces";

@Options({
    components: { Thumbnail, Document },
    emits: ['removeFile']
})
export default class AttachmentList extends Vue {
    @Prop({ default: [] })
    private attachmentsIds: string[];

    @Prop({ default: 'thumbnail' })
    private type: string;

    private thumbnails: FileThumbnail[] = [];

    public async created(): Promise<void> {
        await this.loadFiles();
    }

    private async loadFiles(): Promise<void>
    {
        if (!this.attachmentsIds) return;

        this.attachmentsIds.map(async(thumbnail) => {
            await this.file(thumbnail);
        });
    }

    private async file(id: string): Promise<void> {
        if (!id)
            return;

        try {
            const response = await FileService.file(id);
            const fileName = response.headers['x-filename'];
            this.thumbnails.push({
                id: id,
                src: URL.createObjectURL(response.data),
                size: response.data.size,
                name: decodeURIComponent(escape(fileName)),
            });
        }
        catch (ex) {
            this.$log(ex);
        }
    }

    private removeFile(fileName: string): void {
        this.thumbnails = this.thumbnails.filter((file: FileThumbnail) => file.name !== fileName);
        this.$emit("removeFile", this.thumbnails.map(file => file.id));
    }
}
</script>
