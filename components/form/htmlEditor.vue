<template>
    <div :class="[formDetails.class, { 'd-none': !formDetails.visible }]">
        <div>
            <label v-if="!formDetails.isColumnGrid" class="col-form-label captionFontType captionFontSize captionFontColor captionBold">
                {{ formDetails.caption }}:
                <span v-if="formDetails.isRequired && !formDetails.isReadOnly" class="text-danger">*</span>
            </label>
            <div :id="'input-' + formDetails.id + '-' + formDetails.fieldName" :class="(formDetails.isRequired && !formDetails.isReadOnly?'fieldMandatory':'fieldNotMandatory')">
                <DxHtmlEditor :value="formDetails.defaultValue" height="200px" :rtl-enabled="$vuetify.rtl"
                    value-change-event="keyup input change" @value-changed="valueChanged"
                    :input-attr="{'class':'mandatoryFieldBgColor notMandatoryFieldBgColor fieldFontType fieldFontSize fieldFontColor fieldFontBold'}">
                    <DxMediaResizing :enabled="true" />
                    <DxImageUpload :tabs="currentTabs" file-upload-mode="base64" />
                    <DxToolbar :multiline="false">
                        <DxItem name="undo" />
                        <DxItem name="redo" />
                        <DxItem name="separator" />
                        <DxItem :accepted-values="sizeValues" name="size" />
                        <DxItem :accepted-values="fontValues" name="font" />
                        <DxItem name="separator" />
                        <DxItem name="bold" />
                        <DxItem name="italic" />
                        <DxItem name="strike" />
                        <DxItem name="underline" />
                        <DxItem name="separator" />
                        <DxItem name="alignLeft" />
                        <DxItem name="alignCenter" />
                        <DxItem name="alignRight" />
                        <DxItem name="alignJustify" />
                        <DxItem name="separator" />
                        <DxItem name="orderedList" />
                        <DxItem name="bulletList" />
                        <DxItem name="separator" />
                        <DxItem :accepted-values="headerValues" name="header" />
                        <DxItem name="separator" />
                        <DxItem name="color" />
                        <DxItem name="background" />
                        <DxItem name="separator" />
                        <DxItem name="link" />
                        <DxItem name="image" />
                        <DxItem name="separator" />
                        <DxItem name="clear" />
                        <DxItem name="codeBlock" />
                        <DxItem name="blockquote" />
                        <DxItem name="separator" />
                        <DxItem name="insertTable" />
                        <DxItem name="deleteTable" />
                        <DxItem name="insertRowAbove" />
                        <DxItem name="insertRowBelow" />
                        <DxItem name="deleteRow" />
                        <DxItem name="insertColumnLeft" />
                        <DxItem name="insertColumnRight" />
                        <DxItem name="deleteColumn" />
                    </DxToolbar>
                    <DxValidator :rtl-enabled="$vuetify.rtl">
                        <DxRequiredRule v-if="formDetails.isRequired && !formDetails.isReadOnly" message="" :rtl-enabled="$vuetify.rtl" />
                    </DxValidator>
                </DxHtmlEditor>

            </div>
        </div>
    </div>
</template>

<script>
import {
    DxHtmlEditor,
    DxToolbar,
    DxMediaResizing,
    DxImageUpload,
    DxItem,
} from 'devextreme-vue/html-editor';
import { DxValidator, DxRequiredRule, } from 'devextreme-vue/validator';
import helper from '@/common/helpers/Utils'
export default {
    components: {
        DxHtmlEditor,
        DxToolbar,
        DxMediaResizing,
        DxImageUpload,
        DxItem,
        DxValidator,
        DxRequiredRule,
    },
    props: {
        formDetails: Object,
    },
    data() {
        const tabs = [
            { name: 'From This Device', value: ['file'] },
            { name: 'From the Web', value: ['url'] },
            { name: 'Both', value: ['file', 'url'] },
        ]
        return {
            tabs,
            sizeValues: ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt'],
            fontValues: ['Arial', 'Courier New', 'Georgia', 'Impact', 'Lucida Console', 'Tahoma', 'Times New Roman', 'Verdana'],
            headerValues: [false, 1, 2, 3, 4, 5],
            currentTabs: tabs[2].value,
        };
    },
    async fetch() {
        this.$nuxt.$off("change-data-js-" + this.formDetails.fieldName);
        this.$nuxt.$on("change-data-js-" + this.formDetails.fieldName, data => {
            this.formDetails.defaultValue=data
        })
        this.$nuxt.$off("set-enabled-js-" + this.formDetails.fieldName);
        this.$nuxt.$on("set-enabled-js-" + this.formDetails.fieldName, data => {
            this.formDetails.isReadOnly=!data
        })
    },
    methods: {
        valueChanged(data) {
            this.formDetails.defaultValue = data.value;
            if(!helper.isNullOrEmpty(this.formDetails.onChange)){
                this.$executeJavaScript(this.formDetails.onChange, "executeJavaScript")
            }
        },
    },
};
</script>
