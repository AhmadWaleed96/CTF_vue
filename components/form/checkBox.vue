<template>
    <div :class="[(formDetails.isColumnGrid ? '' : formDetails.class), { 'd-none': !formDetails.visible }]">
        <div>
            <label v-if="!formDetails.isColumnGrid" class="col-form-label captionFontType captionFontSize captionFontColor captionBold">
                {{ formDetails.caption }}:
                <span v-if="formDetails.isRequired && !formDetails.isReadOnly" class="text-danger">*</span>
            </label>
            <div :id="'input-' + formDetails.id + '-' + formDetails.fieldName" :class="(formDetails.isRequired && !formDetails.isReadOnly?'fieldMandatory':'fieldNotMandatory')">
                <DxCheckBox :rtl-enabled="$vuetify.rtl" :value="defaultValue" :readOnly="formDetails.isReadOnly"
                    :disabled="formDetails.isReadOnly" :visible="formDetails.visible"
                    value-change-event="keyup input change" @value-changed="valueChanged" :onFocusOut="onFocusOut"
                    :name="formDetails.fieldName"
                    :input-attr="{'class':'mandatoryFieldBgColor notMandatoryFieldBgColor fieldFontType fieldFontSize fieldFontColor fieldFontBold'}">
                    <DxValidator :rtl-enabled="$vuetify.rtl">
                        <DxRequiredRule v-if="formDetails.isRequired && !formDetails.isReadOnly" message="" :rtl-enabled="$vuetify.rtl" />
                    </DxValidator>
                </DxCheckBox>
            </div>
        </div>
    </div>
</template>

<script>
import DxCheckBox from 'devextreme-vue/check-box';
import { DxValidator, DxRequiredRule } from 'devextreme-vue/validator';
import helper from '@/common/helpers/Utils'
export default {
    components: {
        DxCheckBox,
        DxValidator,
        DxRequiredRule,
    },
    props: {
        formDetails: Object,
        valueGrid: Boolean,
        onValueGridChanged: {
            type: Function,
            default: () => function () { },
        },
    },
    created() {
        if (!helper.isNullOrEmpty(this.formDetails.defaultValue)) {
            this.formDetails.defaultValue = (helper.stringToBoolean(this.formDetails.defaultValue) ? '1' : '0')
        }
        if (this.formDetails.isColumnGrid) {
            if (helper.isNullOrEmpty(this.valueGrid) && this.valueGrid != false) {
                this.formDetails.defaultValue = '0'
                this.defaultValue = false
            }
            else {
                this.formDetails.defaultValue = (helper.stringToBoolean(this.valueGrid) ? '1' : '0')
                this.defaultValue = this.valueGrid
            }
            this.onValueGridChanged(this.defaultValue, this.formDetails.defaultValue);
        }
    },
    data() {
        return {
            defaultValue: helper.stringToBoolean(this.formDetails.defaultValue),
        };
    },
    async fetch() {
        this.$nuxt.$off("change-data-js-" + this.formDetails.fieldName);
        this.$nuxt.$on("change-data-js-" + this.formDetails.fieldName, data => {
            this.defaultValue = helper.stringToBoolean(data)
        })
        this.$nuxt.$off("set-enabled-js-" + this.formDetails.fieldName);
        this.$nuxt.$on("set-enabled-js-" + this.formDetails.fieldName, data => {
            this.formDetails.isReadOnly = !data
        })
    },
    methods: {
        onFocusOut(data) {
            if (!helper.isNullOrEmpty(this.formDetails.onLostFocus)) {
                this.$executeJavaScript(this.formDetails.onLostFocus, "executeJavaScript")
            }
        },
        valueChanged(data) {
            this.formDetails.defaultValue = (data.value ? '1' : '0');
            this.onValueGridChanged(data.value, this.formDetails.defaultValue);

            if (!helper.isNullOrEmpty(this.formDetails.onChange)) {
                this.$executeJavaScript(this.formDetails.onChange, "executeJavaScript")
            }
        },
    },
};
</script>
