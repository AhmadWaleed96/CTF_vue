import Vue from 'vue'
import VueToastify from "vue-toastify";

Vue.use(VueToastify, {
    // https://www.vuescript.com/extendable-notification-toastify/
    // Only allow one notification on the screen at a time
    singular: false,

    // With backdrop or not
    withBackdrop: false,

    // Backdrop color
    backdrop: "rgba(0, 0, 0, 0.2)",

    // "top-left", "top-center", "top-right", "center-left", 
    // "center-center", "center-right", "bottom-left", "bottom-center", "bottom-right"
    position: "bottom-left",

    // The duration in milliseconds the error notification should be visible for
    errorDuration: 8000,

    // The duration in milliseconds the success notification should be visible for.
    successDuration: 4000,

    // The duration in milliseconds the warning and info notification should be visible for.
    warningInfoDuration: 6000,

    // Whether the notifications disappears after the set time.
    canTimeout: true,

    // Whether the notifications can be paused by hovering over them.
    canPause: true,

    // Hide the progress bar
    hideProgressbar: false,

    // Show default title
    defaultTitle: false,

    // or "light"
    //theme: "dark",
    theme: "light",

    // Whether new notifications should display on top of the stack or not.
    orderLatest: true,

    // If string supplied this will apply the usual transition classes (eg.: .name-enter-active);
    // If object supplied it expect a name and optionally a moveClass (this class has to use !important for its rules) attribute.
    // The name will be applied as above. The move class applied when the notifications adjust their position.
    // String / Object
    transition: null,

    // If set to false, no icon will be shown on the notification.
    iconEnabled: true,

    // Drag to dismiss or not
    draggable: true,

    // How far the notification should be dragged to dismiss
    dragThreshold: 0.75,

    // Base icon class
    baseIconClass: null,

    // Max number of toasts allowed to be visible at a time
    maxToasts: 6,

    // If turned on, only toasts with unique mode/type will be show. Others are queued.
    oneType: false,
    title:''
    // customNotifications: {
    //     clientError: {
    //         title: "نجح",
    //         defaultTitle: false,
    //         canTimeout: false
    //     },
    // }
    
    // this.$vToastify.success("تم إضافة 5 نقاط لرصيد المستخدم"); 
    // this.$vToastify.error("تم إضافة 5 نقاط لرصيد المستخدم"); 
    // this.$vToastify.warning("تم إضافة 5 نقاط لرصيد المستخدم"); 
    // this.$vToastify.info("تم إضافة 5 نقاط لرصيد المستخدم"); 
});