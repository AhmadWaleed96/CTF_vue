<template>

  <v-app class="pa-7">
    <v-container>
      <v-layout wrap>
        <v-flex sm12 md6 offset-md3>
          <v-card elevation="4" light tag="section">
            <v-card-title>
              <v-layout align-center justify-space-between>
                <h3 class="headline">
                  كود المصادقة
                </h3>
              </v-layout>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <p>
                الرجاء إدخال الرمز الذي يظهر في التطبيق
              </p>
              <form class="login-form" @submit.prevent="onSubmit">
                <dx-form :form-data="formData" :disabled="loading" :rtl-enabled="$vuetify.rtl">

                  <dx-item data-field='code' editor-type="dxTextBox"
                    :editor-options="{ stylingMode: 'filled', placeholder: 'كود المصادقة' }">
                    <dx-required-rule message="كود المصادقة مطلوب" />
                    <dx-label :visible="false" />
                  </dx-item>

                  <dx-button-item>
                    <dx-button-options width="100%" type="default" template="signInTemplate"
                      :use-submit-behavior="true">
                    </dx-button-options>
                  </dx-button-item>

                  <dx-item>
                    <template #default>
                      <div class="link">
                        <router-link to="/Account/ConfirmationSMS">
                          تأكيد الحساب عبر الرسائل القصيرة
                        </router-link>
                      </div>
                    </template>
                  </dx-item>
                  <template #signInTemplate>
                    <div>
                      <span class="dx-button-text">
                        <dx-load-indicator v-if="loading" width="24px" height="24px" :visible="true" />
                        <span v-if="!loading">
                          تأكيد
                        </span>
                      </span>
                    </div>
                  </template>
                </dx-form>
              </form>
            </v-card-text>
            <v-divider></v-divider>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>
<script>
import DxTextBox from 'devextreme-vue/text-box';

import DxLoadIndicator from "devextreme-vue/load-indicator";
import DxForm, {
  DxItem,
  DxEmailRule,
  DxRequiredRule,
  DxLabel,
  DxButtonItem,
  DxButtonOptions
} from "devextreme-vue/form";

export default {
  layout: "initial",
  components: {
    DxTextBox,
    DxLoadIndicator,
    DxForm,
    DxEmailRule,
    DxRequiredRule,
    DxItem,
    DxLabel,
    DxButtonItem,
    DxButtonOptions
  },
  data() {
    return {
      formData: {},
      loading: false,
      activation: {},
    };
  },
  async fetch() {
  },
  methods: {
    onSubmit: async function () {
      this.loading = true;
      const response = await this.$store.dispatch("account/checkAuthenticator", this.formData);
      this.$getToastify(response)
      if (response.succeeded) {
        this.$auth.setUserToken(response.data.token)
        this.$router.push(response.url)
      }
      this.loading = false;
    },
  },
};
</script>
    