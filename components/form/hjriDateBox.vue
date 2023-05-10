<template>
    <div :class="[(formDetails.isColumnGrid ? '' : formDetails.class), { 'd-none': !formDetails.visible }]">
        <div>
            <label v-if="!formDetails.isColumnGrid" class="col-form-label captionFontType captionFontSize captionFontColor captionBold">
                {{ formDetails.caption }}:
                <span v-if="formDetails.isRequired && !formDetails.isReadOnly" class="text-danger">*</span>
            </label>
            <div :id="'input-' + formDetails.id + '-' + formDetails.fieldName"  :class="(formDetails.isRequired && !formDetails.isReadOnly?'fieldMandatory':'fieldNotMandatory')">
                <date-picker v-model="date" :locale="locale" calendar="hijri" :format="format"
                    :placeholder="formDetails.caption" :disabled="formDetails.isReadOnly" :name="formDetails.fieldName"
                    @change="valueChanged($event)"
                    input-class="'mandatoryFieldBgColor notMandatoryFieldBgColor fieldFontType fieldFontSize fieldFontColor fieldFontBold'">
                    <DxValidator :rtl-enabled="$vuetify.rtl">
                        <DxRequiredRule v-if="formDetails.isRequired && !formDetails.isReadOnly" message="" :rtl-enabled="$vuetify.rtl" />
                    </DxValidator>
                </date-picker>

            </div>
        </div>
    </div>
</template>

<script>
import helper from '@/common/helpers/Utils'
import { DxValidator, DxRequiredRule, } from 'devextreme-vue/validator';
export default {
    components: {
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
                this.date = null
            }
            else {
                // this.formDetails.defaultValue = this.valueGrid
                // this.date = this.valueGrid
            }
            this.onValueGridChanged(this.date, this.formDetails.defaultValue);
        }
    },
    computed: {
        locale() {
            return (this.$vuetify.lang.current == 'ar' ? 'ar-sa' : this.$vuetify.lang.current)
        },
        format() {
            let formatDate = ''
            if (!helper.isNullOrEmpty(this.formDetails.dateFormate)) {
                formatDate = this.formDetails.dateFormate.toUpperCase().replace("DD", "iDD").replace("MM", "iMM").replace("YYYY", "iYYYY")
            }
            return formatDate
        },
    },
    data() {
        return {
            date: (!helper.isNullOrEmpty(this.formDetails.defaultValue) ? this.formDetails.defaultValue : ''),
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
            this.date = helper.toEnglishDigits(this.date)
            this.formDetails.defaultValue = this.date
            if(!helper.isNullOrEmpty(this.formDetails.onChange)){
                this.$executeJavaScript(this.formDetails.onChange, "executeJavaScript")
            }
        },
    },
};
</script>
