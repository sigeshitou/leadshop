(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-user-bind-phone"],{"0581":function(t,e,a){"use strict";a.r(e);var i=a("b120"),n=a("bb7c");for(var o in n)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(o);a("54ac");var d,c=a("f0c5"),r=Object(c["a"])(n["default"],i["b"],i["c"],!1,null,"400abd81",null,!1,i["a"],d);e["default"]=r.exports},"54ac":function(t,e,a){"use strict";var i=a("c7d7"),n=a.n(i);n.a},b120:function(t,e,a){"use strict";var i;a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return i}));var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"he-page-content",attrs:{"data-theme":t.theme}},[t.mobile?a("v-uni-text",{staticClass:"he-mobile-text"},[t._v("更换手机后，下次登录可使用新手机号登录。\n        当前手机号："+t._s(t.mobile))]):t._e(),a("v-uni-view",{staticClass:"he-box"},[a("v-uni-view",{staticClass:"he-item flex "},[a("v-uni-text",{staticClass:"he-item__label"},[t._v("手机号")]),a("v-uni-input",{staticClass:"he-item__input flex-sub",attrs:{type:"number","placeholder-style":"font-size: 26rpx;font-family: PingFang SC;font-weight: 500;color: #999999;",maxlength:16,placeholder:"请填写要绑定的手机号"},model:{value:t.iphone,callback:function(e){t.iphone=e},expression:"iphone"}})],1),a("v-uni-view",{staticClass:"he-item flex"},[a("v-uni-text",{staticClass:"he-item__label"},[t._v("验证码")]),a("v-uni-input",{staticClass:"he-item__input flex-sub",attrs:{type:"number","placeholder-style":"font-size: 26rpx;font-family: PingFang SC;font-weight: 500;color: #999999;",oninput:"value=value.replace(/[^\\d]/g,'')",placeholder:"请填写收到的验证码"},model:{value:t.code,callback:function(e){t.code=e},expression:"code"}}),a("v-uni-button",{staticClass:"cu-btn he-item__get-code",class:t.time?"he-item__get-code-0":"he-item__get-code-1",attrs:{type:"text",disabled:!!t.time},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.getCode.apply(void 0,arguments)}}},[t._v(t._s(t.time?t.num+"s后重新获取":"获取验证码"))])],1)],1),a("v-uni-button",{staticClass:"cu-btn he-submit",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.submit.apply(void 0,arguments)}}},[t._v("确认绑定")])],1)},o=[]},bb7c:function(t,e,a){"use strict";a.r(e);var i=a("f577"),n=a.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return i[t]}))}(o);e["default"]=n.a},c7d7:function(t,e,a){var i=a("f9cc");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=a("4f06").default;n("12429d00",i,!0,{sourceMap:!1,shadowMode:!1})},f577:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={name:"bind-phone",data:function(){return{iphone:"",code:"",time:null,num:60}},computed:{mobile:function(){return this.getStorageSync("userInfo").mobile}},methods:{submit:function(){var t=this;this.iphone&&this.code&&this.$heshop.users("put",{behavior:"bindMobile",type:"code"},{mobile:this.iphone,code:this.code}).then((function(){t.$h.toast("绑定手机号成功")})).catch((function(t){console.error(t)}))},getCode:function(){if(this.iphone&&!this.time){var t=this;this.$heshop.sms("post",{mobile:this.iphone,type:1}).then((function(e){t.time=setInterval((function(){t.num--,t.num<=0&&(clearInterval(t.time),t.time=null)}),1e3)})).catch((function(t){}))}}},beforeDestroy:function(){this.time&&clearInterval(this.time)}};e.default=i},f9cc:function(t,e,a){var i=a("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/* start--主题色--start */\n/* end--主题色--end */.he-page-content[data-v-400abd81]{padding:%?20?%}.he-box[data-v-400abd81]{width:%?710?%;background:#fff;border-radius:%?16?%;padding:%?16?% %?24?%}.he-item[data-v-400abd81]{height:%?100?%}.he-item[data-v-400abd81]:first-child{border-bottom:%?1?% solid #e5e5e5}.he-submit[data-v-400abd81]{margin-top:%?80?%;width:%?710?%;height:%?80?%;border-radius:%?40?%;font-size:%?28?%;font-family:PingFang SC;font-weight:500;color:#fff}[data-theme="red_theme"] .he-submit[data-v-400abd81]{background-color:#e60b30!important}[data-theme="purple_theme"] .he-submit[data-v-400abd81]{background-color:#8f2df3!important}[data-theme="blue_theme"] .he-submit[data-v-400abd81]{background-color:#33a7ff!important}[data-theme="green_theme"] .he-submit[data-v-400abd81]{background-color:#1fc551!important}[data-theme="orange_theme"] .he-submit[data-v-400abd81]{background-color:#ff7f00!important}[data-theme="golden_theme"] .he-submit[data-v-400abd81]{background-color:#caa45a!important}.he-item__label[data-v-400abd81]{font-size:%?26?%;font-family:PingFang SC;font-weight:500;color:#222;width:%?156?%;line-height:%?100?%}.he-item__input[data-v-400abd81]{height:%?100?%;width:100%}.he-item__get-code[data-v-400abd81]{width:%?240?%;height:%?100?%;padding:0;font-size:%?26?%;font-family:PingFang SC;font-weight:500;background-color:#fff}.he-item__get-code-0[data-v-400abd81]{color:#999}[data-theme="red_theme"] .he-item__get-code-1[data-v-400abd81]{color:#e60b30!important}[data-theme="purple_theme"] .he-item__get-code-1[data-v-400abd81]{color:#8f2df3!important}[data-theme="blue_theme"] .he-item__get-code-1[data-v-400abd81]{color:#33a7ff!important}[data-theme="green_theme"] .he-item__get-code-1[data-v-400abd81]{color:#1fc551!important}[data-theme="orange_theme"] .he-item__get-code-1[data-v-400abd81]{color:#ff7f00!important}[data-theme="golden_theme"] .he-item__get-code-1[data-v-400abd81]{color:#caa45a!important}.he-mobile-text[data-v-400abd81]{font-size:%?26?%;font-family:PingFang SC;font-weight:500;color:#666;line-height:%?32?%;margin:%?20?% 0;display:inline-block}',""]),t.exports=e}}]);