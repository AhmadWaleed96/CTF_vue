<template>

  <v-container>
    <v-layout wrap>
      <v-flex sm12 md6 offset-md3>
        <v-card elevation="4" light tag="section" class="card-login">
          <v-card-title>
            <v-layout align-center justify-space-between>
              <h3 class="title-login">
                {{ $vuetify.lang.t('$vuetify.signIn') }}
              </h3>
            </v-layout>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <p>
              قم بتسجيل الدخول باستخدام اسم المستخدم وكلمة المرور الخاصين بك
            </p>
            <form class="login-form" @submit.prevent="onSubmit">
              <dx-form :form-data="formData" :disabled="loading" :rtl-enabled="$vuetify.rtl">

                <dx-item data-field='userName' editor-type="dxTextBox"
                  :editor-options="{ stylingMode: 'filled', placeholder: 'اسم االمستخدم' }">
                  <dx-required-rule message="اسم المستخدم مطلوب" />
                  <dx-label :visible="false" />

                </dx-item>

                <dx-item data-field='password' editor-type='dxTextBox'
                  :editor-options="{ stylingMode: 'filled', placeholder: 'كلمة المرور', mode: 'password' }">
                  <dx-required-rule message="كلمة المرور مطلوبة" />
                  <dx-label :visible="false" />
                </dx-item>

                <dx-item data-field="rememberMe" editor-type="dxCheckBox"
                  :editor-options="{ text: 'تذكرنى', elementAttr: { class: 'form-text' } }">
                  <dx-label :visible="false" />
                </dx-item>

                <dx-item v-if="(recaptcha.succeeded == true && recaptcha.data == true)">
                  <template #default>
                    <div class="text-xs-center">
                      <recaptcha class="g-recaptcha" />
                    </div>
                  </template>
                </dx-item>

                <dx-button-item>
                  <dx-button-options width="100%" type="default" template="signInTemplate" :use-submit-behavior="true">
                  </dx-button-options>
                </dx-button-item>
                <template #signInTemplate>
                  <div>
                    <span class="dx-button-text">
                      <dx-load-indicator v-if="loading" width="24px" height="24px" :visible="true" />
                      <span v-if="!loading">تسجيل الدخول</span>
                    </span>
                  </div>
                </template>

                <dx-item>
                  <template #default>
                    <div class="link">
                      <router-link to="/Account/ForgotPassword">هل نسيت كلمة السر؟</router-link>
                    </div>
                  </template>
                </dx-item>


              </dx-form>
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
  DxEmailRule,
  DxRequiredRule,
  DxLabel,
  DxButtonItem,
  DxButtonOptions
} from "devextreme-vue/form";
import notify from 'devextreme/ui/notify';
import { mapState } from 'vuex'
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
      loading: false
    };
  },
  computed: {
    ...mapState({
      recaptcha: state => state.common.recaptcha,
    })
  },
  methods: {
    onSubmit: async function () {
      this.loading = true;
      try {
        if (this.recaptcha.succeeded == true && this.recaptcha.data == true) {
          await this.$recaptcha.getResponse()
        }
      } catch (error) {
      }
      const response = await this.$store.dispatch("account/login", this.formData);
      if (response.succeeded) {
        this.$auth.setUserToken(response.data.token).then(() => {
          // this.$store.dispatch("localStorageUser/setUserData", response.value);
          // this.$store.dispatch("localStorageUser/setUserLogin", this.loginDto);
          //console.log(response.url)

          this.$store.dispatch("account/setUserSetting", response.data.userSetting);
          this.$auth.setUser(response.data)
          this.$router.push(response.url)
        })
      }
      else {
        this.$getToastify(response)
        this.loading = false;
      }

      try {
        if (this.recaptcha.succeeded == true && this.recaptcha.data == true) {
          await this.$recaptcha.reset()
        }
      } catch (error) {
      }
      this.loading = false;
    }
  },
};
</script>
