"use strict";exports.id=7158,exports.ids=[7158],exports.modules={2612:(e,r,t)=>{t.d(r,{A:()=>l});var a=t(60687),s=t(85814),i=t.n(s);t(43210);let n={primary:`
    bg-gray-900 text-white border border-gray-900
    hover:bg-gray-700 hover:border-gray-700
    focus:ring-2 focus:ring-gray-900 focus:ring-offset-2
    transition-all duration-250 ease-standard
    hover:-translate-y-0.5
  `,secondary:`
    bg-white text-gray-900 border border-gray-200
    hover:bg-gray-50 hover:border-gray-300
    focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
    transition-all duration-250 ease-standard
  `,ghost:`
    bg-transparent text-gray-600 border border-transparent
    hover:bg-gray-50 hover:text-gray-900
    focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
    transition-all duration-250 ease-standard
  `,emerald:`
    bg-white text-emerald-700 border border-emerald-600
    hover:bg-emerald-600 hover:text-white hover:border-emerald-600
    focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2
    transition-all duration-250 ease-standard
    relative overflow-hidden
    before:absolute before:inset-0 before:bg-emerald-600 
    before:scale-x-0 before:origin-left before:transition-transform before:duration-250
    hover:before:scale-x-100 before:z-[-1]
  `,crimson:`
    bg-white text-red-700 border border-red-600
    hover:bg-red-600 hover:text-white hover:border-red-600
    focus:ring-2 focus:ring-red-600 focus:ring-offset-2
    transition-all duration-250 ease-standard
    relative overflow-hidden
    before:absolute before:inset-0 before:bg-red-600 
    before:scale-x-0 before:origin-left before:transition-transform before:duration-250
    hover:before:scale-x-100 before:z-[-1]
  `},o={sm:"px-4 py-2 text-sm font-medium",md:"px-6 py-2.5 text-sm font-medium",lg:"px-8 py-3 text-base font-medium"};function l({href:e,variant:r="primary",size:t="md",children:s,className:l="",loading:d=!1,disabled:c=!1,leftIcon:x,rightIcon:h,...m}){let g=`
    inline-flex items-center justify-center gap-2
    rounded-sm font-medium
    focus:outline-none
    disabled:opacity-50 disabled:cursor-not-allowed
    disabled:transform-none
    relative z-10
  `,f=`${g} ${n[r]} ${o[t]} ${l}`,u=(0,a.jsxs)(a.Fragment,{children:[d&&(0,a.jsxs)("svg",{className:"animate-spin h-4 w-4",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","aria-hidden":"true",children:[(0,a.jsx)("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"2"}),(0,a.jsx)("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}),!d&&x&&(0,a.jsx)("span",{className:"flex-shrink-0 transition-transform duration-250 group-hover:scale-110","aria-hidden":"true",children:x}),(0,a.jsx)("span",{className:"relative z-10",children:s}),!d&&h&&(0,a.jsx)("span",{className:"flex-shrink-0 transition-transform duration-250 group-hover:translate-x-0.5","aria-hidden":"true",children:h})]});return e?(0,a.jsx)(i(),{href:e,className:`${f} group`,"aria-disabled":c||d,tabIndex:c||d?-1:void 0,children:u}):(0,a.jsx)("button",{className:`${f} group`,disabled:c||d,"aria-disabled":c||d,...m,children:u})}},6374:(e,r,t)=>{t.d(r,{default:()=>o});var a=t(60687),s=t(23494),i=t(2612),n=t(87879);function o(){let{dir:e,isLoading:r}=(0,n.c)(),t=(0,n.P)("ctaBanner");return r?(0,a.jsx)("section",{className:"section bg-gray-50 relative overflow-hidden",children:(0,a.jsxs)("div",{className:"container mx-auto text-center py-24",children:[(0,a.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"}),(0,a.jsx)("p",{className:"mt-4 text-gray-600",children:"Loading..."})]})}):(0,a.jsxs)("section",{className:"section bg-gray-50 relative overflow-hidden",dir:e,children:[(0,a.jsx)("div",{className:"absolute inset-0 opacity-[0.02]",children:(0,a.jsx)("div",{className:"w-full h-full",style:{backgroundImage:`
              linear-gradient(rgba(0,0,0,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.3) 1px, transparent 1px)
            `,backgroundSize:"64px 64px"}})}),(0,a.jsx)("div",{className:`absolute top-16 w-32 h-32 ${"rtl"===e?"right-16":"left-16"}`,children:(0,a.jsx)("div",{className:`crescent ${"rtl"===e?"crescent-right":"crescent-left"} crescent-subtle text-gray-900`})}),(0,a.jsx)("div",{className:`absolute bottom-16 w-20 h-20 ${"rtl"===e?"left-16":"right-16"}`,children:(0,a.jsx)("div",{className:`crescent ${"rtl"===e?"crescent-left":"crescent-right"} crescent-subtle text-gray-600`})}),(0,a.jsx)("div",{className:"container mx-auto",children:(0,a.jsxs)(s.P.div,{initial:{opacity:0,y:32},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.8,ease:[.4,0,.2,1]},className:"max-w-4xl mx-auto text-center",children:[(0,a.jsxs)("div",{className:"flex items-center justify-center gap-3 mb-8",children:[(0,a.jsx)("div",{className:"w-8 h-0.5 bg-gray-900"}),(0,a.jsx)("span",{className:"text-overline",children:t("eyebrow")}),(0,a.jsx)("div",{className:"w-8 h-0.5 bg-gray-900"})]}),(0,a.jsxs)(s.P.h2,{initial:{opacity:0,y:16},whileInView:{opacity:1,y:0},transition:{duration:.6,delay:.2},viewport:{once:!0},className:"text-headline text-gray-900 mb-6",children:[t("title"),(0,a.jsx)("br",{}),(0,a.jsx)("span",{className:"text-gray-600",children:t("titleAccent")})]}),(0,a.jsx)(s.P.p,{initial:{opacity:0,y:16},whileInView:{opacity:1,y:0},transition:{duration:.6,delay:.3},viewport:{once:!0},className:"text-body text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed",children:t("description")}),(0,a.jsxs)(s.P.div,{initial:{opacity:0,y:16},whileInView:{opacity:1,y:0},transition:{duration:.6,delay:.4},viewport:{once:!0},className:"flex flex-col sm:flex-row gap-4 justify-center mb-16",children:[(0,a.jsx)(i.A,{href:"/contact",variant:"primary",size:"lg",rightIcon:(0,a.jsx)("svg",{className:"h-4 w-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"rtl"===e?"M11 17l-5-5m0 0l5-5m-5 5h12":"M13 7l5 5m0 0l-5 5m5-5H6"})}),children:t("startYourProject")}),(0,a.jsx)(i.A,{href:"/services",variant:"secondary",size:"lg",leftIcon:(0,a.jsx)("svg",{className:"h-4 w-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"})}),children:t("viewServices")})]}),(0,a.jsx)(s.P.div,{initial:{opacity:0,y:16},whileInView:{opacity:1,y:0},transition:{duration:.6,delay:.6},viewport:{once:!0},className:"grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 border-t border-gray-200",children:[{icon:(0,a.jsx)("svg",{className:"h-5 w-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"})}),title:t("callUs.title"),description:t("callUs.description"),value:t("callUs.value"),href:`tel:${t("callUs.value").replace(/\s/g,"")}`},{icon:(0,a.jsx)("svg",{className:"h-5 w-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"})}),title:t("responseTime.title"),description:t("responseTime.description"),value:t("responseTime.value"),href:null}].map((r,t)=>(0,a.jsxs)(s.P.div,{initial:{opacity:0,y:16},whileInView:{opacity:1,y:0},transition:{duration:.5,delay:.8+.1*t},viewport:{once:!0},className:"text-center",children:[(0,a.jsx)("div",{className:"w-12 h-12 bg-white border border-gray-200 rounded-sm mx-auto mb-4 flex items-center justify-center",children:r.icon}),(0,a.jsx)("h4",{className:"font-medium text-gray-900 mb-2",children:r.title}),(0,a.jsx)("p",{className:"text-caption text-gray-500 mb-2",children:r.description}),r.href?(0,a.jsx)("a",{href:r.href,className:"text-body text-gray-700 hover:text-gray-900 transition-colors break-words",dir:r.href.startsWith("mailto:")?"ltr":e,children:r.value}):(0,a.jsx)("span",{className:"text-body text-gray-700",children:r.value})]},r.title))})]})})]})}},48308:(e,r,t)=>{t.d(r,{A:()=>n});var a=t(60687),s=t(23494);t(43210);var i=t(87879);let n=({title:e,subtitle:r,eyebrow:t,className:n="",centered:o=!0,animated:l=!0})=>{let{dir:d}=(0,i.c)(),c={hidden:{opacity:0,y:16},visible:{opacity:1,y:0,transition:{duration:.5,ease:[.4,0,.2,1]}}},x=(0,a.jsxs)(a.Fragment,{children:[t&&(0,a.jsxs)(s.P.div,{variants:l?c:{},className:`
            flex items-center gap-3 mb-6
            ${o?"justify-center":"rtl"===d?"justify-end":"justify-start"}
          `,children:[(0,a.jsx)("div",{className:"w-8 h-0.5 bg-gray-900"}),(0,a.jsx)("span",{className:"text-overline",children:t}),(0,a.jsx)("div",{className:"w-8 h-0.5 bg-gray-900"})]}),(0,a.jsx)(s.P.h2,{variants:l?c:{},className:"text-headline text-gray-900 mb-6",children:e}),r&&(0,a.jsx)(s.P.p,{variants:l?c:{},className:`
            text-body text-gray-600 leading-relaxed max-w-2xl
            ${o?"mx-auto":""}
          `,children:r})]});return l?(0,a.jsx)(s.P.div,{variants:{hidden:{opacity:0,y:24},visible:{opacity:1,y:0,transition:{duration:.6,ease:[.4,0,.2,1],staggerChildren:.15}}},initial:"hidden",whileInView:"visible",viewport:{once:!0,amount:.3},className:`
          ${o?"text-center":"rtl"===d?"text-right":"text-left"} 
          ${n}
        `,dir:d,children:x}):(0,a.jsx)("div",{className:`
        ${o?"text-center":"rtl"===d?"text-right":"text-left"} 
        ${n}
      `,dir:d,children:x})}},78020:(e,r,t)=>{t.d(r,{default:()=>a});let a=(0,t(12907).registerClientReference)(function(){throw Error("Attempted to call the default export of \"/Users/hilalahamd/MyRestProjects/Paksoft/projecct3/src/components/CtaBanner.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/Users/hilalahamd/MyRestProjects/Paksoft/projecct3/src/components/CtaBanner.tsx","default")}};