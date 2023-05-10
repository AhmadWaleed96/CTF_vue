<template>

    <v-card class="v-card-profile" v-if="authenticator.succeeded">
        <v-card-text class="text-center">
            <h6 class="overline mb-3">
                كود الإعداد اليدوي: {{ authenticator.data.manualEntryKey }}
            </h6>
            <v-card-img class="card-generate">
              <v-img lazy-src="https://picsum.photos/id/11/10/6" max-height="150" max-width="150"
                :src="authenticator.data.qrCodeSetupImageUrl">
              </v-img>
            </v-card-img>
        </v-card-text>
    </v-card>


</template>

<script>
export default {
    components: {
    },
    data() {
        return {
            authenticator: {},
        };
    },
    created() {
        this.getAuthenticator()
    },
    async fetch() {
    },
    methods: {
        async getAuthenticator() {
            this.authenticator = await this.$store.dispatch("account/getAuthenticator");
            if (!this.authenticator.succeeded) {
                this.$getToastify(this.authenticator)
            }
        },
    },
};
</script>
