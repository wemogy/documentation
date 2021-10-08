(self.webpackChunkwemogy=self.webpackChunkwemogy||[]).push([[214],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return p},kt:function(){return u}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),m=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=m(e.components);return r.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},c=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),c=m(n),u=a,g=c["".concat(l,".").concat(u)]||c[u]||d[u]||o;return n?r.createElement(g,i(i({ref:t},p),{},{components:n})):r.createElement(g,i({ref:t},p))}));function u(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=c;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var m=2;m<o;m++)i[m]=n[m];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}c.displayName="MDXCreateElement"},8860:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return s},metadata:function(){return l},toc:function(){return m},default:function(){return d}});var r=n(2122),a=n(9756),o=(n(7294),n(3905)),i=["components"],s={sidebar_position:3},l={unversionedId:"identity/deployment",id:"identity/deployment",isDocsHomePage:!1,title:"Deployment",description:"The project is designed to be deployed as containers. We currently only support deployments into a Kubernetes cluster. We highly recommend using our Helm Chart for deploying into Kubernetes.",source:"@site/docs-modules/identity/deployment.md",sourceDirName:"identity",slug:"/identity/deployment",permalink:"/modules/identity/deployment",editUrl:"https://github.com/wemogy/documentation/edit/main/docs-modules/identity/deployment.md",version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"API",permalink:"/modules/identity/scenarios/api"},next:{title:"Development",permalink:"/modules/identity/development"}},m=[{value:"Kubernetes",id:"kubernetes",children:[{value:"Prerequisites",id:"prerequisites",children:[]},{value:"Install via Helm",id:"install-via-helm",children:[]},{value:"Access the Admin Endpoint",id:"access-the-admin-endpoint",children:[]}]}],p={toc:m};function d(e){var t=e.components,n=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"The project is designed to be deployed as containers. We currently only support deployments into a Kubernetes cluster. We highly recommend using our ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/wemogy/identity/tree/main/env/helm"},"Helm Chart")," for deploying into Kubernetes."),(0,o.kt)("h2",{id:"kubernetes"},"Kubernetes"),(0,o.kt)("h3",{id:"prerequisites"},"Prerequisites"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Kubernetes Cluster",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://kubernetes.github.io/ingress-nginx/"},"NGINX Ingress Controller")," installed"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://cert-manager.io/docs/installation/kubernetes/"},"Cert Manager")," installed"))),(0,o.kt)("li",{parentName:"ul"},"Username and Password to access the wemogy Container Registry (you can get this as a wemogy customer)"),(0,o.kt)("li",{parentName:"ul"},"Helm installed"),(0,o.kt)("li",{parentName:"ul"},"A PostgreSQL server with two databases",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Database for identity management (e.g. called ",(0,o.kt)("inlineCode",{parentName:"li"},"ory_kratos"),")"),(0,o.kt)("li",{parentName:"ul"},"Database for OAuth management (e.g. called ",(0,o.kt)("inlineCode",{parentName:"li"},"ory_hydra"),")"))),(0,o.kt)("li",{parentName:"ul"},"A custom domain ",(0,o.kt)("inlineCode",{parentName:"li"},"auth.")," on your domain with eiter",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"OPTION A: ",(0,o.kt)("strong",{parentName:"li"},"A")," record pointing to the IP Address of your Ingress Controller"),(0,o.kt)("li",{parentName:"ul"},"OPTION B: ",(0,o.kt)("strong",{parentName:"li"},"CNAME")," record pointing to ",(0,o.kt)("inlineCode",{parentName:"li"},"identity.<YOUR_TENANT_NAME>.wemogy.cloud")," (when running in wemogy Cloud)")))),(0,o.kt)("h3",{id:"install-via-helm"},"Install via Helm"),(0,o.kt)("p",null,"Add the Helm repository"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"helm repo add wemogy https://wemogy.github.io/helm/charts\n")),(0,o.kt)("p",null,"Install the Helm Chart"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"helm upgrade --install wemogy-identity wemogy/identity \\\n  --namespace wemogy-identity \\\n  --create-namespace \\\n  --set 'wemogyCloud=false' \\ # When not running on wemogy Cloud\n  --set 'config.tenant.name=<YOUR_TENANT_NAME>' \\ # Example: contoso\n  --set 'config.tenant.domain.core=<YOUR_DOMAIN>' \\ # Example: contoso.com\n  --set 'config.urls.redirect.base=<APP_URL_THAT_HOSTS_YOUR_LOGIN>' \\ # Example: https://app.contoso.com\n  --set 'config.cors.allowedOrigins=<APP_URL_THAT_HOSTS_YOUR_LOGIN>' \\ # Example: https://app.contoso.com\n  --set 'config.secrets.signingKey=<RANDOM_STRING>' \\ # Example: a5428!b6123\n  --set 'config.secrets.salt=<RANDOM_STRING>' \\ # Example: a5428!b6123\n  --set 'config.email.smtpConnectionUri=<SMTP_CONNECTION>' \\ # Example: smtps://name:password@smtp.sendgrid.net:465\n  --set 'config.email.fromAddress=<SENDER_ADDRESS>' \\ # Example: it@wemogy.com\n  --set 'ingress.certManagerEmail=<YOUR_EMAIL>' \\ # Example: it@contoso.com\n  --set 'kratos.databaseConnectionString=<IDENTITY_DATABASE_CONNECTION_STRING>' \\ # Example: postgresql://psqladmin@demopostgres:PASSWORD@demopostgres.postgres.database.azure.com/ory_kratos\n  --set 'hydra.databaseConnectionString=<OAUTH_DATABASE_CONNECTION_STRING>' \\ # Example: postgres://psqladmin@demopostgres:PASSWORD@demopostgres.postgres.database.azure.com/ory_hydra\n  --set 'images.wemogy.pullSecret.username=<WEMOGY_REGISTRY_USERNAME>' \\ # Example: demo-wemogy-identity\n  --set 'images.wemogy.pullSecret.password=<WEMOGY_REGISTRY_PASSWORD>' # Example: magshjdksfdh78\n")),(0,o.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"Warning")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"Please note, that the two PostgreSQL connection strings are different. The one for Identity (Kratos) starts with ",(0,o.kt)("strong",{parentName:"p"},"postgresql://")," whereas the one for OAuth (Hydra) starts with ",(0,o.kt)("strong",{parentName:"p"},"postgres://..."),"."))),(0,o.kt)("h3",{id:"access-the-admin-endpoint"},"Access the Admin Endpoint"),(0,o.kt)("p",null,"During the setup phase, it is likely, that you need access to the Admin Endpoint to create clients for example. When not running in wemogy Cloud, the Admin Endpoint is not exposed externally. To temporatily forward the endpoint to your machine, you can run the following command."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"kubectl port-forward svc/wemogy-identity-server-admin 8080:80 -n wemogy-identity\n")),(0,o.kt)("p",null,"The Admin Endpoint will be available at ",(0,o.kt)("inlineCode",{parentName:"p"},"http://localhost:8080/")," then."))}d.isMDXComponent=!0}}]);