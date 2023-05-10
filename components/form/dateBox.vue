<template>
    <div :class="[(formDetails.isColumnGrid ? '' : formDetails.class), { 'd-none': (!formDetails.visible) }]">
        <div>
            <label v-if="!formDetails.isColumnGrid" class="col-form-label captionFontType captionFontSize captionFontColor captionBold">
                {{ formDetails.caption }}:
                <span v-if="formDetails.isRequired && !formDetails.isReadOnly" class="text-danger">*</span>
            </label>
            <div :id="'input-' + formDetails.id + '-' + formDetails.fieldName" :class="(formDetails.isRequired && !formDetails.isReadOnly?'fieldMandatory':'fieldNotMandatory')">
                <DxDateBox :rtl-enabled="$vuetify.rtl" :use-mask-behavior="true" :readOnly="formDetails.isReadOnly"
                    :placeholder="formDetails.caption" :visible="formDetails.visible" :name="formDetails.fieldName"
                    :element-attr="{ 'data-format': formDetails.dateFormate }"
                    value-change-event="keyup input change change-java" @value-changed="valueChanged"
                    :onFocusOut="onFocusOut" :display-format="formDetails.dateFormate" :value="defaultValue"
                    :type="pickerType"
                    :input-attr="{'class':'mandatoryFieldBgColor notMandatoryFieldBgColor fieldFontType fieldFontSize fieldFontColor fieldFontBold'}">
                    <DxValidator :rtl-enabled="$vuetify.rtl">
                        <DxRequiredRule v-if="formDetails.isRequired && !formDetails.isReadOnly" message=""
                            :rtl-enabled="$vuetify.rtl" />
                    </DxValidator>
                </DxDateBox>
            </div>
        </div>
    </div>
</template>

<script>
import DxDateBox from 'devextreme-vue/date-box';
import { DxValidator, DxRequiredRule, } from 'devextreme-vue/validator';
import { parseDate } from "devextreme/localization"

import moment from 'moment'
import helper from '@/common/helpers/Utils'

export default {
    components: {
        DxDateBox,
        DxValidator,
        DxRequiredRule,
    },
    props: {
        formDetails: Object,
        valueGrid: Date,
        onValueGridChanged: {
            type: Function,
            default: () => function () { },
        },
    },
    created() {
        if (this.formDetails.isColumnGrid) {
            if (helper.isNullOrEmpty(this.valueGrid)) {
                this.formDetails.defaultValue = ''
                this.defaultValue = null
            }
            else {
                this.formDetails.defaultValue = this.dateToString(this.valueGrid, this.formDetails.dateFormate)
                this.defaultValue = this.valueGrid
            }
            this.onValueGridChanged(this.defaultValue, this.formDetails.defaultValue);
        }
    },
    data() {
        return {
            defaultValue: parseDate(this.formDetails.defaultValue, this.formDetails.dateFormate)
        };
    },
    async fetch() {
        this.$nuxt.$off("change-data-js-" + this.formDetails.fieldName);
        this.$nuxt.$on("change-data-js-" + this.formDetails.fieldName, data => {
            if (data instanceof Date && !isNaN(data)) {
                this.defaultValue = data
            }
            else {
                this.defaultValue = parseDate(data, this.formDetails.dateFormate)
            }
        })
        this.$nuxt.$off("set-enabled-js-" + this.formDetails.fieldName);
        this.$nuxt.$on("set-enabled-js-" + this.formDetails.fieldName, data => {
            this.formDetails.isReadOnly = !data
        })
    },
    computed: {
        pickerType() {
            let type = ''
            if (this.formDetails.dateFormate?.toLowerCase().includes("dd") && this.formDetails.dateFormate?.toLowerCase().includes("hh")) {
                type = 'datetime'
            }
            else if (this.formDetails.dateFormate?.toLowerCase().includes("hh")) {
                type = 'time'
            }
            else {
                type = 'date'
            }
            return type
        },
    },
    methods: {
        onFocusOut(data) {
            if (!helper.isNullOrEmpty(this.formDetails.onLostFocus)) {
                this.$executeJavaScript(this.formDetails.onLostFocus, "executeJavaScript")
            }
        },
        valueChanged(data) {
            this.defaultValue = data.value
            this.formDetails.defaultValue = this.dateToString(this.defaultValue, this.formDetails.dateFormate)

            //this.$executeJavaScript('', "executeJavaScript")
            // console.log(this.formDetails.onChange)
            this.onValueGridChanged(data.value, this.formDetails.defaultValue);
            if (!helper.isNullOrEmpty(this.formDetails.onChange)) {
                this.$executeJavaScript(this.formDetails.onChange, "executeJavaScript")
            }
        },
        dateToString(date, dateFormate) {
            const format = dateFormate
                .replace("dd/", "DD/")
                .replace("d/", "D/")
                .replace("dd-", "DD-")
                .replace("d-", "D-")
                .replace("yyyy", "YYYY")
            return moment(date).format(format)
        },
    },
};
</script>
