<template>
    <div>

        <v-divider class="mt-6"></v-divider>
        <div class="col-12">

            <DxSelectBox :rtl-enabled="$vuetify.rtl" :data-source="dataSource" :value="reportSelected" placeholder="التقرير"
                :searchEnabled="true" value-change-event="keyup input change" @value-changed="valueChanged"
                display-expr="reportName" class="mx-2 d-inline-block" :width="150">
            </DxSelectBox>


            <DxButton :width="120" text="حفظ التقرير" type="default" styling-mode="outlined" class="mx-2"
                @click="showPopup($event)" :use-submit-behavior="true" :height="36" :rtl-enabled="$vuetify.rtl">
            </DxButton>

        </div>



        <DxPopup :width="500" :height="345" :show-title="true" title="حفظ التقرير" :drag-enabled="false"
            :rtl-enabled="$vuetify.rtl" :hide-on-outside-click="true" :visible="popupVisible" :onHidden="onHiddenPopup"
            :show-close-button="false">

            <div class="form-group row">
                <label for="staticEmail" class="col-sm-5 col-form-label">
                    اسم التقرير بالعربي
                </label>
                <div class="col-sm-7">
                    <DxTextBox v-model:value="arReportName" :rtl-enabled="$vuetify.rtl" placeholder="اسم التقرير بالعربي">
                        <DxValidator :rtl-enabled="$vuetify.rtl">
                            <DxRequiredRule message="" :rtl-enabled="$vuetify.rtl" />
                        </DxValidator>
                    </DxTextBox>
                </div>
            </div>

            <div class="form-group row">
                <label for="inputPassword" class="col-sm-5 col-form-label">
                    اسم التقرير بالإنجليزية
                </label>
                <div class="col-sm-7">
                    <DxTextBox v-model:value="enReportName" :rtl-enabled="$vuetify.rtl"
                        placeholder="اسم التقرير بالإنجليزية">
                        <DxValidator :rtl-enabled="$vuetify.rtl">
                            <DxRequiredRule message="" :rtl-enabled="$vuetify.rtl" />
                        </DxValidator>
                    </DxTextBox>
                </div>
            </div>

            <div class="form-group row">
                <label for="inputPassword" class="col-sm-5 col-form-label">
                    يظهر بشكل افتراضي
                </label>
                <div class="col-sm-7">
                    <DxCheckBox :value="reportSelected.isDefault" />
                </div>
            </div>

            <div class="form-group row">
                <label for="inputPassword" class="col-sm-5 col-form-label">
                    يظهر لجميع أصحاب الصلاحية
                </label>
                <div class="col-sm-7">
                    <DxCheckBox :value="reportSelected.showForAllUserHavePermission" />
                </div>
            </div>

            <v-divider class="row mt-6 mb-6"></v-divider>

            <div class="form-group row">
                <div class="col-sm-12">

                    <DxButton :width="120" text="حفظ" type="default" styling-mode="outlined" class="mx-2"
                        @click="saveReportLayout($event)" :use-submit-behavior="true" :height="40"
                        :rtl-enabled="$vuetify.rtl">
                        <template #content>
                            <span>
                                <DxLoadIndicator :visible="isSaveReportLayout" class="button-indicator" :height="35"
                                    :width="35" />
                                <span class="dx-button-text" v-if="!isSaveReportLayout">
                                    حفظ
                                </span>
                            </span>
                        </template>
                    </DxButton>

                    <DxButton v-if="reportSelected.id > 0" :width="120" text="حذف" type="danger" styling-mode="outlined"
                        class="mx-2" @click="deleteReportLayout($event)" :use-submit-behavior="true" :height="40"
                        :rtl-enabled="$vuetify.rtl">
                        <template #content>
                            <span>
                                <DxLoadIndicator :visible="isDeleteReportLayout" class="button-indicator" :height="35"
                                    :width="35" />
                                <span class="dx-button-text" v-if="!isDeleteReportLayout">
                                    حذف
                                </span>
                            </span>
                        </template>
                    </DxButton>

                </div>
            </div>
        </DxPopup>

    </div>
