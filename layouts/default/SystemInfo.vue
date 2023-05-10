<template></template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'CoreSystemInfo',
    components: {
    },
    data: () => ({
        //systemTitle: 'Loading...'
    }),
    computed: {
        ...mapState({
            systemTitle: state => state.common.systemTitle,
        })
    },
    head() {
        return {
            title: this.systemTitle.data,
            script: [{ src: '/js/jquery-3.6.3.min.js' }],
            htmlAttrs: {
                lang: this.$vuetify.lang.current,
                dir: (this.$vuetify.rtl ? 'rtl' : 'ltr')
            },
        }
    },
    async fetch() {
    },
    created() {
        this.getSystemInfo()
    },
    methods: {
        getSystemInfo() {
            this.$store.dispatch("common/getSystemInfo");
        },
    }
};
</script>