(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-goods-search-list"],{"0640":function(t,e,a){"use strict";var i;a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return i}));var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"he-page-content"},[a("v-uni-view",{staticClass:"he-search"},[a("v-uni-view",{staticClass:"he-input flex align-center",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.navigateTo.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"iconfont iconsearchbar_search"}),t.keyword.search?a("v-uni-text",{staticClass:"he-input__text"},[t._v(t._s(t.keyword.search))]):a("v-uni-text",{staticClass:"he-placeholder"},[t._v("输入商品名称搜索")])],1)],1),a("list-sort",{on:{sort:function(e){arguments[0]=e=t.$handleEvent(e),t.setSort.apply(void 0,arguments)}}}),0==t.style?a("list-a",{attrs:{list:t.list},on:{navigateTo:function(e){arguments[0]=e=t.$handleEvent(e),t.toDetail.apply(void 0,arguments)}}}):1==t.style?a("list-b",{attrs:{list:t.list},on:{navigateTo:function(e){arguments[0]=e=t.$handleEvent(e),t.toDetail.apply(void 0,arguments)}}}):2==t.style?a("list-c",{attrs:{list:t.list},on:{navigateTo:function(e){arguments[0]=e=t.$handleEvent(e),t.toDetail.apply(void 0,arguments)}}}):3==t.style?a("list-d",{attrs:{list:t.list},on:{navigateTo:function(e){arguments[0]=e=t.$handleEvent(e),t.toDetail.apply(void 0,arguments)}}}):t._e(),t.list.length>0?a("he-load-more",{attrs:{status:t.loadStatus}}):t._e(),a("v-uni-view",{staticClass:"safe-area-inset-bottom"}),t.isNothing?a("he-no-content-yet",{attrs:{text:"暂未找到相关商品"}}):t._e()],1)},o=[]},"0839":function(t,e,a){var i=a("5af2");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=a("4f06").default;n("03ef58fb",i,!0,{sourceMap:!1,shadowMode:!1})},"34fc":function(t,e,a){"use strict";a.r(e);var i=a("0640"),n=a("ed4d");for(var o in n)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(o);a("b59e");var s,r=a("f0c5"),l=Object(r["a"])(n["default"],i["b"],i["c"],!1,null,"029b7c38",null,!1,i["a"],s);e["default"]=l.exports},"5af2":function(t,e,a){var i=a("24fb");e=i(!1),e.push([t.i,".he-search[data-v-029b7c38]{width:100%;padding:%?24?% %?30?%;position:-webkit-sticky;position:sticky;top:0;z-index:1;background-color:#fff}.he-input[data-v-029b7c38]{background:#f7f7f7;border-radius:%?32?%;height:%?64?%;line-height:%?64?%}.he-placeholder[data-v-029b7c38]{font-size:%?28?%;font-family:PingFang SC;font-weight:400;color:#999;line-height:%?32?%}.iconsearchbar_search[data-v-029b7c38]{width:%?28?%;height:%?28?%;line-height:%?28?%;font-size:%?32?%;margin:0 %?16?% 0 %?32?%;color:#9d9d9d}.he-page-content[data-v-029b7c38]{padding-bottom:%?40?%}.he-input__text[data-v-029b7c38]{font-size:%?28?%;font-family:PingFang SC;font-weight:500;color:#222;overflow:hidden;height:%?64?%}",""]),t.exports=e},"62f7":function(t,e,a){"use strict";var i=a("4ea4");a("4e82"),a("d3b7"),a("ac1f"),a("841c"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=i(a("2909")),o=i(a("ade3")),s=i(a("2990")),r=i(a("7dec")),l=i(a("fe27")),c=i(a("5551")),u=i(a("4791")),d=i(a("aa66")),h=i(a("4d92")),f={name:"search-list",data:function(){return{style:0,list:[],page:{count:1,size:10,current:1},keyword:{group:null,search:"",sort:{sort:"DESC"}},isNothing:!1,loadStatus:"loadmore"}},components:{listSort:s.default,listA:r.default,listB:l.default,listC:c.default,listD:u.default,heNoContentYet:d.default,heLoadMore:h.default},methods:{navigateTo:function(){var t="/pages/goods/search?keyword="+this.keyword.search+"&from=/pages/goods/search-list";uni.redirectTo({url:t})},getList:function(){var t=this;return new Promise((function(e,a){t.$heshop.search("post",{include:"goods"},{keyword:t.keyword}).page(t.page.current,t.page.size).then((function(a){var i=a.data,n=a.headers;e(i),t.page={current:+n["x-pagination-current-page"],count:+n["x-pagination-page-count"],size:+n["x-pagination-per-page"]}})).catch((function(t){a(t)}))}))},setSort:function(t){var e=this.style,a=this;this.list=[],this.keyword.sort=(0,o.default)({},t.key,t.value),this.page.current=1,this.loadStatus="loadmore",this.getList().then((function(t){a.style=-1,a.list=t,setTimeout((function(){a.style=e})),a.loadStatus=a.list.length<a.page.size?"nomore":"loadmore"}))},toDetail:function(t){uni.navigateTo({url:"/pages/goods/detail?id="+t.id})}},onLoad:function(t){this.keyword.group=t.group?t.group:null,this.style=t.goods_show?t.goods_show:3,uni.setNavigationBarTitle({title:t.name?t.name:"全部商品"})},onShow:function(){var t=this,e=this.getStorageSync("search_key");e&&(this.keyword.search=e,uni.removeStorageSync("search_key")),this.getList().then((function(e){t.list=e,t.isNothing=0===t.list.length,t.loadStatus=t.list.length<t.page.size?"nomore":"loadmore"}))},onReachBottom:function(){var t=this;this.page.count>this.page.current?(this.page.current++,this.loadStatus="loading",this.getList().then((function(e){var a;(a=t.list).push.apply(a,(0,n.default)(e)),t.loadStatus="loadmore"}))):this.loadStatus="nomore"}};e.default=f},b59e:function(t,e,a){"use strict";var i=a("0839"),n=a.n(i);n.a},ed4d:function(t,e,a){"use strict";a.r(e);var i=a("62f7"),n=a.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return i[t]}))}(o);e["default"]=n.a}}]);