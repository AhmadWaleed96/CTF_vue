import { USER_PROFILE } from '../common/constants'
var cookieCutter = require('cookie-cutter');
import Vue from 'vue'
export default function ({ $axios, redirect, store, error: nuxtError }, inject) {

  // Create a custom axios instance
  const api = $axios.create({
    
  })

  // Set baseURL to something different
  //api.setBaseURL('https://my_api.com')



  // Inject to context as $api
  inject('axios', api)

  $axios.onRequest(config => {
    const lang = localStorage.getItem('currentLeng')
    config.headers.common['Accept-Language'] = lang;
  })

  $axios.onResponse(response => {
  })

  $axios.onError((error) => {
    // console.log({error})
    // // only need to fix during SSR
    // if (process.server) {
    //   // request errors do not seem to have this issue
    //   if (error.response) {
    //     // construct a new error object in the same form as the Axios error.
    //     // this is a simplified subset of the Axios error object that I need
    //     // for my app, but if this was implemented in this library, it would
    //     // contain the rest of err.response that can be serialized (e.g.
    //     // headers, statusText, etc.)
    //     const err = new Error(
    //       `Request failed with status code ${error.response.status}`
    //     );
    //     err.response = {
    //       data: error.response.data,
    //       status: error.response.status,
    //     };

    //     console.log(error)
    //     err.isAxiosError = true;
    //     //return Promise.reject(err);
    //   }
    // }
    // if(error.response.status==401){
    // }
    // console.log(error)
    // console.log(error.response.data)
    // if(error && error.response && error.response.data)
    // {
    //   error=error.response.data
    // }
    
    let resultError={
      code: -1,
      data: error,
      httpStatusCode: null,
      msg: error.toJSON().message,
      msgDetails: null,
      succeeded: false,
      url: null,
    }
    try{
      if(error && error.response && error.response.data && error.response.data.msg){
        resultError=error.response.data
      }
    }
    catch(e){
      console.log(error)
    }

    if(error.response.status==401){
      redirect('/Account/Login')
    }
    return Promise.reject(resultError);
  })
}
