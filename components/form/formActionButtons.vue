<template>
    <div class="col-12">

        <!-- SaveBtn -->
        <DxButton :width="120" :text='textSaveButton' type="default" styling-mode="outlined" class="mx-2"
            v-if="data.showSaveBtn" @click="saveFormDetails($event, 'save')" :use-submit-behavior="true" :height="40"
            :rtl-enabled="$vuetify.rtl">
            <template #content>
                <span>
                    <DxLoadIndicator :visible="isSave" class="button-indicator" :height="35" :width="35" />
                    <span class="dx-button-text" v-if="!isSave">{{ textSaveButton }}</span>
                </span>
            </template>
        </DxButton>
        <DxButton :width="140" :text="textSaveButton + ' و جديد'" type="default" styling-mode="outlined" class="mx-2"
            v-if="data.showSaveBtn" @click="saveFormDetails($event, 'saveNew')" :use-submit-behavior="true" :height="40"
            :rtl-enabled="$vuetify.rtl">
            <template #content>
                <span>
                    <DxLoadIndicator :visible="isSave" class="button-indicator" :height="35" :width="35" />
                    <span class="dx-button-text" v-if="!isSave">{{ textSaveButton }} وجديد</span>
                </span>
            </template>
        </DxButton>


        <!-- DeleteBtn -->
        <DxButton :width="120" text="حذف" type="default" styling-mode="outlined" class="mx-2" v-if="data.showDeleteBtn"
            @click="deleteFormDetails($event)" :use-submit-behavior="true" :height="40" :rtl-enabled="$vuetify.rtl">
            <template #content>
                <span>
                    <DxLoadIndicator :visible="isdelete" class="button-indicator" :height="35" :width="35" />
                    <span class="dx-button-text" v-if="!isdelete">
                        حذف
                    </span>
                </span>
            </template>
        </DxButton>

        <!-- ReportBtn -->
        <PopupPrintReport :reportInfo="data.reportInfo" :showDropDownButton="true"/>

        <!-- ReportBtn -->
        <DxButton :width="120" text="Report" type="default" styling-mode="outlined" class="mx-2" v-if="data.showReportBtn"
            @click="onClick($event)" />

        <!-- SubmitApprovalBtn -->
        <DxButton :width="120" text="SubmitForApproval" type="default" styling-mode="outlined" class="mx-2"
            v-if="data.showSubmitApprovalBtn" @click="onClick($event)" />

        <!-- ApprovedBtn -->
        <DxButton :width="120" text="Approved" type="default" styling-mode="outlined" class="mx-2"
            v-if="data.showApprovedBtn" @click="onClick($event)" />

        <!-- RejectedBtn -->
        <DxButton :width="120" text="Rejected" type="default" styling-mode="outlined" class="mx-2"
            v-if="data.showRejectedBtn" @click="onClick($event)" />

        <!-- TransfarBtn -->
        <DxButton :width="120" text="TransfarBtn" type="default" styling-mode="outlined" class="mx-2"
            v-if="data.showTransfarBtn" @click="onClick($event)" />

        <!-- QueryBtn -->
        <DxButton :width="120" text="QueryBtn" type="default" styling-mode="outlined" class="mx-2" v-if="data.showQueryBtn"
            @click="onClick($event)" />

        <!-- ReOpenBtn -->
        <DxButton :width="120" text="ReOpenBtn" type="default" styling-mode="outlined" class="mx-2"
            v-if="data.showReOpenBtn" @click="onClick($event)" />

        <!-- HelpBtn -->
        <DxButton :width="120" text="HelpBtn" type="default" styling-mode="outlined" class="mx-2" v-if="data.showHelpBtn"
            @click="onClick($event)" />

        <!-- FunctionBtn -->
        <DxButton :width="120" text="FunctionBtn" type="default" styling-mode="outlined" class="mx-2"
            v-if="data.showFunctionBtn" @click="onClick($event)" />
    </div>
</template>

