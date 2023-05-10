<template>
    <div ref="viewer" style="position: absolute; left: 0; right: 0; top: 0; bottom: 0"></div>
</template>
    



<script>
import 'devexpress-reporting/dx-webdocumentviewer';
import { DxReportViewer } from 'devexpress-reporting/dx-webdocumentviewer';
import * as ko from 'knockout';

import "devextreme/dist/css/dx.light.css";
import "@devexpress/analytics-core/dist/css/dx-analytics.common.css";
import "@devexpress/analytics-core/dist/css/dx-analytics.light.css";
import "devexpress-reporting/dist/css/dx-webdocumentviewer.css";

export default {
    name: "WebDocumentViewer",
    mounted() {
        
        const vm = {
                formID: 'da550a06=ETMd832ec80',
                idValue:'da550a06=ETMd832ec80' ,
                operationType: 18,
                lang: this.$vuetify.lang.current,
                authorization:localStorage.getItem('auth._token.local')
            }
            
            
        const reportUrl = ko.observable(JSON.stringify(vm))
        const viewerRef = this.$refs.viewer;
        const requestOptions = {
                host: process.env.apiURL.toLowerCase().substr(0, process.env.apiURL.toLowerCase().lastIndexOf('/api'))+'/',
                invokeAction: "DXXRDV",
        };
        const viewer = new DxReportViewer(viewerRef, { reportUrl, requestOptions });
        viewer.render();
    },
    beforeUnmount() {
        ko.cleanNode(this.$refs.viewer);
    }
};
</script>



<!-- 
<script>
import ko from "knockout";
import "devexpress-reporting/dx-reportdesigner";

import "devextreme/dist/css/dx.light.css";
import "@devexpress/analytics-core/dist/css/dx-analytics.common.css";
import "@devexpress/analytics-core/dist/css/dx-analytics.light.css";
import "devexpress-reporting/dist/css/dx-webdocumentviewer.css";

export default {
    name: "ReportDesignerComponent",
    mounted() {
        var designerOptions = {
            reportUrl: ko.observable("TestReport"),
            requestOptions: {
                host: "https://localhost:54114/",
                // host: "https://localhost:44387/",
                getDesignerModelAction: "DXXRD/GetDesignerModel"
            }
        };
        ko.applyBindings(designerOptions, this.$refs.designer);
    },
    beforeDestroy() {
        ko.cleanNode(this.$refs.designer);
    }
};
</script> -->
