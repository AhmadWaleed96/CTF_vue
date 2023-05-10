<template>
    <div :class="[formDetails.class, { 'd-none': !formDetails.visible }]">
        <div>
            <label v-if="!formDetails.isColumnGrid" class="col-form-label captionFontType captionFontSize captionFontColor captionBold">
                {{ formDetails.caption }}:
                <span v-if="formDetails.isRequired && !formDetails.isReadOnly" class="text-danger">*</span>
            </label>
            <div :id="'input-' + formDetails.id + '-' + formDetails.fieldName" :class="(formDetails.isRequired && !formDetails.isReadOnly?'fieldMandatory':'fieldNotMandatory')">
                <DxDropDownBox :rtl-enabled="$vuetify.rtl" :value="defaultValue" :defer-rendering="false"
                    :data-source="dataSource" :display-expr="displayExpr" :value-expr="valueExpr"
                    :placeholder="formDetails.caption" :onFocusOut="onFocusOut"
                    :input-attr="{'class':'mandatoryFieldBgColor notMandatoryFieldBgColor fieldFontType fieldFontSize fieldFontColor fieldFontBold'}">
                    <template>
                        <DxDataGrid :rtl-enabled="$vuetify.rtl" :key-expr="valueExpr" :data-source="dataSource"
                            :hover-state-enabled="true" :selected-row-keys="defaultValue"
                            @selection-changed="onSelectionChanged" height="100%">
                            <DxColumn
                                v-for="(item, index) in formDetails.ddlDataMultiple.dropdownListDataMultipleColumnsHeader"
                                :key="index" :data-field="item.fieldName" :caption="item.caption" />

                            <DxColumn v-if="!isMultipleColumn" data-field="textValue" caption="البيان" />
                            <DxSelection mode="multiple" />
                            <DxPaging :enabled="true" :page-size="10" />
                            <DxFilterRow :visible="true" />
                            <DxScrolling mode="virtual" />
                        </DxDataGrid>
                    </template>
                    <DxValidator :rtl-enabled="$vuetify.rtl">
                        <DxRequiredRule v-if="formDetails.isRequired && !formDetails.isReadOnly" message="" :rtl-enabled="$vuetify.rtl" />
                    </DxValidator>
                </DxDropDownBox>

            </div>
        </div>
    </div>
</template>

<script>

import DxDropDownBox from 'devextreme-vue/drop-down-box';
import {
    DxDataGrid, DxSelection, DxPaging, DxFilterRow, DxScrolling, DxColumn
} from 'devextreme-vue/data-grid';
import { DxValidator, DxRequiredRule, } from 'devextreme-vue/validator';
import helper from '@/common/helpers/Utils'

export default {
    components: {
        DxDropDownBox,
        DxDataGrid,
        DxSelection,
        DxPaging,
        DxFilterRow,
        DxScrolling,
        DxColumn,
        DxValidator,
        DxRequiredRule,
    },
    props: {
        formDetails: Object,
    },
    data() {
        return {
            defaultValue: this.formDetails.defaultValue?.split(/[-,]/).map(s => s.trim()),
        };
    },
    async fetch() {
        this.$nuxt.$off("change-data-js-" + this.formDetails.fieldName);
        this.$nuxt.$on("change-data-js-" + this.formDetails.fieldName, data => {
            this.defaultValue = data?.split(/[-,]/).map(s => s.trim())
        })
        this.$nuxt.$off("set-enabled-js-" + this.formDetails.fieldName);
        this.$nuxt.$on("set-enabled-js-" + this.formDetails.fieldName, data => {
            this.formDetails.isReadOnly = !data
        })
    },
    computed: {
        isMultipleColumn() {
            return this.formDetails.ddlDataMultiple && this.formDetails.ddlDataMultiple.dropdownListDataMultipleColumnsHeader && this.formDetails.ddlDataMultiple.dropdownListDataMultipleColumnsHeader.length > 0
        },
        dataSource: function () {
            if (this.isMultipleColumn) {
                return JSON.parse(this.formDetails.ddlDataMultiple.dataJsonSource)
            }
            else {
                return this.formDetails.ddlData
            }
        },
        valueExpr: function () {
            if (this.isMultipleColumn) {
                return 'StringValue'
            }
            else {
                return 'stringValue'
            }
        }
    },
    methods: {
        displayExpr(item) {
            if (this.isMultipleColumn) {
                const fieldsName = this.formDetails.ddlDataMultiple.dropdownListDataMultipleColumnsHeader.map((item) => item.fieldName);
                const fieldsValue = fieldsName.map((key) => item[key])
                return helper.stringFormat(this.formDetails.ddlDataMultiple.textFieldFormat, fieldsValue);
            }
            else {
                return item && `${item['textValue']}`;
            }
        },
        onSelectionChanged({ selectedRowsData }) {
            this.defaultValue = selectedRowsData.map((items) => items[this.valueExpr]);
            this.formDetails.defaultValue = this.defaultValue.join('-');

            if (!helper.isNullOrEmpty(this.formDetails.onChange)) {
                this.$executeJavaScript(this.formDetails.onChange, "executeJavaScript")
            }
        },
        onFocusOut(data) {
            if (!helper.isNullOrEmpty(this.formDetails.onLostFocus)) {
                this.$executeJavaScript(this.formDetails.onLostFocus, "executeJavaScript")
            }
        },
    },
};
</script>
