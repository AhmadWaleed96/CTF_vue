<template>
    <div :class="[(formDetails.isColumnGrid ? '' : formDetails.class), { 'd-none': (!formDetails.visible) }]">
        <div>
            <label v-if="!formDetails.isColumnGrid" class="col-form-label captionFontType captionFontSize captionFontColor captionBold">
                {{ formDetails.caption }}:
                <span v-if="formDetails.isRequired && !formDetails.isReadOnly" class="text-danger">*</span>
            </label>
            <div :id="'input-' + formDetails.id + '-' + formDetails.fieldName" :class="(formDetails.isRequired && !formDetails.isReadOnly?'fieldMandatory':'fieldNotMandatory')">
                <DxTextArea :rtl-enabled="$vuetify.rtl" :value="formDetails.defaultValue"
                    :readOnly="formDetails.isReadOnly" :name="formDetails.fieldName" :placeholder="formDetails.caption"
                    :visible="formDetails.visible" :maxLength="formDetails.max" value-change-event="keyup input change"
                    @value-changed="valueChanged" :onFocusOut="onFocusOut" :height="(formDetails.isColumnGrid ? 37 : null)"
                    :input-attr="{'class':'mandatoryFieldBgColor notMandatoryFieldBgColor fieldFontType fieldFontSize fieldFontColor fieldFontBold'}">
                    <DxValidator :rtl-enabled="$vuetify.rtl">
                        <DxRequiredRule v-if="formDetails.isRequired && !formDetails.isReadOnly" message="" :rtl-enabled="$vuetify.rtl" />
                    </DxValidator>
                </DxTextArea>
            </div>
        </div>
    </div>
</template>

<script>
import DxTextArea from 'devextreme-vue/text-area';
import { DxValidator, DxRequiredRule, } from 'devextreme-vue/validator';
import helper from '@/common/helpers/Utils'
export default {
    components: {
        DxTextArea,
        DxValidator,
        DxRequiredRule,
    },
    props: {
        formDetails: Object,
        valueGrid: String,
        onValueGridChanged: {
            type: Function,
            default: () => function () { },
        },
    },
    created() {
        if (this.formDetails.isColumnGrid) {
            if (helper.isNullOrEmpty(this.valueGrid)) {
                this.formDetails.defaultValue = ''
            }
            else {
                this.formDetails.defaultValue = this.valueGrid + ''
            }
            this.onValueGridChanged(this.formDetails.defaultValue, this.formDetails.defaultValue);
        }
    },
    data() {
        return {
        };
    },
    async fetch() {
        this.$bus.$off("change-map-location-" + this.formDetails.fieldName.toLowerCase());
        this.$bus.$on("change-map-location-" + this.formDetails.fieldName.toLowerCase(), data => {
            this.formDetails.defaultValue = data
        })
        this.$bus.$off("change-map-location-" + this.formDetails.fieldName.toLowerCase());
        this.$bus.$on("change-map-location-" + this.formDetails.fieldName.toLowerCase(), data => {
            this.formDetails.defaultValue = data
        })

        this.$nuxt.$off("change-data-js-" + this.formDetails.fieldName);
        this.$nuxt.$on("change-data-js-" + this.formDetails.fieldName, data => {
            this.formDetails.defaultValue = data
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
            this.formDetails.defaultValue = data.value;
            this.onValueGridChanged(this.formDetails.defaultValue, this.formDetails.defaultValue);
            if (!helper.isNullOrEmpty(this.formDetails.onChange)) {
                this.$executeJavaScript(this.formDetails.onChange, "executeJavaScript")
            }
        },
    },
};
</script>
