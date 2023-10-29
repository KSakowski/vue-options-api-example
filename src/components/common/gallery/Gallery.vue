<template>
    <div v-if="images.length">
        <div class="flex flex-wrap">
            <div
                v-for="(img, index) in images"
                :key="index"
                class="relative flex flex-col items-center w-48 h-48 mr-2 overflow-hidden text-center bg-gray-100 border rounded cursor-pointer"
                @click="() => [currentIndex = index, visible = true]"
            >
                <img :src="img.src" class="absolute inset-0 z-0 object-cover w-full h-full border-4 border-white preview" />
            </div>
        </div>
        <vue-easy-lightbox
            :visible="visible"
            :imgs="images"
            :index="currentIndex"
            @hide="visible = false"
        />
        <base-button v-if="downloadButton" class="mt-3" @click="downloadFiles">
            {{ $t('Pobierz wszystkie zdjęcia') }}
            <template #icon>
                <hero-icon v-if="!loading" :icon="'document-download'" />
                <spinner v-else :size="5" />
            </template>
        </base-button>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import VueEasyLightbox from "vue-easy-lightbox";
import { Prop } from "@/helpers/decorators";
import FileService from "@/services/file";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import Spinner from "@/components/common/loading/Spinner.vue";

@Options({
    components: { VueEasyLightbox, Spinner }
})
export default class Gallery extends Vue {
    @Prop({default: []}) images: {src: string, title: string, id?: string}[];
    @Prop({default: false}) downloadButton: boolean;
    @Prop({default: 'images'}) zipName: string;

    private visible = false;
    private currentIndex = 0;
    private loading = false;

    private async downloadFiles(): Promise<void> {
        this.loading = true;
        try {
            let zip = new JSZip();
            for (const file of this.images) {
                const id = file?.id as string;
                if(file?.id) {
                    const response = await FileService.file(id);
                    const fileName = decodeURIComponent(escape(response.headers['x-filename']));

                    const file = new Blob([response.data as Blob]);
                    zip.file(this.$filters.normalizeFileName(fileName), file);
                }
            }

            zip.generateAsync({type:"blob"}).then((content) => {
                saveAs(content, `${this.zipName}.zip`);
            });
        }
        catch (ex) {
            this.$log(ex, 'error');
            this.$alert.error(this.$t('Nie udało się pobrać załączonych zdjęć.'));
        }
        finally {
            this.loading = false;
        }
    }
}
</script>