</template>

<script>
import DxSelectBox from 'devextreme-vue/select-box';
import DxButton from 'devextreme-vue/button';
import DxLoadIndicator from 'devextreme-vue/load-indicator';
import DxPopup from 'devextreme-vue/popup';
import DxTextBox from 'devextreme-vue/text-box';
import DxCheckBox from 'devextreme-vue/check-box';
import { DxValidator, DxRequiredRule, } from 'devextreme-vue/validator';

export default {
    components: {
        DxSelectBox,
        DxButton,
        DxLoadIndicator,
        DxPopup,
        DxTextBox,
        DxCheckBox,
        DxValidator,
        DxRequiredRule,
    },
    props: {
        reports: Object,
        returnLayout: Function,
    },
    computed: {
        dataSource: function () {
            if (this.reports.succeeded) {
                return this.reports.data
            }
            else {
                return null
            }
        },
    },
    data() {
        return {
            isSaveReportLayout: false,
            isDeleteReportLayout: false,
            reportSelected: (this.reports.succeeded ? this.reports.data.find(t => t.isDefault == true) : null),
            arReportName: (this.reports.succeeded ? this.reports.data.find(t => t.isDefault == true).arReportName : ''),
            enReportName: (this.reports.succeeded ? this.reports.data.find(t => t.isDefault == true).enReportName : ''),
            reportLayout: {},
            popupVisible: false,
        }
    },
    methods: {
        onHiddenPopup(e) {
            this.popupVisible = false
        },
        showPopup() {
            this.popupVisible = true;
        },
        async saveReportLayout(e) {
            if (this.arReportName.length > 0 && this.enReportName.length > 0) {
                this.isSaveReportLayout = true
                const vm = {
                    id: this.reportSelected.id,
                    formID: this.$route.params.formID,
                    arReportName: this.arReportName,
                    enReportName: this.enReportName,
                    reportDesign: JSON.stringify(this.returnLayout()),
                    isDefault: this.reportSelected.isDefault,
                    showToAllAuthorizedEmp: this.reportSelected.showForAllUserHavePermission,
                    conditionQry: (this.reportSelected ? this.reportSelected.conditionQry : null),
                }
                const response = await this.$store.dispatch("reports/saveReportLayout", vm)
                if (response.succeeded) {
                    this.reports.data = response.data
                    this.reportSelected = this.reports.data.find(t => t.isDefault == true)
                    this.popupVisible = false
                }
                this.isSaveReportLayout = false
                this.$getToastify(response)
            }
        },
        async deleteReportLayout(e) {
            const self = this
            
            self.$confirmToastify("هل أنت متأكد من عملية الحذف؟", async function (confirmResult) {
                if (confirmResult) {
            if (self.arReportName.length > 0 && self.enReportName.length > 0) {
                self.isDeleteReportLayout = true
                const vm = {
                    formID: self.$route.params.formID,
                    arReportName: self.arReportName,
                    enReportName: self.enReportName,
                }
                // console.log('vm',vm)
                const response = await self.$store.dispatch("reports/deleteReportLayout", vm)
                if (response.succeeded) {
                    self.reports.data = response.data
                    self.reportSelected = self.reports.data.find(t => t.isDefault == true)
                    self.popupVisible = false
                }
                self.isDeleteReportLayout = false
                self.$getToastify(response)
            }
        }
            })
        },
        async valueChanged(data) {
            this.reportLayout = {}
            const reportID = data.value.id
            this.reportSelected = this.reports.data.find(t => t.id == reportID)
            this.arReportName = this.reportSelected.arReportName
            this.enReportName = this.reportSelected.enReportName

            if (reportID == 0) {

            }
            else {
                const response = await this.$store.dispatch("reports/getReportLayout", reportID);
                if (response.succeeded) {
                    this.$bus.$emit("refresh-grid-layout-" + this.$route.params.formID, response.data)
                    // console.log('getReportLayout',response.data.reportDesign)
                    this.reportLayout = response.data
                }
                else {
                    this.$getToastify(response)
                }
            }
        },
    },
};
</script>
