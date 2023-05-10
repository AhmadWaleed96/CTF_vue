import Vue from 'vue';
import helper from '@/common/helpers/Utils'
import moment from 'moment'

//import busEvent from '@/plugins/busEvent'
// import jQuery from "@/static/js/jquery-3.6.3.min.js"

//window.Event = new Vue();



export default function (_ctx, inject) {
    const self = this
    const executeJavaScript = function (js, id) {

        // this.$bus.$emit("change-date", 123); 
        try {
            if (!helper.isNullOrEmpty(id)) {
                var element = document.getElementById(id);
                if (typeof (element) != 'undefined' && element != null) {
                    document.getElementById(id).remove();
                }
            }
            var oScript = document.createElement("script");
            if (!helper.isNullOrEmpty(id)) {
                oScript.setAttribute("id", id);
            }
            var oScriptText = document.createTextNode(js);
            //console.log(oScriptText)
            oScript.appendChild(oScriptText);
            document.body.appendChild(oScript);
        } catch (e) {
            console.log(e)
        }
    }.bind(new Vue());
    inject('executeJavaScript', executeJavaScript);


    Object.defineProperty(NodeList.prototype, "GetValue", {
        value: function () {
            if (this.length > 0) {

                var self = (this[0])
                var val = self.value
                if (val == '') {
                    val = null;
                }
                return val;
            }
            return ''
        }
    });
    Object.defineProperty(NodeList.prototype, "GetText", {
        value: function () {
            if (this.length > 0) {
                var self = (this[0])
                var val = self.value
                return val;
            }
            return ''
        }
    });
    Object.defineProperty(NodeList.prototype, "GetChecked", {
        value: function () {
            var val = (this[0]).value
            return JSON.parse(val);
        }
    });
    Object.defineProperty(NodeList.prototype, "SetText", {
        value: function (val) {
            if (this.length > 0) {
                var self = (this[0])
                if (helper.isNullOrEmpty(val)) {
                    val = '';
                }
                $nuxt.$emit('change-data-js-' + self.name, val)
                return val;
            }
            return ''
        }
    });
    Object.defineProperty(NodeList.prototype, "SetValue", {
        value: function (val) {
            if (this.length > 0) {
                var self = (this[0])
                if (helper.isNullOrEmpty(val)) {
                    val = '';
                }
                $nuxt.$emit('change-data-js-' + self.name, val)
            }
            return val;
        }
    });
    Object.defineProperty(NodeList.prototype, "GetDate", {
        value: function () {
            if (this.length > 0) {
                var self = (this[0])
                var val = self.value
                var format = self.closest('.dx-datebox').getAttribute('data-format').toUpperCase()
                var newDate = moment(val, helper.reverseString(format)).toDate()
                return newDate
            }
            return ''
        }
    });
    Object.defineProperty(NodeList.prototype, "SetDate", {
        value: function (val) {
            if (this.length > 0) {
                var self = (this[0])
                if (helper.isNullOrEmpty(val)) {
                    val = '';
                }
                $nuxt.$emit('change-data-js-' + self.name, val)
                return val;
            }
            return ''
        }
    });
    Object.defineProperty(NodeList.prototype, "Get", {
        value: function () {
            var self = (this[0])
            return self.value;
        }
    });
    Object.defineProperty(NodeList.prototype, "SetEnabled", {
        value: function (val = true) {
            try {
                if (this.length > 0) {
                    var self = (this[0])
                    $nuxt.$emit('set-enabled-js-' + self.name, val)
                }
            }
            catch (e) {
                console.log(e)
            }
            return '';
        }
    });
    Object.defineProperty(NodeList.prototype, "PerformCallback", {
        value: function () {
            // var self = (this[0])
            // return self.value;
            return null
        }
    });
    Object.defineProperty(NodeList.prototype, "GetEditor", {
        value: function (val) {
            // if (this.length > 0) {
            //     var self = (this[0])
            //     if (helper.isNullOrEmpty(val)) {
            //         val = '';
            //     }
            //     console.log(self)
            //     return self
            // }
            return ''
        },
    });
    Object.defineProperty(NodeList.prototype, "UpdateEdit", {
        value: function () {

            if (this.length > 0) {
                var self = (this[0])
                var val = self.value
                $nuxt.$emit('grid-update-edit-' + val, true)
                return val;
            }
            return ''
        }
    });

    window.toastifyWarning = function toastifyWarning(msg) {
        Vue.$vToastify.setSettings({ withBackdrop: false, position: (localStorage.getItem('direction') + '' == 'ltr' ? 'bottom-right' : 'bottom-left') })
        Vue.$vToastify.warning(msg+'')
    };
}