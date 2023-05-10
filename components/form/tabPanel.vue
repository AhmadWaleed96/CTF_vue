<template>
    <div>
        <form @submit="onFormSubmit($event)">
            <v-tabs :vertical="tabsIsVertical" :class="(tabsIsVertical?'cs-tabs-vertical':'')" color="deep-purple accent-4" v-model="selectedTab"
            :stacked="true">
                <v-tabs-slider></v-tabs-slider>

                <v-tab v-for="item in dynamicForm" :key="'tab-' + item.id + '-' + item.indexNum"
                    :class="'tab-' + item.id + '-' + item.indexNum">
                    <h4 class="font-weight-bold link-tap">
                        {{ item.name }}
                    </h4>
                </v-tab>

                <v-tab-item v-for="(item, dynamicFormIndex) in dynamicForm"
                    :key="'tab-item-' + item.id + '-' + item.indexNum" class="tab-form-main"
                    :eager="true">
                    <v-card flat class="row">
                        <h3 class="font-weight-bold text-center pb-5 col-12">
                            {{ item.tabSubName }}
                        </h3>
                        <template
                            v-for="(formDetails, formDetailsIndex) in item.formDetails.slice().sort((a, b) => a.indexNum - b.indexNum).sort((a, b) => a.controlColNum - b.controlColNum).sort((a, b) => a.controlRowNum - b.controlRowNum)">
                            <!-- TextBox -->
                            <TextBox v-if="formDetails.controlType.toLowerCase() == 'textbox'"
                                :formDetails="formDetails"
                                :key="'TextBox_tab_' + item.id + '_control_' + formDetails.id + '_fieldName_' + formDetails.fieldName" />

                            <!-- DropdownList -->
                            <DropdownList v-else-if="formDetails.controlType.toLowerCase() == 'dropdownlist'"
                                :formDetails="formDetails" :formDetailsList="item.formDetails"
                                :key="'DropdownList_tab_' + item.id + '_control_' + formDetails.id + '_fieldName_' + formDetails.fieldName" />

                            <!-- NumberBox -->
                            <NumberBox v-else-if="formDetails.controlType.toLowerCase() == 'numberbox'"
                                :formDetails="formDetails"
                                :key="'NumberBox_tab_' + item.id + '_control_' + formDetails.id + '_fieldName_' + formDetails.fieldName" />

                            <!-- DateBox -->
                            <DateBox v-else-if="formDetails.controlType.toLowerCase() == 'datebox'"
                                :formDetails="formDetails"
                                :key="'DateBox_tab_' + item.id + '_control_' + formDetails.id + '_fieldName_' + formDetails.fieldName" />

                            <!-- HjriDateBox -->
                            <HjriDateBox v-else-if="formDetails.controlType.toLowerCase() == 'hjridatebox'"
                                :formDetails="formDetails"
                                :key="'HjriDateBox_tab_' + item.id + '_control_' + formDetails.id + '_fieldName_' + formDetails.fieldName" />

                            <!-- CheckBox -->
                            <CheckBox v-else-if="formDetails.controlType.toLowerCase() == 'checkbox'"
                                :formDetails="formDetails"
                                :key="'CheckBox_tab_' + item.id + '_control_' + formDetails.id + '_fieldName_' + formDetails.fieldName" />

                            <!-- Image -->
                            <ImageBox v-else-if="formDetails.controlType.toLowerCase() == 'image'"
                                :formDetails="formDetails"
                                :key="'ImageBox_tab_' + item.id + '_control_' + formDetails.id + '_fieldName_' + formDetails.fieldName" />

                            <!-- UploadControl -->
                            <UploadControl v-else-if="formDetails.controlType.toLowerCase() == 'uploadcontrol'"
                                :formDetails="formDetails"
                                :key="'UploadControl_tab_' + item.id + '_control_' + formDetails.id + '_fieldName_' + formDetails.fieldName" />

                            <!-- CheckCompoBox -->
                            <CheckCompoBox v-else-if="formDetails.controlType.toLowerCase() == 'checkcompobox'"
                                :formDetails="formDetails"
                                :key="'CheckCompoBox_tab_' + item.id + '_control_' + formDetails.id + '_fieldName_' + formDetails.fieldName" />

                            <!-- ColorBox -->
                            <ColorBox v-else-if="formDetails.controlType.toLowerCase() == 'colorbox'"
                                :formDetails="formDetails"
                                :key="'ColorBox_tab_' + item.id + '_control_' + formDetails.id + '_fieldName_' + formDetails.fieldName" />

                            <!-- HTMLEditor -->
                            <HTMLEditor v-else-if="formDetails.controlType.toLowerCase() == 'htmleditor'"
                                :formDetails="formDetails"
                                :key="'HTMLEditor_tab_' + item.id + '_control_' + formDetails.id + '_fieldName_' + formDetails.fieldName" />

                            <!-- Map -->
                            <Map v-else-if="formDetails.controlType.toLowerCase() == 'map'" :formDetails="formDetails"
                                :formDetailsList="item.formDetails"
                                :key="'Map_tab_' + item.id + '_control_' + formDetails.id + '_fieldName_' + formDetails.fieldName" />

                            <!-- TokenBox -->
                            <TokenBox v-else-if="formDetails.controlType.toLowerCase() == 'tokenbox'"
                                :formDetails="formDetails"
                                :key="'TokenBox_tab_' + item.id + '_control_' + formDetails.id + '_fieldName_' + formDetails.fieldName" />

                            <!-- TrackBar -->
                            <TrackBar v-else-if="formDetails.controlType.toLowerCase() == 'trackbar'"
                                :formDetails="formDetails"
                                :key="'TrackBar_tab_' + item.id + '_control_' + formDetails.id + '_fieldName_' + formDetails.fieldName" />

                            <!-- MemoBox -->
                            <MemoBox v-else-if="formDetails.controlType.toLowerCase() == 'memobox'"
                                :formDetails="formDetails"
                                :key="'MemoBox_tab_' + item.id + '_control_' + formDetails.id + '_fieldName_' + formDetails.fieldName" />

                            <!-- LabelBox -->
                            <LabelBox v-else-if="formDetails.controlType.toLowerCase() == 'label'"
                                :formDetails="formDetails"
                                :key="'LabelBox_tab_' + item.id + '_control_' + formDetails.id + '_fieldName_' + formDetails.fieldName" />

                            <!-- HyperLink -->
                            <HyperLink v-else-if="formDetails.controlType.toLowerCase() == 'hyperlink'"
                                :formDetails="formDetails"
                                :key="'HyperLink_tab_' + item.id + '_control_' + formDetails.id + '_fieldName_' + formDetails.fieldName" />

                            <!-- Tree -->
                            <Tree v-else-if="formDetails.controlType.toLowerCase() == 'tree'" :dataTreeApi="false"
                                :formDetails="formDetails"
                                :key="'Tree_tab_' + item.id + '_control_' + formDetails.id + '_fieldName_' + formDetails.fieldName" />

                            <!-- Grid -->
                            <Grid v-else-if="formDetails.controlType.toLowerCase() == 'grid'" :dataGridApi="false"
                                :formDetails="formDetails"
                                :key="'Grid_tab_' + item.id + '_control_' + formDetails.id + '_dynamicFormIndex_' + dynamicFormIndex + '_formDetailsIndex_' + formDetailsIndex" />

                            <h6 v-else :class="{ 'd-none': !formDetails.visible }"
                                :key="'tab_' + item.id + '_control_' + formDetails.id + '_fieldName_' + formDetails.fieldName">
                                {{ formDetails.controlType }}
                            </h6>

                        </template>
                    </v-card>
                </v-tab-item>

            </v-tabs>
            <v-divider class="mt-6"></v-divider>
            <FormActionButtons :data="data" />
        </form>
    </div>
