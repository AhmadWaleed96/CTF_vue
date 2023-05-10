<template>
    <v-app-bar id="core-app-bar" absolute app color="rgb(115, 142, 150)" flat height="60" width="75%">
        <v-toolbar-title class="font-weight-light align-self-center " color="white">
            <v-btn v-if="showBtnMnue || responsive" icon @click.stop="onClick">
                <v-icon>mdi-view-list</v-icon>
            </v-btn>
            {{ title }}
        </v-toolbar-title>

        <v-spacer />

        <v-toolbar-items >
            <v-row align="center" class="mx-0" color="white">
                <Languages />
                <ThemeMode />
                <Profile />
            </v-row>
        </v-toolbar-items>
    </v-app-bar>
</template>

<script>
// Utilities
import { mapMutations } from 'vuex';
import Languages from '@/layouts/default/Languages';
import ThemeMode from '@/layouts/default/ThemeMode';
import Profile from '@/layouts/default/Profile';

export default {
    name: 'CoreAppBar',
    components: {
        Languages,
        ThemeMode,
        Profile,
    },
    data: () => ({
        notifications: [
            'Mike, John responded to your email',
            'You have 5 new tasks',
            "You're now a friend with Andrew",
            'Another Notification',
            'Another One',
        ],
        title: null,
        showBtnMnue: true,
        responsive: false,
    }),

    watch: {
        $route(val) {
            this.title = val.name;
        },
    },

    mounted() {
        this.onResponsiveInverted();
        window.addEventListener('resize', this.onResponsiveInverted);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResponsiveInverted);
    },

    methods: {
        ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
        onClick() {
            this.setDrawer(!this.$store.state.app.drawer);
        },
        onResponsiveInverted() {
            if (window.innerWidth < 991) {
                this.responsive = true;
            } else {
                this.responsive = false;
            }
        },
    },
};
</script>

<style>
/* Fix coming in v2.0.8 */
#core-app-bar {
    width: auto;
}

#core-app-bar a {
    text-decoration: none;
}
</style>
