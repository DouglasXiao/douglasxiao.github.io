(self.webpackChunkpersonal_site=self.webpackChunkpersonal_site||[]).push([[161],{7161:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return h}});n(2791);var r=n(1087),s=n(6842),i=n(7892),a=n.n(i),o=n(184),u=function(t){var e=t.data;return(0,o.jsx)("div",{className:"cell-container",children:(0,o.jsxs)("article",{className:"mini-post",children:[(0,o.jsxs)("header",{children:[(0,o.jsx)("h3",{children:(0,o.jsx)("a",{href:e.link,children:e.title})}),(0,o.jsx)("time",{className:"published",children:a()(e.date).format("MMMM, YYYY")})]}),(0,o.jsx)("a",{href:e.link,className:"image",children:(0,o.jsx)("img",{src:"".concat("").concat(e.image),alt:e.title})}),(0,o.jsx)("div",{className:"description",children:(0,o.jsx)("p",{children:e.desc})})]})})},c=[{title:"ASK GPT about images",link:"https://chromewebstore.google.com/detail/ask-gpt-about-images/mkhhfmknhcmoehogomnfhjmfdholkapo?hl=en",subtitle:"Chrome plugin",image:"/images/projects/gptdialog.png",date:"2023-12-18",desc:"A simple dialog to help you reach to ChatGPT and ask any questions. This is a GPT plugin for user to ask any questions related to images when they are browsing web pages."},{title:"React Rental app based on Node.js",link:"https://github.com/DouglasXiao/ReactRental",subtitle:"A crawler system based on Node.js in backend and React in frontend.",image:"/images/projects/reactrentalarchitecture.png",date:"2019-04-18",desc:"A simple rental application to help user to find all rental information on the market. Users can view the property information on the integrated map, it would display all the information from Vanpeople, VanSky and craiglist."},{title:"Algorithm, data structure, system design preacher",link:"https://leetcode.com/",subtitle:"My algorithm class is coming soon, stay tuned",image:"/images/projects/leetcode.png",desc:"I am deeply passionate about LeetCode, a hobby that, combined with my ACM experiences from university, has given me a unique understanding of algorithms. My teaching style has already resonated with several students who have expressed appreciation for my classes. Building on this success, I am excited to soon launch my personal algorithm course."}],h=function(){return(0,o.jsx)(s.Z,{title:"Projects",description:"Learn about Ke Xiao's projects.",children:(0,o.jsxs)("article",{className:"post",id:"projects",children:[(0,o.jsx)("header",{children:(0,o.jsxs)("div",{className:"title",children:[(0,o.jsx)("h2",{children:(0,o.jsx)(r.rU,{to:"/projects",children:"Projects"})}),(0,o.jsx)("p",{children:"Outside of work, I am also deeply passionate about Tech, here is a selection of side projects that I'm not too ashamed of"})]})}),c.map((function(t){return(0,o.jsx)(u,{data:t},t.title)}))]})})}},7892:function(t){t.exports=function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",s="second",i="minute",a="hour",o="day",u="week",c="month",h="quarter",l="year",d="date",f="Invalid Date",m=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,p=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,$={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},g=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},y={s:g,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),s=n%60;return(e<=0?"+":"-")+g(r,2,"0")+":"+g(s,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),s=e.clone().add(r,c),i=n-s<0,a=e.clone().add(r+(i?-1:1),c);return+(-(r+(n-s)/(i?s-a:a-s))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:c,y:l,w:u,d:o,D:d,h:a,m:i,s:s,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},M="en",v={};v[M]=$;var w="$isDayjsObject",b=function(t){return t instanceof k||!(!t||!t[w])},D=function t(e,n,r){var s;if(!e)return M;if("string"==typeof e){var i=e.toLowerCase();v[i]&&(s=i),n&&(v[i]=n,s=i);var a=e.split("-");if(!s&&a.length>1)return t(a[0])}else{var o=e.name;v[o]=e,s=o}return!r&&s&&(M=s),s||!r&&M},j=function(t,e){if(b(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new k(n)},S=y;S.l=D,S.i=b,S.w=function(t,e){return j(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var k=function(){function $(t){this.$L=D(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[w]=!0}var g=$.prototype;return g.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(S.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(m);if(r){var s=r[2]-1||0,i=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],s,r[3]||1,r[4]||0,r[5]||0,r[6]||0,i)):new Date(r[1],s,r[3]||1,r[4]||0,r[5]||0,r[6]||0,i)}}return new Date(e)}(t),this.init()},g.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},g.$utils=function(){return S},g.isValid=function(){return!(this.$d.toString()===f)},g.isSame=function(t,e){var n=j(t);return this.startOf(e)<=n&&n<=this.endOf(e)},g.isAfter=function(t,e){return j(t)<this.startOf(e)},g.isBefore=function(t,e){return this.endOf(e)<j(t)},g.$g=function(t,e,n){return S.u(t)?this[e]:this.set(n,t)},g.unix=function(){return Math.floor(this.valueOf()/1e3)},g.valueOf=function(){return this.$d.getTime()},g.startOf=function(t,e){var n=this,r=!!S.u(e)||e,h=S.p(t),f=function(t,e){var s=S.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?s:s.endOf(o)},m=function(t,e){return S.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},p=this.$W,$=this.$M,g=this.$D,y="set"+(this.$u?"UTC":"");switch(h){case l:return r?f(1,0):f(31,11);case c:return r?f(1,$):f(0,$+1);case u:var M=this.$locale().weekStart||0,v=(p<M?p+7:p)-M;return f(r?g-v:g+(6-v),$);case o:case d:return m(y+"Hours",0);case a:return m(y+"Minutes",1);case i:return m(y+"Seconds",2);case s:return m(y+"Milliseconds",3);default:return this.clone()}},g.endOf=function(t){return this.startOf(t,!1)},g.$set=function(t,e){var n,u=S.p(t),h="set"+(this.$u?"UTC":""),f=(n={},n[o]=h+"Date",n[d]=h+"Date",n[c]=h+"Month",n[l]=h+"FullYear",n[a]=h+"Hours",n[i]=h+"Minutes",n[s]=h+"Seconds",n[r]=h+"Milliseconds",n)[u],m=u===o?this.$D+(e-this.$W):e;if(u===c||u===l){var p=this.clone().set(d,1);p.$d[f](m),p.init(),this.$d=p.set(d,Math.min(this.$D,p.daysInMonth())).$d}else f&&this.$d[f](m);return this.init(),this},g.set=function(t,e){return this.clone().$set(t,e)},g.get=function(t){return this[S.p(t)]()},g.add=function(r,h){var d,f=this;r=Number(r);var m=S.p(h),p=function(t){var e=j(f);return S.w(e.date(e.date()+Math.round(t*r)),f)};if(m===c)return this.set(c,this.$M+r);if(m===l)return this.set(l,this.$y+r);if(m===o)return p(1);if(m===u)return p(7);var $=(d={},d[i]=e,d[a]=n,d[s]=t,d)[m]||1,g=this.$d.getTime()+r*$;return S.w(g,this)},g.subtract=function(t,e){return this.add(-1*t,e)},g.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||f;var r=t||"YYYY-MM-DDTHH:mm:ssZ",s=S.z(this),i=this.$H,a=this.$m,o=this.$M,u=n.weekdays,c=n.months,h=n.meridiem,l=function(t,n,s,i){return t&&(t[n]||t(e,r))||s[n].slice(0,i)},d=function(t){return S.s(i%12||12,t,"0")},m=h||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r};return r.replace(p,(function(t,r){return r||function(t){switch(t){case"YY":return String(e.$y).slice(-2);case"YYYY":return S.s(e.$y,4,"0");case"M":return o+1;case"MM":return S.s(o+1,2,"0");case"MMM":return l(n.monthsShort,o,c,3);case"MMMM":return l(c,o);case"D":return e.$D;case"DD":return S.s(e.$D,2,"0");case"d":return String(e.$W);case"dd":return l(n.weekdaysMin,e.$W,u,2);case"ddd":return l(n.weekdaysShort,e.$W,u,3);case"dddd":return u[e.$W];case"H":return String(i);case"HH":return S.s(i,2,"0");case"h":return d(1);case"hh":return d(2);case"a":return m(i,a,!0);case"A":return m(i,a,!1);case"m":return String(a);case"mm":return S.s(a,2,"0");case"s":return String(e.$s);case"ss":return S.s(e.$s,2,"0");case"SSS":return S.s(e.$ms,3,"0");case"Z":return s}return null}(t)||s.replace(":","")}))},g.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},g.diff=function(r,d,f){var m,p=this,$=S.p(d),g=j(r),y=(g.utcOffset()-this.utcOffset())*e,M=this-g,v=function(){return S.m(p,g)};switch($){case l:m=v()/12;break;case c:m=v();break;case h:m=v()/3;break;case u:m=(M-y)/6048e5;break;case o:m=(M-y)/864e5;break;case a:m=M/n;break;case i:m=M/e;break;case s:m=M/t;break;default:m=M}return f?m:S.a(m)},g.daysInMonth=function(){return this.endOf(c).$D},g.$locale=function(){return v[this.$L]},g.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=D(t,e,!0);return r&&(n.$L=r),n},g.clone=function(){return S.w(this.$d,this)},g.toDate=function(){return new Date(this.valueOf())},g.toJSON=function(){return this.isValid()?this.toISOString():null},g.toISOString=function(){return this.$d.toISOString()},g.toString=function(){return this.$d.toUTCString()},$}(),x=k.prototype;return j.prototype=x,[["$ms",r],["$s",s],["$m",i],["$H",a],["$W",o],["$M",c],["$y",l],["$D",d]].forEach((function(t){x[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),j.extend=function(t,e){return t.$i||(t(e,k,j),t.$i=!0),j},j.locale=D,j.isDayjs=b,j.unix=function(t){return j(1e3*t)},j.en=v[M],j.Ls=v,j.p={},j}()}}]);
//# sourceMappingURL=161.d4d692c4.chunk.js.map