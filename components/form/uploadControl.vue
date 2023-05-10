<template>
    <div :class="[formDetails.class, { 'd-none': !formDetails.visible }]">
        <div>
            <label v-if="!formDetails.isColumnGrid" class="col-form-label captionFontType captionFontSize captionFontColor captionBold">
                {{ formDetails.caption }}:
                <span v-if="formDetails.isRequired && !formDetails.isReadOnly" class="text-danger">*</span>
            </label>
            <div :id="'input-' + formDetails.id + '-' + formDetails.fieldName" :class="(formDetails.isRequired && !formDetails.isReadOnly?'fieldMandatory':'fieldNotMandatory')">
                <DxFileUploader :rtl-enabled="$vuetify.rtl" select-button-text="حدد ملف"
                    label-text="أو قم بإسقاط ملف هنا" :accept="allowedFileExtensions.join()"
                    :allowed-file-extensions="allowedFileExtensions" :multiple="true" :max-file-size="maxFileSize"
                    upload-mode="useForm" :visible="formDetails.visible" :readOnly="formDetails.isReadOnly"
                    value-change-event="keyup input change" @value-changed="valueChanged" :onFocusOut="onFocusOut"
                    :value="files">
                    <DxValidator :rtl-enabled="$vuetify.rtl">
                        <DxRequiredRule v-if="formDetails.isRequired && !formDetails.isReadOnly" message="" :rtl-enabled="$vuetify.rtl" />
                    </DxValidator>
                </DxFileUploader>
            </div>
        </div>
    </div>
</template>

<script>
import { DxFileUploader } from 'devextreme-vue/file-uploader';
import { DxValidator, DxRequiredRule, } from 'devextreme-vue/validator';
import helper from '@/common/helpers/Utils'
export default {
    components: {
        DxFileUploader,
        DxValidator,
        DxRequiredRule,
    },
    props: {
        formDetails: Object,
    },
    data() {
        return {
            allowedFileExtensions: ['.jpg', '.jpeg', '.png', '.tif', '.bmp', '.txt', '.doc', '.docx', '.xls', '.xlsx', '.pdf', '.rtf', '.xlsx'],
            maxFileSize: 2 * (1024 * 1024),
            files: [],
        };
    },
    methods: {
        onFocusOut(data) {
            if (!helper.isNullOrEmpty(this.formDetails.onLostFocus)) {
                this.$executeJavaScript(this.formDetails.onLostFocus, "executeJavaScript")
            }
        },
        async valueChanged(data) {
            this.formDetails.defaultValue = ''
            let filesObject = []
            for (var i = 0, file; file = data.value[i]; i++) {
                const fileData = {
                    name: file.name,
                    fileType: file.type,
                    size: file.size,
                    data: ((await helper.fileToStrig(data.value))[0])
                }
                filesObject.push(fileData)
            }
            if (filesObject.length > 0) {
                this.formDetails.defaultValue = JSON.stringify(filesObject)
            }
        },
    },
};
</script>
