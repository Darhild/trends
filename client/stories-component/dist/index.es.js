import e,{createContext as t,useReducer as n,useContext as r,useState as a,useEffect as o,useCallback as s}from"react";import{camelizeKeys as i,decamelize as c}from"humps";
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */var l=function(){return(l=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)};function m(e,t,n,r){return new(n||(n=Promise))((function(a,o){function s(e){try{c(r.next(e))}catch(e){o(e)}}function i(e){try{c(r.throw(e))}catch(e){o(e)}}function c(e){e.done?a(e.value):new n((function(t){t(e.value)})).then(s,i)}c((r=r.apply(e,t||[])).next())}))}function u(e,t){var n,r,a,o,s={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return o={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function i(o){return function(i){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(a=2&o[0]?r.return:o[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,o[1])).done)return a;switch(r=0,a&&(o=[2&o[0],a.value]),o[0]){case 0:case 1:a=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,r=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!(a=(a=s.trys).length>0&&a[a.length-1])&&(6===o[0]||2===o[0])){s=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){s.label=o[1];break}if(6===o[0]&&s.label<a[1]){s.label=a[1],a=o;break}if(a&&s.label<a[2]){s.label=a[2],s.ops.push(o);break}a[2]&&s.ops.pop(),s.trys.pop();continue}o=t.call(e,s)}catch(e){o=[6,e],r=0}finally{n=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,i])}}}function d(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,a,o=n.call(e),s=[];try{for(;(void 0===t||t-- >0)&&!(r=o.next()).done;)s.push(r.value)}catch(e){a={error:e}}finally{try{r&&!r.done&&(n=o.return)&&n.call(o)}finally{if(a)throw a.error}}return s}function v(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(d(arguments[t]));return e}var f={activeStory:null,comments:[],commentsVisible:!1,isUploading:!1,newComment:void 0,stories:[]},p=function(e,t){switch(t.type){case"setUploading":return l(l({},e),{isUploading:t.isUploading});case"setStories":return l(l({},e),{stories:t.stories});case"appendStory":return l(l({},e),{stories:v([t.story],e.stories)});case"updateStory":var n=(i=v(e.stories)).findIndex((function(e){return e.id===t.story.id}));return n>=0?i[n]=t.story:i.push(t.story),l(l({},e),{stories:i});case"openStory":var r=e.stories.find((function(e){return e.id===t.activeStoryId}));return l(l({},e),{viewerVisible:!0,activeStory:r,commentsVisible:!1});case"nextStory":r=e.activeStory;var a=(i=e.stories).indexOf(r)+1,o=i[a]||null,s=!!o;return l(l({},e),{viewerVisible:s,activeStory:o,commentsVisible:!1});case"prevStory":r=e.activeStory;var i,c=(i=e.stories).indexOf(r)-1,m=i[c]||null;s=!!m;return l(l({},e),{viewerVisible:s,activeStory:m,commentsVisible:!1});case"closeViewer":return l(l({},e),{viewerVisible:!1,activeStory:null,commentsVisible:!1});case"setComments":return l(l({},e),{comments:t.comments});case"openComments":return l(l({},e),{commentsVisible:!0});case"closeComments":return l(l({},e),{commentsVisible:!1});case"appendComment":return l(l({},e),{comments:v(e.comments,[t.newComment])});default:return e}},y=t(void 0),h=function(t){var r=t.children,a=d(n(p,f),2),o=a[0],s=a[1];return e.createElement(y.Provider,{value:{state:o,dispatch:s}},r)},E=function(){return r(y)},g=function(t){var n=t.avatarUrl,r=t.name,a=t.time,o=void 0===a?"12 мин назад":a;return e.createElement("div",{className:"Author"},e.createElement("img",{className:"Author-Avatar",src:n,alt:r}),e.createElement("div",{className:"Author-Info"},e.createElement("div",{className:"Author-Name"},r),e.createElement("div",{className:"Author-Time"},o)))},S=function(t){var n=t.count,r=t.activeItem,a=t.duration,o=t.currentTime,s=v(Array(n).keys()),i={transform:"scaleX("+o/a+")"};return e.createElement("div",{className:"Sausages"},s.map((function(t){return e.createElement("div",{key:t,className:(n=t,n<r?"Sausages-Progress Sausages-Progress_passed":"Sausages-Progress")},function(e){return r===e}(t)&&e.createElement("div",{className:"Sausages-Passed",style:l({},i)}));var n})))},C=function(t){var n=t.content,r=t.author;return e.createElement("div",{className:"Comment"},e.createElement("div",{className:"Comment-Row"},e.createElement("img",{className:"Comment-Avatar",src:r.avatarUrl,alt:r.name}),e.createElement("div",{className:"Comment-Name"},r.name),e.createElement("div",{className:"Comment-Date"},"12 окт")),e.createElement("div",{className:"Comment-Message"},n),e.createElement("div",{className:"Comment-Controls"},e.createElement("div",{className:"Comments-PhotoAnswer"},"Ответить"),e.createElement("div",{className:"Comments-TextAnswer"},"Написать ответ")))};function N(e,t){return void 0===t&&(t={}),m(this,void 0,void 0,(function(){var n,r,a,o;return u(this,(function(s){switch(s.label){case 0:for(r in n=new FormData,t)n.append(c(r),t[r]);return[4,fetch(e,{method:"POST",mode:"cors",credentials:"include",body:n})];case 1:if(!(a=s.sent()).ok)throw new Error(a.statusText);return[4,a.json()];case 2:return o=s.sent(),[2,i(o)]}}))}))}function b(e){return m(this,void 0,void 0,(function(){var t,n,r;return u(this,(function(a){switch(a.label){case 0:return[4,fetch("/stories/"+e,{mode:"cors"})];case 1:return t=a.sent(),r=i,[4,t.json()];case 2:return U(n=r.apply(void 0,[a.sent()])),[2,n]}}))}))}function w(e,t){return void 0===t&&(t="default"),m(this,void 0,void 0,(function(){var n,r,a,o;return u(this,(function(s){switch(s.label){case 0:return"/stories/create",(n=new FormData).append("thematics",t),n.append("content",e),[4,fetch("/stories/create",{method:"POST",mode:"cors",credentials:"include",body:n})];case 1:return r=s.sent(),o=i,[4,r.json()];case 2:return U(a=o.apply(void 0,[s.sent()])),[2,a]}}))}))}function T(e){return m(this,void 0,void 0,(function(){var t;return u(this,(function(n){switch(n.label){case 0:return[4,N("/stories",e)];case 1:return(t=n.sent()).forEach(U),[2,t.map((function(e){return l(l({},e),{isLoading:3!==e.status})}))]}}))}))}function k(e){return m(this,void 0,void 0,(function(){var t,n;return u(this,(function(r){switch(r.label){case 0:return[4,fetch("/stories/"+e+"/comments",{method:"GET",mode:"cors"})];case 1:return t=r.sent(),n=i,[4,t.json()];case 2:return[2,n.apply(void 0,[r.sent()])]}}))}))}function j(e,t,n){return m(this,void 0,void 0,(function(){var r,a,o,s;return u(this,(function(c){switch(c.label){case 0:return r="/stories/"+n+"/comments",(a=new FormData).append("author_id",e.id.toString()),a.append("content",t),[4,fetch(r,{method:"POST",mode:"cors",credentials:"include",body:a})];case 1:return o=c.sent(),s=i,[4,o.json()];case 2:return[2,s.apply(void 0,[c.sent()])]}}))}))}function U(e){e.previewUrl=e.previewUrl&&e.previewUrl.replace("//www.84.201.143.123.xip.io",""),e.episodes.forEach((function(e){e.contentUrl=e.contentUrl.replace("//www.84.201.143.123.xip.io","")}))}var A=function(t){var n=t.storyId,r=t.user,s=E(),i=s.state,c=s.dispatch,v=i.commentsVisible,f=i.comments,p=d(a(),2),y=p[0],h=p[1];o((function(){!function(){m(this,void 0,void 0,(function(){var e;return u(this,(function(t){switch(t.label){case 0:return[4,k(n)];case 1:return e=t.sent(),c({type:"setComments",comments:e}),[2]}}))}))}()}),[]);var g,S;return v?e.createElement("div",{className:"Comments Comments_Type_Expand"},e.createElement("div",{className:"Comments-Header"},e.createElement("div",{className:"Comments-HeaderTitle"},"Комментарии"),e.createElement("div",{className:"Comments-Avatar"},e.createElement("div",{className:"Comments-AvatarElem"}),e.createElement("div",{className:"Comments-AvatarElem"}),e.createElement("div",{className:"Comments-AvatarElem"})),e.createElement("div",{className:"Comments-CommentsCount"},"623"),e.createElement("div",{onClick:function(){return c({type:"closeComments"})},className:"Comments-Arrow"})),e.createElement("div",{className:"Comments-Row"},f.map((function(t,n){return e.createElement(C,l({key:n},t))}))),e.createElement("div",{className:"Comments-Top"},e.createElement("div",{className:"Avatar"}),e.createElement("input",{className:"Comments-Input",type:"text",onKeyDown:function(e){return m(void 0,void 0,void 0,(function(){var t;return u(this,(function(a){switch(a.label){case 0:return"Enter"===e.key&&y&&r?[4,j(r,y,n)]:[3,2];case 1:a.sent(),t={content:y,author:{avatarUrl:r.picture,id:r.id,name:r.name},createdAt:"date"},c({type:"appendComment",newComment:t}),h(""),a.label=2;case 2:return[2]}}))}))},onChange:function(e){h(e.target.value)},placeholder:"Комментировать",value:y}),e.createElement("div",{className:"Comments-Emoji"},e.createElement("div",{className:"Emoji"},"😭"),e.createElement("div",{className:"Emoji"},"😭"),e.createElement("div",{className:"Emoji"},"😭"),e.createElement("div",{className:"Emoji"},"😭"))),e.createElement("div",{className:"Comments-Bottom"},e.createElement("div",{className:"Comments-Emoji"},e.createElement("div",{className:"Emoji Emoji_Type_Small"},"😭"),e.createElement("div",{className:"Emoji Emoji_Type_Small"},"😭"),e.createElement("div",{className:"Emoji Emoji_Type_Small"},"😭")),e.createElement("div",{className:"Comments-History"},"154 комментария"),e.createElement("div",{className:"Comments-Answers"},"12 ответов"),e.createElement("div",{className:"Comments-Dots"}))):e.createElement("div",{onClick:function(){return c({type:"openComments"})},className:"Comments Comments_Type_Collapsed"},f.length," ",(g=f.length,1===(S=g%10)?"комментарий":S>1&&S<=4?"комментария":"комментариев"))},x=function(t){var n=t.onClose,r=t.story,i=t.onEnd,c=t.isActive,m=t.user,u=r.episodes,v=r.author,f=d(a(0),2),p=f[0],y=f[1],h=d(a(),2),E=h[0],C=h[1],N=d(a(0),2),b=N[0],w=N[1],T=d(a(0),2),k=T[0],j=T[1],U=d(a(!1),2),x=U[0],_=U[1],I=d(a(!0),2),V=(I[0],I[1],u[p]),O=s((function(e){C(e)}),[]);o((function(){if(E){var e=setInterval((function(){return j(E.currentTime)}),10);return function(){y(0),C(void 0),w(0),j(0),_(!1),clearInterval(e)}}}),[E]);var P=function(e){return function(t){t.stopPropagation();var n="prev"===e?p-1:p+1;return n<0?t.preventDefault():n>=u.length?i():void y(n)}},M=P("prev"),L=P("next");return e.createElement("div",{className:"Story"},e.createElement("div",{className:"Story-Togglers"},e.createElement("div",{className:"Story-Toggler Story-Toggler_left",onClick:M}),e.createElement("div",{className:"Story-Toggler Story-Toggler_right",onClick:L})),e.createElement("div",{className:"Story-Close",onClick:n}),e.createElement("div",{className:"Story-Info"},e.createElement(g,l({},v))),e.createElement("div",{className:"Story-Progress"},e.createElement(S,{currentTime:k,count:u.length,duration:b,activeItem:p})),e.createElement("img",{className:"Story-Media",src:r.previewUrl}),c&&e.createElement(e.Fragment,null,e.createElement("video",{style:{backgroundColor:"black"},className:"\n              Story-Media\n              Story-Media_type_video\n              "+(x?"Story-Media_state_ready":"")+"\n            ",id:"video",autoPlay:c,playsInline:!0,ref:O,src:V.contentUrl,onEnded:L,onCanPlay:function(){return _(!0)},onLoadedMetadata:function(e){w(e.currentTarget.duration)}}),e.createElement(A,{storyId:r.id,user:m})))},_=function(t){var n=t.user,r=E(),s=r.state,i=r.dispatch,c=s.activeStory,m=s.stories,u=m.findIndex((function(e){var t;return(null===(t=c)||void 0===t?void 0:t.id)===e.id})),v=d(a({isMoving:!1,touchOffset:0}),2),f=v[0],p=v[1];if(o((function(){p(l(l({},f),{sliderOffset:-100*u}))}),[u]),!c)return null;var y=function(){return i({type:"nextStory"})},h=function(){return i({type:"closeViewer"})},g="\n    translateX(calc(\n      "+f.sliderOffset+"% + "+-f.touchOffset+"px\n    ))\n  ";return e.createElement("div",{className:"StoryViewer"},e.createElement("div",{onTouchStart:function(e){p(l(l({},f),{isMoving:!0,touchStart:e.touches[0].clientX}))},onTouchMove:function(e){var t=f.touchStart-e.touches[0].clientX;u<=0&&t<=0||u+1>=m.length&&t>=0||p(l(l({},f),{touchOffset:t}))},onTouchEnd:function(){var e=f.touchOffset;Math.abs(e)>50&&i(e>0?{type:"nextStory"}:{type:"prevStory"}),p(l(l({},f),{isMoving:!1,touchStart:null,touchOffset:0}))},className:"StoryViewer-Stories "+(f.isMoving?"StoryViewer-Stories_moving":""),style:{transform:g}},s.stories.map((function(t){return e.createElement(x,{key:t.id,story:t,onEnd:y,onClose:h,isActive:t.id===c.id,user:n})}))))},I=function(t){var n=t.className,r=void 0===n?"":n;return e.createElement("div",{className:"Loader StoryCard-Loader "+r},e.createElement("div",{className:"Loader-Spinner"}))},V=function(t){var n=t.onClick,r=t.title,a=t.previewUrl,o=t.iconUrl,s=t.isLoading,i=l({},a&&{backgroundImage:"url("+a+")"}),c=l({},o&&{backgroundImage:"url("+o+")",backgroundSize:"contain",backgroundRepeat:"no-repeat"});return e.createElement("div",null,e.createElement("div",{onClick:n,className:"StoryCard",style:i},s&&e.createElement(I,{className:"StoryCard-Loader"}),e.createElement("div",{className:"StoryCard-Type StoryCard-Type_Video",style:c}),e.createElement("div",{className:"StoryCard-Name"},r)))};function O(e,t){return m(this,void 0,void 0,(function(){var n;return u(this,(function(r){switch(r.label){case 0:return[4,b(e)];case 1:return 3!==(n=r.sent()).status?setTimeout(O,100,e,t):(n.isLoading=!1,t({type:"updateStory",story:n})),[2]}}))}))}var P=function(t){var n=t.user,r=t.subject,a=E().dispatch;return e.createElement("label",null,e.createElement("input",{className:"StoryCardForm-FileInput",type:"file",accept:"video/*,image/*",onChange:function(e){return t=e.target.files,m(void 0,void 0,void 0,(function(){var e;return u(this,(function(n){switch(n.label){case 0:return t&&t.length>0?(a({type:"setUploading",isUploading:!0}),[4,w(t[0],r)]):[3,2];case 1:(e=n.sent()).isLoading=!0,setTimeout(O,100,e.id,a),a({type:"appendStory",story:e}),a({type:"setUploading",isUploading:!1}),n.label=2;case 2:return[2]}}))}));var t}}),e.createElement(V,{previewUrl:n.picture,title:"Добавить историю"}))},M=function(t){var n=t.blogger,r=t.canAdd,a=t.user,s=t.subject,i=E(),c=i.dispatch,d=i.state,v=d.stories;o((function(){!function(){m(this,void 0,void 0,(function(){var e,t;return u(this,(function(r){switch(r.label){case 0:return e={thematics:s},n&&(e.authorId=n),[4,T(e)];case 1:return t=r.sent(),c({type:"setStories",stories:t}),[2]}}))}))}()}),[]);var f=function(e){return function(){e.isLoading||c({type:"openStory",activeStoryId:e.id})}};return e.createElement("main",{className:"StoryCards"},d.isUploading&&e.createElement(I,{className:"StoryCards-Loader"}),(v&&v.length>0||r)&&e.createElement("div",{className:"StoryCards-Scroll"},r&&a&&e.createElement(P,{subject:s,user:a}),v.map((function(t){return e.createElement(V,l({key:t.id,onClick:f(t)},t,{title:t.author.name,iconUrl:t.author.avatarUrl}))}))))};export default function(t){var n=t.blogger,r=t.canAdd,a=t.user,o=t.subject,s=void 0===o?"default":o;t.type;return e.createElement(h,null,e.createElement(M,{canAdd:r,user:a,subject:s,blogger:n}),e.createElement(_,{user:a}))}
