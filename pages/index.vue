<template>
    <v-container fill-height fluid>
        <v-row justify="center">
            <v-col md="12">
                <TwoFactorAuthenticator />

            </v-col>
            <v-col md="12">
                <v-card>
                    <div class="captionFontType">.captionFontType:<span class="mx-3">{{ userSetting.captionFontType }}</span></div>
                    <div class="fieldFontType">.fieldFontType:<span class="mx-3">{{ userSetting.fieldFontType }}</span></div>
                    <div class="captionFontSize">.captionFontSize:<span class="mx-3">{{ userSetting.captionFontSize }}</span></div>
                    <div class="captionFontColor">.captionFontColor:<span class="mx-3">{{ userSetting.captionFontColor }}</span></div>
                    <div class="mandatoryFieldBgColor">.mandatoryFieldBgColor:<span class="mx-3">{{ userSetting.mandatoryFieldBgColor }}</span></div>
                    <div class="notMandatoryFieldBgColor">.notMandatoryFieldBgColor:<span class="mx-3">{{ userSetting.notMandatoryFieldBgColor }}</span></div>
                    <div class="fieldFontSize">.fieldFontSize:<span class="mx-3">{{ userSetting.fieldFontSize }}</span></div>
                    <div class="fieldFontColor">.fieldFontColor:<span class="mx-3">{{ userSetting.fieldFontColor }}</span></div>
                    <div class="captionBold">.captionBold:<span class="mx-3">{{ userSetting.captionBold }}</span></div>
                    <div class="fieldFontBold">.fieldFontBold:<span class="mx-3">{{ userSetting.fieldFontBold }}</span></div>
                    <div class="screenHieght">.screenHieght:<span class="mx-3">{{ userSetting.screenHieght }}</span></div>
                    <div class="gridWidth">.gridWidth:<span class="mx-3">{{ userSetting.gridWidth }}</span></div>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import TwoFactorAuthenticator from '@/components/account/twoFactorAuthenticator'

export default {
    components: {
        TwoFactorAuthenticator,
    },
    data() {
        return {
            userSetting: {}
        };
    },
    created() {
        this.getUserSetting()
    },
    async fetch() {
    },
    methods: {
        async getUserSetting() {
            this.userSetting = await this.$store.dispatch("account/getUserSetting")
        },
    },
};
</script>
