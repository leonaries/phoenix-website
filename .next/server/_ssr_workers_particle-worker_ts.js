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

eval("__webpack_require__.r(__webpack_exports__);\n/**\r\n * Particle Update Worker\r\n *\r\n * 在独立线程中处理粒子位置更新，释放主线程用于渲染和UI交互\r\n *\r\n * 性能优势：\r\n * - 100,000 个粒子的计算从主线程移到 Worker 线程\r\n * - 使用 Transferable Objects 实现零拷贝数据传输\r\n * - 主线程可以专注于 Three.js 渲染\r\n */ // Worker 消息处理\nself.onmessage = (e)=>{\n    const { type, positions, velocities, count, config } = e.data;\n    if (type === 'update') {\n        // 更新每个粒子的位置\n        for(let i = 0; i < count; i++){\n            const i3 = i * 3;\n            // 更新位置（应用速度）\n            positions[i3] += velocities[i3]; // x\n            positions[i3 + 1] += velocities[i3 + 1]; // y\n            positions[i3 + 2] += velocities[i3 + 2]; // z\n            // 粒子超出观察者后，重置到远处\n            if (positions[i3 + 2] > 10) {\n                positions[i3] = (Math.random() - 0.5) * config.spread * 2;\n                positions[i3 + 1] = (Math.random() - 0.5) * config.spread * 2;\n                positions[i3 + 2] = -config.depth;\n                // 重新设置速度\n                velocities[i3] = (Math.random() - 0.5) * 0.02;\n                velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;\n                velocities[i3 + 2] = config.speedBase + Math.random() * config.speedVariation;\n            }\n        }\n        // 不使用 Transferable Objects 返回结果（避免所有权转移问题）\n        const response = {\n            type: 'updated',\n            positions: new Float32Array(positions) // 创建副本而不是转移所有权\n        };\n        self.postMessage(response);\n    }\n};\n// 类型导出（供主线程使用）\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi93b3JrZXJzL3BhcnRpY2xlLXdvcmtlci50cyIsIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7OztDQVNDLEdBc0JELGNBQWM7QUFDZEEsS0FBS0MsU0FBUyxHQUFHLENBQUNDO0lBQ2hCLE1BQU0sRUFBRUMsSUFBSSxFQUFFQyxTQUFTLEVBQUVDLFVBQVUsRUFBRUMsS0FBSyxFQUFFQyxNQUFNLEVBQUUsR0FBR0wsRUFBRU0sSUFBSTtJQUU3RCxJQUFJTCxTQUFTLFVBQVU7UUFDckIsWUFBWTtRQUNaLElBQUssSUFBSU0sSUFBSSxHQUFHQSxJQUFJSCxPQUFPRyxJQUFLO1lBQzlCLE1BQU1DLEtBQUtELElBQUk7WUFFZixhQUFhO1lBQ2JMLFNBQVMsQ0FBQ00sR0FBRyxJQUFJTCxVQUFVLENBQUNLLEdBQUcsRUFBVSxJQUFJO1lBQzdDTixTQUFTLENBQUNNLEtBQUssRUFBRSxJQUFJTCxVQUFVLENBQUNLLEtBQUssRUFBRSxFQUFFLElBQUk7WUFDN0NOLFNBQVMsQ0FBQ00sS0FBSyxFQUFFLElBQUlMLFVBQVUsQ0FBQ0ssS0FBSyxFQUFFLEVBQUUsSUFBSTtZQUU3QyxpQkFBaUI7WUFDakIsSUFBSU4sU0FBUyxDQUFDTSxLQUFLLEVBQUUsR0FBRyxJQUFJO2dCQUMxQk4sU0FBUyxDQUFDTSxHQUFHLEdBQUcsQ0FBQ0MsS0FBS0MsTUFBTSxLQUFLLEdBQUUsSUFBS0wsT0FBT00sTUFBTSxHQUFHO2dCQUN4RFQsU0FBUyxDQUFDTSxLQUFLLEVBQUUsR0FBRyxDQUFDQyxLQUFLQyxNQUFNLEtBQUssR0FBRSxJQUFLTCxPQUFPTSxNQUFNLEdBQUc7Z0JBQzVEVCxTQUFTLENBQUNNLEtBQUssRUFBRSxHQUFHLENBQUNILE9BQU9PLEtBQUs7Z0JBRWpDLFNBQVM7Z0JBQ1RULFVBQVUsQ0FBQ0ssR0FBRyxHQUFHLENBQUNDLEtBQUtDLE1BQU0sS0FBSyxHQUFFLElBQUs7Z0JBQ3pDUCxVQUFVLENBQUNLLEtBQUssRUFBRSxHQUFHLENBQUNDLEtBQUtDLE1BQU0sS0FBSyxHQUFFLElBQUs7Z0JBQzdDUCxVQUFVLENBQUNLLEtBQUssRUFBRSxHQUFHSCxPQUFPUSxTQUFTLEdBQUdKLEtBQUtDLE1BQU0sS0FBS0wsT0FBT1MsY0FBYztZQUMvRTtRQUNGO1FBRUEsMkNBQTJDO1FBQzNDLE1BQU1DLFdBQW1DO1lBQ3ZDZCxNQUFNO1lBQ05DLFdBQVcsSUFBSWMsYUFBYWQsV0FBVyxlQUFlO1FBQ3hEO1FBRUFKLEtBQUttQixXQUFXLENBQUNGO0lBQ25CO0FBQ0Y7QUFFQSxlQUFlO0FBQ0EiLCJzb3VyY2VzIjpbIi9Vc2Vycy9sZW9uL0Rlc2t0b3AvcGhvZW5peC9waG9lbml4X3dlYnNpdGUvd29ya2Vycy9wYXJ0aWNsZS13b3JrZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIFBhcnRpY2xlIFVwZGF0ZSBXb3JrZXJcclxuICpcclxuICog5Zyo54us56uL57q/56iL5Lit5aSE55CG57KS5a2Q5L2N572u5pu05paw77yM6YeK5pS+5Li757q/56iL55So5LqO5riy5p+T5ZKMVUnkuqTkupJcclxuICpcclxuICog5oCn6IO95LyY5Yq/77yaXHJcbiAqIC0gMTAwLDAwMCDkuKrnspLlrZDnmoTorqHnrpfku47kuLvnur/nqIvnp7vliLAgV29ya2VyIOe6v+eoi1xyXG4gKiAtIOS9v+eUqCBUcmFuc2ZlcmFibGUgT2JqZWN0cyDlrp7njrDpm7bmi7fotJ3mlbDmja7kvKDovpNcclxuICogLSDkuLvnur/nqIvlj6/ku6XkuJPms6jkuo4gVGhyZWUuanMg5riy5p+TXHJcbiAqL1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBQYXJ0aWNsZUNvbmZpZyB7XHJcbiAgc3ByZWFkOiBudW1iZXI7ICAgICAgLy8gWC9ZIOi9tOWIhuW4g+iMg+WbtFxyXG4gIGRlcHRoOiBudW1iZXI7ICAgICAgIC8vIFog6L205rex5bqm6IyD5Zu0XHJcbiAgc3BlZWRCYXNlOiBudW1iZXI7ICAgLy8g5Z+656GA6YCf5bqmXHJcbiAgc3BlZWRWYXJpYXRpb246IG51bWJlcjsgLy8g6YCf5bqm6ZqP5py65Y+Y5YyWXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUGFydGljbGVVcGRhdGVNZXNzYWdlIHtcclxuICB0eXBlOiAndXBkYXRlJztcclxuICBwb3NpdGlvbnM6IEZsb2F0MzJBcnJheTtcclxuICB2ZWxvY2l0aWVzOiBGbG9hdDMyQXJyYXk7XHJcbiAgY291bnQ6IG51bWJlcjtcclxuICBjb25maWc6IFBhcnRpY2xlQ29uZmlnO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFBhcnRpY2xlVXBkYXRlUmVzcG9uc2Uge1xyXG4gIHR5cGU6ICd1cGRhdGVkJztcclxuICBwb3NpdGlvbnM6IEZsb2F0MzJBcnJheTtcclxufVxyXG5cclxuLy8gV29ya2VyIOa2iOaBr+WkhOeQhlxyXG5zZWxmLm9ubWVzc2FnZSA9IChlOiBNZXNzYWdlRXZlbnQ8UGFydGljbGVVcGRhdGVNZXNzYWdlPikgPT4ge1xyXG4gIGNvbnN0IHsgdHlwZSwgcG9zaXRpb25zLCB2ZWxvY2l0aWVzLCBjb3VudCwgY29uZmlnIH0gPSBlLmRhdGE7XHJcblxyXG4gIGlmICh0eXBlID09PSAndXBkYXRlJykge1xyXG4gICAgLy8g5pu05paw5q+P5Liq57KS5a2Q55qE5L2N572uXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcclxuICAgICAgY29uc3QgaTMgPSBpICogMztcclxuXHJcbiAgICAgIC8vIOabtOaWsOS9jee9ru+8iOW6lOeUqOmAn+W6pu+8iVxyXG4gICAgICBwb3NpdGlvbnNbaTNdICs9IHZlbG9jaXRpZXNbaTNdOyAgICAgICAgIC8vIHhcclxuICAgICAgcG9zaXRpb25zW2kzICsgMV0gKz0gdmVsb2NpdGllc1tpMyArIDFdOyAvLyB5XHJcbiAgICAgIHBvc2l0aW9uc1tpMyArIDJdICs9IHZlbG9jaXRpZXNbaTMgKyAyXTsgLy8gelxyXG5cclxuICAgICAgLy8g57KS5a2Q6LaF5Ye66KeC5a+f6ICF5ZCO77yM6YeN572u5Yiw6L+c5aSEXHJcbiAgICAgIGlmIChwb3NpdGlvbnNbaTMgKyAyXSA+IDEwKSB7XHJcbiAgICAgICAgcG9zaXRpb25zW2kzXSA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIGNvbmZpZy5zcHJlYWQgKiAyO1xyXG4gICAgICAgIHBvc2l0aW9uc1tpMyArIDFdID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogY29uZmlnLnNwcmVhZCAqIDI7XHJcbiAgICAgICAgcG9zaXRpb25zW2kzICsgMl0gPSAtY29uZmlnLmRlcHRoO1xyXG5cclxuICAgICAgICAvLyDph43mlrDorr7nva7pgJ/luqZcclxuICAgICAgICB2ZWxvY2l0aWVzW2kzXSA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDAuMDI7XHJcbiAgICAgICAgdmVsb2NpdGllc1tpMyArIDFdID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMC4wMjtcclxuICAgICAgICB2ZWxvY2l0aWVzW2kzICsgMl0gPSBjb25maWcuc3BlZWRCYXNlICsgTWF0aC5yYW5kb20oKSAqIGNvbmZpZy5zcGVlZFZhcmlhdGlvbjtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOS4jeS9v+eUqCBUcmFuc2ZlcmFibGUgT2JqZWN0cyDov5Tlm57nu5PmnpzvvIjpgb/lhY3miYDmnInmnYPovaznp7vpl67popjvvIlcclxuICAgIGNvbnN0IHJlc3BvbnNlOiBQYXJ0aWNsZVVwZGF0ZVJlc3BvbnNlID0ge1xyXG4gICAgICB0eXBlOiAndXBkYXRlZCcsXHJcbiAgICAgIHBvc2l0aW9uczogbmV3IEZsb2F0MzJBcnJheShwb3NpdGlvbnMpIC8vIOWIm+W7uuWJr+acrOiAjOS4jeaYr+i9rOenu+aJgOacieadg1xyXG4gICAgfTtcclxuXHJcbiAgICBzZWxmLnBvc3RNZXNzYWdlKHJlc3BvbnNlKTtcclxuICB9XHJcbn07XHJcblxyXG4vLyDnsbvlnovlr7zlh7rvvIjkvpvkuLvnur/nqIvkvb/nlKjvvIlcclxuZXhwb3J0IHR5cGUge307XHJcbiJdLCJuYW1lcyI6WyJzZWxmIiwib25tZXNzYWdlIiwiZSIsInR5cGUiLCJwb3NpdGlvbnMiLCJ2ZWxvY2l0aWVzIiwiY291bnQiLCJjb25maWciLCJkYXRhIiwiaSIsImkzIiwiTWF0aCIsInJhbmRvbSIsInNwcmVhZCIsImRlcHRoIiwic3BlZWRCYXNlIiwic3BlZWRWYXJpYXRpb24iLCJyZXNwb25zZSIsIkZsb2F0MzJBcnJheSIsInBvc3RNZXNzYWdlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./workers/particle-worker.ts\n");

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