<template>
    <v-menu offset-y open-on-hover>
        <template v-slot:activator="{ on, attrs }">
            <v-btn icon dark v-bind="attrs" v-on="on">
                <v-icon color="tertiary">mdi-translate</v-icon>
            </v-btn>
        </template>
        <v-list>
            <v-list-item v-for="(language, index) in languages" :key="index" link @click="changeLanguage(language)">
                <v-list-item-title>
                    {{ language.name }}
                </v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
import devextremeConfig from 'devextreme/core/config';
import { locale, loadMessages } from "devextreme/localization";

export default {
    name: 'CoreLanguages',
    data: () => ({
        languages: [],
    }),   
    created() {
        // loadMessages(i18nDevextreme)
        // locale('en')
        //this.devextremeInitialize()  
    },
    async fetch() {
        this.getLanguages()
    },
    methods: {
        async getLanguages() {
            const response = await this.$store.dispatch("language/getLanguages");
            if (response.succeeded) {
                this.languages = response.data
            }
            else {
                this.$getToastify(response)
            }
        },
        async changeLanguage(language) {
            if (language != null) {
                localStorage.currentLeng = language.value;
                this.$vuetify.lang.current = language.value;
                localStorage.direction = language.direction;
                this.$vuetify.rtl = language.direction === "rtl";
                this.devextremeInitialize()
            }
        },
        devextremeInitialize(){
            const isRtl=this.$vuetify.rtl
            devextremeConfig({ rtlEnabled: isRtl })
            locale(this.$vuetify.lang.current)
            //document.location.reload();
        },
    },
};
</script>
