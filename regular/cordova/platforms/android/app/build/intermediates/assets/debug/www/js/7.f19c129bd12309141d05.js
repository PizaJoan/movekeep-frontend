webpackJsonp([7],{160:function(t,o,r){var e=r(161);"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);r(29)("21add234",e,!0,{})},161:function(t,o,r){o=t.exports=r(28)(!1),o.push([t.i,"",""])},162:function(t,o,r){"use strict";var e=function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("q-layout",{ref:"layout",attrs:{view:"hhh LpR fff"}},[e("q-toolbar",{attrs:{slot:"header"},slot:"header"},[e("q-tabs",{staticClass:"col-md-12"},[t.$q.platform.is.desktop?e("router-link",{staticClass:"avatar self-center",attrs:{slot:"title",to:"/",tag:"img",src:"./../../statics/logo-movekeep-png.png",alt:"logo"},slot:"title"}):t._e(),t._v(" "),e("q-tab",{attrs:{slot:"title",label:"Explora",icon:"ion-navicon-round",hide:"label"},on:{click:function(o){t.$refs.layout.toggleLeft()}},slot:"title"}),t._v(" "),e("q-route-tab",{attrs:{slot:"title",to:"/",default:"",label:"Inici",icon:"ion-home",hide:"label"},slot:"title"}),t._v(" "),e("q-route-tab",{attrs:{slot:"title",to:"/account",label:"Compte",icon:"ion-person",hide:"label"},slot:"title"}),t._v(" "),e("q-route-tab",{attrs:{slot:"title",to:"/my-routines",label:"Rutines",hide:"label",icon:"ion-stats-bars"},slot:"title"}),t._v(" "),e("q-tab",{attrs:{slot:"title",label:"Tancar sesi�",icon:"ion-android-exit",hide:"label"},on:{click:t.logOut},slot:"title"})],1)],1),t._v(" "),e("div",{attrs:{slot:"left"},slot:"left"},[e("q-list",{attrs:{"no-border":"",separator:""}},[e("q-list-header",[t._v("Categories")]),t._v(" "),t._l(t.categories,function(o){return e("q-side-link",{key:o.title,attrs:{item:"",to:"/routines/"+o.title.toLowerCase()}},[e("q-item-side",{attrs:{icon:"ion-android-list"}}),t._v(" "),e("q-item-main",{attrs:{sublabel:o.title}},[t._v("Veure rutines de "+t._s(o.title))])],1)})],2)],1),t._v(" "),e("router-view"),t._v(" "),e("q-toolbar",{attrs:{slot:"footer"},slot:"footer"},[e("q-toolbar-title",{staticClass:"toolbar-flex"},[e("img",{staticClass:"logo-footer",attrs:{alt:"logo",src:r(163)}}),t._v(" \n            Movekeep\n        ")])],1)],1)},l=[],a={render:e,staticRenderFns:l};o.a=a},163:function(t,o){t.exports="data:image/png;base64,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"},40:function(t,o,r){"use strict";function e(t){r(160)}Object.defineProperty(o,"__esModule",{value:!0});var l=r(86),a=r(162),i=r(4),n=e,s=i(l.a,a.a,!1,n,null,null);o.default=s.exports},86:function(t,o,r){"use strict";var e=r(0);o.a={components:{QLayout:e.t,QTabs:e.C,QTab:e.A,QIcon:e.m,QToolbar:e.D,QToolbarTitle:e.E,QBtn:e.d,QList:e.u,QSideLink:e.z,QListHeader:e.v,QItem:e.o,QItemSide:e.r,QItemMain:e.p,QRouteTab:e.x,QTabPane:e.B},data:function(){return{categories:[]}},mounted:function(){var t=this;this.$http.get("http://172.16.4.117:8080/category/all").then(function(t){return t.json()},console.log).then(function(o){t.categories=o})},methods:{logOut:function(t){e.c.clear(),this.$router.push("/")}}}}});