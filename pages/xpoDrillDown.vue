<template>
    <v-container fill-height fluid>

        <v-row justify="center">

            <v-col md="12">
                <v-card>
                    <v-tabs v-model="tab" background-color="deep-purple accent-4" centered dark icons-and-text>
                        <v-tabs-slider></v-tabs-slider>

                        <v-tab href="#tab-1" >
                            بحث في 
                            <!-- {{ dynamicForm.data.formHeaderName }} -->
                            <v-icon>mdi-card-search-outline</v-icon>
                        </v-tab>

                    </v-tabs>

                    <v-tabs-items v-model="tab">
                        <v-tab-item value="tab-1" >
                            <v-col>
                                <Grid :dataGridApi="true" :formDetails="null" />
                            </v-col>
                        </v-tab-item>
                    </v-tabs-items>

                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Grid from '@/components/form/grid'
export default {
    components: {
        Grid,
    },
    data() {
        return {
            tab: null,
            loadeFormDetails: false,
        };
    },
    computed: {
    },
    created() {
    },
    async fetch() {
    },
    methods: {
    },
};
</script>
