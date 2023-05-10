<template>
    <v-footer id="core-footer" height="30">
        <v-spacer />
        <span class="font-weight-light copyright">
            &copy; {{ new Date().getFullYear() }}
            <NuxtLink to="/">CTF</NuxtLink>
        </span>
    </v-footer>
</template>

<script>
export default {
    name: 'CoreFooter',
    data: () => ({
    }),
};
</script>

<style>
#core-footer {
    z-index: 0;
}
</style>
