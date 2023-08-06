import{r as p}from"./index-e03f90b5.js";import"./_commonjsHelpers-725317a4.js";var v={exports:{}},x={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var J=p,W=Symbol.for("react.element"),Y=Symbol.for("react.fragment"),Z=Object.prototype.hasOwnProperty,G=J.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,H={key:!0,ref:!0,__self:!0,__source:!0};function A(t,e,n){var a,r={},o=null,i=null;n!==void 0&&(o=""+n),e.key!==void 0&&(o=""+e.key),e.ref!==void 0&&(i=e.ref);for(a in e)Z.call(e,a)&&!H.hasOwnProperty(a)&&(r[a]=e[a]);if(t&&t.defaultProps)for(a in e=t.defaultProps,e)r[a]===void 0&&(r[a]=e[a]);return{$$typeof:W,type:t,key:o,ref:i,props:r,_owner:G.current}}x.Fragment=Y;x.jsx=A;x.jsxs=A;v.exports=x;var Q=v.exports;const z=/^(?:-)?0+(\.0+)?$/,I=(t,e,n,a)=>{let r=e;return typeof n=="number"&&e<n&&(r=t),typeof a=="number"&&e>a&&(r=t),r},R=(t,e)=>{let n=t;return e==="Backspace"?n=t.slice(0,-1):isNaN(Number(e))||(n=`${t}${e}`),n},X=(t,e,n,a)=>{let r=t;if(n){const o=t.includes("-"),i=t.replace(/[,.-]/g,"").replace(/^0+/,""),u=a||1,l=u+1;r=R(i,e),r.length<l&&(r=r.padStart(l,"0")),r=r.slice(0,-u)+"."+r.slice(-u),o&&(r=`-${r}`),z.test(r)&&(r=r.replace("-",""))}else r=R(t,e),(r===""||r==="-")&&(r="0");return r},ee=(t,e,n,a)=>e?new Intl.NumberFormat(a,{style:"decimal",maximumFractionDigits:n||1,minimumFractionDigits:n||1}).format(parseFloat(t)):t,te=t=>{let e=t;return z.test(t)||t.includes("-")?e=t.replace("-",""):e=`-${t}`,e},V=(t,e)=>{let n=t;if(t.includes(".")){const a=t.split(".");n=`${a[0]}.${a[1].slice(0,e||1).padEnd(e||1,"0")}`}else if(t.includes(",")){const a=t.split(",");n=`${a[0]},${a[1].slice(0,e||1).padEnd(e||1,"0")}`}else n=`${t}.${"0".repeat(e||1)}`;return n},b=({defaultValue:t,allowDecimal:e,decimalDigit:n,max:a,min:r,inputStyle:o,locales:i,onChange:u})=>{const[l,D]=p.useState((t==null?void 0:t.toString())||"0"),c=p.useRef(null),K=()=>{c.current&&(c.current.focus(),c.current.setSelectionRange(c.current.value.length,c.current.value.length))};p.useEffect(()=>{K(),e&&D(V(l,n))},[]),p.useEffect(()=>{e&&D(V(l,n))},[e,n]);const B=m=>{const{key:_}=m,w=l;let s=l;l.trim()===""&&(s="0"),_===" "?m.preventDefault():_==="-"?(s=te(l),s=I(parseFloat(w),parseFloat(s),r,a).toString()):(s=X(s,_,e,n),s=I(parseFloat(w),parseFloat(s),r,a).toString()),D(s)};return p.useEffect(()=>{u&&u(e?parseFloat(l):parseInt(l))},[l]),Q.jsx("input",{ref:c,type:"text",value:ee(l,e,n,i),onChange:m=>m.preventDefault(),onKeyDown:B,style:{textAlign:"right",...o}})};try{b.displayName="NumberInput",b.__docgenInfo={description:"",displayName:"NumberInput",props:{defaultValue:{defaultValue:null,description:"Initial value for input. Default=0",name:"defaultValue",required:!1,type:{name:"number"}},allowDecimal:{defaultValue:null,description:"Allow decimal input. Default=false",name:"allowDecimal",required:!1,type:{name:"boolean"}},decimalDigit:{defaultValue:null,description:"Decimal digit count for input. Default=1",name:"decimalDigit",required:!1,type:{name:"number"}},max:{defaultValue:null,description:"Maximum limit for input.",name:"max",required:!1,type:{name:"number"}},min:{defaultValue:null,description:"Minimum limit for input.",name:"min",required:!1,type:{name:"number"}},inputStyle:{defaultValue:null,description:"CSS properties for input.",name:"inputStyle",required:!1,type:{name:"CSSProperties"}},locales:{defaultValue:null,description:'Locale settings for different countries. Default="en-US"',name:"locales",required:!1,type:{name:"string | string[]"}},onChange:{defaultValue:null,description:"Trigger when input value changed and return current value.",name:"onChange",required:!1,type:{name:"((value: number) => void)"}}}}}catch{}const ae={title:"Number Input",component:b,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{allowDecimal:{defaultValue:!1},decimalDigit:{defaultValue:1},defaultValue:{defaultValue:0},locales:{defaultValue:"en-US"}},args:{allowDecimal:!1,decimalDigit:1,defaultValue:0,locales:"en-US"}},f={args:{allowDecimal:!1}},d={name:"Decimal Input",args:{allowDecimal:!0,decimalDigit:2}},g={name:"Range Limit",args:{allowDecimal:!1,max:50,min:-50,defaultValue:0}},y={name:"Different Locale",args:{allowDecimal:!0,decimalDigit:2,defaultValue:123.45,locales:"tr-TR"}},S={name:"Custom Style",args:{allowDecimal:!1,defaultValue:12345,inputStyle:{fontSize:18,padding:"8px 16px",borderRadius:"4px",border:"1px solid #000",backgroundColor:"lightgray"}}};var C,h,E;f.parameters={...f.parameters,docs:{...(C=f.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    allowDecimal: false
  }
}`,...(E=(h=f.parameters)==null?void 0:h.docs)==null?void 0:E.source}}};var N,$,F;d.parameters={...d.parameters,docs:{...(N=d.parameters)==null?void 0:N.docs,source:{originalSource:`{
  name: "Decimal Input",
  args: {
    allowDecimal: true,
    decimalDigit: 2
  }
}`,...(F=($=d.parameters)==null?void 0:$.docs)==null?void 0:F.source}}};var L,O,q;g.parameters={...g.parameters,docs:{...(L=g.parameters)==null?void 0:L.docs,source:{originalSource:`{
  name: "Range Limit",
  args: {
    allowDecimal: false,
    max: 50,
    min: -50,
    defaultValue: 0
  }
}`,...(q=(O=g.parameters)==null?void 0:O.docs)==null?void 0:q.source}}};var T,P,j;y.parameters={...y.parameters,docs:{...(T=y.parameters)==null?void 0:T.docs,source:{originalSource:`{
  name: "Different Locale",
  args: {
    allowDecimal: true,
    decimalDigit: 2,
    defaultValue: 123.45,
    locales: "tr-TR"
  }
}`,...(j=(P=y.parameters)==null?void 0:P.docs)==null?void 0:j.source}}};var k,M,U;S.parameters={...S.parameters,docs:{...(k=S.parameters)==null?void 0:k.docs,source:{originalSource:`{
  name: "Custom Style",
  args: {
    allowDecimal: false,
    defaultValue: 12345,
    inputStyle: {
      fontSize: 18,
      padding: "8px 16px",
      borderRadius: "4px",
      border: "1px solid #000",
      backgroundColor: "lightgray"
    }
  }
}`,...(U=(M=S.parameters)==null?void 0:M.docs)==null?void 0:U.source}}};const le=["Default","DecimalInput","MaxMin","DifferentLocale","CustomStyle"];export{S as CustomStyle,d as DecimalInput,f as Default,y as DifferentLocale,g as MaxMin,le as __namedExportsOrder,ae as default};
//# sourceMappingURL=NumberInput.stories-1d6f9fae.js.map
