<template>
    <div :class="[formDetails.class, { 'd-none': !formDetails.visible }]">
        <div>
            <label v-if="!formDetails.isColumnGrid" class="col-form-label captionFontType captionFontSize captionFontColor captionBold">
                {{ formDetails.caption }}:
                <span v-if="formDetails.isRequired && !formDetails.isReadOnly" class="text-danger">*</span>
            </label>
            <div :id="'input-' + formDetails.id + '-' + formDetails.fieldName" :class="(formDetails.isRequired && !formDetails.isReadOnly?'fieldMandatory':'fieldNotMandatory')">
                <DxMap :zoom="7" :height="230" :controls="true" :markers="mapMarkers" :name="formDetails.fieldName"
                    :marker-icon-src="require('@/assets/images/map-marker.png')" @click="addMarker" width="100%"
                    provider="google" :active-state-enabled="true" google="" type="roadmap" :rtl-enabled="$vuetify.rtl"
                    :visible="formDetails.visible" :disabled="formDetails.isReadOnly" :center="center"
                    :input-attr="{'class':'mandatoryFieldBgColor notMandatoryFieldBgColor fieldFontType fieldFontSize fieldFontColor fieldFontBold'}">
                    
                    <!-- <DxValidator :rtl-enabled="$vuetify.rtl">
                        <DxRequiredRule v-if="formDetails.isRequired && !formDetails.isReadOnly" message=""
                            :rtl-enabled="$vuetify.rtl" />
                    </DxValidator> -->
                </DxMap>
            </div>
        </div>
    </div>
</template>

<script>
import DxMap from 'devextreme-vue/map';
import { DxValidator, DxRequiredRule, } from 'devextreme-vue/validator';
import helper from '@/common/helpers/Utils'
export default {
    components: {
        DxMap,
        DxValidator,
        DxRequiredRule,
    },
    props: {
        formDetails: Object,
        formDetailsList: Array,
    },
    created() {
        if (!helper.isNullOrEmpty(this.formDetails.defaultValue)) {
            const defaultValue = this.formDetails.defaultValue.split(',')
            const location = [defaultValue[0], defaultValue[1]]
            this.mapMarkers.push({ location })
        }
    },
    data() {
        return {
            center: '24.774265,46.738586',
            mapMarkers: [],
        };
    },
    methods: {
        valueChanged(data) {
            this.formDetails.defaultValue = data.value;
        },
        addMarker(e) {
            this.mapMarkers = []
            this.mapMarkers.push({ location: e.location });
            this.$bus.$emit("change-map-location-latitude", e.location.lat);
            this.$bus.$emit("change-map-location-longitude", e.location.lng);
        },
    },
};
</script>
