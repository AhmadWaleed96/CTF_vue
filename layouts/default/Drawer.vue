<template>
    <v-navigation-drawer id="app-drawer" v-model="inputValue" app color="grey darken-2" dark :right="$vuetify.rtl" floating
        mobile-breakpoint="991" persistent width="300">

        <DxScrollView :rtl-enabled="$vuetify.rtl">
            <template v-slot:img="attrs">
                <v-img v-bind="attrs" gradient="to top, rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)" />
            </template>

            <v-list-item to="/" class="mune-header" two-line>
                <v-img :src="require('@/assets/images/logo.svg')" class="mune-image-logo" />
                <!-- <v-list-item-title class="title">CTF</v-list-item-title> -->
            </v-list-item>

            <v-divider class="mx-3" />

            <v-list nav>
                <v-list-item>
                    <v-list-item-content class="py-0">
                        <DxTextBox :rtl-enabled="$vuetify.rtl" :value="searchText" placeholder="بحث..."
                            value-change-event="keyup input change" @value-changed="searchTextChanged"
                            :showClearButton="true" />
                    </v-list-item-content>
                </v-list-item>

<!--           
                <v-list-item to="/report">
                    <v-list-item-icon><v-icon>mdi-home</v-icon></v-list-item-icon>
                    <v-list-item-title>report test</v-list-item-title>
                </v-list-item> -->

                <v-list-item to="/reportDesigner">
                    <v-list-item-icon><v-icon>mdi-home</v-icon></v-list-item-icon>
                    <v-list-item-title>report designer test</v-list-item-title>
                </v-list-item>
                
                <template v-if="searchText.length > 2">

                    <v-list-item v-for="(subMenu, indexSubMenu) in searchData" :key="indexSubMenu"
                        active-class="primary white--text" class="mune-link" :to="subMenu._NavigateUrl">
                        <v-list-item-icon class="mune-icon">
                            <v-icon>mdi-circle-small</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title v-text="subMenu.text" class="mune-title" />
                        <v-list-item-action>
                            <v-btn small icon :loading="subMenu.isLoading" :disabled="subMenu.isLoading"
                                @click="addRemoveToFavorite($event, subMenu)">
                                <v-icon v-if="subMenu.isFavorite" color="yellow darken-3">
                                    mdi-star
                                </v-icon>
                                <v-icon v-else color="grey lighten-1">
                                    mdi-star-outline
                                </v-icon>
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>

                    <v-list-item-title v-if="searchData.length == 0" class="text-center mune-title">
                        النص الذي أدخلته لم يُرجع أي نتائج
                    </v-list-item-title>
                </template>


                <template v-else v-for="(menu, menuIndex) in menusData">

                    <template v-if="menu.showMenuSection">
                        <v-list-item-title v-text="menu.items.msg" class="mt-5 mb-3" v-bind:key="menuIndex" />
                    </template>
                    <v-list-group v-for="(mainMenu, mainMenuIndex) in menu.items.data"
                        :key="menuIndex + '-' + mainMenuIndex">
                        <template v-slot:activator>
                            <v-list-item-action class="ml-3">
                                <v-icon>mdi-circle</v-icon>
                            </v-list-item-action>
                            <v-list-item-title v-text="mainMenu.text" class="mune-title" />
                            <!-- {{ menuIndex + '-' + mainMenuIndex }} -->
                        </template>
                        <v-list-item v-for="(subMenu, indexSubMenu) in mainMenu.items"
                            :key="menuIndex + '-' + mainMenuIndex + '-' + indexSubMenu" active-class="primary white--text"
                            class="mune-link" :to="subMenu._NavigateUrl">
                            <v-list-item-icon class="mune-icon">
                                <v-icon>mdi-circle-small</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title v-text="subMenu.text" class="mune-title" />
                            <v-list-item-action>
                                <v-btn small icon :loading="subMenu.isLoading" :disabled="subMenu.isLoading"
                                    @click="addRemoveToFavorite($event, subMenu)">
                                    <v-icon v-if="subMenu.isFavorite" color="yellow darken-3">
                                        mdi-star
                                    </v-icon>
                                    <v-icon v-else color="grey lighten-1">
                                        mdi-star-outline
                                    </v-icon>
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                    </v-list-group>

                </template>
            </v-list>

        </DxScrollView>
    </v-navigation-drawer>
</template>

<script>

import { mapMutations, mapState } from 'vuex';
import { DxTextBox, DxButton } from 'devextreme-vue/text-box';
import { DxScrollView } from 'devextreme-vue/scroll-view';

export default {
    name: 'CoreDrawer',
    components: {
        DxTextBox,
        DxButton,
        DxScrollView,
    },
    props: {
        opened: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            searchText: '',
            currentForm2: '2-1',
            currentForm: 392,
            menusData: [],
            searchData: [],
        }
    },
    computed: {
        ...mapState('app', ['image', 'color']),
        inputValue: {
            get() {
                return this.$store.state.app.drawer;
            },
            set(val) {
                this.setDrawer(val);
            },
        },
    },
    async fetch() {
        this.getMenu()
    },

    methods: {
        ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
        async getMenu() {
            const vm = {
                currentUrl: 'http://localhost:3000/'
            }
            const response = await this.$store.dispatch("menu/getMenu", vm);
            if (response.succeeded) {
                this.menusData = response.data
                // this.menusDataTemp = response.data
            }
        },
        async addRemoveToFavorite(e, item) {
            e.preventDefault()
            item.isLoading = true
            const vm = { formID: item.formID, isFavorite: !item.isFavorite, }
            const response = await this.$store.dispatch("menu/addRemoveToFavorite", vm);
            if (response.succeeded) {
                this.menusData.find(t => t.type == 1).items.data = response.data
                this.menusData.forEach((mainMenu, mainMenuIndex) => {
                    mainMenu.items.data.forEach((subMenu, subMenuIndex) => {
                        if (subMenu.items.find(t => t.formID == item.formID)) {
                            subMenu.items.find(t => t.formID == item.formID).isFavorite = vm.isFavorite
                        }
                    })
                })
                item.isLoading = false
            }
        },
        searchTextChanged(e) {
            const self = this
            self.searchText = e.value
            self.searchData = []
            if (self.searchText.length > 2) {
                self.menusData.find(t => t.type == 3).items.data.forEach((mainMenu, mainMenuIndex) => {
                    if (mainMenu && mainMenu.items && mainMenu.items.length > 0) {
                        mainMenu.items.filter(t => t.text.includes(self.searchText)).forEach((subMenu, subMenuIndex) => {
                            self.searchData.push(subMenu)
                        })
                    }
                })
            }
        },
    },
};
</script>
