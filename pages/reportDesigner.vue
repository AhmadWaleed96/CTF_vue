<template>
    <div ref="designer" style="position:absolute;left:0; right:0; top:0; bottom:0;"
    :style="{'direction': $vuetify.rtl ? 'ltr': 'unset'}"
        data-bind="dxReportDesigner: $data"></div>
</template>
    
<script>
import ko from "knockout";
import "devexpress-reporting/dx-reportdesigner";


import "devextreme/dist/css/dx.light.css";
import "@devexpress/analytics-core/dist/css/dx-analytics.common.css";
import "@devexpress/analytics-core/dist/css/dx-analytics.light.css";
import "@devexpress/analytics-core/dist/css/dx-querybuilder.css";
import "devexpress-reporting/dist/css/dx-webdocumentviewer.css";
import "devexpress-reporting/dist/css/dx-reportdesigner.css";


export default {
    name: "ReportDesignerComponent",
    mounted() {
        // const vm = {
        //     formID: 'da550a06=Invoice',
        //     idValue: 'da550a06=ETMd832ec80',
        //     operationType: 18,
        //     lang: this.$vuetify.lang.current,
        //     authorization: localStorage.getItem('auth._token.local')
        // }

        var designerOptions = {
            // reportUrl: ko.observable("Invoice"),
            reportUrl: '',
            requestOptions: {
                host: process.env.apiURL.toLowerCase().substr(0, process.env.apiURL.toLowerCase().lastIndexOf('/api')) + '/',
                getDesignerModelAction: "DXXRD/GetDesignerModel"
            }
        };
        ko.applyBindings(designerOptions, this.$refs.designer);
    },
    beforeDestroy() {
        ko.cleanNode(this.$refs.designer);
    }
};
</script>