<template>
    <base-button :size="'full'" :disabled="disabled" @click="downloadFile">
        {{ title }}
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
import { saveAs } from 'file-saver';
import Spinner from "@/components/common/loading/Spinner.vue";
import AuthService from "@/services/auth";

@Options({
    components: {
        FieldGroup,
        DetailsLabel,
        Spinner,
    }
})
export default class DownloadInvoice extends Vue {
    @Prop({default: ''}) private title: string;
    @Prop({default: ''}) private invoiceUrl: string;
    @Prop({default: ''}) private fileName: string;
    @Prop({default: false}) private disabled: boolean;
    @Prop({default: 'document-download'}) private icon: string;
    @Prop({default: 'application/pdf'}) private type: string;

    private isLoading = false;

    private async downloadFile(): Promise<void> {
        if (!this.invoiceUrl)
            return;

        this.isLoading = true;

        try {
            const response = await AuthService.invoiceFile(this.invoiceUrl);
            const file = new Blob([response.data as Blob]);
            saveAs(file, this.fileName);
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
