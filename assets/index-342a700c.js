import{i as f,f as h}from"./index-3acd25b9.js";import{d as g,$ as w,r as x,f as b,I as k,R as v,S as o,U as s,O as e,c as y,K as i}from"./vue-723f4797.js";import{E as B,F as D,an as C,J as N}from"./naiveUI-7e00e3d3.js";import"./lodash-7fc59f31.js";import"./ionicons5-ebd6f9ad.js";const S=i("span",null,"下载器",-1),V={style:{height:"100%"}},I=g({__name:"index",setup(z){const{isMobile:l,isPad:L,isDesktop:M}=f(),t=h(),{getDownloaderList:_,editDownloader:d}=t,{downloaderList:r,columns:c}=w(t),n=x(!1);return b(async()=>{n.value=!0,await _(),n.value=!1}),(P,a)=>{const u=D,p=C,m=N;return k(),v(m,{hoverable:"",embedded:""},{header:o(()=>[s(u,{justify:"space-between"},{default:o(()=>[S,s(e(B),{type:"success",size:"small",onClick:a[0]||(a[0]=R=>e(d)(0))},{default:o(()=>[y(" 添加 ")]),_:1})]),_:1})]),default:o(()=>[i("div",V,[s(p,{columns:e(c),data:e(r),loading:e(n),"min-height":e(l)?520:680,bordered:"","flex-height":"","max-height":"720",size:"small",striped:""},null,8,["columns","data","loading","min-height"])])]),_:1})}}});export{I as default};