(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[304],{6192:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/view_profile/[username]",function(){return n(5275)}])},3525:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"actionAsyncStorage",{enumerable:!0,get:function(){return r}});let r=(0,n(4001).createAsyncLocalStorage)();("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},6361:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"actionAsyncStorage",{enumerable:!0,get:function(){return r.actionAsyncStorage}});let r=n(3525);("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},4001:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"createAsyncLocalStorage",{enumerable:!0,get:function(){return i}});let n=Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available");class r{disable(){throw n}getStore(){}run(){throw n}exit(){throw n}enterWith(){throw n}}let o=globalThis.AsyncLocalStorage;function i(){return o?new o:new r}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},8199:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{ReadonlyURLSearchParams:function(){return u.ReadonlyURLSearchParams},RedirectType:function(){return u.RedirectType},ServerInsertedHTMLContext:function(){return c.ServerInsertedHTMLContext},notFound:function(){return u.notFound},permanentRedirect:function(){return u.permanentRedirect},redirect:function(){return u.redirect},useParams:function(){return p},usePathname:function(){return d},useRouter:function(){return f},useSearchParams:function(){return l},useSelectedLayoutSegment:function(){return h},useSelectedLayoutSegments:function(){return _},useServerInsertedHTML:function(){return c.useServerInsertedHTML}});let r=n(7294),o=n(257),i=n(2608),s=n(1288),a=n(6406),u=n(2717),c=n(5988);function l(){let e=(0,r.useContext)(i.SearchParamsContext);return(0,r.useMemo)(()=>e?new u.ReadonlyURLSearchParams(e):null,[e])}function d(){return(0,r.useContext)(i.PathnameContext)}function f(){let e=(0,r.useContext)(o.AppRouterContext);if(null===e)throw Error("invariant expected app router to be mounted");return e}function p(){return(0,r.useContext)(i.PathParamsContext)}function _(e){void 0===e&&(e="children");let t=(0,r.useContext)(o.LayoutRouterContext);return t?function e(t,n,r,o){let i;if(void 0===r&&(r=!0),void 0===o&&(o=[]),r)i=t[1][n];else{var u;let e=t[1];i=null!=(u=e.children)?u:Object.values(e)[0]}if(!i)return o;let c=i[0],l=(0,s.getSegmentValue)(c);return!l||l.startsWith(a.PAGE_SEGMENT_KEY)?o:(o.push(l),e(i,n,!1,o))}(t.tree,e):null}function h(e){void 0===e&&(e="children");let t=_(e);if(!t||0===t.length)return null;let n="children"===e?t[0]:t[t.length-1];return n===a.DEFAULT_SEGMENT_KEY?null:n}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},2717:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{ReadonlyURLSearchParams:function(){return s},RedirectType:function(){return r.RedirectType},notFound:function(){return o.notFound},permanentRedirect:function(){return r.permanentRedirect},redirect:function(){return r.redirect}});let r=n(7511),o=n(3394);class i extends Error{constructor(){super("Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams")}}class s extends URLSearchParams{append(){throw new i}delete(){throw new i}set(){throw new i}sort(){throw new i}}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},3394:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{isNotFoundError:function(){return o},notFound:function(){return r}});let n="NEXT_NOT_FOUND";function r(){let e=Error(n);throw e.digest=n,e}function o(e){return"object"==typeof e&&null!==e&&"digest"in e&&e.digest===n}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},4234:function(e,t){"use strict";var n,r;Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"RedirectStatusCode",{enumerable:!0,get:function(){return n}}),(r=n||(n={}))[r.SeeOther=303]="SeeOther",r[r.TemporaryRedirect=307]="TemporaryRedirect",r[r.PermanentRedirect=308]="PermanentRedirect",("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},7511:function(e,t,n){"use strict";var r,o;Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{RedirectType:function(){return r},getRedirectError:function(){return c},getRedirectStatusCodeFromError:function(){return h},getRedirectTypeFromError:function(){return _},getURLFromRedirectError:function(){return p},isRedirectError:function(){return f},permanentRedirect:function(){return d},redirect:function(){return l}});let i=n(2595),s=n(6361),a=n(4234),u="NEXT_REDIRECT";function c(e,t,n){void 0===n&&(n=a.RedirectStatusCode.TemporaryRedirect);let r=Error(u);r.digest=u+";"+t+";"+e+";"+n+";";let o=i.requestAsyncStorage.getStore();return o&&(r.mutableCookies=o.mutableCookies),r}function l(e,t){void 0===t&&(t="replace");let n=s.actionAsyncStorage.getStore();throw c(e,t,(null==n?void 0:n.isAction)?a.RedirectStatusCode.SeeOther:a.RedirectStatusCode.TemporaryRedirect)}function d(e,t){void 0===t&&(t="replace");let n=s.actionAsyncStorage.getStore();throw c(e,t,(null==n?void 0:n.isAction)?a.RedirectStatusCode.SeeOther:a.RedirectStatusCode.PermanentRedirect)}function f(e){if("object"!=typeof e||null===e||!("digest"in e)||"string"!=typeof e.digest)return!1;let[t,n,r,o]=e.digest.split(";",4),i=Number(o);return t===u&&("replace"===n||"push"===n)&&"string"==typeof r&&!isNaN(i)&&i in a.RedirectStatusCode}function p(e){return f(e)?e.digest.split(";",3)[2]:null}function _(e){if(!f(e))throw Error("Not a redirect error");return e.digest.split(";",2)[1]}function h(e){if(!f(e))throw Error("Not a redirect error");return Number(e.digest.split(";",4)[3])}(o=r||(r={})).push="push",o.replace="replace",("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},5329:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"requestAsyncStorage",{enumerable:!0,get:function(){return r}});let r=(0,n(4001).createAsyncLocalStorage)();("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},2595:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{getExpectedRequestStore:function(){return o},requestAsyncStorage:function(){return r.requestAsyncStorage}});let r=n(5329);function o(e){let t=r.requestAsyncStorage.getStore();if(t)return t;throw Error("`"+e+"` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context")}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1288:function(e,t){"use strict";function n(e){return Array.isArray(e)?e[1]:e}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getSegmentValue",{enumerable:!0,get:function(){return n}}),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},5988:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{ServerInsertedHTMLContext:function(){return o},useServerInsertedHTML:function(){return i}});let r=n(1757)._(n(7294)),o=r.default.createContext(null);function i(e){let t=(0,r.useContext)(o);t&&t(e)}},5716:function(e,t,n){"use strict";n.d(t,{Z:function(){return d}});var r=n(5893),o=n(7294),i=n(6605),s=n.n(i),a=n(1163),u=n(1987),c=n(5007),l=n(9846);function d(e){let{children:t}=e,n=(0,c.v9)(e=>e.auth),i=(0,a.useRouter)(),d=(0,c.I0)();return(0,o.useEffect)(()=>{let e=localStorage.getItem("token");console.log("Checking token in Dashboard:",e),e||i.push("/login"),d((0,u.GS)()),d((0,l.AW)())},[i,d]),(0,r.jsx)("div",{children:(0,r.jsx)("div",{className:s().container,children:(0,r.jsxs)("div",{className:s().homeContainer,children:[(0,r.jsxs)("div",{className:s().homeContainer_leftBar,children:[(0,r.jsxs)("div",{onClick:()=>i.push("/dashboard"),className:s().sideBarOption,children:[(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"size-6",children:(0,r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"})}),(0,r.jsx)("p",{children:"Scroll"})]}),(0,r.jsxs)("div",{onClick:()=>i.push("/discover"),className:s().sideBarOption,children:[(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"size-6",children:(0,r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"})}),(0,r.jsx)("p",{children:"Discover"})]}),(0,r.jsxs)("div",{onClick:()=>i.push("/my_connections"),className:s().sideBarOption,children:[(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"size-6",children:(0,r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"})}),(0,r.jsx)("p",{children:"My Connections"})]})]}),(0,r.jsx)("div",{className:s().homeContainer_feedContainer,children:t}),(0,r.jsxs)("div",{className:s().homeContainer_extraContainer,children:[(0,r.jsx)("h3",{children:"Top Profiles"}),n.all_profiles_fetched&&Array.isArray(n.all_users)&&n.all_users.map(e=>(0,r.jsx)("div",{className:s().extraContainer_profile,children:(0,r.jsx)("p",{children:e.userId.name})},e._id))]})]})})})}},2117:function(e,t,n){"use strict";n.d(t,{Z:function(){return l}});var r=n(5893);n(7294);var o=n(7524),i=n.n(o),s=n(1163),a=n(5007),u=n(1987);function c(){let e=(0,s.useRouter)(),t=(0,a.I0)(),n=(0,a.v9)(e=>e.auth);return(0,r.jsx)("div",{children:(0,r.jsx)("div",{className:i().container,children:(0,r.jsxs)("nav",{className:i().navBar,children:[(0,r.jsx)("img",{className:i().mainLogo,onClick:()=>{e.push("/")},src:"images/mainlogo.png",alt:"main_logo"}),(0,r.jsx)("h1",{style:{cursor:"pointer"},onClick:()=>{e.push("/")},children:"FastConnect"}),(0,r.jsxs)("div",{className:i().navBarOptionsContainer,children:[n.profileFetched&&(0,r.jsx)("div",{children:(0,r.jsxs)("div",{style:{display:"flex",gap:"1.2rem"},children:[(0,r.jsxs)("p",{children:["Hey, ",n.user.name]}),(0,r.jsx)("p",{onClick:()=>{e.push("/profile")},style:{fontWeight:"bold",cursor:"pointer"},children:"Profile"}),(0,r.jsx)("p",{onClick:()=>{localStorage.removeItem("token"),t((0,u.mc)()),e.push("/login")},style:{fontWeight:"bold",cursor:"pointer"},children:"Logout"})]})}),!n.profileFetched&&(0,r.jsx)("div",{onClick:()=>{e.push("/login")},className:i().joinButton,children:(0,r.jsx)("p",{children:"Register"})})]})]})})})}function l(e){let{children:t}=e;return(0,r.jsxs)("div",{children:[(0,r.jsx)(c,{}),t]})}},5275:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSP:function(){return _},default:function(){return h}});var r=n(5893),o=n(3422),i=n(5716),s=n(2117),a=n(9332),u=n(7294),c=n(3414),l=n.n(c),d=n(1163),f=n(5007);n(570);var p=n(9846),_=!0;function h(e){let{userProfile:t}=e;(0,a.useSearchParams)(),(0,d.useRouter)();let n=(0,f.I0)(),c=(0,f.v9)(e=>e.postReducer),[_,h]=(0,u.useState)([]),[y,m]=(0,u.useState)(!1),[j,v]=(0,u.useState)(!0),x=(0,f.v9)(e=>e.auth);return(0,u.useEffect)(()=>{console.log("Post Reducer:",c),c.posts&&h(c.posts.filter(e=>e.userId.username===t.userId.username))},[c.posts]),(0,u.useEffect)(()=>{x.connections.some(e=>e.connectionId._id===t.userId._id)&&(m(!0),x.connections.find(e=>e.connectionId._id===t.userId._id).status_accepted&&v(!1)),x.connectionRequest.some(e=>e.userId._id===t.userId._id)&&(m(!0),x.connectionRequest.find(e=>e.userId._id===t.userId._id).status_accepted&&v(!1))},[x.connections]),(0,r.jsx)(s.Z,{children:(0,r.jsx)(i.Z,{children:(0,r.jsxs)("div",{className:l().container,children:[(0,r.jsx)("div",{className:l().backDropContainer,children:(0,r.jsx)("img",{src:"".concat(o._,"/").concat(t.userId.profilePicture),alt:"backdrop"})}),(0,r.jsx)("div",{className:l().profileContainer_details,children:(0,r.jsxs)("div",{className:l().profileContainer_flex,children:[(0,r.jsxs)("div",{style:{flex:"0.8"},children:[(0,r.jsxs)("div",{style:{display:"flex",width:"fit-content",alignItems:"center",gap:"1.2rem"},children:[(0,r.jsx)("h2",{children:t.userId.name}),(0,r.jsxs)("p",{style:{color:"grey"},children:["@",t.userId.username]})]}),(0,r.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"1.2rem"},children:[y?(0,r.jsx)("button",{className:l().connectedButton,children:j?"Pending":"Connected"}):(0,r.jsx)("button",{onClick:()=>{n((0,p.Zk)({token:localStorage.getItem("token"),user_id:t.userId._id})),m(!0)},className:l().connectBtn,children:"Connect"}),(0,r.jsx)("div",{onClick:async()=>{let e=await o.f.get("/user/download_resume?id=".concat(t.userId._id));window.open("".concat(o._,"/").concat(e.data.message),"_blank")},style:{cursor:"pointer"},children:(0,r.jsx)("svg",{style:{width:"1.2em"},xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"size-6",children:(0,r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"})})})]}),(0,r.jsx)("div",{children:(0,r.jsx)("p",{children:t.bio})})]}),(0,r.jsxs)("div",{style:{flex:"0.2"},children:[(0,r.jsx)("h3",{children:"Recent Activity :"}),_.map(e=>(0,r.jsxs)("div",{className:l().postCard,children:[(0,r.jsx)("div",{className:l().card_profileContainer,children:""!==e.media?(0,r.jsx)("img",{src:"".concat(o._,"/").concat(e.media),alt:"post media"}):(0,r.jsx)("div",{style:{width:"3.4rem",height:"3.4rem"}})}),(0,r.jsx)("div",{className:l().card_description,children:(0,r.jsx)("p",{children:e.body||"POST TITLE"})})]},e._id))]})]})}),(0,r.jsxs)("div",{className:l().workHistory,children:[(0,r.jsx)("h4",{children:"Work History"}),(0,r.jsx)("div",{className:l().workHistoryContainer,children:t.pastWork.map((e,t)=>(0,r.jsxs)("div",{className:l().workHistoryCard,children:[(0,r.jsxs)("p",{style:{fontWeight:"bold",display:"flex",alignItems:"center",gap:"0.8rem"},children:[e.company," - ",e.position]}),(0,r.jsx)("p",{children:"Work History"})]},t))})]})]})})})}},7524:function(e){e.exports={container:"styles_container__zTAGv",navBar:"styles_navBar__6W1SC",mainLogo:"styles_mainLogo__fh9Nn",navBarOptionsContainer:"styles_navBarOptionsContainer__PozZ2",joinButton:"styles_joinButton__vbd4V"}},6605:function(e){e.exports={homeContainer:"style_homeContainer__q0dh_",homeContainer_leftBar:"style_homeContainer_leftBar__1Zu1D",homeContainer_feedContainer:"style_homeContainer_feedContainer__P_CH_",homeContainer_extraContainer:"style_homeContainer_extraContainer__R595T",sideBarOption:"style_sideBarOption___Cm1r"}},3414:function(e){e.exports={container:"style_container__FaIuD",backDropContainer:"style_backDropContainer__QWovM",backdrop:"style_backdrop__fbTsq",profileContainer_details:"style_profileContainer_details__ZxqmM",postCard:"style_postCard__WRRfs",card_profileContainer:"style_card_profileContainer__tlvtD",card_description:"style_card_description__pX7KE",connectBtn:"style_connectBtn__GYC7a",connectedButton:"style_connectedButton__bfwhM",workHistoryContainer:"style_workHistoryContainer__jCaiR",workHistoryCard:"style_workHistoryCard__llBSt",profileContainer_flex:"style_profileContainer_flex__LNE4W"}},9332:function(e,t,n){e.exports=n(8199)},1163:function(e,t,n){e.exports=n(3079)}},function(e){e.O(0,[888,774,179],function(){return e(e.s=6192)}),_N_E=e.O()}]);