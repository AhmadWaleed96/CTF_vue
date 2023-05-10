<template>
    <div :class="[formDetails.class, { 'd-none': (!formDetails.visible) }]">
        <div>
            <label v-if="!formDetails.isColumnGrid" class="col-form-label captionFontType captionFontSize captionFontColor captionBold">
                {{ formDetails.caption }}:
                <span v-if="formDetails.isRequired && !formDetails.isReadOnly" class="text-danger">*</span>
            </label>
            <div :id="'input-' + formDetails.id + '-' + formDetails.fieldName" :class="(formDetails.isRequired && !formDetails.isReadOnly?'fieldMandatory':'fieldNotMandatory')">
                <DxTagBox :data-source="dataSource" display-expr="textValue" value-expr="stringValue"
                    :placeholder="formDetails.caption" :rtl-enabled="$vuetify.rtl" :value="defaultValue"
                    value-change-event="keyup input change" @value-changed="valueChanged" :onFocusOut="onFocusOut"
                    :search-enabled="true"
                    class='mandatoryFieldBgColor notMandatoryFieldBgColor fieldFontType fieldFontSize fieldFontColor fieldFontBold'>
                    <DxValidator :rtl-enabled="$vuetify.rtl">
                        <DxRequiredRule v-if="formDetails.isRequired && !formDetails.isReadOnly" message="" :rtl-enabled="$vuetify.rtl" />
                    </DxValidator>
                </DxTagBox>

            </div>
        </div>
    </div>
</template>

<script>
import DxTagBox from 'devextreme-vue/tag-box';
import { DxValidator, DxRequiredRule, } from 'devextreme-vue/validator';
import DataSource from "devextreme/data/data_source";
import helper from '@/common/helpers/Utils'

export default {
    components: {
        DxTagBox,
        DxValidator,
        DxRequiredRule,
    },
    props: {
        formDetails: Object,
    },
    data() {
        const dataSource = new DataSource({
            store: this.formDetails.ddlData,
            paginate: true,
            pageSize: 10
        });
        return {
            dataSource,
            defaultValue: (helper.isNullOrEmpty(this.formDetails.defaultValue) ? null : this.formDetails.defaultValue?.split(/[-,]/).map(s => s.trim())),
        };
    },
    methods: {
        onFocusOut(data) {
            if (!helper.isNullOrEmpty(this.formDetails.onLostFocus)) {
                this.$executeJavaScript(this.formDetails.onLostFocus, "executeJavaScript")
            }
        },
        valueChanged(data) {
            this.formDetails.defaultValue = data.value.join('-');
            if (!helper.isNullOrEmpty(this.formDetails.onChange)) {
                this.$executeJavaScript(this.formDetails.onChange, "executeJavaScript")
            }
        },
    },
};
</script>
