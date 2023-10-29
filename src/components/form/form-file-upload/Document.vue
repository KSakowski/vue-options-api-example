<template>
    <div class="text-center flex w-full mb-2">
        <base-button :size="'full'" class="rounded-r-none overflow-ellipsis max-w-a" @click="downloadFile">
            <span class="max-w-auto truncate" :title="$filters.normalizeFileName(name)">
                {{ $filters.normalizeFileName(name) }}
            </span>
            <template #icon>
                <hero-icon v-if="!isLoading" :icon="'document-download'" />
                <spinner v-else :size="5" />
            </template>
        </base-button>
        <base-button
            class="rounded-l-none px-2 max-w-b"
            :size="'full'"
            :variant="'danger'"
            @click="$emit('removeFile', name)"
        >
            <hero-icon :icon="'trash'" />
        </base-button>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from "@/helpers/decorators";
import HeroIcon from "@/components/common/icon/HeroIcon.vue";
import FileService from "@/services/file";
import BaseButton from "@/components/common/button/BaseButton.vue";
import { saveAs } from "file-saver";

@Options({
    components: {BaseButton, HeroIcon },
    emits: ['removeFile']
})
export default class DocumentAttachment extends Vue {
    @Prop({ default: '' })
    private id: string;

    @Prop({ default: '' })
    private src: string;

    @Prop({ default: '' })
    private name: string;

    @Prop({ default: 0 })
    private size: number;

    private isLoading = false;

    private async downloadFile(): Promise<void> {
        if (!this.id || this.id === '0')
            return;

        this.isLoading = true;

        try {
            const response = await FileService.file(this.id);
            const file = new Blob([response.data as Blob]);
            saveAs(file, this.$filters.normalizeFileName(this.name));
        }
        catch (ex) {
            this.$log(ex, 'error');
        }
        finally {
            this.isLoading = false;
        }
    }

}
</script>

<style>
.max-w-a {
    max-width: calc(100% - 35px);
}
.max-w-b {
    max-width: 35px;
}
</style>
