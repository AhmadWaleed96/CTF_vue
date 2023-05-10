<template>
    <div v-if="treeData.succeeded" class="col-12 div-tree-list">
        <input type="hidden" value="0" name="PublicValue" class="PublicValue">
        <input type="hidden" :value="treeId" :name="'GV'+treeData.data.subFormID" class="GV">
        <h4 v-if="treeData.data.dynamicFormDetailsName != null" class="text-center pt-5">{{ treeData.data.dynamicFormDetailsName }}</h4>
        <DxTreeList :id="treeId" :ref="treeId" :name="treeId" :data-source="dataSource" key-expr="ID"
        :parent-id-expr="parentIdExpr"
            :columns="treeData.data.formDetails" :show-borders="true" :allow-column-reordering="true"
            :allow-column-resizing="true" :column-auto-width="true" :rtl-enabled="$vuetify.rtl"
            :selection="{ mode: 'single' }" @editing-start="onEditingStart" @init-new-row="onInitNewRow"
            @row-inserting="onRowInserting" @row-inserted="onRowInserted" @row-updating="onRowUpdating"
            @row-updated="onRowUpdated" @row-removing="onRowRemoving" @row-removed="onRowRemoved" @saving="onSaving"
            @saved="onSaved" @edit-canceling="onEditCanceling" @edit-canceled="onEditCanceled"
            @row-dbl-click="onRowDblClick" class="dx-data-tree" :column-resizing-mode="'widget'"
            noDataText="لا توجد بيانات">

            <DxLoadPanel :shading="true" shadingColor="rgba(0, 0, 0, 0.1)" text="جاري التنفيذ..." />
            <DxPaging :enabled="true" :page-size="10" />
            <DxEditing :allow-updating="treeData.data.permissions.showUpdateButton"
                :allow-adding="treeData.data.permissions.showNewButtonInHeader"
                :allow-deleting="treeData.data.permissions.showDeleteButton" :use-icons="true" :mode="editingMode"
                :confirm-delete="false" />

            <DxColumnChooser :enabled="treeData.data.showColumnChooser" />
            <DxColumnFixing :enabled="true" />
            <DxFilterRow :visible="treeData.data.showFilterRow" />
            <DxHeaderFilter :visible="treeData.data.showFilterRow" />
            <!-- <DxScrolling mode="infinite"/> -->
            <!-- <DxGroupPanel :visible="treeData.data.showGroupPanel" /> -->
            <DxSorting :visible="false" mode="single" />
            <DxToolbar v-if="treeData.data.editingType == 4">
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
            <DxToolbar v-else>
                <DxItem name="addRowButton" :visible="false"/>
            </DxToolbar>

            <DxStateStoring :enabled="true" :saving-timeout="500" type="custom" :custom-load="loadLayout"
                :custom-save="saveLayout" />

            <DxColumn v-for="col in treeData.data.formDetails"
                v-bind:key="'control_' + col.id + '_fieldName_' + col.fieldName" :data-field="col.fieldName"
                :caption="col.caption" :width="col.columnProperties.width"
                :allow-filtering="col.columnProperties.allowFilter" :allow-grouping="col.columnProperties.allowGroup"
                :allow-header-filtering="col.columnProperties.allowSort"
                :allow-editing="col.columnProperties.editorVisible" true-text="نعم" false-text="لا"
                :show-editor-always="false" :rtl-enabled="$vuetify.rtl" :visible="col.visible==true && col.showOnEditOnly==false"
                 edit-cell-template="templateEdit" :data-type="(col.controlType.toLowerCase() == 'datebox'  || col.controlType.toLowerCase() == 'hjridatebox'? 'date' : '')"
                :format="(col.controlType.toLowerCase() == 'datebox' || col.controlType.toLowerCase() == 'hjridatebox' ? col.dateFormate : '')">

                <!-- <DxLookup v-if="col.controlType.toLowerCase() == 'dropdownlist'" :data-source="col.ddlData"
                    value-expr="idValue" display-expr="textValue" /> -->

                <DxLookup v-if="col.controlType.toLowerCase() == 'dropdownlist'" :data-source="dropdownListDataSource(col.fieldName)"
                    :value-expr="dropdownListValueExpr(col.fieldName)" :display-expr="dropdownListDataDisplay(col.fieldName)"/>

                    <DxRequiredRule v-if="col.isRequired && !col.isReadOnly && col.controlType.toLowerCase() != 'checkbox'"
                    message="" :rtl-enabled="$vuetify.rtl" />

            </DxColumn>

            <template #templateEdit="{ data: cellInfo }">
                <div v-on:click="divclick(cellInfo)"
                    v-for="col in treeData.data.formDetails.filter(item => item.fieldName == cellInfo.column.dataField)"
                    :key="'TextBox_control_' + col.id + '_fieldName_' + col.fieldName">

                    <TextBox v-if="col.controlType.toLowerCase() == 'textbox'" :formDetails="col"
                        :valueGrid="cellInfo.value"
                        :onValueGridChanged="(value, defaultValue) => onValueChanged(value, defaultValue, cellInfo)" />

                     <DropdownList v-else-if="col.controlType.toLowerCase() == 'dropdownlist'" :formDetails="col"
                        :formDetailsList="treeData.data.formDetails" :valueGrid="cellInfo.value"
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

        </DxTreeList>
    </div>
