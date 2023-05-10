<template>

    <v-container>
        <v-layout wrap>
            <v-flex sm12 md6 offset-md3>
                <v-card elevation="4" light tag="section">
                    <v-card-title>
                        <v-layout align-center justify-space-between>
                            <h3>
                                استعادة كلمة المرور
                            </h3>
                        </v-layout>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <p>
                            من هنا تقوم بادخال ايميلك أو جوالك أو رقمك الوظيفي بغرض استرجاع كلمة المرور:
                        </p>
                        <form class="login-form" @submit.prevent="onSubmit">
                            <dx-form :form-data="formData" :disabled="loading" :rtl-enabled="$vuetify.rtl">

                                <dx-item data-field='email' editor-type="dxTextBox"
                                    :editor-options="{ stylingMode: 'filled', placeholder: 'أدخل ايميلك المسجل أو جوالك أو رقمك الوظيفي' }">
                                    <dx-required-rule message="هذه الحقل مطلوب" />
                                    <dx-label :visible="false" />
                                </dx-item>


                                <dx-item>
                                    <template #default>
                                        <div class="text-xs-center">
                                            <recaptcha class="g-recaptcha"/>
                                        </div>
                                    </template>
                                </dx-item>

                                <dx-button-item>
                                    <dx-button-options width="100%" type="default" template="signInTemplate"
                                        :use-submit-behavior="true">
                                    </dx-button-options>
                                </dx-button-item>
                                <dx-item>
                                    <template #default>
                                        <div class="link">
                                            <router-link to="/Account/Login">
                                                تسجيل الدخول
                                            </router-link>
                                        </div>
                                    </template>
                                </dx-item>
                                <template #signInTemplate>
                                    <div>
                                        <span class="dx-button-text">
                                            <dx-load-indicator v-if="loading" width="24px" height="24px"
                                                :visible="true" />
                                            <span v-if="!loading">
                                                إستعداة كلمة المرور
                                            </span>
                                        </span>
                                    </div>
                                </template>
                            </dx-form>
                            <div class="recaptcharecaptcha">
                            </div>
                        </form>
                    </v-card-text>
                    <v-divider></v-divider>
                </v-card>

            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import DxTextBox from 'devextreme-vue/text-box';

import DxLoadIndicator from "devextreme-vue/load-indicator";
import DxForm, {
    DxItem,
    DxEmptyItem,
    DxEmailRule,
    DxRequiredRule,
    DxLabel,
    DxButtonItem,
    DxButtonOptions
} from "devextreme-vue/form";
// import VueRecaptcha from 'vue-recaptcha'


export default {
    layout: "initial",
    components: {
        DxTextBox,
        DxEmptyItem,
        DxLoadIndicator,
        DxForm,
        DxEmailRule,
        DxRequiredRule,
        DxItem,
        DxLabel,
        DxButtonItem,
        DxButtonOptions,
    },
    data() {
        return {
            formData: {},
            loading: false,
            inputValue: null,
        };
    },
    async fetch() {
    },
    async mounted() {
    },
    methods: {
        onSubmit: async function () {
            try {
                this.loading = true;
                await this.$recaptcha.getResponse()
                const response = await this.$store.dispatch("account/forgotPassword", this.formData);
                if (response.succeeded) {
                    this.$router.push(response.url)
                }
                else {
                }
                this.$getToastify(response)
                await this.$recaptcha.reset()
            } catch (error) {
                console.log('Login error:', error)
            }
            this.loading = false;
        }
    },
};
</script>
  