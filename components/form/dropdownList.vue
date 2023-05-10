<template>
    <div :class="[(formDetails.isColumnGrid ? '' : formDetails.class), { 'd-none': !formDetails.visible }]">
        <div>
            <label v-if="!formDetails.isColumnGrid" class="col-form-label captionFontType captionFontSize captionFontColor captionBold">
                {{ formDetails.caption }}:
                <span v-if="formDetails.isRequired && !formDetails.isReadOnly" class="text-danger">*</span>
            </label>
            <div :id="'input-' + formDetails.id + '-' + formDetails.fieldName"  :class="(formDetails.isRequired && !formDetails.isReadOnly?'fieldMandatory':'fieldNotMandatory')" v-if="!isMultipleColumn">
                <DxSelectBox :rtl-enabled="$vuetify.rtl" :data-source="dataSource" :value="formDetails.defaultValue"
                    :readOnly="formDetails.isReadOnly" :name="formDetails.fieldName" :placeholder="formDetails.caption"
                    :visible="formDetails.visible" :showClearButton="!formDetails.isRequired" :searchEnabled="true"
                    value-change-event="keyup input change" @value-changed="valueChanged" :onFocusOut="onFocusOut"
                    display-expr="textValue" value-expr="stringValue"
                    :input-attr="{'class':'mandatoryFieldBgColor notMandatoryFieldBgColor fieldFontType fieldFontSize fieldFontColor fieldFontBold'}">
                    <DxValidator :rtl-enabled="$vuetify.rtl">
                        <DxRequiredRule v-if="formDetails.isRequired && !formDetails.isReadOnly" message=""
                            :rtl-enabled="$vuetify.rtl" />
                    </DxValidator>
                </DxSelectBox>
            </div>
            <div :id="'input-' + formDetails.id + '-' + formDetails.fieldName" :class="(formDetails.isRequired && !formDetails.isReadOnly?'fieldMandatory':'fieldNotMandatory')" v-else>
                <DxDropDownBox :id="dropdownId" :ref="dropdownId" :rtl-enabled="$vuetify.rtl" :value="defaultValue" :defer-rendering="false"
                    :readOnly="formDetails.isReadOnly" :name="formDetails.fieldName" :visible="formDetails.visible"
                    :data-source="dataSource" :display-expr="displayExpr" value-expr="StringValue"
                    :placeholder="formDetails.caption" :onFocusOut="onFocusOut" 
                    :drop-down-options="{ width: formDetails.ddlDataMultiple.dropdownListDataMultipleColumnsHeader.reduce((acc, item) => acc + item.width, 0)+43 }"
                    :showClearButton="!formDetails.isRequired" @value-changed="closeDropDownBox"
                    :input-attr="{'class':'mandatoryFieldBgColor notMandatoryFieldBgColor fieldFontType fieldFontSize fieldFontColor fieldFontBold'}">
                    <template>
                        <DxDataGrid :rtl-enabled="$vuetify.rtl" key-expr="StringValue" :data-source="dataSource"
                            :hover-state-enabled="true" :selected-row-keys="defaultValue"
                            @selection-changed="onSelectionChanged" height="100%">
                            <DxColumn
                                v-for="(item, index) in formDetails.ddlDataMultiple.dropdownListDataMultipleColumnsHeader"
                                :key="index" :data-field="item.fieldName" :caption="item.caption"  :width="item.width"/>
                            <DxSelection mode="single" />
                            <DxPaging :enabled="true" :page-size="10" />
                            <DxFilterRow :visible="true" />
                            <DxScrolling mode="virtual" />
                        </DxDataGrid>
                    </template>
                    <DxValidator :rtl-enabled="$vuetify.rtl">
                        <DxRequiredRule v-if="formDetails.isRequired && !formDetails.isReadOnly" message=""
                            :rtl-enabled="$vuetify.rtl" />
                    </DxValidator>
                </DxDropDownBox>

            </div>
        </div>
    </div>
</template>

<script>
import DxSelectBox from 'devextreme-vue/select-box';
import DataSource from "devextreme/data/data_source";
import DxDropDownBox from 'devextreme-vue/drop-down-box';
import { DxValidator, DxRequiredRule, } from 'devextreme-vue/validator';
import {
    DxDataGrid, DxSelection, DxPaging, DxFilterRow, DxScrolling, DxColumn
} from 'devextreme-vue/data-grid';
import helper from '@/common/helpers/Utils'

