<template>
    <div v-if="hasLink" :class="[formDetails.class, { 'd-none': !formDetails.visible }]">
        <div class="form-group row">
            <div :id="'input-'+formDetails.id+'-'+formDetails.fieldName" class="col-12">
                <DxButton :text="formDetails.caption" type="default" styling-mode="outlined" class=""
                    :visible="formDetails.visible" :readOnly="formDetails.isReadOnly" :rtl-enabled="$vuetify.rtl"
                    @click="openLink" />
            </div>
        </div>
    </div>
</template>

<script>
import DxButton from 'devextreme-vue/button';
import notify from 'devextreme/ui/notify';
import helper from '@/common/helpers/Utils'
export default {
    components: {
        DxButton,
        helper,
    },
    props: {
        formDetails: Object,
    },
    data() {
        return {
        };
    },
    computed: {
        hasLink() {
            return !helper.isNullOrEmpty(this.formDetails.defaultValue)
        },
    },
    async fetch() {
    },
    methods: {
        openLink() {
            notify('سيتم ربطه بالصفحة المطلوبة عند انتهاء المشروع');
            console.log(this.formDetails.defaultValue)
        },
    },
};
</script>
