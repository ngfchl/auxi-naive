import{H as N}from"./core-31953b3e.js";import{a as S,b as $,c as k,d as M}from"./tools-a23b3ee0.js";import{W as R,r as t,d as j,$ as E,f as F,H,I as q,U as g,S as v,N as a,M as B,c as I,F as T}from"./vue-75e8b9c9.js";import{Q as U,E as V,F as J,as as Q}from"./naiveUI-f01950d5.js";import{b as W}from"./index-eacde89c.js";import"./lodash-08e39b5f.js";import"./ionicons5-81a464f7.js";const z=R("logs",()=>{const s=t([]),l=t(),e=t("logs.log"),_=t(""),o=t(!1),c=t([{label:"请选择"}]),r=async()=>{s.value=await S(),s.value.forEach(n=>{c.value.push({label:n,value:n})})},u=async n=>{o.value=!0,_.value=await $(n),o.value=!1};return{names:s,content:l,currentLog:e,currentLogContent:_,logList:c,loading:o,getNames:r,getLogContent:u,downloadLog:async()=>{await k(e.value)},removeLog:async()=>{o.value=!0,await M(e.value)&&(await r(),e.value="logs.log",await u(e.value)),o.value=!1}}}),A=j({__name:"index",setup(s){const l=z(),{names:e,content:_,currentLog:o,logList:c,loading:r,currentLogContent:u}=E(l),{getNames:p,getLogContent:i,downloadLog:n,removeLog:f}=l;F(async()=>{await p(),await i(o.value)});const L=async d=>{d==="top"&&await i(o.value)},w=async()=>{await i(o.value)};return(d,m)=>{const x=U,h=V,y=J,C=Q;return H(),q(T,null,[g(y,{justify:"start",class:"px pt-5px mb-2px"},{default:v(()=>[g(x,{value:a(o),"onUpdate:value":[m[0]||(m[0]=b=>B(o)?o.value=b:null),w],options:a(c),style:{"min-width":"50vw"}},null,8,["value","options"]),g(h,{type:"error",onClick:a(f)},{default:v(()=>[I(" 删除 ")]),_:1},8,["onClick"])]),_:1}),g(C,{loading:a(r),log:a(u),rows:40,hljs:a(N),class:"px mt-2 code","line-height":2,onRequireMore:L},null,8,["loading","log","hljs"])],64)}}});const Z=W(A,[["__scopeId","data-v-5e2ec4ed"]]);export{Z as default};