export default {
    components: {
        DxSelectBox,
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
        formDetailsList: Array,
        valueGrid: [],
        //valueGrid: String,
        onValueGridChanged: {
            type: Function,
            default: () => function () { },
        },
    },
    created() {
        if (this.formDetails.isColumnGrid) {
            // console.log(this.formDetails.fieldName,helper.isNullOrEmpty(this.valueGrid),this.valueGrid)
            if (helper.isNullOrEmpty(this.valueGrid)) {
                this.formDetails.defaultValue = ''
                this.defaultValue = []
            }
            else {
                if (this.isMultipleColumn) {
                    // this.formDetails.defaultValue = this.valueGrid[0]
                    // this.defaultValue = this.valueGrid
                    this.formDetails.defaultValue = this.valueGrid
                    this.defaultValue = this.formDetails.defaultValue?.split(/[-,]/).map(s => s.trim())
                }
                else {
                    this.formDetails.defaultValue = this.valueGrid+''
                    this.defaultValue = this.valueGrid+''
                }
            }
            this.onValueGridChanged(this.defaultValue, this.formDetails.defaultValue);
        }
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
                const data = new DataSource({
                    store: this.formDetails.ddlData,
                    paginate: true,
                    pageSize: 10
                });
                return data
            }
        },
        dropdownId: function () {
            const ref = 'dropdown_' + this.formDetails.id + '_' + this.formDetails.indexNum
            return ref
        },
        dropdownRef() {
            return this.$refs[this.dropdownId].instance;
        },
    },
    data() {
        return {
            defaultValue: this.formDetails.defaultValue?.split(/[-,]/).map(s => s.trim()),
        };
    },
    async fetch() {
        this.$bus.$off("change-select-data-" + this.formDetails.fieldName);
        this.$bus.$on("change-select-data-" + this.formDetails.fieldName, data => {
            this.formDetails.defaultValue = ''
            this.formDetails.ddlData = data
        })

        this.$nuxt.$off("change-data-js-" + this.formDetails.fieldName);
        this.$nuxt.$on("change-data-js-" + this.formDetails.fieldName, data => {
            if (this.isMultipleColumn) {
                this.defaultValue = data
            }
            else {
                this.formDetails.defaultValue = data+''
            }
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
        async valueChanged(data) {
            this.formDetails.defaultValue = data.value;
            this.onValueGridChanged(data.value, this.formDetails.defaultValue);
            await this.getDataDropdownList(data.value)
            if (!helper.isNullOrEmpty(this.formDetails.onChange)) {
                this.$executeJavaScript(this.formDetails.onChange, "executeJavaScript")
            }
        },
        async closeDropDownBox(e) {
            e.component.close()
        },
        displayExpr(item) {
            const fieldsName = this.formDetails.ddlDataMultiple.dropdownListDataMultipleColumnsHeader.map((item) => item.fieldName);
            const fieldsValue = fieldsName.map((key) => item[key])
            return helper.stringFormat(this.formDetails.ddlDataMultiple.textFieldFormat, fieldsValue);

        },
        onSelectionChanged({ selectedRowsData }) {
            this.defaultValue = selectedRowsData.map((items) => items['StringValue']);
            this.formDetails.defaultValue = this.defaultValue[0];
            this.onValueGridChanged(this.defaultValue, this.formDetails.defaultValue);
            if (!helper.isNullOrEmpty(this.formDetails.onChange)) {
                this.$executeJavaScript(this.formDetails.onChange, "executeJavaScript")
            }
        },
        async getDataDropdownList(value) {
            if (!helper.isNullOrEmpty(this.formDetails.onChange)) {
                let fieldNameEvent = '';
                if (
                    !helper.isNullOrEmpty(this.formDetailsList) &&
                    this.formDetailsList.filter(item => { return !helper.isNullOrEmpty(item.cascadParentName) })
                ) {
                    const cascadParent = this.formDetailsList.filter(item => { return item.cascadParentName == this.formDetails.fieldName })
                    if (!helper.isNullOrEmpty(cascadParent)) {
                        fieldNameEvent = cascadParent[0].fieldName
                    }
                }
                if (!helper.isNullOrEmpty(fieldNameEvent) && !helper.isNullOrEmpty(value)) {
                    const form = this.formDetailsList.filter(item => { return item.fieldName == fieldNameEvent })[0]
                    const dataDropdownList = {
                        compoTableName: form.properties[0],
                        valueField: form.properties[2],
                        textField: form.properties[1],
                        where: form.cascadChildID,
                        value
                    }
                    const response = await this.$store.dispatch("common/getDataDropdownList", dataDropdownList);
                    if (response.succeeded) {
                        this.$bus.$emit("change-select-data-" + fieldNameEvent, response.data);
                    }

                }
                this.$executeJavaScript(this.formDetails.onChange, "executeJavaScript")
            }
        },
    },
};
</script>
