<template>
    <card :full-height="true">
        <h1>{{ $t('Uprawnienia') }}</h1>
    </card>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
@Options({})
export default class Permissions extends Vue {
}
</script>
