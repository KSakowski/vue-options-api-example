<template>
    <base-button :size="'full'" @click="downloadFile">
        <span v-if="normalizeName" class="max-w-xs truncate" :title="$filters.normalizeFileName(title)">
            {{ $filters.normalizeFileName(title) }}
        </span>
        <span v-else>{{ title }}</span>
        <template #icon>
            <hero-icon v-if="!isLoading" :icon="icon" />
            <spinner v-else :size="5" />
        </template>
    </base-button>
</template>


<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import FieldGroup from "@/views/partials/FieldGroup.vue";
import { Prop } from "@/helpers/decorators";
import DetailsLabel from "@/views/partials/DetailsLabel.vue";
import FileService from "@/services/file";
import { saveAs } from 'file-saver';
import Spinner from "@/components/common/loading/Spinner.vue";

@Options({
    components: {
        FieldGroup,
        DetailsLabel,
        Spinner,
    }
})
export default class DownloadFile extends Vue {
    @Prop({default: ''}) private title: string;
    @Prop({default: ''}) private fileId: string;
    @Prop({default: ''}) private fileName: string;
    @Prop({default: 'document-download'}) private icon: string;
    @Prop({default: 'application/pdf'}) private type: string;
    @Prop({default: true}) private normalizeName: boolean;

    private isLoading = false;

    private async downloadFile(): Promise<void> {
        if (!this.fileId)
            return;

        this.isLoading = true;

        try {
            const response = await FileService.file(this.fileId);
            const fileName = decodeURIComponent(escape(response.headers['x-filename']));

            const file = new Blob([response.data as Blob]);
            saveAs(file, this.$filters.normalizeFileName(this.fileName || fileName));
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
