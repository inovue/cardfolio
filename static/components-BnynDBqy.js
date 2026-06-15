import{_ as e,c as t,d as n,f as r,g as i,h as a,l as o,m as s,n as c,p as l,s as u,t as d,u as f}from"./client-BiwiRRtP.js";var p=n(null),m=0,h=async({children:t,fallback:n})=>{Array.isArray(t)||(t=[t]);let o=r(p)?.scriptNonce,c=[],l={[s]:[0,[]]},d=e=>(u.pop(),e);try{l[s][0]=0,u.push([[],l]),c=t.map(e=>e==null||typeof e==`boolean`?``:e.toString())}catch(e){if(e instanceof Promise)c=[e.then(()=>(l[s][0]=0,u.push([[],l]),_(t).then(d)))];else throw e}finally{d()}if(c.some(e=>e instanceof Promise)){let t=m++,r=await n.toString();return i(`<template id="H:${t}"></template>${r}<!--/$-->`,[...r.callbacks||[],({phase:n,buffer:r,context:s})=>{if(n!==a.BeforeStream)return Promise.all(c).then(async c=>{c=c.flat();let l=c.join(``);r&&(r[0]=r[0].replace(RegExp(`<template id="H:${t}"></template>.*?<!--/\\$-->`),l));let u=r?``:`<template data-hono-target="H:${t}">${l}</template><script${o?` nonce="${o}"`:``}>
((d,c,n) => {
c=d.currentScript.previousSibling
d=d.getElementById('H:${t}')
if(!d)return
do{n=d.nextSibling;n.remove()}while(n.nodeType!=8||n.nodeValue!='/$')
d.replaceWith(c.content)
})(document)
<\/script>`,d=c.map(e=>e.callbacks||[]).flat();return d.length?(n===a.Stream&&(u=await e(u,a.BeforeStream,!0,s)),i(u,d)):u})}])}else return i(c.join(``))};h[l]=c,new TextEncoder;var g=0,_=async e=>{try{return e.flat().map(e=>e==null||typeof e==`boolean`?``:e.toString())}catch(t){if(t instanceof Promise)return await t,_(e);throw t}},v=e=>{if(e==null||typeof e==`boolean`)return``;if(typeof e==`string`)return e;{let t=e.toString();return t instanceof Promise?t:i(t)}},y=async({children:n,fallback:s,fallbackRender:c,onError:l})=>{if(!n)return i(``);Array.isArray(n)||(n=[n]);let u=r(p)?.scriptNonce,d,f=async()=>{let e=await s;typeof e==`string`?d=e:(d=await e?.toString(),typeof d==`string`&&(d=i(d)))},m=e=>(l?.(e),d||c&&o(t,{},c(e))||``),h=[];try{h=n.map(v)}catch(e){await f(),h=e instanceof Promise?[e.then(()=>_(n)).catch(e=>m(e))]:[m(e)]}if(h.some(e=>e instanceof Promise)){await f();let n=g++,r=RegExp(`(<template id="E:${n}"></template>.*?)(.*?)(<!--E:${n}-->)`),o=async({error:e,buffer:i})=>{let a=await t({children:m(e)}).toString();return i&&(i[0]=i[0].replace(r,a)),i?``:`<template data-hono-target="E:${n}">${a}</template><script>
((d,c,n) => {
c=d.currentScript.previousSibling
d=d.getElementById('E:${n}')
if(!d)return
do{n=d.nextSibling;n.remove()}while(n.nodeType!=8||n.nodeValue!='E:${n}')
d.replaceWith(c.content)
})(document)
<\/script>`},s,c=Promise.all(h).catch(e=>s=e);return i(`<template id="E:${n}"></template><!--E:${n}-->`,[({phase:t,buffer:l,context:d})=>{if(t!==a.BeforeStream)return c.then(async c=>{if(s)throw s;c=c.flat();let f=c.join(``),p=l?``:`<template data-hono-target="E:${n}">${f}</template><script${u?` nonce="${u}"`:``}>
((d,c) => {
c=d.currentScript.previousSibling
d=d.getElementById('E:${n}')
if(!d)return
d.parentElement.insertBefore(c.content,d.nextSibling)
})(document)
<\/script>`;if(c.every(e=>!e.callbacks?.length))return l&&(l[0]=l[0].replace(r,f)),p;l&&(l[0]=l[0].replace(r,(e,t,n,r)=>`${t}${f}${r}`));let m=c.map(e=>e.callbacks||[]).flat();t===a.Stream&&(p=await e(p,a.BeforeStream,!0,d));let h=0,g=m.map(e=>(...t)=>e(...t)?.then(e=>(h++,l?(h===m.length&&(l[0]=l[0].replace(r,(e,t,n)=>n)),l[0]+=e,i(``,e.callbacks)):i(e+(h===m.length?`<script>
((d,c,n) => {
d=d.getElementById('E:${n}')
if(!d)return
n=d.nextSibling
while(n.nodeType!=8||n.nodeValue!='E:${n}'){n=n.nextSibling}
n.remove()
d.remove()
})(document)
<\/script>`:``),e.callbacks))).catch(e=>o({error:e,buffer:l})));return i(p,g)}).catch(e=>o({error:e,buffer:l}))}])}else return t({children:h})};y[l]=d;function b(e,t,n){let r;if(!t||!(`children`in t))r=f(e,t,[]);else{let n=t.children;r=Array.isArray(n)?f(e,t,n):f(e,t,[n])}return r.key=n,r}var x=Symbol(),S=Symbol();n({[x]:!1,[S]:!1});export{b as t};