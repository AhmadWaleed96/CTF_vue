<template>
   <v-app>
      <v-content>
         <v-toolbar flat>
            <Languages />
         </v-toolbar>
         <keep-alive>
            <nuxt />
         </keep-alive>
      </v-content>
            <SystemInfo />
   </v-app>
</template>
  
<script>
import Languages from '@/layouts/default/Languages';
import SystemInfo from '@/layouts/default/SystemInfo';
export default {
   name: "initial",
   components: {
      Languages,
      SystemInfo,
   },
   data: () => ({
   }),
   computed: {
   },
   async fetch() {
   },
   methods: {
   }
};
</script>
  