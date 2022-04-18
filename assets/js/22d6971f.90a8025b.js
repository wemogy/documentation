(self.webpackChunkwemogy=self.webpackChunkwemogy||[]).push([[5895],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return l},kt:function(){return m}});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var u=r.createContext({}),s=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},l=function(e){var t=s(e.components);return r.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,u=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),d=s(n),m=i,f=d["".concat(u,".").concat(m)]||d[m]||p[m]||o;return n?r.createElement(f,a(a({ref:t},l),{},{components:n})):r.createElement(f,a({ref:t},l))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,a=new Array(o);a[0]=d;var c={};for(var u in t)hasOwnProperty.call(t,u)&&(c[u]=t[u]);c.originalType=e,c.mdxType="string"==typeof e?e:i,a[1]=c;for(var s=2;s<o;s++)a[s]=n[s];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},8502:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return s},metadata:function(){return l},toc:function(){return p},default:function(){return m}});var r=n(2122),i=n(9756),o=(n(7294),n(3905)),a=n(1395),c=n(8215),u=["components"],s={sidebar_position:3},l={unversionedId:"identity/scenarios/api",id:"identity/scenarios/api",isDocsHomePage:!1,title:"API",description:"TBD...",source:"@site/docs-modules/identity/scenarios/api.mdx",sourceDirName:"identity/scenarios",slug:"/identity/scenarios/api",permalink:"/modules/identity/scenarios/api",editUrl:"https://github.com/wemogy/documentation/edit/main/docs-modules/identity/scenarios/api.mdx",version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Machine to Machine",permalink:"/modules/identity/scenarios/machine-to-machine"},next:{title:"Deployment",permalink:"/modules/identity/deployment"}},p=[],d={toc:p};function m(e){var t=e.components,n=(0,i.Z)(e,u);return(0,o.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"TBD..."),(0,o.kt)(a.Z,{groupId:"framework",defaultValue:"aspnetcore",values:[{label:"ASP.NET Core",value:"aspnetcore"}],mdxType:"Tabs"},(0,o.kt)(c.Z,{value:"aspnetcore",mdxType:"TabItem"},(0,o.kt)("p",null,"First, make sure you are ",(0,o.kt)("a",{parentName:"p",href:"https://docs.github.com/en/packages/guides/configuring-dotnet-cli-for-use-with-github-packages#authenticating-to-github-packages"},"authenticated with GitHub packages"),". Then add the package to your ASP.NET Core project"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"dotnet add package Wemogy.Identity.AspNetCore\n")),(0,o.kt)("p",null,"Add wemogy Identity to your services and point it to the url of the Wemogy.Identity instance"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="Startup.cs"',title:'"Startup.cs"'},'public void ConfigureServices(IServiceCollection services)\n{\n    // Add Wemogy Authentication\n    services.AddWemogyIdentity(options => {\n        options.OAuthJwtAuthority = "https://<YOUR_CUSTOM_WEMOGY_IDENTITY_URL>/issuer";\n        options.OAuthJwtAudience = "https://<THE_URL_THIS_APP_IS_RUNNING_ON>";\n    });\n\n    // ...\n}\n')),(0,o.kt)("p",null,"Make sure, to use both Authentication and Authorization"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="Startup.cs"',title:'"Startup.cs"'},"public void Configure(IApplicationBuilder app, IWebHostEnvironment env)\n{\n    // ...\n\n    app.UseAuthentication();\n    app.UseAuthorization();\n\n    // ...\n}\n")))))}m.isMDXComponent=!0},8215:function(e,t,n){"use strict";var r=n(7294);t.Z=function(e){var t=e.children,n=e.hidden,i=e.className;return r.createElement("div",{role:"tabpanel",hidden:n,className:i},t)}},1395:function(e,t,n){"use strict";n.d(t,{Z:function(){return l}});var r=n(7294),i=n(944),o=n(6010),a="tabItem_1uMI",c="tabItemActive_2DSg";var u=37,s=39;var l=function(e){var t=e.lazy,n=e.block,l=e.defaultValue,p=e.values,d=e.groupId,m=e.className,f=(0,i.Z)(),y=f.tabGroupChoices,v=f.setTabGroupChoices,g=(0,r.useState)(l),b=g[0],h=g[1],k=r.Children.toArray(e.children),O=[];if(null!=d){var w=y[d];null!=w&&w!==b&&p.some((function(e){return e.value===w}))&&h(w)}var N=function(e){var t=e.currentTarget,n=O.indexOf(t),r=p[n].value;h(r),null!=d&&(v(d,r),setTimeout((function(){var e,n,r,i,o,a,u,s;(e=t.getBoundingClientRect(),n=e.top,r=e.left,i=e.bottom,o=e.right,a=window,u=a.innerHeight,s=a.innerWidth,n>=0&&o<=s&&i<=u&&r>=0)||(t.scrollIntoView({block:"center",behavior:"smooth"}),t.classList.add(c),setTimeout((function(){return t.classList.remove(c)}),2e3))}),150))},T=function(e){var t,n;switch(e.keyCode){case s:var r=O.indexOf(e.target)+1;n=O[r]||O[0];break;case u:var i=O.indexOf(e.target)-1;n=O[i]||O[O.length-1]}null==(t=n)||t.focus()};return r.createElement("div",{className:"tabs-container"},r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.Z)("tabs",{"tabs--block":n},m)},p.map((function(e){var t=e.value,n=e.label;return r.createElement("li",{role:"tab",tabIndex:b===t?0:-1,"aria-selected":b===t,className:(0,o.Z)("tabs__item",a,{"tabs__item--active":b===t}),key:t,ref:function(e){return O.push(e)},onKeyDown:T,onFocus:N,onClick:N},n)}))),t?(0,r.cloneElement)(k.filter((function(e){return e.props.value===b}))[0],{className:"margin-vert--md"}):r.createElement("div",{className:"margin-vert--md"},k.map((function(e,t){return(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==b})}))))}},9443:function(e,t,n){"use strict";var r=(0,n(7294).createContext)(void 0);t.Z=r},944:function(e,t,n){"use strict";var r=n(7294),i=n(9443);t.Z=function(){var e=(0,r.useContext)(i.Z);if(null==e)throw new Error("`useUserPreferencesContext` is used outside of `Layout` Component.");return e}},6010:function(e,t,n){"use strict";function r(e){var t,n,i="";if("string"==typeof e||"number"==typeof e)i+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=r(e[t]))&&(i&&(i+=" "),i+=n);else for(t in e)e[t]&&(i&&(i+=" "),i+=t);return i}function i(){for(var e,t,n=0,i="";n<arguments.length;)(e=arguments[n++])&&(t=r(e))&&(i&&(i+=" "),i+=t);return i}n.d(t,{Z:function(){return i}})}}]);