</template>
  
<script>
import {
    DxColumn,
    DxEditing,
    DxPaging,
    DxTreeList,
    DxHeaderFilter,
    DxFilterRow,
    DxFilterPanel,
    DxFilterBuilderPopup,
    DxScrolling,
    DxColumnChooser,
    DxColumnFixing,
    DxLookup,
    // DxGroupPanel,
    DxSorting,
    DxLoadPanel,
    DxToolbar,
    DxItem,
    DxStateStoring,
} from 'devextreme-vue/tree-list';
//import { DxLoadPanel } from 'devextreme-vue/load-panel';
//import DataSource from 'devextreme/data/data_source';
import 'devextreme/data/odata/store';
import helper from '@/common/helpers/Utils'
import { DxValidator, DxRequiredRule } from 'devextreme-vue/validator';



import TextBox from '@/components/form/textBox'
import DropdownList from '@/components/form/dropdownList'
import NumberBox from '@/components/form/numberBox'
import CheckBox from '@/components/form/checkBox'
import DateBox from '@/components/form/dateBox'
import MemoBox from '@/components/form/memoBox'
import HjriDateBox from '@/components/form/hjriDateBox'

import { DxButton } from 'devextreme-vue/button';

export default {
    components: {
        DxTreeList,
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
        // DxGroupPanel,
        DxSorting,
        DropdownList,
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
    },
    props: {
        formDetails: Object,
        dataTreeApi: Boolean
    },
    created() {
        if (!this.dataTreeApi) {
            const self = this
            this.stringFieldName = ''
            this.treeData = this.formDetails.tree
            if (this.treeData && this.treeData.succeeded) {
                this.treeData.data.formDetails.forEach((formDetail, index) => {
                    if (!helper.isNullOrEmpty(formDetail.fieldName)) {
                        const fname = formDetail.fieldName
                        self.stringFieldName += "var txt" + fname + "= ddl" + fname + "= cb" + fname + "=document.querySelectorAll('[name=" + fname + "]');"
                    }
                })
                self.stringFieldName += "var PublicValue=txtPublicValue=document.querySelectorAll('[name=PublicValue]');"
                //self.stringFieldName += "var gv=gv12=document.querySelectorAll('[name=GV]');"
                self.stringFieldName += "var gv"+this.treeData.data.subFormID+"=document.querySelectorAll('[name=GV"+this.treeData.data.subFormID+"]');"
            }
        }
    },
    computed: {
        dataSource: function () {
            if (this.treeData.succeeded) {
                this.parentIdExpr = this.treeData.data.parentID
                return JSON.parse(this.treeData.data.dataJsonSource)
            } else {
                return []
            }
        },
        editingMode: function () {
            if (this.treeData.data.editingType == 1) {
                //return 'form'
                return 'row'
            }
            if (this.treeData.data.editingType == 2) {
                return 'form'
            }
            else if (this.treeData.data.editingType == 3) {
                return 'popup'
            }
            else if (this.treeData.data.editingType == 4) {
                return 'row'
                // return 'batch'
            }
            else {
                return 'row'
            }
        },
        treeId: function () {
            let ref = ''
            if (this.dataTreeApi) {
                ref = 'tree_' + this.$route.params.formID
            }
            else {
                ref = 'tree_' + this.treeData.data.formID + '_' + this.treeData.data.subFormID
            }
            return ref
        },
        treeRef() {
            return this.$refs[this.treeId].instance;
        },
    },
    data() {
        return {
            parentIdExpr: '',
            stringFieldName: '',
            rowsChanged: [],
            newData: [],
            treeData: {
                code: null,
                data: null,
                httpStatusCode: null,
                msg: null,
                msgDetails: null,
                succeeded: null,
                url: null,
            },
        };
    },
    async fetch() {
        this.getTree()
        this.$bus.$off("refresh-tree-" + this.$route.params.formID);
        this.$bus.$on("refresh-tree-" + this.$route.params.formID, data => {
            if (this.dataTreeApi && this.treeData.succeeded) {
                this.refreshTree(this.$route.params.formID)
            }
        })

        this.$nuxt.$off("tree-update-edit-" + this.treeId);
        this.$nuxt.$on("tree-update-edit-" + this.treeId, data => {
            const self = this
            const treeInstance = self.treeRef;
            // console.log(treeInstance)
            treeInstance.saveEditData()
                .then((result) => {
                    treeInstance.addRow()
                })
        })
    },
    methods: {
        async getTree() {
            if (this.dataTreeApi) {
                const vm = {
                    formID: decodeURIComponent(this.$route.params.formID),
                    masterFormID: null,
                    relationFieledName: null,
                    sortingColumn: null,
                    sortingDir: null,
                    transactionType: "New",
                }
                const response = await this.$store.dispatch("tree/getTree", vm);
                if (response.succeeded) {
                    this.treeData = response
                }
                else {
                    this.$getToastify(response)
                }
            }
        },
        async refreshTree(formID) {
            const treeInstance = this.treeRef;
            treeInstance.beginCustomLoading()
            const treeParameter = {
                formID: decodeURIComponent(formID),
                relationFieledName: this.treeData.data.relationFieledName,
                relationFieledValue: this.treeData.data.relationFieledValue
            }
            const response = await this.$store.dispatch("tree/refreshTree", treeParameter);
            if (response.succeeded) {
                this.treeData.data.dataJsonSource = response.data
            }
            else {
                this.$getToastify(response)
            }
            treeInstance.endCustomLoading()
        },
        logEvent(eventName) {
            console.log(eventName);
        },
        divclick(data) {
            // console.log(data.data.Description);
            // console.log(data);
        },
        onRowDblClick(e) {
            if (this.dataTreeApi && !this.treeData.data.showOnlyDesignerReport && !this.treeData.data.gridIsQuery) {
                const url = '/Form/' + this.$route.params.formID + '/' + helper.encrypt(e.data.ID, true)
                this.$router.push(url)
            }
        },
        onInitNewRow(e) {
            // console.log('onInitNewRow', e)
            //console.log(e.component.getDataProvider())
            this.executeJavaScript()
        },
        async onRowInserting(e) {
            // console.log('onRowInserting', e);
            const self = this
            const isCanceled = new Promise((resolve, reject) => {
                const formIsValid = self.checkFormValidation()
                if (formIsValid) {
                    self.newData.push({
                        columnsCaption: self.parentIdExpr,
                        columnsName: self.parentIdExpr,
                        columnsValues: e.data[self.parentIdExpr],
                        controlType: 'NumberBox',
                        virtualValue: '',
                        isRequired: true,
                        visible: true,
                    })
                    self.newData.push({
                        columnsCaption: 'IndexNo',
                        columnsName: 'IndexNo',
                        columnsValues: (e.component.totalCount() + 1) + '',
                        controlType: 'NumberBox',
                        virtualValue: '',
                        isRequired: true,
                        visible: true,
                    })

                    if (self.treeData.data.editingType == 4) {
                        resolve(false)
                    }
                    else {
                        e.component.beginCustomLoading()
                        const vm = {
                            columns: self.newData,
                            formID: decodeURIComponent(self.treeData.data.formID),
                            relationFieledName: self.treeData.data.relationFieledName,
                            //relationFieledValue: self.treeData.data.relationFieledValue,
                            relationFieledValue: '1',
                        }
                        self.$store.dispatch("tree/rowInserting", vm)
                            .then((response) => {
                                if (response.succeeded) {
                                    self.treeData.data.dataJsonSource = response.data
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
            if (self.treeData.data.editingType == 4) {
                const vm = {
                    columns: self.newData,
                    formID: decodeURIComponent(self.treeData.data.formID),
                    idValue: e.key + '',
                    relationFieledName: self.treeData.data.relationFieledName,
                    relationFieledValue: self.treeData.data.relationFieledValue,
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
                            if (self.treeData.data.editingType == 4) {
                                if (self.rowsChanged.find(t => t.idValue == e.key)) {
                                    self.rowsChanged.find(t => t.idValue == e.key).columns = self.newData
                                }
                                else {
                                    const vm = {
                                        columns: self.newData,
                                        formID: decodeURIComponent(self.treeData.data.formID),
                                        idValue: e.key + '',
                                        relationFieledName: self.treeData.data.relationFieledName,
                                        relationFieledValue: self.treeData.data.relationFieledValue,
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
                                    formID: decodeURIComponent(self.treeData.data.formID),
                                    idValue: e.key + '',
                                    relationFieledName: self.treeData.data.relationFieledName,
                                    relationFieledValue: self.treeData.data.relationFieledValue,
                                }
                                self.$store.dispatch("tree/rowUpdating", vm)
                                    .then((response) => {
                                        if (response.succeeded) {
                                            self.treeData.data.dataJsonSource = response.data
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
                        if (self.treeData.data.editingType == 4) {
                            if (e.key > 0) {

                                const vm = {
                                    idValue: e.key + '',
                                    formID: decodeURIComponent(self.treeData.data.formID),
                                    relationFieledName: self.treeData.data.relationFieledName,
                                    relationFieledValue: self.treeData.data.relationFieledValue,
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
                                formID: decodeURIComponent(self.treeData.data.formID),
                                relationFieledName: self.treeData.data.relationFieledName,
                                relationFieledValue: self.treeData.data.relationFieledValue,
                            }
                            self.$store.dispatch("tree/rowDeleting", vm)
                                .then((response) => {
                                    if (response.succeeded) {
                                        self.treeData.data.dataJsonSource = response.data
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
            // cellInfo.component.updateDimensions();
        },
        checkFormValidation() {
            this.newData = []
            const self = this
            let formIsValid = true
            let firstItemNotValid = null

            self.treeData.data.formDetails.forEach((formDetail, index) => {
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
            const treeInstance = self.treeRef;
            treeInstance.beginCustomLoading()

            const rowsInserted = self.rowsChanged.filter(t => t.operationType == 'insert')
            const rowsUpdated = self.rowsChanged.filter(t => t.operationType == 'update')
            const rowsDeleted = self.rowsChanged.filter(t => t.operationType == 'delete')
            const vm = {
                rowsInserted: rowsInserted,
                rowsUpdated: rowsUpdated,
                rowsDeleted: rowsDeleted,
                formID: decodeURIComponent(self.treeData.data.formID),
                relationFieledName: self.treeData.data.relationFieledName,
                relationFieledValue: self.treeData.data.relationFieledValue,
            }
            self.$store.dispatch("tree/treeBatchActions", vm)
                .then((response) => {
                    if (response.succeeded) {
                        self.treeData.data.dataJsonSource = response.data
                        self.rowsChanged = []
                    }
                    self.$getToastify(response)
                    treeInstance.endCustomLoading()
                })
        },
        async undoRecords() {
            //console.log('undoRecords')
            this.refreshTree(this.treeData.data.formID)
        },
        async executeJavaScript() {
            const self = this
            setTimeout(function () {
                // console.log(self.stringFieldName)
                self.$executeJavaScript(self.stringFieldName, "globalFildControl" + self.treeId)
            }, 100);
        },
        dropdownListIsMultipleColumn(fieldName) {
            const item=this.treeData.data.formDetails.find(t=>t.fieldName==fieldName)
            return item.ddlDataMultiple && item.ddlDataMultiple.dropdownListDataMultipleColumnsHeader && item.ddlDataMultiple.dropdownListDataMultipleColumnsHeader.length > 0
        },
        dropdownListValueExpr(fieldName) {
            const isMultipleColumn=this.dropdownListIsMultipleColumn(fieldName)
            if(isMultipleColumn){
                return 'StringValue'
            }
            else{
                return 'idValue'
            }
        },
        dropdownListDataDisplay(fieldName) {
            const isMultipleColumn=this.dropdownListIsMultipleColumn(fieldName)
            if(isMultipleColumn){
                const item=this.treeData.data.formDetails.find(t=>t.fieldName==fieldName)
                const fieldsName = item.ddlDataMultiple.dropdownListDataMultipleColumnsHeader.map((t) => t.fieldName);
                // const fieldsValue = fieldsName.map((key) => t[key])
                // return helper.stringFormat(item.ddlDataMultiple.textFieldFormat, fieldsValue)
                return fieldsName[0]
            }
            else{
                return 'textValue'
            }
        },
        dropdownListDataSource(fieldName) {
            const isMultipleColumn=this.dropdownListIsMultipleColumn(fieldName)
                const item=this.treeData.data.formDetails.find(t=>t.fieldName==fieldName)
            if(isMultipleColumn){
                return JSON.parse(item.ddlDataMultiple.dataJsonSource)
            }
            else{
                return item.ddlData
            }
        },
        loadLayout() {
            try {
                return JSON.parse(this.treeData.data.gridLayout)
            }
            catch (e) {
                return null
            }
        },
        async saveLayout(layout) {
            const layoutData = JSON.stringify(layout)
            const vm = {
                formID: decodeURIComponent(this.treeData.data.formID),
                layout: layoutData,
            }
            await this.$store.dispatch("grid/saveGridLayout", vm)
        }
    },
};
</script>