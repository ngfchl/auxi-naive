import{k as g,l as S,m as v,d}from"./index-cc94fd6c.js";import{W as h,r as a}from"./vue-2fe8e408.js";const{message:e}=d(),T=async()=>await g("config/system"),m=async s=>await g("config/config",s),p=async s=>{const{msg:n,code:o}=await S("/config/notify/test",s);switch(o){case 0:return e==null||e.success("通知发送成功！"),!0;default:return e==null||e.error(n),!1}},F=async s=>{const{msg:n,code:o}=await v("config/config",s);switch(o){case 0:return e==null||e.success(n),!0;default:return e==null||e.error(n),!1}},N=h("settings",()=>{const s=a({name:"root",value:"Root",children:[]}),n=a(""),o=a({title:"NewPTools测试标题",message:"NewPTools测试消息，欢迎使用PTOOLS，玩得开心！"}),r=(t,i)=>{i.children.length=0;for(const c in t){const f={name:c,value:typeof t[c]=="object"?"":t[c],children:[]};i.children.push(f),typeof t[c]=="object"&&r(t[c],f)}},y=async()=>{const t=await T();r(t,s.value)},w=async()=>{await p(o.value)},l=async t=>{n.value=t},u=async t=>{await l(await m({name:t}))};return{getSettingsToml:y,getSettingsFile:u,saveSettingsFile:async t=>{await F({name:t,content:n.value})&&await u(t)},setContent:l,testNotify:w,testMessage:o,content:n,treeData:s}});export{N as u};
