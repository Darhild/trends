"use strict";function _interopDefault(e){return e&&"object"==typeof e&&"default"in e?e.default:e}var React=require("react"),React__default=_interopDefault(React),humps=require("humps"),__assign=function(){return(__assign=Object.assign||function(e){for(var t,a=1,r=arguments.length;a<r;a++)for(var n in t=arguments[a])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}).apply(this,arguments)};function __awaiter(e,t,a,r){return new(a||(a=Promise))((function(n,s){function o(e){try{i(r.next(e))}catch(e){s(e)}}function c(e){try{i(r.throw(e))}catch(e){s(e)}}function i(e){e.done?n(e.value):new a((function(t){t(e.value)})).then(o,c)}i((r=r.apply(e,t||[])).next())}))}function __generator(e,t){var a,r,n,s,o={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return s={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function c(s){return function(c){return function(s){if(a)throw new TypeError("Generator is already executing.");for(;o;)try{if(a=1,r&&(n=2&s[0]?r.return:s[0]?r.throw||((n=r.return)&&n.call(r),0):r.next)&&!(n=n.call(r,s[1])).done)return n;switch(r=0,n&&(s=[2&s[0],n.value]),s[0]){case 0:case 1:n=s;break;case 4:return o.label++,{value:s[1],done:!1};case 5:o.label++,r=s[1],s=[0];continue;case 7:s=o.ops.pop(),o.trys.pop();continue;default:if(!(n=(n=o.trys).length>0&&n[n.length-1])&&(6===s[0]||2===s[0])){o=0;continue}if(3===s[0]&&(!n||s[1]>n[0]&&s[1]<n[3])){o.label=s[1];break}if(6===s[0]&&o.label<n[1]){o.label=n[1],n=s;break}if(n&&o.label<n[2]){o.label=n[2],o.ops.push(s);break}n[2]&&o.ops.pop(),o.trys.pop();continue}s=t.call(e,o)}catch(e){s=[6,e],r=0}finally{a=n=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,c])}}}function __read(e,t){var a="function"==typeof Symbol&&e[Symbol.iterator];if(!a)return e;var r,n,s=a.call(e),o=[];try{for(;(void 0===t||t-- >0)&&!(r=s.next()).done;)o.push(r.value)}catch(e){n={error:e}}finally{try{r&&!r.done&&(a=s.return)&&a.call(s)}finally{if(n)throw n.error}}return o}function __spread(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(__read(arguments[t]));return e}var initialState={activeStory:null,comments:[],commentsVisible:!1,isUploading:!1,newComment:void 0,stories:[]},reducer=function(e,t){switch(t.type){case"setUploading":return __assign(__assign({},e),{isUploading:t.isUploading});case"setStories":return __assign(__assign({},e),{stories:t.stories});case"appendStory":return __assign(__assign({},e),{stories:__spread([t.story],e.stories)});case"updateStory":var a=(c=__spread(e.stories)).findIndex((function(e){return e.id===t.story.id}));return a>=0?c[a]=t.story:c.push(t.story),__assign(__assign({},e),{stories:c});case"openStory":var r=e.stories.find((function(e){return e.id===t.activeStoryId}));return __assign(__assign({},e),{viewerVisible:!0,activeStory:r,commentsVisible:!1});case"nextStory":r=e.activeStory;var n=(c=e.stories).indexOf(r)+1,s=c[n]||null,o=!!s;return __assign(__assign({},e),{viewerVisible:o,activeStory:s,commentsVisible:!1});case"prevStory":r=e.activeStory;var c,i=(c=e.stories).indexOf(r)-1,l=c[i]||null;o=!!l;return __assign(__assign({},e),{viewerVisible:o,activeStory:l,commentsVisible:!1});case"closeViewer":return __assign(__assign({},e),{viewerVisible:!1,activeStory:null,commentsVisible:!1});case"setComments":return __assign(__assign({},e),{comments:t.comments});case"openComments":return __assign(__assign({},e),{commentsVisible:!0});case"closeComments":return __assign(__assign({},e),{commentsVisible:!1});case"appendComment":return __assign(__assign({},e),{comments:__spread(e.comments,[t.newComment])});default:return e}},StoreContext=React.createContext(void 0),StoreProvider=function(e){var t=e.children,a=__read(React.useReducer(reducer,initialState),2),r=a[0],n=a[1];return React__default.createElement(StoreContext.Provider,{value:{state:r,dispatch:n}},t)},useStore=function(){return React.useContext(StoreContext)},Author=function(e){var t=e.avatarUrl,a=e.name,r=e.time,n=void 0===r?"12 мин назад":r;return React__default.createElement("div",{className:"Author"},React__default.createElement("img",{className:"Author-Avatar",src:t,alt:a}),React__default.createElement("div",{className:"Author-Info"},React__default.createElement("div",{className:"Author-Name"},a),React__default.createElement("div",{className:"Author-Time"},n)))},Sausages=function(e){var t=e.count,a=e.activeItem,r=e.duration,n=e.currentTime,s=__spread(Array(t).keys()),o={transform:"scaleX("+n/r+")"};return React__default.createElement("div",{className:"Sausages"},s.map((function(e){return React__default.createElement("div",{key:e,className:(t=e,t<a?"Sausages-Progress Sausages-Progress_passed":"Sausages-Progress")},function(e){return a===e}(e)&&React__default.createElement("div",{className:"Sausages-Passed",style:__assign({},o)}));var t})))},Comment=function(e){var t=e.content,a=e.author;return React__default.createElement("div",{className:"Comment"},React__default.createElement("div",{className:"Comment-Row"},React__default.createElement("img",{className:"Comment-Avatar",src:a.avatarUrl,alt:a.name}),React__default.createElement("div",{className:"Comment-Name"},a.name),React__default.createElement("div",{className:"Comment-Date"},"12 окт")),React__default.createElement("div",{className:"Comment-Message"},t),React__default.createElement("div",{className:"Comment-Controls"},React__default.createElement("div",{className:"Comments-PhotoAnswer"},"Ответить"),React__default.createElement("div",{className:"Comments-TextAnswer"},"Написать ответ")))};function apiRequest(e,t){return void 0===t&&(t={}),__awaiter(this,void 0,void 0,(function(){var a,r,n,s;return __generator(this,(function(o){switch(o.label){case 0:for(r in a=new FormData,t)a.append(humps.decamelize(r),t[r]);return[4,fetch(e,{method:"POST",mode:"cors",credentials:"include",body:a})];case 1:if(!(n=o.sent()).ok)throw new Error(n.statusText);return[4,n.json()];case 2:return s=o.sent(),[2,humps.camelizeKeys(s)]}}))}))}function getStory(e){return __awaiter(this,void 0,void 0,(function(){var t,a,r;return __generator(this,(function(n){switch(n.label){case 0:return[4,fetch("/stories/"+e,{mode:"cors"})];case 1:return t=n.sent(),r=humps.camelizeKeys,[4,t.json()];case 2:return makeMappingUrl(a=r.apply(void 0,[n.sent()])),[2,a]}}))}))}function postStory(e,t){return void 0===t&&(t="default"),__awaiter(this,void 0,void 0,(function(){var a,r,n,s;return __generator(this,(function(o){switch(o.label){case 0:return"/stories/create",(a=new FormData).append("thematics",t),a.append("content",e),[4,fetch("/stories/create",{method:"POST",mode:"cors",credentials:"include",body:a})];case 1:return r=o.sent(),s=humps.camelizeKeys,[4,r.json()];case 2:return makeMappingUrl(n=s.apply(void 0,[o.sent()])),[2,n]}}))}))}function getStories(e){return __awaiter(this,void 0,void 0,(function(){var t;return __generator(this,(function(a){switch(a.label){case 0:return[4,apiRequest("/stories",e)];case 1:return(t=a.sent()).forEach(makeMappingUrl),[2,t.map((function(e){return __assign(__assign({},e),{isLoading:3!==e.status})}))]}}))}))}function getComments(e){return __awaiter(this,void 0,void 0,(function(){var t,a;return __generator(this,(function(r){switch(r.label){case 0:return[4,fetch("/stories/"+e+"/comments",{method:"GET",mode:"cors"})];case 1:return t=r.sent(),a=humps.camelizeKeys,[4,t.json()];case 2:return[2,a.apply(void 0,[r.sent()])]}}))}))}function postComment(e,t,a){return __awaiter(this,void 0,void 0,(function(){var r,n,s,o;return __generator(this,(function(c){switch(c.label){case 0:return r="/stories/"+a+"/comments",(n=new FormData).append("author_id",e.id.toString()),n.append("content",t),[4,fetch(r,{method:"POST",mode:"cors",credentials:"include",body:n})];case 1:return s=c.sent(),o=humps.camelizeKeys,[4,s.json()];case 2:return[2,o.apply(void 0,[c.sent()])]}}))}))}function makeMappingUrl(e){e.previewUrl=e.previewUrl&&e.previewUrl.replace("//www.84.201.143.123.xip.io",""),e.episodes.forEach((function(e){e.contentUrl=e.contentUrl.replace("//www.84.201.143.123.xip.io","")}))}var Comments=function(e){var t=e.storyId,a=e.user,r=useStore(),n=r.state,s=r.dispatch,o=n.commentsVisible,c=n.comments,i=__read(React.useState(),2),l=i[0],u=i[1];React.useEffect((function(){!function(){__awaiter(this,void 0,void 0,(function(){var e;return __generator(this,(function(a){switch(a.label){case 0:return[4,getComments(t)];case 1:return e=a.sent(),s({type:"setComments",comments:e}),[2]}}))}))}()}),[]);var m,d;return o?React__default.createElement("div",{className:"Comments Comments_Type_Expand"},React__default.createElement("div",{className:"Comments-Header"},React__default.createElement("div",{className:"Comments-HeaderTitle"},"Комментарии"),React__default.createElement("div",{className:"Comments-Avatar"},React__default.createElement("div",{className:"Comments-AvatarElem"}),React__default.createElement("div",{className:"Comments-AvatarElem"}),React__default.createElement("div",{className:"Comments-AvatarElem"})),React__default.createElement("div",{className:"Comments-CommentsCount"},"623"),React__default.createElement("div",{onClick:function(){return s({type:"closeComments"})},className:"Comments-Arrow"})),React__default.createElement("div",{className:"Comments-Row"},c.map((function(e,t){return React__default.createElement(Comment,__assign({key:t},e))}))),React__default.createElement("div",{className:"Comments-Top"},React__default.createElement("div",{className:"Avatar"}),React__default.createElement("input",{className:"Comments-Input",type:"text",onKeyDown:function(e){return __awaiter(void 0,void 0,void 0,(function(){var r;return __generator(this,(function(n){switch(n.label){case 0:return"Enter"===e.key&&l&&a?[4,postComment(a,l,t)]:[3,2];case 1:n.sent(),r={content:l,author:{avatarUrl:a.picture,id:a.id,name:a.name},createdAt:"date"},s({type:"appendComment",newComment:r}),u(""),n.label=2;case 2:return[2]}}))}))},onChange:function(e){u(e.target.value)},placeholder:"Комментировать",value:l}),React__default.createElement("div",{className:"Comments-Emoji"},React__default.createElement("div",{className:"Emoji"},"😭"),React__default.createElement("div",{className:"Emoji"},"😭"),React__default.createElement("div",{className:"Emoji"},"😭"),React__default.createElement("div",{className:"Emoji"},"😭"))),React__default.createElement("div",{className:"Comments-Bottom"},React__default.createElement("div",{className:"Comments-Emoji"},React__default.createElement("div",{className:"Emoji Emoji_Type_Small"},"😭"),React__default.createElement("div",{className:"Emoji Emoji_Type_Small"},"😭"),React__default.createElement("div",{className:"Emoji Emoji_Type_Small"},"😭")),React__default.createElement("div",{className:"Comments-History"},"154 комментария"),React__default.createElement("div",{className:"Comments-Answers"},"12 ответов"),React__default.createElement("div",{className:"Comments-Dots"}))):React__default.createElement("div",{onClick:function(){return s({type:"openComments"})},className:"Comments Comments_Type_Collapsed"},c.length," ",(m=c.length,1===(d=m%10)?"комментарий":d>1&&d<=4?"комментария":"комментариев"))},Story=function(e){var t=e.onClose,a=e.story,r=e.onEnd,n=e.isActive,s=e.user,o=a.episodes,c=a.author,i=__read(React.useState(0),2),l=i[0],u=i[1],m=__read(React.useState(),2),d=m[0],_=m[1],f=__read(React.useState(0),2),v=f[0],p=f[1],y=__read(React.useState(0),2),g=y[0],h=y[1],S=__read(React.useState(!1),2),E=S[0],R=S[1],C=__read(React.useState(!0),2),w=(C[0],C[1],o[l]),N=React.useCallback((function(e){_(e)}),[]);React.useEffect((function(){if(d){var e=setInterval((function(){return h(d.currentTime)}),10);return function(){u(0),_(void 0),p(0),h(0),R(!1),clearInterval(e)}}}),[d]);var b=function(e){return function(t){t.stopPropagation();var a="prev"===e?l-1:l+1;return a<0?t.preventDefault():a>=o.length?r():void u(a)}},T=b("prev"),k=b("next");return React__default.createElement("div",{className:"Story"},React__default.createElement("div",{className:"Story-Togglers"},React__default.createElement("div",{className:"Story-Toggler Story-Toggler_left",onClick:T}),React__default.createElement("div",{className:"Story-Toggler Story-Toggler_right",onClick:k})),React__default.createElement("div",{className:"Story-Close",onClick:t}),React__default.createElement("div",{className:"Story-Info"},React__default.createElement(Author,__assign({},c))),React__default.createElement("div",{className:"Story-Progress"},React__default.createElement(Sausages,{currentTime:g,count:o.length,duration:v,activeItem:l})),React__default.createElement("img",{className:"Story-Media",src:a.previewUrl}),n&&React__default.createElement(React__default.Fragment,null,React__default.createElement("video",{style:{backgroundColor:"black"},className:"\n              Story-Media\n              Story-Media_type_video\n              "+(E?"Story-Media_state_ready":"")+"\n            ",id:"video",autoPlay:n,playsInline:!0,ref:N,src:w.contentUrl,onEnded:k,onCanPlay:function(){return R(!0)},onLoadedMetadata:function(e){p(e.currentTarget.duration)}}),React__default.createElement(Comments,{storyId:a.id,user:s})))},SWIPE_TRESHOLD=50,StoryViewer=function(e){var t=e.user,a=useStore(),r=a.state,n=a.dispatch,s=r.activeStory,o=r.stories,c=o.findIndex((function(e){var t;return(null===(t=s)||void 0===t?void 0:t.id)===e.id})),i=__read(React.useState({isMoving:!1,touchOffset:0}),2),l=i[0],u=i[1];if(React.useEffect((function(){u(__assign(__assign({},l),{sliderOffset:-100*c}))}),[c]),!s)return null;var m=function(){return n({type:"nextStory"})},d=function(){return n({type:"closeViewer"})},_="\n    translateX(calc(\n      "+l.sliderOffset+"% + "+-l.touchOffset+"px\n    ))\n  ";return React__default.createElement("div",{className:"StoryViewer"},React__default.createElement("div",{onTouchStart:function(e){u(__assign(__assign({},l),{isMoving:!0,touchStart:e.touches[0].clientX}))},onTouchMove:function(e){var t=l.touchStart-e.touches[0].clientX;c<=0&&t<=0||c+1>=o.length&&t>=0||u(__assign(__assign({},l),{touchOffset:t}))},onTouchEnd:function(){var e=l.touchOffset;Math.abs(e)>SWIPE_TRESHOLD&&n(e>0?{type:"nextStory"}:{type:"prevStory"}),u(__assign(__assign({},l),{isMoving:!1,touchStart:null,touchOffset:0}))},className:"StoryViewer-Stories "+(l.isMoving?"StoryViewer-Stories_moving":""),style:{transform:_}},r.stories.map((function(e){return React__default.createElement(Story,{key:e.id,story:e,onEnd:m,onClose:d,isActive:e.id===s.id,user:t})}))))},Loader=function(e){var t=e.className,a=void 0===t?"":t;return React__default.createElement("div",{className:"Loader StoryCard-Loader "+a},React__default.createElement("div",{className:"Loader-Spinner"}))},StoryCard=function(e){var t=e.onClick,a=e.title,r=e.previewUrl,n=e.iconUrl,s=e.isLoading,o=__assign({},r&&{backgroundImage:"url("+r+")"}),c=__assign({},n&&{backgroundImage:"url("+n+")",backgroundSize:"contain",backgroundRepeat:"no-repeat"});return React__default.createElement("div",null,React__default.createElement("div",{onClick:t,className:"StoryCard",style:o},s&&React__default.createElement(Loader,{className:"StoryCard-Loader"}),React__default.createElement("div",{className:"StoryCard-Type StoryCard-Type_Video",style:c}),React__default.createElement("div",{className:"StoryCard-Name"},a)))};function pollStory(e,t){return __awaiter(this,void 0,void 0,(function(){var a;return __generator(this,(function(r){switch(r.label){case 0:return[4,getStory(e)];case 1:return 3!==(a=r.sent()).status?setTimeout(pollStory,100,e,t):(a.isLoading=!1,t({type:"updateStory",story:a})),[2]}}))}))}var StoryCardForm=function(e){var t=e.user,a=e.subject,r=useStore().dispatch;return React__default.createElement("label",null,React__default.createElement("input",{className:"StoryCardForm-FileInput",type:"file",accept:"video/*,image/*",onChange:function(e){return t=e.target.files,__awaiter(void 0,void 0,void 0,(function(){var e;return __generator(this,(function(n){switch(n.label){case 0:return t&&t.length>0?(r({type:"setUploading",isUploading:!0}),[4,postStory(t[0],a)]):[3,2];case 1:(e=n.sent()).isLoading=!0,setTimeout(pollStory,100,e.id,r),r({type:"appendStory",story:e}),r({type:"setUploading",isUploading:!1}),n.label=2;case 2:return[2]}}))}));var t}}),React__default.createElement(StoryCard,{previewUrl:t.picture,title:"Добавить историю"}))},StoryCards=function(e){var t=e.blogger,a=e.canAdd,r=e.user,n=e.subject,s=useStore(),o=s.dispatch,c=s.state,i=c.stories;React.useEffect((function(){!function(){__awaiter(this,void 0,void 0,(function(){var e,a;return __generator(this,(function(r){switch(r.label){case 0:return e={thematics:n},t&&(e.authorId=t),[4,getStories(e)];case 1:return a=r.sent(),o({type:"setStories",stories:a}),[2]}}))}))}()}),[]);var l=function(e){return function(){e.isLoading||o({type:"openStory",activeStoryId:e.id})}};return React__default.createElement("main",{className:"StoryCards"},c.isUploading&&React__default.createElement(Loader,{className:"StoryCards-Loader"}),(i&&i.length>0||a)&&React__default.createElement("div",{className:"StoryCards-Scroll"},a&&r&&React__default.createElement(StoryCardForm,{subject:n,user:r}),i.map((function(e){return React__default.createElement(StoryCard,__assign({key:e.id,onClick:l(e)},e,{title:e.author.name,iconUrl:e.author.avatarUrl}))}))))},Stories=function(e){var t=e.blogger,a=e.canAdd,r=e.user,n=e.subject,s=void 0===n?"default":n;e.type;return React__default.createElement(StoreProvider,null,React__default.createElement(StoryCards,{canAdd:a,user:r,subject:s,blogger:t}),React__default.createElement(StoryViewer,{user:r}))};module.exports=Stories;
