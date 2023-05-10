<template>
    <div :class="[formDetails.class, { 'd-none': !formDetails.visible }]">
        <div>
            <label v-if="!formDetails.isColumnGrid" class="col-form-label captionFontType captionFontSize captionFontColor captionBold">
                {{ formDetails.caption }}:
                <span v-if="formDetails.isRequired && !formDetails.isReadOnly" class="text-danger">*</span>
            </label>
            <div :id="'input-' + formDetails.id + '-' + formDetails.fieldName" :class="(formDetails.isRequired && !formDetails.isReadOnly?'fieldMandatory':'fieldNotMandatory')">
                <div class="image-input image-input-empty image-input-outline">
                    <vue-core-image-upload :class="[{ 'image-input-readonly': formDetails.isReadOnly }]" class=""
                        :crop="false" @imagechanged="imagechanged" :max-file-size="maxFileSize" url="" :name="formDetails.fieldName"
                        :extensions="allowedFileExtensions.join()" text="" :is-xhr="false" :multiple-size="1">
                        <div class="image-input-wrapper" :style="{ 'background-image': 'url(' + defaultValue + ')' }">
                        </div>
                    </vue-core-image-upload>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import helper from '@/common/helpers/Utils'
export default {
    components: {
    },
    props: {
        formDetails: Object,
    },
    data() {
        return {
            allowedFileExtensions: ['png', 'gif', 'jpeg', 'jpg'],
            maxFileSize: 2 * (1024 * 1024),
            defaultValue: (helper.isNullOrEmpty(this.formDetails.defaultValue) ? require('@/assets/images/default-image.png') : this.formDetails.defaultValue),
        };
    },
    methods: {
        async imagechanged(file) {
            if (!this.formDetails.isReadOnly) {
                this.formDetails.defaultValue = ''
                const files = []
                files.push(file)
                const fileData = {
                    name: file.name,
                    fileType: file.type,
                    size: file.size,
                    data: ((await helper.fileToStrig(files))[0])
                }
                this.formDetails.defaultValue = JSON.stringify(fileData)
                if (helper.isNullOrEmpty(this.formDetails.defaultValue)) {
                    this.defaultValue = require('@/assets/images/default-image.png')
                    this.formDetails.defaultValue = ''
                }
                else {
                    this.defaultValue = `data:${fileData.fileType};base64,${fileData.data}`
                }
                // console.log(this.defaultValue)
                // console.log(this.formDetails.defaultValue)
            }
        },
    },
};
</script>
