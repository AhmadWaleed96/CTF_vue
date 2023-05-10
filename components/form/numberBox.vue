<template>
    <div :class="[(formDetails.isColumnGrid ? '' : formDetails.class), { 'd-none': (!formDetails.visible) }]">
        <div>
            <label v-if="!formDetails.isColumnGrid" class="col-form-label captionFontType captionFontSize captionFontColor captionBold">
                {{ formDetails.caption }}:
                <span v-if="formDetails.isRequired && !formDetails.isReadOnly" class="text-danger">*</span>
            </label>
            <div :id="'input-' + formDetails.id + '-' + formDetails.fieldName" :class="(formDetails.isRequired && !formDetails.isReadOnly?'fieldMandatory':'fieldNotMandatory')">
                <DxNumberBox :rtl-enabled="$vuetify.rtl" :value="defaultValue" :readOnly="formDetails.isReadOnly"
                    :name="formDetails.fieldName" :placeholder="formDetails.caption" :visible="formDetails.visible"
                    :maxLength="formDetails.max" :mask="formDetails.mask" value-change-event="keyup input change"
                    @value-changed="valueChanged" :onFocusOut="onFocusOut" :input-attr="{'class':'mandatoryFieldBgColor notMandatoryFieldBgColor fieldFontType fieldFontSize fieldFontColor fieldFontBold'}">
                    <DxValidator :rtl-enabled="$vuetify.rtl">
                        <DxRequiredRule v-if="formDetails.isRequired && !formDetails.isReadOnly" message="" :rtl-enabled="$vuetify.rtl" />
                    </DxValidator>
                </DxNumberBox>
            </div>
        </div>
    </div>
</template>

<script>
import DxNumberBox from 'devextreme-vue/number-box';
import { DxValidator, DxRequiredRule, } from 'devextreme-vue/validator';
import helper from '@/common/helpers/Utils'

export default {
    components: {
        DxNumberBox,
        DxValidator,
        DxRequiredRule,
    },
    props: {
        formDetails: Object,
        valueGrid: Number,
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
                this.formDetails.defaultValue = this.valueGrid + ''
                this.defaultValue = this.valueGrid
            }
            this.onValueGridChanged(this.defaultValue, this.formDetails.defaultValue);
        }
    },
    data() {
        return {
            defaultValue: (this.formDetails.defaultValue ? Number(this.formDetails.defaultValue) : null)
            //defaultValue: 0
        };
    },
    async fetch() {
        this.$bus.$off("change-map-location-" + this.formDetails.fieldName.toLowerCase());
        this.$bus.$on("change-map-location-" + this.formDetails.fieldName.toLowerCase(), data => {
            this.defaultValue = data
        })
        this.$bus.$off("change-map-location-" + this.formDetails.fieldName.toLowerCase());
        this.$bus.$on("change-map-location-" + this.formDetails.fieldName.toLowerCase(), data => {
            this.defaultValue = data
        })

        this.$nuxt.$off("change-data-js-" + this.formDetails.fieldName);
        this.$nuxt.$on("change-data-js-" + this.formDetails.fieldName, data => {
            this.defaultValue = (data ? Number(data) : null)
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
            this.formDetails.defaultValue = (data.value==null?null:data.value + '');
            this.onValueGridChanged(data.value, this.formDetails.defaultValue);
            if (!helper.isNullOrEmpty(this.formDetails.onChange)) {
                this.$executeJavaScript(this.formDetails.onChange, "executeJavaScript")
            }
        },
    },
};
</script>
