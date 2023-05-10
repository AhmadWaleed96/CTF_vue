<template>

  <v-app class="pa-7">
    <v-container>
      <v-layout wrap>
        <v-flex sm12 md6 offset-md3>
          <v-card elevation="4" light tag="section">
            <v-card-title>
              <v-layout align-center justify-space-between>
                <h3 class="headline">
                  تفعيل النظام
                </h3>
              </v-layout>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text v-if="activation.succeeded">
              <p>
                يجب تفعيل النظام عن طريق التواصل مع قسم المبيعات على الايميل
                <a class="" href='mailto:sales@digitalzircon.com?Subject=Activation Request' target='_top'>
                  sales@digitalzircon.com
                </a>
              </p>
              <p>
                كود النظام: {{ activation.data }}
                أدخل كود التفعيل ثم انقر زر الحفظ
              </p>
              <form class="login-form" @submit.prevent="onSubmit">
                <dx-form :form-data="formData" :disabled="loading" :rtl-enabled="$vuetify.rtl">

                  <dx-item data-field='systemActivationCode' editor-type="dxTextBox"
                  
                    :editor-options="{ stylingMode: 'filled', placeholder: 'كود تفعيل النظام',value:($route.query.Code?encodeURIComponent($route.query.Code).replace(/%../g,  match => match.toLowerCase()):'') }">
                    <dx-required-rule message="كود تفعيل النظام مطلوب" />
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
                        <router-link to="/Account/GenerateActivationCode">
                          أو اضغط هنا للتفعيل المباشر
                        </router-link>
                      </div>
                    </template>
                  </dx-item>
                  <template #signInTemplate>
                    <div>
                      <span class="dx-button-text">
                        <dx-load-indicator v-if="loading" width="24px" height="24px" :visible="true" />
                        <span v-if="!loading">
                          تفعيل
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
    this.sendEmailForActivation()
  },
  methods: {
    onSubmit: async function () {
      this.loading = true;
      const response = await this.$store.dispatch("account/addActivationCode", this.formData);
      if (response.succeeded) {
          this.$router.push(response.url)
      }
      else {
          this.loading = false;
      }
      this.$getToastify(response)
    },
    async sendEmailForActivation() {
      this.activation = await this.$store.dispatch("account/sendEmailForActivation");
      if(!this.activation.succeeded){
        this.$getToastify(this.activation)
      }
    },
  },
};
</script>
  