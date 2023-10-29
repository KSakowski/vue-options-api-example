<template>
    <div class="relative flex flex-col items-center text-center" :class="{'lg:flex-col-reverse': isEven}">
        <div
            class="hidden lg:block h-40 z-10"
            :class="isEven ? 'pt-10' : ''"
        >
            <div class="bg-white">
                <img :src="item.icon" width="48" height="48" />
            </div>
        </div>
        <div class="relative w-16 h-16 bg-gray-400 rounded-full border-4 border-white shadow z-10" :class="{'lg:mb-20': isEven, 'bg-green-500' : isActive}">
            <span class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg text-white font-bold">
                0{{ step }}
            </span>
        </div>
        <div class="lg:h-40 z-10">
            <div class="bg-white pt-4" :class="{'lg:pt-12': isEven}">
                <span class="block text-2xl text-green-500">
                    {{ item.title }}
                </span>
                <span class="xl:text-base font-light text-gray-400">{{ item.description }}</span>
            </div>
        </div>
        <div
            class="hidden lg:block h-32 border border-gray-400 absolute left-1/2 transform -translate-x-1/2"
            :class="isEven ? 'bottom-32' : 'top-10'"
            style="width: 1px;"
        >
            <div
                class="w-4 h-4 absolute left-1/2 transform -translate-x-1/2 bg-green-500 rounded-full border-2 border-white shadow-lg"
                :class="isEven ? 'bottom-0' : 'top-2'"
            ></div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from "@/helpers/decorators";

@Options({
    components: {}
})
export default class StatusItem extends Vue {
    @Prop() private item: {step: number, title: string, description: string, icon: string};
    @Prop({default: 0}) private active: number;
    @Prop({default: 0}) private step: number;

    private get isEven(): boolean {
        return this.step % 2 === 0;
    }

    private get isActive(): boolean {
        return this.active >= this.step;
    }
}
</script>
