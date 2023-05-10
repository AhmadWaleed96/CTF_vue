<template>
    <div v-if="gridData.succeeded" class="col-12 div-data-grid">
        <input type="hidden" value="0" name="PublicValue" class="PublicValue">
        <input type="hidden" :value="gridId" :name="'GV' + gridData.data.subFormID" class="GV">
        <h4 v-if="gridData.data.dynamicFormDetailsName != null" class="text-center pt-5">{{
            gridData.data.dynamicFormDetailsName
        }}</h4>
        <DxDataGrid :id="gridId" :ref="gridId" :name="gridId" :data-source="dataSource" key-expr="ID"
            :columns="gridData.data.formDetails" :show-borders="true" :allow-column-reordering="true"
            :allow-column-resizing="true" :column-auto-width="true" :rtl-enabled="$vuetify.rtl"
            :selection="{ mode: 'single' }" @editing-start="onEditingStart" @init-new-row="onInitNewRow"
            @row-inserting="onRowInserting" @row-inserted="onRowInserted" @row-updating="onRowUpdating"
            @row-updated="onRowUpdated" @row-removing="onRowRemoving" @row-removed="onRowRemoved" @saving="onSaving"
            @saved="onSaved" @edit-canceling="onEditCanceling" @edit-canceled="onEditCanceled"
            @row-dbl-click="onRowDblClick" class="dx-data-grid" :column-resizing-mode="'widget'"
            noDataText="لا توجد بيانات" @exporting="onExporting">


            <DxLoadPanel :shading="true" shadingColor="rgba(0, 0, 0, 0.1)" text="جاري التنفيذ..." />
            <DxPaging :enabled="true" :page-size="10" />
            <DxEditing :allow-updating="gridData.data.permissions.showUpdateButton"
                :allow-adding="gridData.data.permissions.showNewButtonInHeader"
                :allow-deleting="gridData.data.permissions.showDeleteButton" :use-icons="true" :mode="editingMode"
                :confirm-delete="false" />

            <DxColumnChooser :enabled="gridData.data.showColumnChooser" />
            <DxColumnFixing :enabled="true" />
            <DxFilterRow :visible="gridData.data.showFilterRow" />
            <DxHeaderFilter :visible="gridData.data.showFilterRow" />
            <!-- <DxScrolling mode="infinite"/> -->
            <DxGroupPanel :visible="gridData.data.showGroupPanel" />
            <DxSorting :visible="false" mode="single" />

            <DxExport :enabled="dataGridApi" :allow-export-selected-data="false" />

            <DxToolbar v-if="gridData.data.editingType == 4">
                <DxItem name="addRowButton" show-text="inMenu" />
                <DxItem location="after">
                    <template #default class="px-1">
                        <DxButton @click="saveRecords()" :disabled="rowsChanged.length == 0" icon="save" />
                    </template>
                </DxItem>
                <DxItem location="after">
                    <template #default>
                        <DxButton @click="undoRecords()" :disabled="rowsChanged.length == 0" icon="undo" />
                    </template>
                </DxItem>
            </DxToolbar>

            <DxStateStoring :enabled="true" :saving-timeout="500" type="custom" :custom-load="loadLayout"
                :custom-save="saveLayout" />

            <DxColumn v-for="col in gridData.data.formDetails"
                v-bind:key="'control_' + col.id + '_fieldName_' + col.fieldName" :data-field="col.fieldName"
                :caption="col.caption" :width="col.columnProperties.width"
                :allow-filtering="col.columnProperties.allowFilter" :allow-grouping="col.columnProperties.allowGroup"
                :allow-header-filtering="col.columnProperties.allowSort" :allow-editing="col.columnProperties.editorVisible"
                true-text="نعم" false-text="لا" :show-editor-always="false" :rtl-enabled="$vuetify.rtl"
                edit-cell-template="templateEdit"
                :data-type="(col.controlType.toLowerCase() == 'datebox' || col.controlType.toLowerCase() == 'hjridatebox' ? 'date' : '')"
                :format="(col.controlType.toLowerCase() == 'datebox' || col.controlType.toLowerCase() == 'hjridatebox' ? col.dateFormate : '')">

                <!-- <DxLookup v-if="col.controlType.toLowerCase() == 'dropdownlist'" :data-source="col.ddlData"
                    value-expr="idValue" display-expr="textValue" /> -->

                <DxLookup v-if="col.controlType.toLowerCase() == 'dropdownlist'"
                    :data-source="dropdownListDataSource(col.fieldName)" :value-expr="dropdownListValueExpr(col.fieldName)"
                    :display-expr="dropdownListDataDisplay(col.fieldName)" />

                <DxRequiredRule v-if="col.isRequired && !col.isReadOnly && col.controlType.toLowerCase() != 'checkbox'"
                    message="" :rtl-enabled="$vuetify.rtl" />

            </DxColumn>

            <template #templateEdit="{ data: cellInfo }">
                <div v-on:click="divclick(cellInfo)"
                    v-for="col in gridData.data.formDetails.filter(item => item.fieldName == cellInfo.column.dataField)"
                    :key="'TextBox_control_' + col.id + '_fieldName_' + col.fieldName">

                    <TextBox v-if="col.controlType.toLowerCase() == 'textbox'" :formDetails="col"
                        :valueGrid="cellInfo.value"
                        :onValueGridChanged="(value, defaultValue) => onValueChanged(value, defaultValue, cellInfo)" />

                    <DropdownList v-else-if="col.controlType.toLowerCase() == 'dropdownlist'" :formDetails="col"
                        :formDetailsList="gridData.data.formDetails" :valueGrid="cellInfo.value"
                        :onValueGridChanged="(value, defaultValue) => onValueChanged(value, defaultValue, cellInfo)" />

                    <CheckBox v-else-if="col.controlType.toLowerCase() == 'checkbox'" :formDetails="col"
                        :valueGrid="cellInfo.value"
                        :onValueGridChanged="(value, defaultValue) => onValueChanged(value, defaultValue, cellInfo)" />

                    <NumberBox v-else-if="col.controlType.toLowerCase() == 'numberbox'" :formDetails="col"
                        :valueGrid="cellInfo.value"
                        :onValueGridChanged="(value, defaultValue) => onValueChanged(value, defaultValue, cellInfo)" />

                    <DateBox v-else-if="col.controlType.toLowerCase() == 'datebox'" :formDetails="col"
                        :valueGrid="cellInfo.value"
                        :onValueGridChanged="(value, defaultValue) => onValueChanged(value, defaultValue, cellInfo)" />

                    <MemoBox v-else-if="col.controlType.toLowerCase() == 'memobox'" :formDetails="col"
                        :valueGrid="cellInfo.value"
                        :onValueGridChanged="(value, defaultValue) => onValueChanged(value, defaultValue, cellInfo)" />

                    <HjriDateBox v-else-if="col.controlType.toLowerCase() == 'hjridatebox'" :formDetails="col"
                        :valueGrid="cellInfo.value"
                        :onValueGridChanged="(value, defaultValue) => onValueChanged(value, defaultValue, cellInfo)" />

                    <h6 v-else>
                        {{ col.controlType }}
                    </h6>
                </div>
            </template>

        </DxDataGrid>
        <ExportGrid v-if="dataGridApi" :reports="gridData.data.reports" :returnLayout="returnLayout" />


        <DxContextMenu v-if="dataGridApi" :data-source="contextMenuItems" :width="200" target=".dx-row"
            @item-click="contextMenuItemClick" @showing="contextMenuShowing" :rtl-enabled="$vuetify.rtl"/>
            
        <PopupPrintReport  v-if="dataGridApi" :showDropDownButton="false"/>

    </div>
