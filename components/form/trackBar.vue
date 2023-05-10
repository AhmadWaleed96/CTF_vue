<template>
    <div :class="[formDetails.class, { 'd-none': !formDetails.visible }]">
        <div>
            <label v-if="!formDetails.isColumnGrid" class="col-form-label captionFontType captionFontSize captionFontColor captionBold">
                {{ formDetails.caption }}:
                <span v-if="formDetails.isRequired && !formDetails.isReadOnly" class="text-danger">*</span>
            </label>
            <div :id="'input-' + formDetails.id + '-' + formDetails.fieldName" :class="(formDetails.isRequired && !formDetails.isReadOnly?'fieldMandatory':'fieldNotMandatory')">
                <DxSlider :rtl-enabled="$vuetify.rtl" :min="0" :max="100" :value="defaultValue"
                    :tooltip="{ enabled: true }" :readOnly="formDetails.isReadOnly" :name="formDetails.fieldName"
                    :placeholder="formDetails.caption" :visible="formDetails.visible"
                    value-change-event="keyup input change" @value-changed="valueChanged" :onFocusOut="onFocusOut"
                    :input-attr="{'class':'mandatoryFieldBgColor notMandatoryFieldBgColor fieldFontType fieldFontSize fieldFontColor fieldFontBold'}">
                    <DxValidator :rtl-enabled="$vuetify.rtl">
                        <DxRequiredRule v-if="formDetails.isRequired && !formDetails.isReadOnly" message="" :rtl-enabled="$vuetify.rtl" />
                    </DxValidator>
                </DxSlider>

            </div>
        </div>
    </div>
</template>

<script>
import { DxSlider } from 'devextreme-vue/slider';
import { DxValidator, DxRequiredRule, } from 'devextreme-vue/validator';
import helper from '@/common/helpers/Utils'
export default {
    components: {
        DxSlider,
        DxValidator,
        DxRequiredRule,
    },
    props: {
        formDetails: Object,
    },
    data() {
        return {
            defaultValue: Number(this.formDetails.defaultValue)
        };
    },
    methods: {
        onFocusOut(data) {
            if (!helper.isNullOrEmpty(this.formDetails.onLostFocus)) {
                this.$executeJavaScript(this.formDetails.onLostFocus, "executeJavaScript")
            }
        },
        valueChanged(data) {
            this.formDetails.defaultValue = data.value + '';
            if (!helper.isNullOrEmpty(this.formDetails.onChange)) {
                this.$executeJavaScript(this.formDetails.onChange, "executeJavaScript")
            }
        },
    },
};
</script>
