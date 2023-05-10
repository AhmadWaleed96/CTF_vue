<template>
    <v-menu offset-y open-on-hover>
        <template v-slot:activator="{ on, attrs }">
            <v-btn icon dark v-bind="attrs" v-on="on">
                <v-icon color="tertiary">mdi-theme-light-dark</v-icon>
            </v-btn>
        </template>
        <v-list>
            <v-list-item v-for="(mode, index) in modes" :key="index" link @click="changeMode(mode)">
                <v-list-item-title>{{ mode }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
export default {
    name: 'CoreThemeMode',
    data: () => ({
        modes: [
            'light',
            'dark',
        ],
    }),
    methods: {
        async changeMode(mode) {
            if (mode != null) {
                const isDark=mode=='dark';
                this.$vuetify.theme.dark=isDark
                localStorage.darkMode = isDark;
            }
        },
    },
};
</script>
