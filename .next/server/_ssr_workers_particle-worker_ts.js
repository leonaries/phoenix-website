/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "(ssr)/./workers/particle-worker.ts":
/*!************************************!*\
  !*** ./workers/particle-worker.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/**\r\n * Particle Update Worker\r\n *\r\n * 在独立线程中处理粒子位置更新，释放主线程用于渲染和UI交互\r\n *\r\n * 性能优势：\r\n * - 100,000 个粒子的计算从主线程移到 Worker 线程\r\n * - 使用 Transferable Objects 实现零拷贝数据传输\r\n * - 主线程可以专注于 Three.js 渲染\r\n */ // Worker 消息处理\nself.onmessage = (e)=>{\n    const { type, positions, velocities, count, config } = e.data;\n    if (type === 'update') {\n        // 更新每个粒子的位置\n        for(let i = 0; i < count; i++){\n            const i3 = i * 3;\n            // 更新位置（应用速度）\n            positions[i3] += velocities[i3]; // x\n            positions[i3 + 1] += velocities[i3 + 1]; // y\n            positions[i3 + 2] += velocities[i3 + 2]; // z\n            // 粒子超出观察者后，重置到远处\n            if (positions[i3 + 2] > 10) {\n                positions[i3] = (Math.random() - 0.5) * config.spread * 2;\n                positions[i3 + 1] = (Math.random() - 0.5) * config.spread * 2;\n                positions[i3 + 2] = -config.depth;\n                // 重新设置速度\n                velocities[i3] = (Math.random() - 0.5) * 0.02;\n                velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;\n                velocities[i3 + 2] = config.speedBase + Math.random() * config.speedVariation;\n            }\n        }\n        // 使用 Transferable Objects 返回结果（零拷贝）\n        const response = {\n            type: 'updated',\n            positions\n        };\n        self.postMessage(response, [\n            positions.buffer,\n            velocities.buffer\n        ]);\n    }\n};\n// 类型导出（供主线程使用）\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi93b3JrZXJzL3BhcnRpY2xlLXdvcmtlci50cyIsIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7OztDQVNDLEdBc0JELGNBQWM7QUFDZEEsS0FBS0MsU0FBUyxHQUFHLENBQUNDO0lBQ2hCLE1BQU0sRUFBRUMsSUFBSSxFQUFFQyxTQUFTLEVBQUVDLFVBQVUsRUFBRUMsS0FBSyxFQUFFQyxNQUFNLEVBQUUsR0FBR0wsRUFBRU0sSUFBSTtJQUU3RCxJQUFJTCxTQUFTLFVBQVU7UUFDckIsWUFBWTtRQUNaLElBQUssSUFBSU0sSUFBSSxHQUFHQSxJQUFJSCxPQUFPRyxJQUFLO1lBQzlCLE1BQU1DLEtBQUtELElBQUk7WUFFZixhQUFhO1lBQ2JMLFNBQVMsQ0FBQ00sR0FBRyxJQUFJTCxVQUFVLENBQUNLLEdBQUcsRUFBVSxJQUFJO1lBQzdDTixTQUFTLENBQUNNLEtBQUssRUFBRSxJQUFJTCxVQUFVLENBQUNLLEtBQUssRUFBRSxFQUFFLElBQUk7WUFDN0NOLFNBQVMsQ0FBQ00sS0FBSyxFQUFFLElBQUlMLFVBQVUsQ0FBQ0ssS0FBSyxFQUFFLEVBQUUsSUFBSTtZQUU3QyxpQkFBaUI7WUFDakIsSUFBSU4sU0FBUyxDQUFDTSxLQUFLLEVBQUUsR0FBRyxJQUFJO2dCQUMxQk4sU0FBUyxDQUFDTSxHQUFHLEdBQUcsQ0FBQ0MsS0FBS0MsTUFBTSxLQUFLLEdBQUUsSUFBS0wsT0FBT00sTUFBTSxHQUFHO2dCQUN4RFQsU0FBUyxDQUFDTSxLQUFLLEVBQUUsR0FBRyxDQUFDQyxLQUFLQyxNQUFNLEtBQUssR0FBRSxJQUFLTCxPQUFPTSxNQUFNLEdBQUc7Z0JBQzVEVCxTQUFTLENBQUNNLEtBQUssRUFBRSxHQUFHLENBQUNILE9BQU9PLEtBQUs7Z0JBRWpDLFNBQVM7Z0JBQ1RULFVBQVUsQ0FBQ0ssR0FBRyxHQUFHLENBQUNDLEtBQUtDLE1BQU0sS0FBSyxHQUFFLElBQUs7Z0JBQ3pDUCxVQUFVLENBQUNLLEtBQUssRUFBRSxHQUFHLENBQUNDLEtBQUtDLE1BQU0sS0FBSyxHQUFFLElBQUs7Z0JBQzdDUCxVQUFVLENBQUNLLEtBQUssRUFBRSxHQUFHSCxPQUFPUSxTQUFTLEdBQUdKLEtBQUtDLE1BQU0sS0FBS0wsT0FBT1MsY0FBYztZQUMvRTtRQUNGO1FBRUEsb0NBQW9DO1FBQ3BDLE1BQU1DLFdBQW1DO1lBQ3ZDZCxNQUFNO1lBQ05DO1FBQ0Y7UUFFQUosS0FBS2tCLFdBQVcsQ0FBQ0QsVUFBVTtZQUFDYixVQUFVZSxNQUFNO1lBQUVkLFdBQVdjLE1BQU07U0FBQztJQUNsRTtBQUNGO0FBRUEsZUFBZTtBQUNBIiwic291cmNlcyI6WyIvVXNlcnMvbGVvbi9EZXNrdG9wL3Bob2VuaXgvcGhvZW5peF93ZWJzaXRlL3dvcmtlcnMvcGFydGljbGUtd29ya2VyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBQYXJ0aWNsZSBVcGRhdGUgV29ya2VyXHJcbiAqXHJcbiAqIOWcqOeLrOeri+e6v+eoi+S4reWkhOeQhueykuWtkOS9jee9ruabtOaWsO+8jOmHiuaUvuS4u+e6v+eoi+eUqOS6jua4suafk+WSjFVJ5Lqk5LqSXHJcbiAqXHJcbiAqIOaAp+iDveS8mOWKv++8mlxyXG4gKiAtIDEwMCwwMDAg5Liq57KS5a2Q55qE6K6h566X5LuO5Li757q/56iL56e75YiwIFdvcmtlciDnur/nqItcclxuICogLSDkvb/nlKggVHJhbnNmZXJhYmxlIE9iamVjdHMg5a6e546w6Zu25ou36LSd5pWw5o2u5Lyg6L6TXHJcbiAqIC0g5Li757q/56iL5Y+v5Lul5LiT5rOo5LqOIFRocmVlLmpzIOa4suafk1xyXG4gKi9cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUGFydGljbGVDb25maWcge1xyXG4gIHNwcmVhZDogbnVtYmVyOyAgICAgIC8vIFgvWSDovbTliIbluIPojIPlm7RcclxuICBkZXB0aDogbnVtYmVyOyAgICAgICAvLyBaIOi9tOa3seW6puiMg+WbtFxyXG4gIHNwZWVkQmFzZTogbnVtYmVyOyAgIC8vIOWfuuehgOmAn+W6plxyXG4gIHNwZWVkVmFyaWF0aW9uOiBudW1iZXI7IC8vIOmAn+W6pumaj+acuuWPmOWMllxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFBhcnRpY2xlVXBkYXRlTWVzc2FnZSB7XHJcbiAgdHlwZTogJ3VwZGF0ZSc7XHJcbiAgcG9zaXRpb25zOiBGbG9hdDMyQXJyYXk7XHJcbiAgdmVsb2NpdGllczogRmxvYXQzMkFycmF5O1xyXG4gIGNvdW50OiBudW1iZXI7XHJcbiAgY29uZmlnOiBQYXJ0aWNsZUNvbmZpZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBQYXJ0aWNsZVVwZGF0ZVJlc3BvbnNlIHtcclxuICB0eXBlOiAndXBkYXRlZCc7XHJcbiAgcG9zaXRpb25zOiBGbG9hdDMyQXJyYXk7XHJcbn1cclxuXHJcbi8vIFdvcmtlciDmtojmga/lpITnkIZcclxuc2VsZi5vbm1lc3NhZ2UgPSAoZTogTWVzc2FnZUV2ZW50PFBhcnRpY2xlVXBkYXRlTWVzc2FnZT4pID0+IHtcclxuICBjb25zdCB7IHR5cGUsIHBvc2l0aW9ucywgdmVsb2NpdGllcywgY291bnQsIGNvbmZpZyB9ID0gZS5kYXRhO1xyXG5cclxuICBpZiAodHlwZSA9PT0gJ3VwZGF0ZScpIHtcclxuICAgIC8vIOabtOaWsOavj+S4queykuWtkOeahOS9jee9rlxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IGkzID0gaSAqIDM7XHJcblxyXG4gICAgICAvLyDmm7TmlrDkvY3nva7vvIjlupTnlKjpgJ/luqbvvIlcclxuICAgICAgcG9zaXRpb25zW2kzXSArPSB2ZWxvY2l0aWVzW2kzXTsgICAgICAgICAvLyB4XHJcbiAgICAgIHBvc2l0aW9uc1tpMyArIDFdICs9IHZlbG9jaXRpZXNbaTMgKyAxXTsgLy8geVxyXG4gICAgICBwb3NpdGlvbnNbaTMgKyAyXSArPSB2ZWxvY2l0aWVzW2kzICsgMl07IC8vIHpcclxuXHJcbiAgICAgIC8vIOeykuWtkOi2heWHuuinguWvn+iAheWQju+8jOmHjee9ruWIsOi/nOWkhFxyXG4gICAgICBpZiAocG9zaXRpb25zW2kzICsgMl0gPiAxMCkge1xyXG4gICAgICAgIHBvc2l0aW9uc1tpM10gPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiBjb25maWcuc3ByZWFkICogMjtcclxuICAgICAgICBwb3NpdGlvbnNbaTMgKyAxXSA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIGNvbmZpZy5zcHJlYWQgKiAyO1xyXG4gICAgICAgIHBvc2l0aW9uc1tpMyArIDJdID0gLWNvbmZpZy5kZXB0aDtcclxuXHJcbiAgICAgICAgLy8g6YeN5paw6K6+572u6YCf5bqmXHJcbiAgICAgICAgdmVsb2NpdGllc1tpM10gPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAwLjAyO1xyXG4gICAgICAgIHZlbG9jaXRpZXNbaTMgKyAxXSA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDAuMDI7XHJcbiAgICAgICAgdmVsb2NpdGllc1tpMyArIDJdID0gY29uZmlnLnNwZWVkQmFzZSArIE1hdGgucmFuZG9tKCkgKiBjb25maWcuc3BlZWRWYXJpYXRpb247XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyDkvb/nlKggVHJhbnNmZXJhYmxlIE9iamVjdHMg6L+U5Zue57uT5p6c77yI6Zu25ou36LSd77yJXHJcbiAgICBjb25zdCByZXNwb25zZTogUGFydGljbGVVcGRhdGVSZXNwb25zZSA9IHtcclxuICAgICAgdHlwZTogJ3VwZGF0ZWQnLFxyXG4gICAgICBwb3NpdGlvbnNcclxuICAgIH07XHJcblxyXG4gICAgc2VsZi5wb3N0TWVzc2FnZShyZXNwb25zZSwgW3Bvc2l0aW9ucy5idWZmZXIsIHZlbG9jaXRpZXMuYnVmZmVyXSk7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8g57G75Z6L5a+85Ye677yI5L6b5Li757q/56iL5L2/55So77yJXHJcbmV4cG9ydCB0eXBlIHt9O1xyXG4iXSwibmFtZXMiOlsic2VsZiIsIm9ubWVzc2FnZSIsImUiLCJ0eXBlIiwicG9zaXRpb25zIiwidmVsb2NpdGllcyIsImNvdW50IiwiY29uZmlnIiwiZGF0YSIsImkiLCJpMyIsIk1hdGgiLCJyYW5kb20iLCJzcHJlYWQiLCJkZXB0aCIsInNwZWVkQmFzZSIsInNwZWVkVmFyaWF0aW9uIiwicmVzcG9uc2UiLCJwb3N0TWVzc2FnZSIsImJ1ZmZlciJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./workers/particle-worker.ts\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["(ssr)/./workers/particle-worker.ts"](0, __webpack_exports__, __webpack_require__);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;