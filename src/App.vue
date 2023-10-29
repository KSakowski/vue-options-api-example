<template>
    <router-view v-slot="{ Component }" class="font-sans" :style="{ height: `${bodyHeight}px` }">
        <transition
            name="fade"
            mode="out-in"
        >
            <component
                :is="Component"
            />
        </transition>
    </router-view>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { useWindowSize } from "vue-window-size";

@Options({
})
export default class App extends Vue {
    private get bodyHeight(): number {
        const { height } = useWindowSize();
        return height.value;
    }
}
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

</style>
