module.exports = {

"[project]/src/app/[locale]/layout.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// src/app/[locale]/layout.tsx
__turbopack_context__.s({
    "default": (()=>LocaleLayout),
    "generateStaticParams": (()=>generateStaticParams)
});
async function LocaleLayout({ children }) {
    return children;
}
async function generateStaticParams() {
    return [
        {
            locale: 'en'
        },
        {
            locale: 'tr'
        },
        {
            locale: 'de'
        },
        {
            locale: 'ur'
        },
        {
            locale: 'ar'
        }
    ];
}
}}),

};

//# sourceMappingURL=src_app_%5Blocale%5D_layout_tsx_0ea4cb6a._.js.map