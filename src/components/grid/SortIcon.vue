<template>
    <hero-icon v-if="$attrs['is-active']" :icon="$attrs['sort-order'] === 'ASC' ? 'chevron-up' : 'chevron-down'" :size="4" />
    <hero-icon v-else :icon="'selector'" :size="4" />
</template>
