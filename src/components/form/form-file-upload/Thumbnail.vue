<template>
    <div
        class="relative flex flex-col items-center w-48 h-48 mr-2 mb-2 overflow-hidden text-center bg-gray-100 border rounded select-none"
        style="min-height: 200px"
    >
        <button class="absolute top-0 right-0 z-50 p-1 bg-white rounded-bl focus:outline-none hover:bg-red-600 hover:text-white" type="button" @click="$emit('removeFile', name)">
            <hero-icon :icon="'trash'" />
        </button>
        <!--<button class="absolute top-0 right-7 z-50 p-1 bg-white rounded-bl focus:outline-none hover:bg-green-500 hover:text-white" type="button" @click="downloadFile">
            <hero-icon :icon="'document-download'" />
        </button>-->
        <img
            v-if="!error"
            :src="src"
            class="absolute inset-0 z-0 object-cover w-full h-full border-4 border-white preview"
            :class="{'border-red-500': (size / 1024 / 1024) > 20 }"
            @error="error = true"
        >
        <div v-else class="absolute top-4 left-1/2 transform -translate-x-1/2 text-gray-50">
            <hero-icon :icon="'document'" :size="32" />
        </div>
        <div class="absolute bottom-0 left-0 right-0 flex flex-col p-2 text-xs bg-white bg-opacity-50">
            <span class="w-full font-bold text-gray-900 truncate">{{ name }}</span>
            <span class="text-xs text-gray-900">{{ $filters.fileSize(size) }}</span>
        </div>
        <div class="absolute inset-0 z-40 transition-colors duration-300"></div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from "@/helpers/decorators";
import HeroIcon from "@/components/common/icon/HeroIcon.vue";

@Options({
    components: { HeroIcon },
    emits: ['removeFile']
})
export default class Thumbnail extends Vue {
    @Prop({ default: '' })
    private id: string;

    @Prop({ default: '' })
    private src: string;

    @Prop({ default: '' })
    private name: string;

    @Prop({ default: 0 })
    private size: number;

    @Prop({ default: '' })
    private thumbSize: string;

    private error = false;
}
</script>
