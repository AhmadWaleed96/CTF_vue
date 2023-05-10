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
                {{msg}}
              </p>
              <form class="login-form" @submit.prevent="onSubmit">
                <dx-form :form-data="formData" :disabled="loading" :rtl-enabled="$vuetify.rtl">

                  <dx-item data-field='code' editor-type="dxTextBox"
                    :editor-options="{ stylingMode: 'filled', placeholder: 'كود المصادقة' }">
                    <dx-required-rule message="كود المصادقة مطلوب" />
                    <dx-label :visible="false" />
                  </dx-item>

                  <dx-button-item>
                    <dx-button-options width="100%" type="default" template="confirmTemplate"
                      :use-submit-behavior="true">
                    </dx-button-options>
                  </dx-button-item>
                  <template #confirmTemplate>
                    <div>
                      <span class="dx-button-text">
                        <dx-load-indicator v-if="loading" width="24px" height="24px" :visible="true" />
                        <span v-if="!loading">
                          تأكيد
                        </span>
                      </span>
                    </div>
                  </template>

                  <dx-button-item >
                    <dx-button-options width="100%" type="default" template="reSendTemplate" :use-submit-behavior="false"
                      :disabled="(counter > 0)" :on-click="resendSMSCode">
                    </dx-button-options>
                  </dx-button-item>
                  <template #reSendTemplate>
                    <div>
                      <span class="dx-button-text">
                        <dx-load-indicator v-if="loading" width="24px" height="24px" :visible="true" />
                        <span v-if="!loading">
                          <span v-if="(counter > 0)">
                            يمكنك طلب كود جديد بعد {{ counter }} ثانية
                          </span>
                          <span v-else>
                            طلب الكود
                          </span>
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
import helper from '@/common/helpers/Utils'
import moment from 'moment'
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
      counter: 0,
      msg:'',
      formData: {},
      loading: false,
      activation: {},
    };
  },
  async fetch() {
    this.sendSMSCode()
  },
  methods: {
    onSubmit: async function () {
      this.loading = true;
      const response = await this.$store.dispatch("account/confirmSMSCode", this.formData);
      this.$getToastify(response)
      if (response.succeeded) {
        this.$auth.setUserToken(response.data.token)
        this.$router.push(response.url)
      }
      this.loading = false;
    },
    async sendSMSCode() {
      this.loading = true;
      const response = await this.$store.dispatch("account/sendSMSCode");
      this.responseSMS(response)
    },
    async resendSMSCode(e) {
      this.loading = true;
      const response = await this.$store.dispatch("account/reSendSMSCode");
      this.responseSMS(response)
    },
    countDownTimer() {
      if (this.counter > 0) {
        setTimeout(() => {
          this.counter -= 1
          this.countDownTimer()
        }, 1000)
      }
    },
    responseSMS(response) {
      if (response.succeeded) {
        // console.log(response.data.token)
        // this.$auth.strategy.token.set(response.data.token)
        // console.log(this.$auth.strategy.token.get())
        this.$auth.setUserToken(response.data.token)
        // this.$auth.refreshTokens()
      }
      if (response.succeeded || response.code == -2) {
        this.msg=response.msg
        const tokenData = helper.getTokenData()
        var diff = moment.duration(moment(tokenData.Data.WaitingVerificationCodeDate).diff(moment()));
        this.counter = Math.round(diff.asSeconds())
        this.countDownTimer()
      }
      this.$getToastify(response)
      this.loading = false;
      
    },
  },
};
</script>
    