</template>

<script>
import TextBox from '@/components/form/textBox'
import NumberBox from '@/components/form/numberBox'
import DateBox from '@/components/form/dateBox'
import HjriDateBox from '@/components/form/hjriDateBox'
import CheckBox from '@/components/form/checkBox'
import ImageBox from '@/components/form/imageBox'
import UploadControl from '@/components/form/uploadControl'
import CheckCompoBox from '@/components/form/checkCompoBox'
import DropdownList from '@/components/form/dropdownList'
import ColorBox from '@/components/form/colorBox'
import HTMLEditor from '@/components/form/htmlEditor'
import Map from '@/components/form/map'
import TokenBox from '@/components/form/tokenBox'
import TrackBar from '@/components/form/trackBar'
import MemoBox from '@/components/form/memoBox'
import LabelBox from '@/components/form/labelBox'
import HyperLink from '@/components/form/hyperLink'
import Tree from '@/components/form/tree'
import Grid from '@/components/form/grid'
import FormActionButtons from '@/components/form/formActionButtons'



export default {
    components: {
        TextBox,
        NumberBox,
        DateBox,
        HjriDateBox,
        CheckBox,
        ImageBox,
        UploadControl,
        CheckCompoBox,
        DropdownList,
        ColorBox,
        HTMLEditor,
        Map,
        TokenBox,
        TrackBar,
        MemoBox,
        LabelBox,
        HyperLink,
        Tree,
        Grid,
        FormActionButtons,
    },
    props: {
        data: Object,
    },
    data() {
        return {
            selectedTab: 0,
            //selectedTab: 'tab-118-2',
            loop: false,
            animationEnabled: false,
            swipeEnabled: false,
            dynamicForm: this.data.dynamicForm.sort((a, b) => a.indexNum - b.indexNum),

            smartphone: {
            tabsIsVertical: false,
            min: -1,
            max: 767
            },
            desktop: {
            tabsIsVertical: true,
            min: 768,
            max: Infinity
            }
        };
    },
    async fetch() {
        this.$bus.$off("change-tab-selected");
        this.$bus.$on("change-tab-selected", data => {
            this.selectedTab = data
        })
    },
    methods: {
        onFormSubmit(e) {
            e.preventDefault();
        },
    },
};
</script>
