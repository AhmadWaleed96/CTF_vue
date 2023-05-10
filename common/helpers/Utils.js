//import Vue from 'vue'
module.exports = {
  getParams: _obj => {
    const params = new URLSearchParams();
    for (const key in _obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (_obj.hasOwnProperty(key)) {
        params.append(key, _obj[key]);
      }
    }
    const request = {
      params
    };
    return request;
  },
  convertObjectToFormData: _obj => {
    const formdata = new FormData();

    for (const key in _obj) {
      formdata.append(key, _obj[key]);
    }
    return formdata;
  },
  getPageUrl: () => {
    return window.location.href.replace("/en", "").replace("/ar", "");
  },
  validateImage: _file => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
    if (!allowedTypes.includes(_file.type)) {
      return "صيغة الملف غير صحيحة" + " " + _file.name;
    }
    if (_file._size > 1024 * 1024 * 5) {
      return "حجم الملف اكبر من المسموح به" + " " + _file.name;
    }
    return "";
  },
  getEmptyUUID() {
    return "00000000-0000-0000-0000-000000000000";
  },
  validateImagetype: (_file) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg', 'application/pdf', '.doc']
    if (!allowedTypes.includes(_file.type)) {
      return false
    }
  },
  validateSelfSerivcesImageType: (_file) => {
    if (_file != undefined && _file.length > 0) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg', 'application/pdf', '.doc']
      if (_file[0].type != undefined && !allowedTypes.includes(_file[0].type)) {
        return false
      }
    }
    return true
  },
  validatefileSize: (_file) => {
    if (_file != undefined && _file.length > 0) {
      if (_file[0]._size != undefined && _file[0]._size > 1024 * 1024 * 10) {
        return false
      }
    }
    return true
  },
  generateUUID() {
    // Public Domain/MIT
    let d = new Date().getTime();
    if (
      typeof performance !== "undefined" &&
      typeof performance.now === "function"
    ) {
      d += performance.now(); // use high-precision timer if available
    }
    const newGuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );

    return newGuid;
  },
  stripHtml(html) {
    // Create a new div element
    const temporalDivElement = document.createElement("div");
    // Set the HTML content with the providen
    temporalDivElement.innerHTML = html;
    // Retrieve the text property of the element (cross-browser support)
    return (
      temporalDivElement.textContent || temporalDivElement.textContent || ""
    );
  },
  getFlag(isComplete) {
    if (isComplete) return "~/assets/images/all/flag-green.svg";
    else return "~/assets/images/all/flag-orange.svg";
  },
  capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
  },
  roundToTwoDigitsAfterComma(floatNumber) {
    //    return parseFloat((Math.round(floatNumber * 100) / 100).toFixed(2));
    return parseFloat((floatNumber).toFixed(2));
  },
  isNullOrEmpty(data) {
    if (!data && data!=0) {
      // console.log(data,1)
      return true
    }
    if (Number.isNaN(data) || data=='NaN') {
      // console.log(2)
      return true
    }
    try{
      // console.log(3)
      return Object.keys(data+'').length == 0;
    }
    catch(e){
      // console.log(4)
      return Object.keys(data).length == 0;
    }
  },
  findRefByName(refName, self) {
    let obj = self
    while (obj) {
      if (obj.$refs[refName]) {
        return obj.$refs[refName]
      }
      obj = obj.$parent
    }
    return undefined
  },
  stringToBoolean(value) {
    switch ((value + '').toString()?.toLowerCase()?.trim()) {
      case "true":
      case "yes":
      case "1":
        return true;

      case "false":
      case "no":
      case "0":
        return false;

      default:
        return null;
    }
  },
  stringFormat(format, args) {
    var i;
    if (args instanceof Array) {
      for (i = 0; i < args.length; i++) {
        format = format.replace(new RegExp('\\{' + i + '\\}', 'gm'), args[i]);
      }
      return format;
    }
    for (i = 0; i < arguments.length - 1; i++) {
      format = format.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i + 1]);
    }
    return format;
  },
  toEnglishDigits(str) {
    var e = '۰'.charCodeAt(0);
    str = str.replace(/[۰-۹]/g, function (t) {
      return t.charCodeAt(0) - e;
    });

    e = '٠'.charCodeAt(0);
    str = str.replace(/[٠-٩]/g, function (t) {
      return t.charCodeAt(0) - e;
    });
    return str;
  },
  async fileToStrig(files) {
    const filePromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async () => {
          try {
            const response = (reader.result.split('base64,')[1])
            resolve(response);
          } catch (err) {
            reject(err);
          }
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsDataURL(file);
      });
    });
    const fileInfos = await Promise.all(filePromises);
    return fileInfos;
  },
  // executeJavaScript(js, id) {
  //   console.log(id)
  //   console.log($nuxt)
  //   //this.$nuxt.$emit("change-date", 123); 
  //   try {
  //       if (!this.isNullOrEmpty(id)) {
  //           var element = document.getElementById(id);
  //           if (typeof (element) != 'undefined' && element != null) {
  //               document.getElementById(id).remove();
  //           }
  //       }
  //       var oScript = document.createElement("script");
  //       if (!this.isNullOrEmpty(id)) {
  //           oScript.setAttribute("id", id);
  //       }
  //       var oScriptText = document.createTextNode(js);
  //       //console.log(oScriptText)
  //       oScript.appendChild(oScriptText);
  //       document.body.appendChild(oScript);
  //   } catch (e) {
  //     console.log(e)
  //   }
  // },
  getTokenData() {
    var str =localStorage.getItem('auth._token.local')+''.replace('Bearer ','')
    if(str){
      str = str.split('.')[1]
      str = str.replace('/-/g', '+')
      str = str.replace('/_/g', '/')
      switch (str.length % 4) {
        case 0:
          break
        case 2:
          str += '=='
          break
        case 3:
          str += '='
          break
        default:''
      }
    
      str = (str + '===').slice(0, str.length + (str.length % 4))
      str = str.replace(/-/g, '+').replace(/_/g, '/')
    
      str = decodeURIComponent(escape(Buffer.from(str, 'base64').toString('binary')))
    
      str = JSON.parse(str)
      str.Data=JSON.parse(str.Data)
    }
    return str
  },
  reverseString(str) {
    var splitString = str.split("");
    var reverseArray = splitString.reverse();
    var joinArray = reverseArray.join("");
    return joinArray;
  },
  encrypt(toEncode,subStr) {
    const btoaData=btoa(String(toEncode))
    const reverseStringData=this.reverseString(btoaData)
    const encodeURIComponentData=encodeURIComponent(reverseStringData)
    if(subStr==true){
      return this.generateUUID().substring(0, 8) + encodeURIComponentData  + this.generateUUID().substring(0, 8)
    }
    return encodeURIComponentData;
  },
  decrypt(encodeData,subStr) {
    if(subStr==true){
      encodeData=encodeData.substring(8).slice(0,-8)
    }
    const decodeURIComponentData=decodeURIComponent(encodeData)
    const reverseStringData=this.reverseString(decodeURIComponentData)
    const batobData=atob(String(reverseStringData))
    return batobData;
  },
};
