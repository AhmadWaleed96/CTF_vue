<template>
    <span>
    <DxDropDownButton :data-source="reportInfo" v-if="showDropDownButton && reportInfo && $route.params.idValue"
        :drop-down-options="{ type: 'default', stylingMode: 'outlined', class: 'mx-2' }" text="طباعة"
        display-expr="textValue" value-expr="stringValue" :rtl-enabled="$vuetify.rtl" @item-click="printForm"
        :width="120" />


        <DxPopup :show-title="true" title="حفظ التقرير" :drag-enabled="false"
            :rtl-enabled="$vuetify.rtl" :hide-on-outside-click="true" :visible="popupVisible" :onHidden="onHiddenPopup"
            :show-close-button="false">
            <div ref="viewer" style="position: absolute; left: 0; right: 0; top: 0; bottom: 0"></div>

        </DxPopup>

    </span>
</template>

<script>
import 'devexpress-reporting/dx-webdocumentviewer';
import { DxReportViewer } from 'devexpress-reporting/dx-webdocumentviewer';
import * as ko from 'knockout';

import "devextreme/dist/css/dx.light.css";
import "@devexpress/analytics-core/dist/css/dx-analytics.common.css";
import "@devexpress/analytics-core/dist/css/dx-analytics.light.css";
import "devexpress-reporting/dist/css/dx-webdocumentviewer.css";


import DxDropDownButton from 'devextreme-vue/drop-down-button';
import DxPopup from 'devextreme-vue/popup';

export default {
    components: {
        DxDropDownButton,
        DxPopup,
    },
    props: {
        reportInfo: Array,
        showDropDownButton:Boolean
    },
    computed: {
    },
    data() {
        return {
            popupVisible: false,
        }
    },
    fetch() {
        this.$bus.$off("popup-print-report");
        this.$bus.$on("popup-print-report" , data => {
            console.log(data)
            this.printForm(data)
        })
    },
    methods: {
        onHiddenPopup(e) {
            this.popupVisible = false
        },
        async printForm(e) {
            // console.log(e)

            const vm = {
                formID: this.$route.params.formID,
                idValue:(this.showDropDownButton?this.$route.params.idValue:e.idValue) ,
                operationType: (this.showDropDownButton?e.itemData.stringValue:e.reportID),
                lang: this.$vuetify.lang.current,
                authorization:localStorage.getItem('auth._token.local')
            }
            // console.log(vm)
            
            const reportUrl = ko.observable(JSON.stringify(vm))
            const viewerRef = this.$refs.viewer;
            const requestOptions = {
                //host: process.env.apiURL2.toLowerCase().replace('api',''),
                host: process.env.apiURL.toLowerCase().substr(0, process.env.apiURL.toLowerCase().lastIndexOf('/api'))+'/',
                invokeAction: "DXXRDV",
                token:localStorage.getItem('auth._token.local')
            };
            const viewer = new DxReportViewer(viewerRef, { reportUrl, requestOptions });
            viewer.render();
            this.popupVisible=true

        },
    },
};
</script>
