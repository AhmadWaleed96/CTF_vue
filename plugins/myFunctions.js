import Vue from 'vue'
const myFunctions = {}

myFunctions.install = function (Vue) {
  Vue.prototype.$getToastify  = (data) => {
    Vue.$vToastify.setSettings({withBackdrop:false,position: (localStorage.getItem('direction')+''=='ltr' ? 'bottom-right' : 'bottom-left')})
    if(data.msg !== undefined){
        if(data.code == 1){
            Vue.$vToastify.success(data.msg)
        }
        else if(data.code < 0){
            Vue.$vToastify.error(data.msg)
        }
        else if(data.code == 0){
            Vue.$vToastify.warning(data.msg)
        }
        else{
            Vue.$vToastify.info(data.msg)
        }

    }
  },
  Vue.prototype.$confirmToastify  = (title,func) => {
    Vue.$vToastify.setSettings({withBackdrop:true, position: (localStorage.getItem('direction') + '' == 'ltr' ? 'bottom-right' : 'bottom-left') })
    Vue.$vToastify.prompt({
        body: title,
        answers: { 'نعم': true, 'لا': false },
    }).then(value => {
        if (value) {
            func(value);
            return true;
        } else {
            func(value);
            return false;
        }
    })
  }
}
Vue.use(myFunctions)


