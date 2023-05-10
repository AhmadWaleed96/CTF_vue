import Vue from 'vue';
import moment from 'moment'

// import script from '~/static/js/script.js'
// export default (ctx, inject) => {
//   inject('script', script(moment))
// }

const setDate = function(date){
    let options = { day: 'numeric', year: 'numeric', month: 'long', };
    let d = new Date(date);
    return d.toLocaleDateString("en-US", options);
  }

Vue.filter('DateFormat', setDate);
Vue.filter('taskDateformat', function(value,isArabic) {

  if(isArabic){
    moment.locale('ar');
   }else{
    moment.locale('en-gb');
   }
  if (value) {

    return moment(String(value)).format('LLLL')

  }

});
Vue.filter('formatDate', function(value,isArabic) {

  if(isArabic){
    moment.locale('ar');
   }else{
    moment.locale('en-gb');
   }
  if (value) {

    return moment(String(value)).format('YYYY/MM/DD')

  }

});
Vue.filter('formatDateTime', function(value,isArabic) {
  if(isArabic){
    moment.locale('ar');
   }else{
    moment.locale('en-gb');
   }
  if (value) {

    return moment(String(value)).format('YYYY/MM/DD')

  }

});
Vue.filter('MomentNow', function(value,isArabic) {
 if(isArabic){
  moment.locale('ar');
 }else{
  moment.locale('en-gb');
 }
  if (value) {

    let date =  moment(String(value)).format('YYYY/MM/DD HH:mm');
    // const d = moment(String('2020/12/12 10:25 PM')).format('YYYY/MM/DD HH:mm');
    // const dd = moment(String(d),'yyyy/MM/DD HH:mm').fromNow();
    return moment(String(date),'yyyy/MM/DD HH:mm').fromNow();
  }
});
Vue.filter('headerDataFormat', function(value,isArabic) {
//   if(isArabic){
//     moment.locale('ar');
//    }else{
//     moment.locale('en-gb');
//    }
  if (value) {
    var monthName=moment(String(value)).locale('en').format(' MMMM ');
    var day=moment(String(value)).locale('en').format(' DD');
    var date=moment(String(value)).locale('en').format('hha | YYYY ,');
    // console.log(date+monthName+day)
    return date+day+monthName
  }

});
Vue.filter('headerMonth', function(value,isArabic) {
//   if(isArabic){
//     moment.locale('ar');
//    }else{
//     moment.locale('en-gb');
//    }
  if (value) {
    var monthName=moment(String(value)).locale('ar').format('MMMM');
    var day=moment(String(value)).locale('en').format('DD');
    // console.log(day+' '+monthName)
    return day+' '+monthName+','
  }

});
Vue.filter('headerYear', function(value,isArabic) {
//   if(isArabic){
//     moment.locale('ar');
//    }else{
//     moment.locale('en-gb');
//    }
  if (value) {
    var hour=moment(String(value)).locale('en').format('hh a');
    var year=moment(String(value)).locale('en').format('YYYY');
    // console.log(hour+' | '+year)
    return hour+' | '+year
  }
});
Vue.filter('headerDateFormat', function(value,lang) {
  if (value) {
    //return moment(String(value)).locale(lang).format('DD MMMM, YYYY | hh a');
    return moment(String(value)).format('LLL');
  }
});
