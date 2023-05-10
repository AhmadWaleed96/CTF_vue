
<style lang="scss">
    // :root {
    //     --captionFontSize: 5px;
    // }
    .captionFontType {
        font-family: var(--captionFontType) !important;
    }
    .fieldFontType,.dx-placeholder {
        font-family: var(--fieldFontType) !important;
    }
    .captionFontSize {
        font-size: var(--captionFontSize) !important;
    }
    .captionFontColor {
        color: var(--captionFontColor) !important;
    }
    .fieldMandatory .mandatoryFieldBgColor {
        background-color: var(--mandatoryFieldBgColor) !important;
    }
    .fieldNotMandatory .notMandatoryFieldBgColor {
        background-color: var(--notMandatoryFieldBgColor) !important;
    }
    .fieldFontSize {
        font-size: var(--fieldFontSize) !important;
    }
    .fieldFontColor {
        color: var(--fieldFontColor) !important;
    }
    .captionBold {
        font-weight: var(--captionBold) !important;
    }
    .fieldFontBold,.dx-placeholder {
        font-weight: var(--fieldFontBold) !important;
    }
    .screenHieght {
        height: var(--screenHieght) !important;
    }
    .gridWidth {
        width: var(--gridWidth) !important;
    }

</style>
<script>
export default {
    name: 'CoreUserSetting',
    components: {
    },
    data() {
        return {
        };
    },
    computed: {
    },
    head() {
    },
    async fetch() {
        this.$bus.$off("refresh-user-setting");
        this.$bus.$on("refresh-user-setting", data => {
            this.getUserSetting(data)
        })
    },
    created() {
        this.getUserSetting()
    },
    methods: {
        async getUserSetting(userSetting) {
            if(!userSetting){
                userSetting = await this.$store.dispatch("account/getUserSetting")
            }
            document.documentElement.style.setProperty("--captionFontType", userSetting.captionFontType)
            document.documentElement.style.setProperty("--fieldFontType", userSetting.fieldFontType)
            document.documentElement.style.setProperty("--captionFontSize", userSetting.captionFontSize+ "px")
            document.documentElement.style.setProperty("--captionFontColor", userSetting.captionFontColor)
            document.documentElement.style.setProperty("--mandatoryFieldBgColor", userSetting.mandatoryFieldBgColor)
            document.documentElement.style.setProperty("--notMandatoryFieldBgColor", userSetting.notMandatoryFieldBgColor)
            document.documentElement.style.setProperty("--fieldFontSize", userSetting.fieldFontSize+ "px")
            document.documentElement.style.setProperty("--fieldFontColor", userSetting.fieldFontColor)
            document.documentElement.style.setProperty("--captionBold", (userSetting.captionBold?'bold':'normal'))
            document.documentElement.style.setProperty("--fieldFontBold", (userSetting.fieldFontBold?'bold':'normal'))
            document.documentElement.style.setProperty("--screenHieght", userSetting.screenHieght+ "px")
            document.documentElement.style.setProperty("--gridWidth", userSetting.gridWidth+ "px")
        },
    }
};
</script>