</template>
  
<script>
import {
    DxColumn,
    DxEditing,
    DxPaging,
    DxDataGrid,
    DxHeaderFilter,
    DxFilterRow,
    DxFilterPanel,
    DxFilterBuilderPopup,
    DxScrolling,
    DxColumnChooser,
    DxColumnFixing,
    DxLookup,
    DxGroupPanel,
    DxExport,
    DxSorting,
    DxLoadPanel,
    DxToolbar,
    DxItem,
    DxStateStoring,
} from 'devextreme-vue/data-grid';
//import { DxLoadPanel } from 'devextreme-vue/load-panel';
//import DataSource from 'devextreme/data/data_source';
import 'devextreme/data/odata/store';
import helper from '@/common/helpers/Utils'
import { DxValidator, DxRequiredRule } from 'devextreme-vue/validator';



import ExportGrid from '@/components/report/exportGrid'
import TextBox from '@/components/form/textBox'
import DropdownList from '@/components/form/dropdownList'
import NumberBox from '@/components/form/numberBox'
import CheckBox from '@/components/form/checkBox'
import DateBox from '@/components/form/dateBox'
import MemoBox from '@/components/form/memoBox'
import HjriDateBox from '@/components/form/hjriDateBox'

import PopupPrintReport from '@/components/report/popupPrintReport'