<script>
import DxButton from 'devextreme-vue/button';
import DxLoadIndicator from 'devextreme-vue/load-indicator';
import notify from 'devextreme/ui/notify';
import helper from '@/common/helpers/Utils'
import PopupPrintReport from '@/components/report/popupPrintReport'
export default {
    components: {
        DxButton,
        DxLoadIndicator,
        notify,
        PopupPrintReport,
    },
    props: {
        data: Object,
    },
    computed: {
        isNewData() {
            return helper.isNullOrEmpty(this.$route.params.idValue)
        },
        textSaveButton() {
            return (this.isNewData ? 'حفظ' : 'حفظ التعديلات')
        },
    },
    data() {
        return {
            newData: [],
            isSave: false,
            isdelete: false,
        };
    },
    methods: {
        async deleteFormDetails(e) {
            const self = this
            self.$confirmToastify("هل أنت متأكد من عملية الحذف؟", async function (confirmResult) {
                if (confirmResult) {
                    self.isdelete = true
                    const vm = {
                        formID: self.$route.params.formID,
                        idValue: decodeURIComponent(helper.encrypt(self.data.idValue, true)),
                    }
                    const response = await self.$store.dispatch("form/deleteFormDetails", vm);
                    if (response.succeeded) {
                        const url = '/Form/' + self.$route.params.formID
                        self.$router.push(url)
                    }
                    self.$getToastify(response)
                    self.isdelete = false
                }
            })
        },
        async saveFormDetails(e, type) {
            const self = this
            self.isSave = true
            const formIsValid = self.checkFormValidation()
            if (formIsValid) {
                const confirmMsg = (self.isNewData ? 'هل أنت متأكد من حفظ البيانات؟' : 'هل أنت متأكد من عملية التعديل؟')
                self.$confirmToastify(confirmMsg, async function (confirmResult) {
                    if (confirmResult) {
                        const vm = {
                            formID: self.$route.params.formID,
                            idValue: (self.isNewData ? decodeURIComponent(helper.encrypt(self.data.idValue, true)) : self.$route.params.idValue),
                            operationType: (self.isNewData ? 'new' : 'update'),
                            columns: self.newData,
                        }
                        const response = await self.$store.dispatch("form/saveFormDetails", vm);
                        if (response.succeeded) {
                            self.data.dynamicForm.forEach((form, index) => {
                                form.formDetails.forEach((formDetail, index) => {
                                    formDetail.virtualValue=self.newData.find(t=>t.columnsName=='FieldFontBold').columnsValues
                                })
                            })
                            if(helper.decrypt(self.$route.params.formID, true)==684){
                                self.$store.dispatch("account/setUserSetting", response.data);
                                self.$bus.$emit("refresh-user-setting", response.data);
                            }
                            if (type == 'save') {
                                if (self.isNewData) {
                                    const url = '/Form/' + self.$route.params.formID + '/' + vm.idValue
                                    self.$router.push(url)
                                }
                                else {
                                    self.$bus.$emit("refresh-grid-" + self.$route.params.formID, null)
                                }
                            }
                            else {
                                const url = '/Form/' + helper.encrypt(helper.decrypt(self.$route.params.formID, true), true)
                                self.$router.push(url)
                            }
                        }
                        self.$getToastify(response)
                    }
                })
            }
            self.isSave = false
        },
        checkFormValidation() {
            this.newData = []
            const self = this
            let formIsValid = true
            let firstItemNotValid = null
            this.data.dynamicForm.forEach((form, index) => {
                form.formDetails.forEach((formDetail, index) => {
                    const newDataObj = {
                        columnsCaption: formDetail.caption,
                        columnsName: formDetail.fieldName,
                        columnsValues: formDetail.defaultValue,
                        virtualValue: formDetail.virtualValue,
                        controlType: formDetail.controlType,
                        isRequired: formDetail.isRequired,
                        visible: formDetail.visible,
                    }
                    if (!helper.isNullOrEmpty(formDetail.defaultValue)) {
                        self.newData.push(newDataObj)
                        //console.log('columnsName: '+newDataObj.columnsName,'columnsCaption: '+newDataObj.columnsCaption,'columnsValues: '+newDataObj.columnsValues,)
                    }
                    else if (formDetail.isRequired && formDetail.visible && !formDetail.isReadOnly) {
                        self.$getToastify({ msg: 'حقل "' + formDetail.caption + '" مطلوب', code: 2 })
                        formIsValid = false
                        if (!firstItemNotValid) {
                            firstItemNotValid = { form, formDetail }
                            const selectedTab = this.data.dynamicForm.findIndex(i => i.id === form.id)
                            self.$bus.$emit("change-tab-selected", selectedTab);
                        }
                    }
                })
            })
            return formIsValid
        },
        onClick(e) {
            const buttonText = e.component.option('text');
            notify(`The ${buttonText} button was clicked`);
        },
    },
};
</script>
