<template>
    <div :class="[formDetails.class, { 'd-none': !formDetails.visible }]">
        <div>
            <h5 class="">
                {{ formDetails.caption }}:
                <span v-if="formDetails.isRequired && !formDetails.isReadOnly" class="text-danger">*</span>
            </h5>
        </div>
    </div>
</template>

<script>
import DxTextBox from 'devextreme-vue/text-box';
export default {
    components: {
        DxTextBox,
    },
    props: {
        formDetails: Object,
    },
    data() {
        return {
        };
    },
    async fetch() {
        this.$bus.$off("change-map-location-"+ this.formDetails.fieldName.toLowerCase());
        this.$bus.$on("change-map-location-"+ this.formDetails.fieldName.toLowerCase(), data => {
            this.defaultValue=data
        })
        this.$bus.$off("change-map-location-"+ this.formDetails.fieldName.toLowerCase());
        this.$bus.$on("change-map-location-"+ this.formDetails.fieldName.toLowerCase(), data => {
            this.defaultValue=data
        })
    },
    methods: {
        valueChanged(data) {
            this.formDetails.defaultValue = data.value;
        },
    },
};
</script>
