"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("middleware",{

/***/ "(middleware)/./middleware.ts":
/*!***********************!*\
  !*** ./middleware.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   middleware: () => (/* binding */ middleware)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(middleware)/./node_modules/.pnpm/next@15.5.6_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/esm/api/server.js\");\n\nfunction middleware(request) {\n    const pathname = request.nextUrl.pathname;\n    // 检查路径是否已经包含语言前缀\n    const pathnameHasLocale = /^\\/(en|zh)/.test(pathname);\n    // 如果是根路径，重定向到 /en\n    if (pathname === '/') {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.redirect(new URL('/en', request.url));\n    }\n    // 其他路径继续\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.next();\n}\nconst config = {\n    matcher: [\n        // 匹配所有路径除了 api, _next/static, _next/image, favicon.ico, img, animations\n        '/((?!api|_next/static|_next/image|favicon.ico|img|animations).*)'\n    ]\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4vbWlkZGxld2FyZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBMEM7QUFHbkMsU0FBU0MsV0FBV0MsT0FBb0I7SUFDN0MsTUFBTUMsV0FBV0QsUUFBUUUsT0FBTyxDQUFDRCxRQUFRO0lBRXpDLGlCQUFpQjtJQUNqQixNQUFNRSxvQkFBb0IsYUFBYUMsSUFBSSxDQUFDSDtJQUU1QyxrQkFBa0I7SUFDbEIsSUFBSUEsYUFBYSxLQUFLO1FBQ3BCLE9BQU9ILHFEQUFZQSxDQUFDTyxRQUFRLENBQUMsSUFBSUMsSUFBSSxPQUFPTixRQUFRTyxHQUFHO0lBQ3pEO0lBRUEsU0FBUztJQUNULE9BQU9ULHFEQUFZQSxDQUFDVSxJQUFJO0FBQzFCO0FBRU8sTUFBTUMsU0FBUztJQUNwQkMsU0FBUztRQUNQLHdFQUF3RTtRQUN4RTtLQUNEO0FBQ0gsRUFBQyIsInNvdXJjZXMiOlsiL1VzZXJzL2xlb24vRGVza3RvcC9waG9lbml4L3Bob2VuaXhfd2Vic2l0ZS9taWRkbGV3YXJlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJ1xyXG5pbXBvcnQgdHlwZSB7IE5leHRSZXF1ZXN0IH0gZnJvbSAnbmV4dC9zZXJ2ZXInXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWlkZGxld2FyZShyZXF1ZXN0OiBOZXh0UmVxdWVzdCkge1xyXG4gIGNvbnN0IHBhdGhuYW1lID0gcmVxdWVzdC5uZXh0VXJsLnBhdGhuYW1lXHJcbiAgXHJcbiAgLy8g5qOA5p+l6Lev5b6E5piv5ZCm5bey57uP5YyF5ZCr6K+t6KiA5YmN57yAXHJcbiAgY29uc3QgcGF0aG5hbWVIYXNMb2NhbGUgPSAvXlxcLyhlbnx6aCkvLnRlc3QocGF0aG5hbWUpXHJcbiAgXHJcbiAgLy8g5aaC5p6c5piv5qC56Lev5b6E77yM6YeN5a6a5ZCR5YiwIC9lblxyXG4gIGlmIChwYXRobmFtZSA9PT0gJy8nKSB7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLnJlZGlyZWN0KG5ldyBVUkwoJy9lbicsIHJlcXVlc3QudXJsKSlcclxuICB9XHJcbiAgXHJcbiAgLy8g5YW25LuW6Lev5b6E57un57utXHJcbiAgcmV0dXJuIE5leHRSZXNwb25zZS5uZXh0KClcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGNvbmZpZyA9IHtcclxuICBtYXRjaGVyOiBbXHJcbiAgICAvLyDljLnphY3miYDmnInot6/lvoTpmaTkuoYgYXBpLCBfbmV4dC9zdGF0aWMsIF9uZXh0L2ltYWdlLCBmYXZpY29uLmljbywgaW1nLCBhbmltYXRpb25zXHJcbiAgICAnLygoPyFhcGl8X25leHQvc3RhdGljfF9uZXh0L2ltYWdlfGZhdmljb24uaWNvfGltZ3xhbmltYXRpb25zKS4qKScsXHJcbiAgXSxcclxufVxyXG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwibWlkZGxld2FyZSIsInJlcXVlc3QiLCJwYXRobmFtZSIsIm5leHRVcmwiLCJwYXRobmFtZUhhc0xvY2FsZSIsInRlc3QiLCJyZWRpcmVjdCIsIlVSTCIsInVybCIsIm5leHQiLCJjb25maWciLCJtYXRjaGVyIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(middleware)/./middleware.ts\n");

/***/ })

});