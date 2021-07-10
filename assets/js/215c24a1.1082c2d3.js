(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{101:function(e,n,t){"use strict";t.d(n,"a",(function(){return s})),t.d(n,"b",(function(){return y}));var a=t(0),o=t.n(a);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,a,o=function(e,n){if(null==e)return{};var t,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var p=o.a.createContext({}),b=function(e){var n=o.a.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},s=function(e){var n=b(e.components);return o.a.createElement(p.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return o.a.createElement(o.a.Fragment,{},n)}},m=o.a.forwardRef((function(e,n){var t=e.components,a=e.mdxType,r=e.originalType,l=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),s=b(t),m=a,y=s["".concat(l,".").concat(m)]||s[m]||d[m]||r;return t?o.a.createElement(y,i(i({ref:n},p),{},{components:t})):o.a.createElement(y,i({ref:n},p))}));function y(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var r=t.length,l=new Array(r);l[0]=m;var i={};for(var c in n)hasOwnProperty.call(n,c)&&(i[c]=n[c]);i.originalType=e,i.mdxType="string"==typeof e?e:a,l[1]=i;for(var p=2;p<r;p++)l[p]=t[p];return o.a.createElement.apply(null,l)}return o.a.createElement.apply(null,t)}m.displayName="MDXCreateElement"},76:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return l})),t.d(n,"metadata",(function(){return i})),t.d(n,"toc",(function(){return c})),t.d(n,"default",(function(){return b}));var a=t(3),o=t(8),r=(t(0),t(101)),l={id:"python",title:"PyCylon"},i={unversionedId:"python",id:"python",isDocsHomePage:!1,title:"PyCylon",description:"PyCylon is the Python binding for LibCylon (C++ Cylon). The uniqueness of PyCylon",source:"@site/docs/python.md",sourceDirName:".",slug:"/python",permalink:"/docs/python",editUrl:"https://github.com/cylondata/cylon/edit/master/docs/docs/python.md",version:"current",frontMatter:{id:"python",title:"PyCylon"},sidebar:"someSidebar",previous:{title:"C++",permalink:"/docs/cpp"},next:{title:"JCylon",permalink:"/docs/java"}},c=[{value:"Dataframe",id:"dataframe",children:[{value:"Initialize",id:"initialize",children:[]},{value:"Load a Table",id:"load-a-table",children:[]},{value:"PyCylon Operations",id:"pycylon-operations",children:[]}]},{value:"PyCylon Examples",id:"pycylon-examples",children:[]},{value:"Logging",id:"logging",children:[]},{value:"Python API docs",id:"python-api-docs",children:[]}],p={toc:c};function b(e){var n=e.components,t=Object(o.a)(e,["components"]);return Object(r.b)("wrapper",Object(a.a)({},p,t,{components:n,mdxType:"MDXLayout"}),Object(r.b)("p",null,"PyCylon is the Python binding for LibCylon (C++ Cylon). The uniqueness of PyCylon\nis that it can be used as a library or a framework. As a library, PyCylon seamlessly\nintegrates with PyArrow. This brings us the capability of providing the user the\ncompatibility with Pandas, Numpy and Tensors. As a framework we support distributed\nrelational algebra operations using MPI as the distributed backend."),Object(r.b)("h2",{id:"dataframe"},"Dataframe"),Object(r.b)("p",null,"PyCylon API is a Pandas like Dataframe API which supports fast, scalable, distributed memory, parallel operations."),Object(r.b)("h3",{id:"initialize"},"Initialize"),Object(r.b)("p",null,"In a Cylon programme, if you use Cylon with ",Object(r.b)("inlineCode",{parentName:"p"},"MPI")," backend, the distributed envrionment\nmust be initialized as follows;"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-python"},"from pycylon import DataFrame, CylonEnv\nfrom pycylon.net import MPIConfig\nenv = CylonEnv(config=MPIConfig())\n")),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-txt"},"Note: In the current release, Cylon only supports MPI as a distributed backend\n")),Object(r.b)("h3",{id:"load-a-table"},"Load a Table"),Object(r.b)("p",null,"Using Cylon"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-python"},"from pycylon import DataFrame, read_csv\ndf = read_csv('path/to/csv')\n")),Object(r.b)("p",null,"Using Pandas and convert to PyCylon Table"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-python"},'from pycylon import DataFrame, read_csv\nimport pandas as pd\ndf = DataFrame(pd.read_csv("http://path/to/csv"))\n')),Object(r.b)("p",null,"Cylon Table can be converted to a PyArrow Table, Pandas Dataframe or a Numpy Array"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-python"},"pyarrow_tb = cylon_tb.to_arrow()\npandas_df = cylon_tb.to_pandas()\nnumpy_arr = cylon_tb.to_numpy()\n")),Object(r.b)("h3",{id:"pycylon-operations"},"PyCylon Operations"),Object(r.b)("p",null,"Local Operations"),Object(r.b)("p",null,"Local operations of PyCylon are backed by a high performance C++ core and\ncan be simply executed as follows."),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-python"},"from pycylon import DataFrame\ndf1 = DataFrame([random.sample(range(10, 100), 50),\n                 random.sample(range(10, 100), 50)])\ndf2 = DataFrame([random.sample(range(10, 100), 50),\n                 random.sample(range(10, 100), 50)])\ndf2.set_index([0], inplace=True)\n\ndf3 = df1.join(other=df2, on=[0])\nprint(df3)\n")),Object(r.b)("p",null,"Distributed Operations"),Object(r.b)("p",null,"Same operations can be executed ina distributed environment\nby simply passing the CylonEnv to the same function."),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-python"},"from pycylon import DataFrame, CylonEnv\nfrom pycylon.net import MPIConfig\n\nenv = CylonEnv(config=MPIConfig())\n\ndf1 = DataFrame([random.sample(range(10*env.rank, 15*(env.rank+1)), 5),\n                 random.sample(range(10*env.rank, 15*(env.rank+1)), 5)])\ndf2 = DataFrame([random.sample(range(10*env.rank, 15*(env.rank+1)), 5),\n                 random.sample(range(10*env.rank, 15*(env.rank+1)), 5)])\n\ndf2.set_index([0], inplace=True)\n\ndf3 = df1.join(other=df2, on=[0], env=env)\nprint(df3)\n")),Object(r.b)("h2",{id:"pycylon-examples"},"PyCylon Examples"),Object(r.b)("ol",null,Object(r.b)("li",{parentName:"ol"},Object(r.b)("a",{parentName:"li",href:"https://github.com/cylondata/cylon/blob/master/python/examples/dataframe/data_loading.py"},"Data Loading"))),Object(r.b)("p",null,"This example shows how data can be loaded into Cylon using it's built in APIs and also using other frameworks like Pandas.\nWhen loading from Pandas, Numpy or Apache Arrow to Cylon, there is no additional data copying overhead. When running on\na distributed environment, data can be either pre-partitioned and load based on the worker ID, or Cylon provide additional flags\nto partition data if all the workers are configured to read from the same source."),Object(r.b)("ol",{start:2},Object(r.b)("li",{parentName:"ol"},Object(r.b)("a",{parentName:"li",href:"https://github.com/cylondata/cylon/blob/master/python/examples/dataframe/concat.py"},"Concat"))),Object(r.b)("p",null,"The Concat operation is analogous to the Union operation in databases when applied across axis 0.\nIf applied across axis 1, it will be similar to doing a Join."),Object(r.b)("ol",{start:3},Object(r.b)("li",{parentName:"ol"},Object(r.b)("a",{parentName:"li",href:"https://github.com/cylondata/cylon/blob/master/python/examples/dataframe/join.py"},"Join"))),Object(r.b)("p",null,"Join operation can be used to merge two DataFrames across the index columns. Cylon currently support two join algorithms(Sort Join and Hash Join)\nand four join types(Left, Right, Inner, Full Outer)."),Object(r.b)("ol",{start:4},Object(r.b)("li",{parentName:"ol"},Object(r.b)("a",{parentName:"li",href:"https://github.com/cylondata/cylon/blob/master/python/examples/dataframe/merge.py"},"Merge"))),Object(r.b)("p",null,"Unlike the Join, Merge can be applied on non index columns. Similar to Join, Merge can be performed using two join algorithms(Sort Join and Hash Join)\nand four join types(Left, Right, Inner, Full Outer)."),Object(r.b)("ol",{start:5},Object(r.b)("li",{parentName:"ol"},Object(r.b)("a",{parentName:"li",href:"https://github.com/cylondata/cylon/blob/master/python/examples/dataframe/sort.py"},"Sort"))),Object(r.b)("p",null,"Sort operation can be used to re-arrange the rows of a DataFrame based on one or more columns. If two(or more) columns are specified,\nsort will be first done on the first column and then rows having similar values in the first column will be sorted based on the second column."),Object(r.b)("ol",{start:6},Object(r.b)("li",{parentName:"ol"},Object(r.b)("a",{parentName:"li",href:"https://github.com/cylondata/cylon/blob/master/python/examples/dataframe/groupby.py"},"Group By"))),Object(r.b)("p",null,"Group BY works similar to GROUP BY operator in databases. This should be coupled with an aggregate operation such as min, max, std, etc."),Object(r.b)("h2",{id:"logging"},"Logging"),Object(r.b)("p",null,"PyCylon is backed by a C++ implementation to accelerate the operations. C++ implementation writes logs to the console for debugging purposes.\nBy default, logging from C++ is disabled in PyCylon. However, logging can be enabled as follows by setting CYLON_LOG_LEVEL environment variable."),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-bash"},"export CYLON_LOG_LEVEL=<log_level_flag>\npython python/examples/dataframe/join.py\n")),Object(r.b)("table",null,Object(r.b)("thead",{parentName:"table"},Object(r.b)("tr",{parentName:"thead"},Object(r.b)("th",{parentName:"tr",align:null},"Log Level"),Object(r.b)("th",{parentName:"tr",align:null},"Flag"))),Object(r.b)("tbody",{parentName:"table"},Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},"INFO"),Object(r.b)("td",{parentName:"tr",align:null},"0")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},"WARN"),Object(r.b)("td",{parentName:"tr",align:null},"1")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},"ERROR"),Object(r.b)("td",{parentName:"tr",align:null},"2")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},"FATAL"),Object(r.b)("td",{parentName:"tr",align:null},"3")))),Object(r.b)("p",null,"Additionally, this can be done programmatically as follows."),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-python"},"from pycylon.util.logging import log_level, disable_logging\n\n\nlog_level(0) # set an arbitrary log level\ndisable_logging() # disable logging completely\n")),Object(r.b)("h2",{id:"python-api-docs"},"Python API docs"),Object(r.b)("p",null,"Use blow link to navigate to the PyCylon API docs."),Object(r.b)("a",{href:"/pydocs/frame.html"},"Python API docs"))}b.isMDXComponent=!0}}]);