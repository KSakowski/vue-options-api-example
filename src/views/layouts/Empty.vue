<template>
    <router-view v-slot="{ Component }">
        <transition
            name="fade"
            mode="out-in"
        >
            <component
                :is="Component"
                :key="$route.path"
            />
        </transition>
    </router-view>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
})
export default class EmptyLayout extends Vue {
}
</script>
