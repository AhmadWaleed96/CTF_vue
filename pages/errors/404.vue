<template>
    <div v-if="showErrorData" class="col text-center">
        <h1>
            Error 404
        </h1>
    </div>
  </template>
  <script>
  import { mapState, mapGetters } from 'vuex'
  
  export default {
    components: {
    },
    data() {
        return {
            showErrorData:false
        };
    },
    computed: {
    },
    created() {
        //this.checkPageFound()
    },   
    beforeMount() {
        //this.checkPageFound()
    },   
    mounted: function() {
        // this.checkPageFound()
    },
    async fetch() {
        this.checkPageFound()
    },
    methods: {
        checkPageFound(){
            this.showErrorData=false
            const path=$nuxt.$route.path
            const pathSplit=path.split('/')
            if(pathSplit.length>1){
                const page=pathSplit[1].toLowerCase()
                if(page=='form' || page=='xpodrilldown' ){
                    this.$router.push('/Form/464eb455==AM4MTM84454e74')
                }
                else{
                    this.showErrorData=true
                }
            }
            else
            {
                this.showErrorData=true
            }
        }
    },
  }
  </script>
  
  