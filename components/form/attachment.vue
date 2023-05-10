<template>
    <div>
      <DxFileManager
        :file-system-provider="remoteProvider"
        current-path="Widescreen"
        :rtl-enabled="$vuetify.rtl" 
      >
      <DxItemView mode="thumbnails"/>

        <DxPermissions
          :create="true"
          :copy="true"
          :move="true"
          :delete="true"
          :rename="true"
          :upload="true"
          :download="true"
        />
      </DxFileManager>

    </div>
  </template>
  
  <script>
  import { DxFileManager, DxPermissions, DxItemView } from 'devextreme-vue/file-manager';
  import RemoteFileSystemProvider from 'devextreme/file_management/remote_provider';
  
  const remoteProvider = new RemoteFileSystemProvider({
    endpointUrl: 'https://js.devexpress.com/Demos/Mvc/api/file-manager-file-system-images',
  });
  
  export default {
    components: {
      DxFileManager,
      DxPermissions,
      DxItemView,
    },
  
    data() {
      return {
        remoteProvider,
      };
    },
  
    methods: {
    },
  };
  </script>
 