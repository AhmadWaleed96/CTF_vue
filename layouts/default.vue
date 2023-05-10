<template>
  <v-app>
    <core-app-bar />
    <core-drawer />
    <core-view />
    <core-footer />
    <core-system-info />
    <!-- <SystemInfo/> -->
    <core-user-setting />
  </v-app>
</template>

<script>
import Drawer from '@/layouts/default/Drawer';
import Footer from '@/layouts/default/Footer';
import AppBar from '@/layouts/default/AppBar';
import View from '@/layouts/default/View';
import SystemInfo from '@/layouts/default/SystemInfo';
import UserSetting from '@/layouts/default/UserSetting';
export default {
  middleware: 'auth',
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
  }),
  components: {
    CoreDrawer: Drawer,
    CoreFooter: Footer,
    CoreAppBar: AppBar,
    CoreView: View,
    CoreSystemInfo: SystemInfo,
    CoreUserSetting: UserSetting,
  },
  created() {
  },
  methods: {
  },
};
</script>
