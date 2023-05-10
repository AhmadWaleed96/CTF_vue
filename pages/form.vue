<template>
    <v-container fill-height fluid>

        <v-row justify="center">

            <v-col md="12">
                <v-card>
                    <v-tabs v-model="tab" background-color="deep-purple accent-4" centered dark icons-and-text>
                        <v-tabs-slider></v-tabs-slider>

                        <!-- <DxProgressBar id="progress-bar-status" :value="progressGetFormDetails" /> -->
                        <v-tab href="#tab-1" v-if="dynamicForm.succeeded && !dynamicForm.data.showOnlyDesignerReport">
                            {{ dynamicForm.data.formHeaderName }} جديد
                            <v-icon>mdi-newspaper-plus</v-icon>
                        </v-tab>

                        <v-tab href="#tab-2" v-if="dynamicForm.succeeded">
                            بحث في {{ dynamicForm.data.formHeaderName }}
                            <v-icon>mdi-card-search-outline</v-icon>
                        </v-tab>
                        
                        <v-tab href="#tab-3" v-if="dynamicForm.succeeded && $route.params.idValue">
                            المرفقات
                            <v-icon>mdi-paperclip</v-icon>
                        </v-tab>

                    </v-tabs>

                    <v-tabs-items v-model="tab">
                        <v-tab-item value="tab-1" v-if="dynamicForm.succeeded && !dynamicForm.data.showOnlyDesignerReport">
                            <v-col>
                                <TabPanel v-if="dynamicForm.succeeded" :data="dynamicForm.data" />
                            </v-col>
                        </v-tab-item>
                        <v-tab-item value="tab-2" v-if="dynamicForm.succeeded">
                            <v-col>
                                <Grid :dataGridApi="true" :formDetails="null" />
                            </v-col>
                        </v-tab-item>
                        <v-tab-item value="tab-3" v-if="dynamicForm.succeeded">
                            <v-col>
                                <Attachment />
                            </v-col>
                        </v-tab-item>
                    </v-tabs-items>

                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import TabPanel from '@/components/form/tabPanel'
import Grid from '@/components/form/grid'
import Attachment from '@/components/form/attachment'
import DxProgressBar from 'devextreme-vue/progress-bar';

import helper from '@/common/helpers/Utils'
export default {
    components: {
        TabPanel,
        Grid,
        Attachment,
        DxProgressBar,
    },
    data() {
        return {
            tab: 'tab-1',
            loadeFormDetails: false,
            dynamicForm: {
                code: null,
                data: null,
                httpStatusCode: null,
                msg: null,
                msgDetails: null,
                succeeded: null,
                url: null,
            },
            newData: [],
            progressGetFormDetails: 0
        };
    },
    computed: {
    },
    created() {
        this.getFormDetails()
    },
    async fetch() {
    },
    methods: {
        async getFormDetails() {

            const self = this
            self.loadeFormDetails = true
            self.progressGetFormDetails = 0
            const config = {
                onDownloadProgress: function (progressEvent) {
                    self.progressGetFormDetails = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    // console.log(self.progressGetFormDetails)
                    // console.log(progressEvent.loaded)
                    // console.log(progressEvent.total)
                }
            };

            const vm = {
                formID: self.$route.params.formID,
                idValue: self.$route.params.idValue,
                workflowTypeID: '2',
            }
            self.dynamicForm = await self.$store.dispatch("form/getFormDetails", { vm, config });
            if (self.dynamicForm.succeeded) {
                let stringFieldName = ''
                self.dynamicForm.data.dynamicForm.forEach((form, index) => {
                    form.formDetails.forEach((formDetail, index) => {
                        if (!helper.isNullOrEmpty(formDetail.fieldName)) {
                            // console.log(formDetail.caption,formDetail.fieldName,formDetail.onChange)
                            //stringFieldName+=`var txt${formDetail.fieldName} = (document.querySelectorAll('[name="${formDetail.fieldName}"]')[0]); var ddl${formDetail.fieldName} = (document.querySelectorAll('[name="${formDetail.fieldName}"]')[0]);`
                            //stringFieldName += `var txt${formDetail.fieldName} = (document.getElementsByName('${formDetail.fieldName}')[0]); var ddl${formDetail.fieldName} = (document.getElementsByName('${formDetail.fieldName}')[0]);`
                            //stringFieldName += "var txt" + formDetail.fieldName + "=$('[name=" + formDetail.fieldName + "]');var ddl" + formDetail.fieldName + "=$('[name=" + formDetail.fieldName + "]');";
                            const fname = formDetail.fieldName
                            //stringFieldName += "var txt" + fname + "= ddl" + fname + "= cb" + fname +"=$('[name=" + fname + "]');"
                            stringFieldName += "var txt" + fname + "= ddl" + fname + "= cb" + fname + "=document.querySelectorAll('[name=" + fname + "]');"

                        }
                        // setTimeout(
                        //     helper.executeJavaScript(stringFieldName, "globalFildControl")
                        // , 5000);
                        //helper.executeJavaScript(stringFieldName, "globalFildControl")
                    })
                })
                //helper.executeJavaScript(stringFieldName, "globalFildControl")
                setTimeout(function () {
                    self.$executeJavaScript(stringFieldName, "globalFildControl")
                }, 100);
            }
            else {
                self.$getToastify(self.dynamicForm)
            }
            self.loadeFormDetails = false
        },
    },
};
</script>
