<template>
    <div>
        <div class="flex flex-wrap">
            <slot />
            <component
                :is="type"
                v-for="{id, src, name, size} in thumbnails"
                :id="id"
                :key="src"
                :name="name"
                :src="src"
                :size="size"
                :thumb-size="thumbSize"
                @removeFile="(name) => removeFile(name)"
            />
        </div>
        <label
            class="flex justify-center items-center btn btn-primary cursor-pointer"
            :class="buttonSize"
        >
            <span class="mr-2">{{ label }}</span>
            <hero-icon :icon="'document-add'" />
            <input ref="upload" type="file" class="hidden" :multiple="multiple" :accept="accept" @change="selectFile" @click="reset">
        </label>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from '@/helpers/decorators';
import Thumbnail from "@/components/form/form-file-upload/Thumbnail.vue";
import Document from "@/components/form/form-file-upload/Document.vue";
import { FileThumbnail } from "@/interfaces";

@Options({
    components: { Thumbnail, Document }
})
export default class FormFileUpload extends Vue
{
    @Prop({ default: '' })
    public modelValue: File[];

    @Prop({ default: '' })
    public label: string;

    @Prop({ default: '' })
    public buttonSize: string;

    @Prop({ default: true })
    public multiple: boolean;

    @Prop({ default: true })
    public columns: boolean;

    @Prop({ default: '' })
    public thumbSize: string;

    @Prop({ default: 'thumbnail' })
    private type: string;

    @Prop({ default: '' })
    private accept: string;

    private selectedFiles: File[] = [];

    $refs!: {
        upload: HTMLInputElement
    }

    private get thumbnails(): FileThumbnail[] {
        if (!this.modelValue) return [];

        const thumbnails = Array.from(this.modelValue).map( (file: File, index) => {
            return {
                id: index.toString(),
                name: file.name,
                src: URL.createObjectURL(file),
                size: file.size,
            }
        } );

        return thumbnails;
    }

    private selectFile(event: Event): void {
        const target = event.target as HTMLInputElement;
        const files = target.files as FileList;
        this.selectedFiles.push(...files);

        let fileWarning = false;
        const maxFileSizeInMB = 20;
        this.selectedFiles.forEach(item => {
            fileWarning = (item.size / 1024 / 1024) > maxFileSizeInMB;
        });

        if (fileWarning)
            this.$alert.warning(this.$t('Maksymalny dopuszczalny rozmiar pliku to 20MB'))

        this.$emit("update:modelValue", this.multiple ? this.selectedFiles : files);
    }

    private removeFile(fileName: string): void {
        const files = Array.from(this.modelValue).filter((file: File) => file.name !== fileName);
        this.selectedFiles = files;
        this.$emit("update:modelValue", files);
    }

    reset(): void {
        this.$refs.upload.value = '';
    }
}
</script>
