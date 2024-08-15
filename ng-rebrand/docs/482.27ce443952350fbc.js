"use strict";(self.webpackChunkmulti_layout=self.webpackChunkmulti_layout||[]).push([[482],{26482:(D,T,o)=>{o.r(T),o.d(T,{DocsModule:()=>x});var c=o(36895),k=o(16408),r=o(57599),C=o(15861),f=o(77579),d=o(82722),b=o(39300),v=o(18505),l=o(44473),t=o(94650),L=o(21281),J=o(39841),P=o(97272),Q=o(69751),R=o(95698),F=o(35684),G=o(78372),O=o(54004),I=o(68675),N=o(83353);const S=new Set;let _,U=(()=>{class n{constructor(e){this._platform=e,this._matchMedia=this._platform.isBrowser&&window.matchMedia?window.matchMedia.bind(window):B}matchMedia(e){return(this._platform.WEBKIT||this._platform.BLINK)&&function Y(n){if(!S.has(n))try{_||(_=document.createElement("style"),_.setAttribute("type","text/css"),document.head.appendChild(_)),_.sheet&&(_.sheet.insertRule(`@media ${n} {body{ }}`,0),S.add(n))}catch(i){console.error(i)}}(e),this._matchMedia(e)}}return n.\u0275fac=function(e){return new(e||n)(t.LFG(N.t4))},n.\u0275prov=t.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})();function B(n){return{matches:"all"===n||""===n,media:n,addListener:()=>{},removeListener:()=>{}}}let z=(()=>{class n{constructor(e,a){this._mediaMatcher=e,this._zone=a,this._queries=new Map,this._destroySubject=new f.x}ngOnDestroy(){this._destroySubject.next(),this._destroySubject.complete()}isMatched(e){return A((0,L.Eq)(e)).some(s=>this._registerQuery(s).mql.matches)}observe(e){const s=A((0,L.Eq)(e)).map(m=>this._registerQuery(m).observable);let u=(0,J.a)(s);return u=(0,P.z)(u.pipe((0,R.q)(1)),u.pipe((0,F.T)(1),(0,G.b)(0))),u.pipe((0,O.U)(m=>{const g={matches:!1,breakpoints:{}};return m.forEach(({matches:Z,query:rt})=>{g.matches=g.matches||Z,g.breakpoints[rt]=Z}),g}))}_registerQuery(e){if(this._queries.has(e))return this._queries.get(e);const a=this._mediaMatcher.matchMedia(e),u={observable:new Q.y(m=>{const g=Z=>this._zone.run(()=>m.next(Z));return a.addListener(g),()=>{a.removeListener(g)}}).pipe((0,I.O)(a),(0,O.U)(({matches:m})=>({query:e,matches:m})),(0,d.R)(this._destroySubject)),mql:a};return this._queries.set(e,u),u}}return n.\u0275fac=function(e){return new(e||n)(t.LFG(U),t.LFG(t.R0b))},n.\u0275prov=t.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})();function A(n){return n.map(i=>i.split(",")).reduce((i,e)=>i.concat(e)).map(i=>i.trim())}class h{constructor(i){this.breakpointObserver=i,this.isLeftOpen=!0,this.isRightOpen=!0,window.innerWidth<=700&&(this.isLeftOpen=!1,this.isRightOpen=!1)}toggleLeft(){this.isLeftOpen=!this.isLeftOpen}toggleRight(){this.isRightOpen=!this.isRightOpen}}h.\u0275fac=function(i){return new(i||h)(t.LFG(z))},h.\u0275prov=t.Yz7({token:h,factory:h.\u0275fac,providedIn:"root"});var H=o(21366),j=o(37556);function $(n,i){if(1&n){const e=t.EpF();t.TgZ(0,"button",3),t.NdJ("click",function(){t.CHM(e);const s=t.oxw();return t.KtG(s.sidebarService.toggleLeft())}),t._UZ(1,"i",14),t.qZA()}}function E(n,i){if(1&n){const e=t.EpF();t.TgZ(0,"button",3),t.NdJ("click",function(){t.CHM(e);const s=t.oxw();return t.KtG(s.sidebarService.toggleRight())}),t._UZ(1,"i",14),t.qZA()}}const W=[[["","sidebarLeftHeader",""]],[["","sidebarLeftContent",""]],[["","navbarContent",""]],[["","mainContent",""]],[["","footerContent",""]],[["","sidebarRightHeader",""]],[["","sidebarRightContent",""]]];class M{constructor(i,e,a){this.sidebarService=i,this.authService=e,this.router=a,this.hasSidebarLeft=!0,this.hasSidebarRight=!0}ngOnInit(){window.innerWidth>700&&(this.sidebarService.isLeftOpen=this.hasSidebarLeft,this.sidebarService.isRightOpen=this.hasSidebarRight)}logout(){this.authService.logout(),this.router.navigateByUrl("/login")}}M.\u0275fac=function(i){return new(i||M)(t.Y36(h),t.Y36(j.e),t.Y36(r.F0))},M.\u0275cmp=t.Xpm({type:M,selectors:[["app-holy-grail"]],inputs:{hasSidebarLeft:"hasSidebarLeft",hasSidebarRight:"hasSidebarRight"},ngContentSelectors:["[sidebarLeftHeader]","[sidebarLeftContent]","[navbarContent]","[mainContent]","[footerContent]","[sidebarRightHeader]","[sidebarRightContent]"],decls:31,vars:6,consts:[[1,"sb-layout"],[1,"sb-layout__side","sb-layout__side--l"],[1,"sb-header"],[1,"btn",3,"click"],[1,"sb-content"],[1,"sb-layout__nav"],[1,"app-navbar","navbar","navbar-light","bg-white","border-0"],[1,"container-fluid"],[1,"d-flex","align-items-center"],["class","btn",3,"click",4,"ngIf"],[1,"fa","fa-power-off"],[1,"sb-layout__main"],[1,"sb-layout__footer"],[1,"sb-layout__side","sb-layout__side--r"],[1,"fa","fa-bars"]],template:function(i,e){1&i&&(t.F$t(W),t.TgZ(0,"div",0)(1,"aside",1)(2,"div",2)(3,"div"),t.Hsn(4),t.qZA(),t.TgZ(5,"button",3),t.NdJ("click",function(){return e.sidebarService.toggleLeft()}),t._uU(6,"\u2715"),t.qZA()(),t.TgZ(7,"div",4),t.Hsn(8,1),t.qZA()(),t.TgZ(9,"div",5)(10,"nav",6)(11,"div",7)(12,"div",8),t.YNc(13,$,2,0,"button",9),t.Hsn(14,2),t.qZA(),t.TgZ(15,"div",8)(16,"button",3),t.NdJ("click",function(){return e.logout()}),t._UZ(17,"i",10),t.qZA(),t.YNc(18,E,2,0,"button",9),t.qZA()()()(),t.TgZ(19,"main",11),t.Hsn(20,3),t.qZA(),t.TgZ(21,"footer",12),t.Hsn(22,4),t.qZA(),t.TgZ(23,"aside",13)(24,"div",2)(25,"button",3),t.NdJ("click",function(){return e.sidebarService.toggleRight()}),t._uU(26,"\u2715"),t.qZA(),t.TgZ(27,"div"),t.Hsn(28,5),t.qZA()(),t.TgZ(29,"div",4),t.Hsn(30,6),t.qZA()()()),2&i&&(t.xp6(1),t.ekj("is-open",e.sidebarService.isLeftOpen),t.xp6(12),t.Q6J("ngIf",e.hasSidebarLeft),t.xp6(5),t.Q6J("ngIf",e.hasSidebarRight),t.xp6(5),t.ekj("is-open",e.sidebarService.isRightOpen))},dependencies:[c.O5,H.M2],styles:['.sb-layout[_ngcontent-%COMP%]{display:grid;grid-template-areas:"side-l navbar side-r" "side-l main side-r" "side-l footer side-r";grid-template-columns:auto 1fr auto;grid-template-rows:min-content 1fr min-content;height:100vh}.sb-layout__side[_ngcontent-%COMP%]{background:#f9f9f9;display:flex;flex-direction:column;opacity:1;overflow:hidden;transition:opacity .2s ease .2s,padding .2s ease,width .2s ease;width:clamp(25ch,25vw,30ch);z-index:1001}.sb-layout__side[_ngcontent-%COMP%]:not(.is-open){opacity:0;padding:0;transition:opacity .2s ease,padding .2s ease .2s,width .2s ease .2s;width:0}.sb-layout__side--l[_ngcontent-%COMP%]{grid-area:side-l;border-right:1px solid rgba(var(--app-gray_100),1)}.sb-layout__side--r[_ngcontent-%COMP%]{grid-area:side-r;border-left:1px solid rgba(var(--app-gray_100),1)}.sb-layout__nav[_ngcontent-%COMP%]{grid-area:navbar;border-bottom:1px solid rgba(var(--app-gray_100),1);z-index:1000}.sb-layout__main[_ngcontent-%COMP%]{grid-area:main;overflow:auto;position:relative}.sb-layout__footer[_ngcontent-%COMP%]{grid-area:footer}@media (max-width: 700px){.sb-layout__side[_ngcontent-%COMP%]{min-height:100vh;position:fixed;width:85vw}.sb-layout__side--l[_ngcontent-%COMP%]{box-shadow:4px 0 8px 3px #0002;left:0;z-index:1001}.sb-layout__side--r[_ngcontent-%COMP%]{box-shadow:-4px 0 8px 3px #0002;right:0;z-index:1002}}.menu-toggle[_ngcontent-%COMP%]{cursor:pointer;-webkit-user-select:none;user-select:none}.sb-header[_ngcontent-%COMP%]{min-height:65px;border-bottom:1px solid rgba(var(--app-gray_100),1);align-items:center;display:flex;justify-content:space-between;padding:.75rem}.sb-content[_ngcontent-%COMP%]{overflow:auto;position:relative}']});const X=["rla"];function V(n,i){1&n&&t._UZ(0,"i",20)}function q(n,i){1&n&&t._UZ(0,"i",21)}function tt(n,i){if(1&n&&t._UZ(0,"i",24),2&n){const e=t.oxw().$implicit;t.Q6J("ngClass",e.icon)}}function et(n,i){if(1&n){const e=t.EpF();t.TgZ(0,"a",22),t.NdJ("click",function(){t.CHM(e);const s=t.oxw(3);return t.KtG(s.closeSidebar())}),t.YNc(1,tt,1,1,"i",23),t._UZ(2,"span",14),t.qZA()}if(2&n){const e=i.$implicit;t.Q6J("routerLink",e.path),t.xp6(1),t.Q6J("ngIf",e.icon),t.xp6(1),t.Q6J("innerHTML",e.title,t.oJD)}}function nt(n,i){if(1&n){const e=t.EpF();t.TgZ(0,"div",9,10)(2,"div",11),t.NdJ("click",function(){t.CHM(e);const s=t.oxw().$implicit;return t.KtG(s.isActive=!s.isActive)}),t._UZ(3,"i",12),t.TgZ(4,"span",13),t._UZ(5,"span",14),t.qZA(),t.YNc(6,V,1,0,"i",15),t.YNc(7,q,1,0,"i",16),t.qZA(),t.TgZ(8,"div",17,18),t.YNc(10,et,3,3,"a",19),t.qZA()()}if(2&n){const e=t.oxw().$implicit;t.xp6(3),t.Q6J("ngClass",e.icon),t.xp6(2),t.Q6J("innerHTML",e.title,t.oJD),t.xp6(1),t.Q6J("ngIf",!e.isActive),t.xp6(1),t.Q6J("ngIf",e.isActive),t.xp6(1),t.Q6J("ngbCollapse",!e.isActive),t.xp6(2),t.Q6J("ngForOf",e.children)}}function it(n,i){if(1&n&&t._UZ(0,"i",24),2&n){const e=t.oxw(2).$implicit;t.Q6J("ngClass",e.icon)}}function ot(n,i){if(1&n){const e=t.EpF();t.ynx(0),t.TgZ(1,"a",22,10),t.NdJ("click",function(){t.CHM(e);const s=t.oxw(2);return t.KtG(s.closeSidebar())}),t.YNc(3,it,1,1,"i",23),t._UZ(4,"span",14),t.qZA(),t.BQk()}if(2&n){const e=t.oxw().$implicit;t.xp6(1),t.Q6J("routerLink",e.path),t.xp6(2),t.Q6J("ngIf",e.icon),t.xp6(1),t.Q6J("innerHTML",e.title,t.oJD)}}function at(n,i){if(1&n&&(t.ynx(0),t.YNc(1,nt,11,6,"div",7),t.YNc(2,ot,5,3,"ng-container",8),t.BQk()),2&n){const e=i.$implicit;t.xp6(1),t.Q6J("ngIf",e.children),t.xp6(1),t.Q6J("ngIf",!e.children)}}class w{constructor(i,e){this.sidebarService=i,this.router=e,this.destroy$=new f.x,this.intersection=l.jV,this.sidebarItems=[{isActive:!1,title:"Kitchen Sink",icon:"bi-list-columns",path:"/docs/kitchen-sink"},{isActive:!1,title:"App input",icon:"bi-ui-radios",path:"/docs/demos/app-input"},{isActive:!1,title:"App table",icon:"bi-table",path:"/docs/demos/app-table"},{isActive:!1,title:"App chart",icon:"bi-bar-chart-fill",path:"/docs/demos/app-chart"},{isActive:!1,title:"Wizard",icon:"bi-eyeglasses",path:"/docs/demos/wizard"},{isActive:!1,title:"Bootstrap widgets",icon:"bi-grid",children:[{path:"/docs/demos/accordion",title:"Accordion"},{path:"/docs/demos/alert",title:"Alert"},{path:"/docs/demos/carousel",title:"Carousel"},{path:"/docs/demos/collapse",title:"Collapse"},{path:"/docs/demos/datepicker",title:"Datepicker"},{path:"/docs/demos/dropdown",title:"Dropdown"},{path:"/docs/demos/modal",title:"Modal"},{path:"/docs/demos/nav",title:"Nav"},{path:"/docs/demos/offcanvas",title:"Offcanvas"},{path:"/docs/demos/pagination",title:"Pagination"},{path:"/docs/demos/popover",title:"Popover"},{path:"/docs/demos/progressbar",title:"Progress Bar"},{path:"/docs/demos/rating",title:"Rating"},{path:"/docs/demos/table",title:"Table"},{path:"/docs/demos/timepicker",title:"Timepicker"},{path:"/docs/demos/toast",title:"Toast"},{path:"/docs/demos/tooltip",title:"Tooltip"},{path:"/docs/demos/typeahead",title:"Typeahead"}]}]}ngOnInit(){this.router.events.pipe((0,d.R)(this.destroy$),(0,b.h)(i=>i instanceof r.m2),(0,v.b)(()=>document.querySelector("#main-stuff")?.scrollTop)).subscribe()}ngOnDestroy(){this.destroy$.next()}closeSidebar(){var i=this;return(0,C.Z)(function*(){window.innerWidth<=700&&(yield function p(n){return new Promise(i=>setTimeout(()=>i(1),n))}(200),i.sidebarService.toggleLeft())})()}}w.\u0275fac=function(i){return new(i||w)(t.Y36(h),t.Y36(r.F0))},w.\u0275cmp=t.Xpm({type:w,selectors:[["app-docs"]],viewQuery:function(i,e){if(1&i&&t.Gf(X,5),2&i){let a;t.iGM(a=t.CRH())&&(e.rlaList=a)}},decls:10,vars:2,consts:[[3,"hasSidebarRight"],["sidebarLeftHeader","",1,"mb-0"],["sidebarLeftContent",""],[1,"sb-links"],[4,"ngFor","ngForOf"],["navbarContent","",1,"mb-0"],["mainContent","","id","main-stuff"],["routerLinkActive","",4,"ngIf"],[4,"ngIf"],["routerLinkActive",""],["rla","routerLinkActive"],[1,"sb-link","clickable",3,"click"],[1,"pe-3",3,"ngClass"],[1,"me-auto"],[3,"innerHTML"],["class","bi bi-caret-up-fill",4,"ngIf"],["class","bi bi-caret-down-fill",4,"ngIf"],[1,"sb-sublinks",3,"ngbCollapse"],["collapse","ngbCollapse"],["class","sb-link text-reset text-decoration-none","routerLinkActive","is-active",3,"routerLink","click",4,"ngFor","ngForOf"],[1,"bi","bi-caret-up-fill"],[1,"bi","bi-caret-down-fill"],["routerLinkActive","is-active",1,"sb-link","text-reset","text-decoration-none",3,"routerLink","click"],["class","pe-3 bi",3,"ngClass",4,"ngIf"],[1,"pe-3","bi",3,"ngClass"]],template:function(i,e){1&i&&(t.TgZ(0,"app-holy-grail",0)(1,"h5",1),t._uU(2,"Hello Dev!"),t.qZA(),t.TgZ(3,"div",2)(4,"div",3),t.YNc(5,at,3,2,"ng-container",4),t.qZA()(),t.TgZ(6,"h5",5),t._uU(7,"Welcome to the Docs"),t.qZA(),t.TgZ(8,"div",6),t._UZ(9,"router-outlet"),t.qZA()()),2&i&&(t.Q6J("hasSidebarRight",!1),t.xp6(5),t.Q6J("ngForOf",e.sidebarItems))},dependencies:[c.mk,c.sg,c.O5,r.lC,r.rH,r.Od,H._D,M],styles:[".sb-links[_ngcontent-%COMP%]{display:grid;gap:1rem;grid-template-rows:min-content;overflow:auto;padding:1rem}.sb-sublinks[_ngcontent-%COMP%]:is(.collapsing, .show)[_ngcontent-%COMP%]{display:grid;gap:.5rem;margin-top:.5rem;padding-left:.75rem}.sb-link[_ngcontent-%COMP%]{border-radius:var(--border-radius_md);display:flex;padding:.65rem .75rem;transition:background-color .3s ease,border-color .3s ease}.sb-link[_ngcontent-%COMP%]:hover{background-color:rgba(var(--app-primary_500),.2)}.sb-link.is-active[_ngcontent-%COMP%]{background:rgba(var(--app-primary_500),1);box-shadow:0 4px 20px #00000024,0 7px 10px -5px #3c485866;color:rgba(var(--app-gray_0),1)!important}"]});const st=[{path:"",component:w,children:[{path:"",redirectTo:"kitchen-sink",pathMatch:"full"},{path:"kitchen-sink",loadChildren:()=>o.e(901).then(o.bind(o,18901)).then(n=>n.KitchenSinkModule)},{path:"demos",loadChildren:()=>Promise.all([o.e(247),o.e(683)]).then(o.bind(o,54683)).then(n=>n.DemosModule)}]}];class y{}y.\u0275fac=function(i){return new(i||y)},y.\u0275mod=t.oAB({type:y}),y.\u0275inj=t.cJS({imports:[r.Bz.forChild(st),r.Bz]});class x{}x.\u0275fac=function(i){return new(i||x)},x.\u0275mod=t.oAB({type:x}),x.\u0275inj=t.cJS({imports:[c.ez,y,k.m]})},15861:(D,T,o)=>{function c(r,C,f,d,b,v,l){try{var p=r[v](l),t=p.value}catch(L){return void f(L)}p.done?C(t):Promise.resolve(t).then(d,b)}function k(r){return function(){var C=this,f=arguments;return new Promise(function(d,b){var v=r.apply(C,f);function l(t){c(v,d,b,l,p,"next",t)}function p(t){c(v,d,b,l,p,"throw",t)}l(void 0)})}}o.d(T,{Z:()=>k})}}]);