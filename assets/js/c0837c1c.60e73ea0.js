(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{101:function(e,t,r){"use strict";r.d(t,"a",(function(){return u})),r.d(t,"b",(function(){return m}));var n=r(0),a=r.n(n);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=a.a.createContext({}),p=function(e){var t=a.a.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},u=function(e){var t=p(e.components);return a.a.createElement(s.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=a.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,l=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),u=p(r),d=n,m=u["".concat(l,".").concat(d)]||u[d]||b[d]||o;return r?a.a.createElement(m,c(c({ref:t},s),{},{components:r})):a.a.createElement(m,c({ref:t},s))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,l=new Array(o);l[0]=d;var c={};for(var i in t)hasOwnProperty.call(t,i)&&(c[i]=t[i]);c.originalType=e,c.mdxType="string"==typeof e?e:n,l[1]=c;for(var s=2;s<o;s++)l[s]=r[s];return a.a.createElement.apply(null,l)}return a.a.createElement.apply(null,r)}d.displayName="MDXCreateElement"},91:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return l})),r.d(t,"metadata",(function(){return c})),r.d(t,"toc",(function(){return i})),r.d(t,"default",(function(){return p}));var n=r(3),a=r(8),o=(r(0),r(101)),l={id:"0.1.0",title:"Cylon Release 0.1.0",sidebar_label:"Cylon Release 0.1.0"},c={unversionedId:"release/0.1.0",id:"release/0.1.0",isDocsHomePage:!1,title:"Cylon Release 0.1.0",description:"Cylon 0.1.0 is the first open source public release of Cylon Project. We are excited to bring a high performance",source:"@site/docs/release/cylon_release_0.1.0.md",sourceDirName:"release",slug:"/release/0.1.0",permalink:"/docs/release/0.1.0",editUrl:"https://github.com/cylondata/cylon/edit/master/docs/docs/release/cylon_release_0.1.0.md",version:"current",sidebar_label:"Cylon Release 0.1.0",frontMatter:{id:"0.1.0",title:"Cylon Release 0.1.0",sidebar_label:"Cylon Release 0.1.0"},sidebar:"someSidebar",previous:{title:"Cylon Release 0.2.0",permalink:"/docs/release/0.2.0"}},i=[{value:"Major Features",id:"major-features",children:[]},{value:"Examples",id:"examples",children:[]},{value:"License",id:"license",children:[]}],s={toc:i};function p(e){var t=e.components,r=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(n.a)({},s,r,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"Cylon 0.1.0 is the first open source public release of Cylon Project. We are excited to bring a high performance\ndata engineering toolkit that can work as a library as well as a standalone framework . This is the first step towards\nbuilding a complete toolkit designed to work with AI/ML systems and integrate with data processing systems with the\nvision ",Object(o.b)("strong",{parentName:"p"},'"data engineering everywhere"'),"."),Object(o.b)("p",null,"You can download source code from ",Object(o.b)("a",{parentName:"p",href:"https://github.com/cylondata/cylon/releases"},"Github")),Object(o.b)("h2",{id:"major-features"},"Major Features"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"Introducing Cylon C++ engine based on Apache Arrow. "),Object(o.b)("li",{parentName:"ul"},"Cylon C++, Python (PyCylon) and Java language bindings "),Object(o.b)("li",{parentName:"ul"},"Distributed operations using MPI "),Object(o.b)("li",{parentName:"ul"},"Local and distributed operations (Select, Project, Joins, Intersection, Union, Subtract)"),Object(o.b)("li",{parentName:"ul"},"Jupyter notebook support and experimental Google Colab support ")),Object(o.b)("h2",{id:"examples"},"Examples"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",{parentName:"li",href:"https://github.com/cylondata/cylon/tree/0.1.0/cpp/src/examples"},"C++ examples")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",{parentName:"li",href:"https://github.com/cylondata/cylon/tree/0.1.0/python/examples"},"Python examples"),"   "),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",{parentName:"li",href:"https://github.com/cylondata/cylon/tree/0.1.0/java/src/main/java/org/cylondata/cylon/examples"},"Java examples"))),Object(o.b)("h2",{id:"license"},"License"),Object(o.b)("p",null,"Licensed under the Apache License, Version 2.0: ",Object(o.b)("a",{parentName:"p",href:"http://www.apache.org/licenses/LICENSE-2.0"},"http://www.apache.org/licenses/LICENSE-2.0")))}p.isMDXComponent=!0}}]);