import { DxButton } from 'devextreme-vue/button';

import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import moment from 'moment'

import DxContextMenu from 'devextreme-vue/context-menu';

export default {
    components: {
        DxDataGrid,
        DxColumn,
        DxEditing,
        DxButton,
        DxPaging,
        DxHeaderFilter,
        DxFilterRow,
        DxFilterPanel,
        DxFilterBuilderPopup,
        DxScrolling,
        DxColumnChooser,
        DxColumnFixing,
        DxLookup,
        DxGroupPanel,
        DxExport,
        DxSorting,
        DropdownList,
        ExportGrid,
        TextBox,
        NumberBox,
        CheckBox,
        DateBox,
        MemoBox,
        HjriDateBox,
        DxLoadPanel,
        DxValidator,
        DxRequiredRule,
        DxToolbar,
        DxItem,
        DxStateStoring,
        DxContextMenu,
        PopupPrintReport,
    },
    props: {
        formDetails: Object,
        dataGridApi: Boolean
    },
    created() {
        if (!this.dataGridApi) {
            const self = this
            this.stringFieldName = ''
            this.gridData = this.formDetails.grid
            if (this.gridData && this.gridData.succeeded) {
                this.gridData.data.formDetails.forEach((formDetail, index) => {
                    if (!helper.isNullOrEmpty(formDetail.fieldName)) {
                        const fname = formDetail.fieldName
                        self.stringFieldName += "var txt" + fname + "= ddl" + fname + "= cb" + fname + "=document.querySelectorAll('[name=" + fname + "]');"
                    }
                })
                self.stringFieldName += "var PublicValue=txtPublicValue=document.querySelectorAll('[name=PublicValue]');"
                //self.stringFieldName += "var gv=gv12=document.querySelectorAll('[name=GV]');"
                self.stringFieldName += "var gv" + this.gridData.data.subFormID + "=document.querySelectorAll('[name=GV" + this.gridData.data.subFormID + "]');"
            }
        }
    },
    computed: {
        dataSource: function () {
            if (this.gridData.succeeded) {
                return JSON.parse(this.gridData.data.dataJsonSource)
            } else {
                return []
            }
        },
        contextMenuItems: function () {
            if (this.dataGridApi && this.gridData.succeeded) {
                const data = [
                    { id: -1, text: 'فتح في نافذة جديدة', icon: 'plus' },
                ]
                if (this.gridData.data.reportInfo && this.gridData.data.reportInfo.length > 0) {
                    const dataReport = { text: 'التقارير', icon: 'dx-icon-globe', icon: 'print', items: [] }
                    this.gridData.data.reportInfo.forEach((item, index) => {
                        dataReport.items.push({ id: item.stringValue, text: item.textValue })
                    })
                    data.push(dataReport)
                }
                return data
            } else {
                return []
            }
        },
        editingMode: function () {
            if (this.gridData.data.editingType == 1) {
                //return 'form'
                return 'row'
            }
            if (this.gridData.data.editingType == 2) {
                return 'form'
            }
            else if (this.gridData.data.editingType == 3) {
                return 'popup'
            }
            else if (this.gridData.data.editingType == 4) {
                return 'row'
                // return 'batch'
            }
            else {
                return 'row'
            }
        },
        gridId: function () {
            let ref = ''
            if (this.dataGridApi) {
                ref = 'grid_' + this.$route.params.formID
            }
            else {
                ref = 'grid_' + this.gridData.data.formID + '_' + this.gridData.data.subFormID
            }
            return ref
        },
        gridRef() {
            return this.$refs[this.gridId].instance;
        },
    },
    data() {
        return {
            // dropdownListDataSource: '',
            // dropdownListValueExpr: '',
            // dropdownListDataDisplay: '',
            stringFieldName: '',
            rowsChanged: [],
            newData: [],
            gridData: {
                code: null,
                data: null,
                httpStatusCode: null,
                msg: null,
                msgDetails: null,
                succeeded: null,
                url: null,
            }
        };
    },
    async fetch() {
        this.getGrid()
        this.$bus.$off("refresh-grid-" + this.$route.params.formID);
        this.$bus.$on("refresh-grid-" + this.$route.params.formID, data => {
            if (this.dataGridApi && this.gridData.succeeded) {
                this.refreshGrid(this.$route.params.formID)
            }
        })

        this.$nuxt.$off("grid-update-edit-" + this.gridId);
        this.$nuxt.$on("grid-update-edit-" + this.gridId, data => {
            const self = this
            const gridInstance = self.gridRef;
            //console.log(gridInstance)
            gridInstance.saveEditData()
                .then((result) => {
                    gridInstance.addRow()
                })
        })

        this.$bus.$off("refresh-grid-layout-" + this.$route.params.formID);
        this.$bus.$on("refresh-grid-layout-" + this.$route.params.formID, data => {
            if (this.dataGridApi && this.gridData.succeeded) {
                try {
                    const gridInstance = this.gridRef
                    gridInstance.state(JSON.parse(data.reportDesign));
                    // console.log('refresh-grid-layout',gridInstance.state())
                }
                catch (e) {
                }
            }
        })
    },
    methods: {
        async getGrid() {
            if (this.dataGridApi) {
                const vm = {
                    formID: decodeURIComponent(this.$route.params.formID),
                    masterFormID: null,
                    relationFieledName: null,
                    sortingColumn: null,
                    sortingDir: null,
                    transactionType: "New",
                }
                const response = await this.$store.dispatch("grid/getGrid", vm);
                if (response.succeeded) {
                    this.gridData = response
                }
                else {
                    this.$getToastify(response)
                }
            }
        },
        async refreshGrid(formID) {
            const gridInstance = this.gridRef;
            gridInstance.beginCustomLoading()
            const gridParameter = {
                formID: decodeURIComponent(formID),
                relationFieledName: this.gridData.data.relationFieledName,
                relationFieledValue: this.gridData.data.relationFieledValue
            }
            const response = await this.$store.dispatch("grid/refreshGrid", gridParameter);
            if (response.succeeded) {
                this.gridData.data.dataJsonSource = response.data
                //gridInstance.refresh()
                //gridInstance.resize()
            }
            else {
                this.$getToastify(response)
            }
            gridInstance.endCustomLoading()
        },
        logEvent(eventName) {
            console.log(eventName);
        },
        divclick(data) {
            // console.log(data.data.Description);
            // console.log(data);
        },
        onRowDblClick(e) {
            if (this.dataGridApi && !this.gridData.data.showOnlyDesignerReport && !this.gridData.data.gridIsQuery) {
                const url = '/Form/' + this.$route.params.formID + '/' + helper.encrypt(e.data.ID, true)
                this.$router.push(url)
            }
        },
        onInitNewRow(e) {
            // console.log('onInitNewRow', e)
            setTimeout(function () {
                e.component.focus(e.component.getCellElement(0, 0))
            }, 10);
            this.executeJavaScript()
        },
        async onRowInserting(e) {
            console.log('onRowInserting', e);
            const self = this
            const isCanceled = new Promise((resolve, reject) => {
                const formIsValid = self.checkFormValidation()
                if (formIsValid) {
                    self.newData.push({
                        columnsCaption: 'IndexNo',
                        columnsName: 'IndexNo',
                        columnsValues: (e.component.totalCount() + 1) + '',
                        controlType: 'NumberBox',
                        virtualValue: '',
                        isRequired: true,
                        visible: true,
                    })

                    if (self.gridData.data.editingType == 4) {
                        resolve(false)
                    }
                    else {
                        e.component.beginCustomLoading()
                        const vm = {
                            columns: self.newData,
                            formID: decodeURIComponent(self.gridData.data.formID),
                            relationFieledName: self.gridData.data.relationFieledName,
                            relationFieledValue: self.gridData.data.relationFieledValue,
                        }
                        self.$store.dispatch("grid/rowInserting", vm)
                            .then((response) => {
                                if (response.succeeded) {
                                    self.gridData.data.dataJsonSource = response.data
                                    e.component.cancelEditData()
                                }
                                resolve(true);
                                self.$getToastify(response)
                                e.component.endCustomLoading()
                            })
                    }
                }
                else {
                    resolve(true)
                }
            })
            e.cancel = isCanceled;
        },
        onRowInserted(e) {
            //console.log('onRowInserted', e)
            const self = this
            this.executeJavaScript()
            if (self.gridData.data.editingType == 4) {
                const vm = {
                    columns: self.newData,
                    formID: decodeURIComponent(self.gridData.data.formID),
                    idValue: e.key + '',
                    relationFieledName: self.gridData.data.relationFieledName,
                    relationFieledValue: self.gridData.data.relationFieledValue,
                    operationType: 'insert',
                }
                self.rowsChanged.push(vm)
            }
        },
        onSaving(e) {
            //console.log('onSaving', e);
        },
        onSaved(e) {
            //console.log('onSaved', e);
        },
        onEditCanceling(e) {
            //console.log('onEditCanceling', e);
        },
        onEditCanceled(e) {
            //console.log('onEditCanceled', e);
        },
        onEditingStart(e) {
            // console.log('onEditingStart', e);
            this.executeJavaScript()
        },
        async onRowUpdating(e) {
            //console.log('onRowUpdating', e);
            const self = this
            const isCanceled = new Promise((resolve, reject) => {
                self.$confirmToastify("هل أنت متأكد من عملية التعديل؟", async function (confirmResult) {
                    if (confirmResult) {
                        const formIsValid = self.checkFormValidation()
                        if (formIsValid) {
                            if (self.gridData.data.editingType == 4) {
                                if (self.rowsChanged.find(t => t.idValue == e.key)) {
                                    self.rowsChanged.find(t => t.idValue == e.key).columns = self.newData
                                }
                                else {
                                    const vm = {
                                        columns: self.newData,
                                        formID: decodeURIComponent(self.gridData.data.formID),
                                        idValue: e.key + '',
                                        relationFieledName: self.gridData.data.relationFieledName,
                                        relationFieledValue: self.gridData.data.relationFieledValue,
                                        operationType: 'update',
                                    }
                                    self.rowsChanged.push(vm)
                                }
                                resolve(false)
                            }
                            else {
                                e.component.beginCustomLoading()
                                resolve(true)
                                const vm = {
                                    columns: self.newData,
                                    formID: decodeURIComponent(self.gridData.data.formID),
                                    idValue: e.key + '',
                                    relationFieledName: self.gridData.data.relationFieledName,
                                    relationFieledValue: self.gridData.data.relationFieledValue,
                                }
                                self.$store.dispatch("grid/rowUpdating", vm)
                                    .then((response) => {
                                        if (response.succeeded) {
                                            self.gridData.data.dataJsonSource = response.data
                                            e.component.cancelEditData()
                                        }
                                        self.$getToastify(response)
                                        e.component.endCustomLoading()
                                    })
                            }
                        }
                        else {
                            resolve(true)
                        }
                    }
                    else {
                        resolve(true)
                    }
                })
            })
            e.cancel = isCanceled;
        },
        onRowUpdated(e) {
            //console.log('onRowUpdated', e);
        },
        async onRowRemoving(e) {
            //console.log('onRowRemoving', e);
            const self = this
            const isCanceled = new Promise((resolve, reject) => {
                self.$confirmToastify("هل أنت متأكد من عملية الحذف؟", async function (confirmResult) {
                    if (confirmResult) {
                        if (self.gridData.data.editingType == 4) {
                            if (e.key > 0) {

                                const vm = {
                                    idValue: e.key + '',
                                    formID: decodeURIComponent(self.gridData.data.formID),
                                    relationFieledName: self.gridData.data.relationFieledName,
                                    relationFieledValue: self.gridData.data.relationFieledValue,
                                    operationType: 'delete',
                                }
                                if (self.rowsChanged.find(t => t.idValue == e.key)) {
                                    const indexItem = self.rowsChanged.map(item => item.idValue).indexOf(e.key)
                                    self.rowsChanged.splice(indexItem, 1);
                                }
                                self.rowsChanged.push(vm)
                            }
                            else {
                                if (self.rowsChanged.find(t => t.idValue == e.key)) {
                                    const indexItem = self.rowsChanged.map(item => item.idValue).indexOf(e.key)
                                    self.rowsChanged.splice(indexItem, 1);
                                }
                            }
                            resolve(false)
                        }
                        else {
                            e.component.beginCustomLoading()
                            const vm = {
                                idValue: e.key + '',
                                formID: decodeURIComponent(self.gridData.data.formID),
                                relationFieledName: self.gridData.data.relationFieledName,
                                relationFieledValue: self.gridData.data.relationFieledValue,
                            }
                            self.$store.dispatch("grid/rowDeleting", vm)
                                .then((response) => {
                                    if (response.succeeded) {
                                        self.gridData.data.dataJsonSource = response.data
                                    }
                                    resolve(true);
                                    self.$getToastify(response)
                                    e.component.endCustomLoading()
                                })
                        }
                    }
                    else {
                        resolve(true)
                    }
                })
            })
            e.cancel = isCanceled;
        },
        onRowRemoved(e) {
            //console.log('onRowRemoved', e);
        },
        onValueChanged(value, defaultValue, cellInfo) {
            //console.log('onValueChanged',value);
            // console.log(value)
            // console.log(defaultValue)
            // console.log(cellInfo)
            cellInfo.setValue(value);
            cellInfo.component.updateDimensions();
        },
        checkFormValidation() {
            this.newData = []
            const self = this
            let formIsValid = true
            let firstItemNotValid = null


            self.gridData.data.formDetails.forEach((formDetail, index) => {

                // if (formDetail.controlType.toLowerCase() == 'checkbox' && formDetail.defaultValue == '' && formDetail.isRequired) {
                //     console.log(formDetail.fieldName)
                //     formDetail.defaultValue = '0'
                // }
                const newDataObj = {
                    columnsCaption: formDetail.caption,
                    columnsName: formDetail.fieldName,
                    columnsValues: formDetail.defaultValue,
                    virtualValue: formDetail.virtualValue,
                    controlType: formDetail.controlType,
                    isRequired: formDetail.isRequired,
                    visible: formDetail.visible,
                }
                if (!helper.isNullOrEmpty(formDetail.defaultValue)) {
                    self.newData.push(newDataObj)
                }
                else if (formDetail.isRequired && formDetail.visible && !formDetail.isReadOnly) {
                    self.$getToastify({ msg: 'حقل "' + formDetail.caption + '" مطلوب', code: 2 })
                    formIsValid = false
                }
            })
            return formIsValid
        },
        saveRecords(e) {
            //console.log('saveRecords',e)
            const self = this
            const gridInstance = self.gridRef;
            gridInstance.beginCustomLoading()

            const rowsInserted = self.rowsChanged.filter(t => t.operationType == 'insert')
            const rowsUpdated = self.rowsChanged.filter(t => t.operationType == 'update')
            const rowsDeleted = self.rowsChanged.filter(t => t.operationType == 'delete')
            const vm = {
                rowsInserted: rowsInserted,
                rowsUpdated: rowsUpdated,
                rowsDeleted: rowsDeleted,
                formID: decodeURIComponent(self.gridData.data.formID),
                relationFieledName: self.gridData.data.relationFieledName,
                relationFieledValue: self.gridData.data.relationFieledValue,
            }
            self.$store.dispatch("grid/gridBatchActions", vm)
                .then((response) => {
                    if (response.succeeded) {
                        self.gridData.data.dataJsonSource = response.data
                        self.rowsChanged = []
                    }
                    self.$getToastify(response)
                    gridInstance.endCustomLoading()
                })
        },
        async undoRecords() {
            //console.log('undoRecords')
            this.refreshGrid(this.gridData.data.formID)
        },
        async executeJavaScript() {
            const self = this
            setTimeout(function () {
                // console.log(self.stringFieldName)
                self.$executeJavaScript(self.stringFieldName, "globalFildControl" + self.gridId)
            }, 100);
        },
        dropdownListIsMultipleColumn(fieldName) {
            const item = this.gridData.data.formDetails.find(t => t.fieldName == fieldName)
            return item.ddlDataMultiple && item.ddlDataMultiple.dropdownListDataMultipleColumnsHeader && item.ddlDataMultiple.dropdownListDataMultipleColumnsHeader.length > 0
        },
        dropdownListValueExpr(fieldName) {
            const isMultipleColumn = this.dropdownListIsMultipleColumn(fieldName)
            if (isMultipleColumn) {
                return 'StringValue'
            }
            else {
                return 'idValue'
            }
        },
        dropdownListDataDisplay(fieldName) {
            const isMultipleColumn = this.dropdownListIsMultipleColumn(fieldName)
            if (isMultipleColumn) {
                const item = this.gridData.data.formDetails.find(t => t.fieldName == fieldName)
                const fieldsName = item.ddlDataMultiple.dropdownListDataMultipleColumnsHeader.map((t) => t.fieldName);
                // const fieldsValue = fieldsName.map((key) => t[key])
                // return helper.stringFormat(item.ddlDataMultiple.textFieldFormat, fieldsValue)
                return fieldsName[0]
            }
            else {
                return 'textValue'
            }
        },
        dropdownListDataSource(fieldName) {
            const isMultipleColumn = this.dropdownListIsMultipleColumn(fieldName)
            const item = this.gridData.data.formDetails.find(t => t.fieldName == fieldName)
            if (isMultipleColumn) {
                return JSON.parse(item.ddlDataMultiple.dataJsonSource)
            }
            else {
                return item.ddlData
            }
        },
        loadLayout() {
            try {
                return JSON.parse(this.gridData.data.gridLayout)
            }
            catch (e) {
                return null
            }
        },
        async saveLayout(layout) {
            // console.log(this.gridData.data.formID)
            // console.log(helper.decrypt(this.gridData.data.formID, true))
            // // console.log('saveLayout',layout)
            const layoutData = JSON.stringify(layout)
            const vm = {
                formID: decodeURIComponent(this.gridData.data.formID),
                layout: layoutData,
            }
            await this.$store.dispatch("grid/saveGridLayout", vm)
        },
        returnLayout() {
            const gridInstance = this.gridRef
            return gridInstance.state()
        },
        onExporting(e) {
            const self = this
            let sheetDataList = []
            console.log('onExporting', e)
            const workbook = new Workbook();
            const worksheet = workbook.addWorksheet(this.gridData.data.formHeaderName);

            exportDataGrid({
                component: e.component,
                worksheet: worksheet,
                autoFilterEnabled: true,
                customizeCell: function ({ gridCell, excelCell }) {
                    if (gridCell.column.lookup) {
                        if (gridCell.rowType == 'header') {
                            const sheetData = {
                                colName: excelCell.address.replace(/[0-9]/g, ''),
                                data: gridCell.column.lookup.items
                            }
                            sheetDataList.push(sheetData)
                        }
                        else {
                            const cellEndDataNumber = gridCell.column.lookup.items.length
                            const cellName = excelCell.address.replace(/[0-9]/g, '')
                            excelCell.dataValidation = {
                                type: 'list',
                                allowBlank: true,
                                formulae: ['Data!$' + cellName + '$1:$' + cellName + '$' + cellEndDataNumber],
                                operator: 'notEqual',
                                showErrorMessage: true,
                                errorStyle: 'error',
                            }
                        }
                    }
                }
            }).then(function () {
                const dataSheet = workbook.addWorksheet('Data');
                dataSheet.state = 'hidden';
                console.log(sheetDataList)
                sheetDataList.forEach(itemArray => {
                    itemArray.data.forEach((itemData, indexData) => {
                        dataSheet.getCell(itemArray.colName + (indexData + 1)).value = itemData.textValue
                    })

                });
            }).then(function () {
                workbook.xlsx.writeBuffer()
                    .then(function (buffer) {
                        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), self.gridData.data.formHeaderName + '_' + moment().format('DD/MM/YYYY_HH:mm:ss') + '.xlsx');
                    });
            });
            e.cancel = true;
        },
        contextMenuItemClick(e) {
            const self = this
            const gridInstance = self.gridRef;
            const RowsData = gridInstance.getSelectedRowsData()
            if (!e.itemData.items && RowsData.length > 0) {
                const RowData = RowsData[0]
                // console.log('contextMenuItemClick', e)
                // console.log(RowData)
                if (e.itemData.id == -1) {
                    const url = '/Form/' + this.$route.params.formID + '/' + helper.encrypt(RowData.ID, true)
                    window.open(url, '_blank')
                }
                else if(e.itemData.id > 0){
                    this.$bus.$emit("popup-print-report", {idValue:helper.encrypt(RowData.ID, true),reportID:e.itemData.id});
                }
            }

        },
        contextMenuShowing(e) {
            const self = this
            const ariaRowIndex = (e.jQEvent.currentTarget.ariaRowIndex - 1)
            if (ariaRowIndex >= 0) {
                const gridInstance = self.gridRef;
                const pageIndex = gridInstance.pageIndex()
                const pageSize = gridInstance.pageSize()
                const rowIndex = ariaRowIndex - (pageIndex * pageSize)
                gridInstance.selectRowsByIndexes(rowIndex)
            }
        }
    },
};
</script>