import{g as U,j as V,k as D,b as E}from"./index-033eef9b.js";import{u as m}from"./settings-a6d8757d.js";import{d as R,r as T,$ as j,f as z,H as l,I,U as u,S as c,N as t,c as f,J as M,a3 as G,R as r,a4 as H,M as J,F as K,l as y}from"./vue-130c210a.js";import{E as p,U as P,F as q,S as A,an as L}from"./naiveUI-73f3483e.js";import"./lodash-ebbf6458.js";import"./ionicons5-e0fe5729.js";const O=["textContent"],Q=R({__name:"index",setup(W){const{message:o}=D(),{getSettingsFile:v,saveSettingsFile:k,getSettingsToml:_,setContent:g,testNotify:x}=m(),n=T(!1),{treeData:C,content:s}=j(m());z(async()=>{await _()});let i="";const S=async e=>{await v("ptools.toml"),n.value=e,e?i=`${s.value}`:s.value!==i&&await g(i)},h=async()=>{await k("ptools.toml"),n.value=!1,await _()},w=e=>e.name,N=e=>({onDblclick:async a=>{o==null||o.info(e)}}),F=[{type:"selection",multiple:!1},{title:"配置项名称",key:"name"},{title:"值",key:"value",ellipsis:{tooltip:!0},render(e){switch(typeof e.value){case"boolean":return y(P,{size:"small",round:!1,value:e.value,"rail-style":V,"onUpdate:value":async a=>{o==null||o.info(`${e.name} 当前状态为：${a?"关闭":"开启"}`)}},{checked:()=>e.value,unchecked:()=>e.value,"checked-icon":()=>"✅","unchecked-icon":()=>y(U,{icon:"CloseSharp",color:"red",size:16})});default:return e.value}}}];return(e,a)=>{const $=q,b=A,B=L;return l(),I(K,null,[u($,{justify:"end"},{default:c(()=>[u(t(p),{type:"primary",secondaryc:"",onClick:t(x)},{default:c(()=>[f(" 通知测试 ")]),_:1},8,["onClick"]),u(t(p),{type:t(n)?"warning":"primary",onClick:a[0]||(a[0]=d=>S(!t(n)))},{default:c(()=>[M("span",{textContent:G(t(n)?"取消":"编辑")},null,8,O)]),_:1},8,["type"]),t(n)?(l(),r(t(p),{key:0,type:"success",onClick:h},{default:c(()=>[f(" 保存 ")]),_:1})):H("",!0)]),_:1}),t(n)?(l(),r(b,{key:0,value:t(s),"onUpdate:value":a[1]||(a[1]=d=>J(s)?s.value=d:null),class:"code mt-2",type:"textarea",placeholder:""},null,8,["value"])):(l(),r(B,{key:1,columns:F,data:t(C).children,"row-key":w,"row-props":N,"default-expand-all":""},null,8,["data"]))],64)}}});const ae=E(Q,[["__scopeId","data-v-ec904d16"]]);export{ae as default};