(self.webpackChunkpersonal_site=self.webpackChunkpersonal_site||[]).push([[161],{7161:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return h}});n(2791);var r=n(1087),s=n(6842),i=n(7892),a=n.n(i),u=n(184),c=function(t){var e=t.data;return(0,u.jsx)("div",{className:"cell-container",children:(0,u.jsxs)("article",{className:"mini-post",children:[(0,u.jsxs)("header",{children:[(0,u.jsx)("h3",{children:(0,u.jsx)("a",{href:e.link,children:e.title})}),(0,u.jsx)("time",{className:"published",children:a()(e.date).format("MMMM, YYYY")})]}),(0,u.jsx)("a",{href:e.link,className:"image",children:(0,u.jsx)("img",{src:"".concat("").concat(e.image),alt:e.title})}),(0,u.jsx)("div",{className:"description",children:(0,u.jsx)("p",{children:e.desc})})]})})},o=[{title:"ASK GPT about images",link:"https://chromewebstore.google.com/detail/ask-gpt-about-images/mkhhfmknhcmoehogomnfhjmfdholkapo?hl=en",subtitle:"Chrome plugin",image:"/images/projects/gptdialog.png",date:"2023-12-18",desc:"A simple dialog to help you reach to ChatGPT and ask any questions. This is a GPT plugin for user to ask any questions related to images when they are browsing web pages."}],h=function(){return(0,u.jsx)(s.Z,{title:"Projects",description:"Learn about Ke Xiao's projects.",children:(0,u.jsxs)("article",{className:"post",id:"projects",children:[(0,u.jsx)("header",{children:(0,u.jsxs)("div",{className:"title",children:[(0,u.jsx)("h2",{children:(0,u.jsx)(r.rU,{to:"/projects",children:"Projects"})}),(0,u.jsx)("p",{children:"A selection of projects that I'm not too ashamed of"})]})}),o.map((function(t){return(0,u.jsx)(c,{data:t},t.title)}))]})})}},7892:function(t){t.exports=function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",s="second",i="minute",a="hour",u="day",c="week",o="month",h="quarter",f="year",l="date",d="Invalid Date",$=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,m=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,p={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},g=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},M={s:g,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),s=n%60;return(e<=0?"+":"-")+g(r,2,"0")+":"+g(s,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),s=e.clone().add(r,o),i=n-s<0,a=e.clone().add(r+(i?-1:1),o);return+(-(r+(n-s)/(i?s-a:a-s))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:o,y:f,w:c,d:u,D:l,h:a,m:i,s:s,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},v="en",y={};y[v]=p;var D="$isDayjsObject",w=function(t){return t instanceof k||!(!t||!t[D])},S=function t(e,n,r){var s;if(!e)return v;if("string"==typeof e){var i=e.toLowerCase();y[i]&&(s=i),n&&(y[i]=n,s=i);var a=e.split("-");if(!s&&a.length>1)return t(a[0])}else{var u=e.name;y[u]=e,s=u}return!r&&s&&(v=s),s||!r&&v},j=function(t,e){if(w(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new k(n)},b=M;b.l=S,b.i=w,b.w=function(t,e){return j(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var k=function(){function p(t){this.$L=S(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[D]=!0}var g=p.prototype;return g.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(b.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match($);if(r){var s=r[2]-1||0,i=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],s,r[3]||1,r[4]||0,r[5]||0,r[6]||0,i)):new Date(r[1],s,r[3]||1,r[4]||0,r[5]||0,r[6]||0,i)}}return new Date(e)}(t),this.init()},g.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},g.$utils=function(){return b},g.isValid=function(){return!(this.$d.toString()===d)},g.isSame=function(t,e){var n=j(t);return this.startOf(e)<=n&&n<=this.endOf(e)},g.isAfter=function(t,e){return j(t)<this.startOf(e)},g.isBefore=function(t,e){return this.endOf(e)<j(t)},g.$g=function(t,e,n){return b.u(t)?this[e]:this.set(n,t)},g.unix=function(){return Math.floor(this.valueOf()/1e3)},g.valueOf=function(){return this.$d.getTime()},g.startOf=function(t,e){var n=this,r=!!b.u(e)||e,h=b.p(t),d=function(t,e){var s=b.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?s:s.endOf(u)},$=function(t,e){return b.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},m=this.$W,p=this.$M,g=this.$D,M="set"+(this.$u?"UTC":"");switch(h){case f:return r?d(1,0):d(31,11);case o:return r?d(1,p):d(0,p+1);case c:var v=this.$locale().weekStart||0,y=(m<v?m+7:m)-v;return d(r?g-y:g+(6-y),p);case u:case l:return $(M+"Hours",0);case a:return $(M+"Minutes",1);case i:return $(M+"Seconds",2);case s:return $(M+"Milliseconds",3);default:return this.clone()}},g.endOf=function(t){return this.startOf(t,!1)},g.$set=function(t,e){var n,c=b.p(t),h="set"+(this.$u?"UTC":""),d=(n={},n[u]=h+"Date",n[l]=h+"Date",n[o]=h+"Month",n[f]=h+"FullYear",n[a]=h+"Hours",n[i]=h+"Minutes",n[s]=h+"Seconds",n[r]=h+"Milliseconds",n)[c],$=c===u?this.$D+(e-this.$W):e;if(c===o||c===f){var m=this.clone().set(l,1);m.$d[d]($),m.init(),this.$d=m.set(l,Math.min(this.$D,m.daysInMonth())).$d}else d&&this.$d[d]($);return this.init(),this},g.set=function(t,e){return this.clone().$set(t,e)},g.get=function(t){return this[b.p(t)]()},g.add=function(r,h){var l,d=this;r=Number(r);var $=b.p(h),m=function(t){var e=j(d);return b.w(e.date(e.date()+Math.round(t*r)),d)};if($===o)return this.set(o,this.$M+r);if($===f)return this.set(f,this.$y+r);if($===u)return m(1);if($===c)return m(7);var p=(l={},l[i]=e,l[a]=n,l[s]=t,l)[$]||1,g=this.$d.getTime()+r*p;return b.w(g,this)},g.subtract=function(t,e){return this.add(-1*t,e)},g.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||d;var r=t||"YYYY-MM-DDTHH:mm:ssZ",s=b.z(this),i=this.$H,a=this.$m,u=this.$M,c=n.weekdays,o=n.months,h=n.meridiem,f=function(t,n,s,i){return t&&(t[n]||t(e,r))||s[n].slice(0,i)},l=function(t){return b.s(i%12||12,t,"0")},$=h||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r};return r.replace(m,(function(t,r){return r||function(t){switch(t){case"YY":return String(e.$y).slice(-2);case"YYYY":return b.s(e.$y,4,"0");case"M":return u+1;case"MM":return b.s(u+1,2,"0");case"MMM":return f(n.monthsShort,u,o,3);case"MMMM":return f(o,u);case"D":return e.$D;case"DD":return b.s(e.$D,2,"0");case"d":return String(e.$W);case"dd":return f(n.weekdaysMin,e.$W,c,2);case"ddd":return f(n.weekdaysShort,e.$W,c,3);case"dddd":return c[e.$W];case"H":return String(i);case"HH":return b.s(i,2,"0");case"h":return l(1);case"hh":return l(2);case"a":return $(i,a,!0);case"A":return $(i,a,!1);case"m":return String(a);case"mm":return b.s(a,2,"0");case"s":return String(e.$s);case"ss":return b.s(e.$s,2,"0");case"SSS":return b.s(e.$ms,3,"0");case"Z":return s}return null}(t)||s.replace(":","")}))},g.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},g.diff=function(r,l,d){var $,m=this,p=b.p(l),g=j(r),M=(g.utcOffset()-this.utcOffset())*e,v=this-g,y=function(){return b.m(m,g)};switch(p){case f:$=y()/12;break;case o:$=y();break;case h:$=y()/3;break;case c:$=(v-M)/6048e5;break;case u:$=(v-M)/864e5;break;case a:$=v/n;break;case i:$=v/e;break;case s:$=v/t;break;default:$=v}return d?$:b.a($)},g.daysInMonth=function(){return this.endOf(o).$D},g.$locale=function(){return y[this.$L]},g.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},g.clone=function(){return b.w(this.$d,this)},g.toDate=function(){return new Date(this.valueOf())},g.toJSON=function(){return this.isValid()?this.toISOString():null},g.toISOString=function(){return this.$d.toISOString()},g.toString=function(){return this.$d.toUTCString()},p}(),x=k.prototype;return j.prototype=x,[["$ms",r],["$s",s],["$m",i],["$H",a],["$W",u],["$M",o],["$y",f],["$D",l]].forEach((function(t){x[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),j.extend=function(t,e){return t.$i||(t(e,k,j),t.$i=!0),j},j.locale=S,j.isDayjs=w,j.unix=function(t){return j(1e3*t)},j.en=y[v],j.Ls=y,j.p={},j}()}}]);
//# sourceMappingURL=161.f410fcf5.chunk.js.map