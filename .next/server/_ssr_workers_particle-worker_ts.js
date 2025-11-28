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

eval("__webpack_require__.r(__webpack_exports__);\n/**\r\n * Particle Update Worker\r\n *\r\n * Process particle position updates in a separate thread, freeing the main thread for rendering and UI interaction\r\n *\r\n * Performance benefits:\r\n * - Move calculation of 100,000 particles from main thread to Worker thread\r\n * - Use Transferable Objects for zero-copy data transfer\r\n * - Main thread can focus on Three.js rendering\r\n */ // Worker message handling\nself.onmessage = (e)=>{\n    const { type, positions, velocities, count, config } = e.data;\n    if (type === 'update') {\n        // Update each particle's position\n        for(let i = 0; i < count; i++){\n            const i3 = i * 3;\n            // Update position (apply velocity)\n            positions[i3] += velocities[i3]; // x\n            positions[i3 + 1] += velocities[i3 + 1]; // y\n            positions[i3 + 2] += velocities[i3 + 2]; // z\n            // Reset particle to far distance when it passes the viewer\n            if (positions[i3 + 2] > 10) {\n                positions[i3] = (Math.random() - 0.5) * config.spread * 2;\n                positions[i3 + 1] = (Math.random() - 0.5) * config.spread * 2;\n                positions[i3 + 2] = -config.depth;\n                // Reset velocity\n                velocities[i3] = (Math.random() - 0.5) * 0.02;\n                velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;\n                velocities[i3 + 2] = config.speedBase + Math.random() * config.speedVariation;\n            }\n        }\n        // Return result without using Transferable Objects (avoid ownership transfer issues)\n        const response = {\n            type: 'updated',\n            positions: new Float32Array(positions) // Create copy instead of transferring ownership\n        };\n        self.postMessage(response);\n    }\n};\n// Type export (for main thread use)\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi93b3JrZXJzL3BhcnRpY2xlLXdvcmtlci50cyIsIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7OztDQVNDLEdBc0JELDBCQUEwQjtBQUMxQkEsS0FBS0MsU0FBUyxHQUFHLENBQUNDO0lBQ2hCLE1BQU0sRUFBRUMsSUFBSSxFQUFFQyxTQUFTLEVBQUVDLFVBQVUsRUFBRUMsS0FBSyxFQUFFQyxNQUFNLEVBQUUsR0FBR0wsRUFBRU0sSUFBSTtJQUU3RCxJQUFJTCxTQUFTLFVBQVU7UUFDckIsa0NBQWtDO1FBQ2xDLElBQUssSUFBSU0sSUFBSSxHQUFHQSxJQUFJSCxPQUFPRyxJQUFLO1lBQzlCLE1BQU1DLEtBQUtELElBQUk7WUFFZixtQ0FBbUM7WUFDbkNMLFNBQVMsQ0FBQ00sR0FBRyxJQUFJTCxVQUFVLENBQUNLLEdBQUcsRUFBVSxJQUFJO1lBQzdDTixTQUFTLENBQUNNLEtBQUssRUFBRSxJQUFJTCxVQUFVLENBQUNLLEtBQUssRUFBRSxFQUFFLElBQUk7WUFDN0NOLFNBQVMsQ0FBQ00sS0FBSyxFQUFFLElBQUlMLFVBQVUsQ0FBQ0ssS0FBSyxFQUFFLEVBQUUsSUFBSTtZQUU3QywyREFBMkQ7WUFDM0QsSUFBSU4sU0FBUyxDQUFDTSxLQUFLLEVBQUUsR0FBRyxJQUFJO2dCQUMxQk4sU0FBUyxDQUFDTSxHQUFHLEdBQUcsQ0FBQ0MsS0FBS0MsTUFBTSxLQUFLLEdBQUUsSUFBS0wsT0FBT00sTUFBTSxHQUFHO2dCQUN4RFQsU0FBUyxDQUFDTSxLQUFLLEVBQUUsR0FBRyxDQUFDQyxLQUFLQyxNQUFNLEtBQUssR0FBRSxJQUFLTCxPQUFPTSxNQUFNLEdBQUc7Z0JBQzVEVCxTQUFTLENBQUNNLEtBQUssRUFBRSxHQUFHLENBQUNILE9BQU9PLEtBQUs7Z0JBRWpDLGlCQUFpQjtnQkFDakJULFVBQVUsQ0FBQ0ssR0FBRyxHQUFHLENBQUNDLEtBQUtDLE1BQU0sS0FBSyxHQUFFLElBQUs7Z0JBQ3pDUCxVQUFVLENBQUNLLEtBQUssRUFBRSxHQUFHLENBQUNDLEtBQUtDLE1BQU0sS0FBSyxHQUFFLElBQUs7Z0JBQzdDUCxVQUFVLENBQUNLLEtBQUssRUFBRSxHQUFHSCxPQUFPUSxTQUFTLEdBQUdKLEtBQUtDLE1BQU0sS0FBS0wsT0FBT1MsY0FBYztZQUMvRTtRQUNGO1FBRUEscUZBQXFGO1FBQ3JGLE1BQU1DLFdBQW1DO1lBQ3ZDZCxNQUFNO1lBQ05DLFdBQVcsSUFBSWMsYUFBYWQsV0FBVyxnREFBZ0Q7UUFDekY7UUFFQUosS0FBS21CLFdBQVcsQ0FBQ0Y7SUFDbkI7QUFDRjtBQUVBLG9DQUFvQztBQUNyQiIsInNvdXJjZXMiOlsiL1VzZXJzL2xlb24vRGVza3RvcC9waG9lbml4L3Bob2VuaXhfd2Vic2l0ZS93b3JrZXJzL3BhcnRpY2xlLXdvcmtlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogUGFydGljbGUgVXBkYXRlIFdvcmtlclxyXG4gKlxyXG4gKiBQcm9jZXNzIHBhcnRpY2xlIHBvc2l0aW9uIHVwZGF0ZXMgaW4gYSBzZXBhcmF0ZSB0aHJlYWQsIGZyZWVpbmcgdGhlIG1haW4gdGhyZWFkIGZvciByZW5kZXJpbmcgYW5kIFVJIGludGVyYWN0aW9uXHJcbiAqXHJcbiAqIFBlcmZvcm1hbmNlIGJlbmVmaXRzOlxyXG4gKiAtIE1vdmUgY2FsY3VsYXRpb24gb2YgMTAwLDAwMCBwYXJ0aWNsZXMgZnJvbSBtYWluIHRocmVhZCB0byBXb3JrZXIgdGhyZWFkXHJcbiAqIC0gVXNlIFRyYW5zZmVyYWJsZSBPYmplY3RzIGZvciB6ZXJvLWNvcHkgZGF0YSB0cmFuc2ZlclxyXG4gKiAtIE1haW4gdGhyZWFkIGNhbiBmb2N1cyBvbiBUaHJlZS5qcyByZW5kZXJpbmdcclxuICovXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFBhcnRpY2xlQ29uZmlnIHtcclxuICBzcHJlYWQ6IG51bWJlcjsgICAgICAvLyBYL1kgYXhpcyBkaXN0cmlidXRpb24gcmFuZ2VcclxuICBkZXB0aDogbnVtYmVyOyAgICAgICAvLyBaLWF4aXMgZGVwdGggcmFuZ2VcclxuICBzcGVlZEJhc2U6IG51bWJlcjsgICAvLyBCYXNlIHNwZWVkXHJcbiAgc3BlZWRWYXJpYXRpb246IG51bWJlcjsgLy8gU3BlZWQgdmFyaWF0aW9uXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUGFydGljbGVVcGRhdGVNZXNzYWdlIHtcclxuICB0eXBlOiAndXBkYXRlJztcclxuICBwb3NpdGlvbnM6IEZsb2F0MzJBcnJheTtcclxuICB2ZWxvY2l0aWVzOiBGbG9hdDMyQXJyYXk7XHJcbiAgY291bnQ6IG51bWJlcjtcclxuICBjb25maWc6IFBhcnRpY2xlQ29uZmlnO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFBhcnRpY2xlVXBkYXRlUmVzcG9uc2Uge1xyXG4gIHR5cGU6ICd1cGRhdGVkJztcclxuICBwb3NpdGlvbnM6IEZsb2F0MzJBcnJheTtcclxufVxyXG5cclxuLy8gV29ya2VyIG1lc3NhZ2UgaGFuZGxpbmdcclxuc2VsZi5vbm1lc3NhZ2UgPSAoZTogTWVzc2FnZUV2ZW50PFBhcnRpY2xlVXBkYXRlTWVzc2FnZT4pID0+IHtcclxuICBjb25zdCB7IHR5cGUsIHBvc2l0aW9ucywgdmVsb2NpdGllcywgY291bnQsIGNvbmZpZyB9ID0gZS5kYXRhO1xyXG5cclxuICBpZiAodHlwZSA9PT0gJ3VwZGF0ZScpIHtcclxuICAgIC8vIFVwZGF0ZSBlYWNoIHBhcnRpY2xlJ3MgcG9zaXRpb25cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG4gICAgICBjb25zdCBpMyA9IGkgKiAzO1xyXG5cclxuICAgICAgLy8gVXBkYXRlIHBvc2l0aW9uIChhcHBseSB2ZWxvY2l0eSlcclxuICAgICAgcG9zaXRpb25zW2kzXSArPSB2ZWxvY2l0aWVzW2kzXTsgICAgICAgICAvLyB4XHJcbiAgICAgIHBvc2l0aW9uc1tpMyArIDFdICs9IHZlbG9jaXRpZXNbaTMgKyAxXTsgLy8geVxyXG4gICAgICBwb3NpdGlvbnNbaTMgKyAyXSArPSB2ZWxvY2l0aWVzW2kzICsgMl07IC8vIHpcclxuXHJcbiAgICAgIC8vIFJlc2V0IHBhcnRpY2xlIHRvIGZhciBkaXN0YW5jZSB3aGVuIGl0IHBhc3NlcyB0aGUgdmlld2VyXHJcbiAgICAgIGlmIChwb3NpdGlvbnNbaTMgKyAyXSA+IDEwKSB7XHJcbiAgICAgICAgcG9zaXRpb25zW2kzXSA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIGNvbmZpZy5zcHJlYWQgKiAyO1xyXG4gICAgICAgIHBvc2l0aW9uc1tpMyArIDFdID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogY29uZmlnLnNwcmVhZCAqIDI7XHJcbiAgICAgICAgcG9zaXRpb25zW2kzICsgMl0gPSAtY29uZmlnLmRlcHRoO1xyXG5cclxuICAgICAgICAvLyBSZXNldCB2ZWxvY2l0eVxyXG4gICAgICAgIHZlbG9jaXRpZXNbaTNdID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMC4wMjtcclxuICAgICAgICB2ZWxvY2l0aWVzW2kzICsgMV0gPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAwLjAyO1xyXG4gICAgICAgIHZlbG9jaXRpZXNbaTMgKyAyXSA9IGNvbmZpZy5zcGVlZEJhc2UgKyBNYXRoLnJhbmRvbSgpICogY29uZmlnLnNwZWVkVmFyaWF0aW9uO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmV0dXJuIHJlc3VsdCB3aXRob3V0IHVzaW5nIFRyYW5zZmVyYWJsZSBPYmplY3RzIChhdm9pZCBvd25lcnNoaXAgdHJhbnNmZXIgaXNzdWVzKVxyXG4gICAgY29uc3QgcmVzcG9uc2U6IFBhcnRpY2xlVXBkYXRlUmVzcG9uc2UgPSB7XHJcbiAgICAgIHR5cGU6ICd1cGRhdGVkJyxcclxuICAgICAgcG9zaXRpb25zOiBuZXcgRmxvYXQzMkFycmF5KHBvc2l0aW9ucykgLy8gQ3JlYXRlIGNvcHkgaW5zdGVhZCBvZiB0cmFuc2ZlcnJpbmcgb3duZXJzaGlwXHJcbiAgICB9O1xyXG5cclxuICAgIHNlbGYucG9zdE1lc3NhZ2UocmVzcG9uc2UpO1xyXG4gIH1cclxufTtcclxuXHJcbi8vIFR5cGUgZXhwb3J0IChmb3IgbWFpbiB0aHJlYWQgdXNlKVxyXG5leHBvcnQgdHlwZSB7fTtcclxuIl0sIm5hbWVzIjpbInNlbGYiLCJvbm1lc3NhZ2UiLCJlIiwidHlwZSIsInBvc2l0aW9ucyIsInZlbG9jaXRpZXMiLCJjb3VudCIsImNvbmZpZyIsImRhdGEiLCJpIiwiaTMiLCJNYXRoIiwicmFuZG9tIiwic3ByZWFkIiwiZGVwdGgiLCJzcGVlZEJhc2UiLCJzcGVlZFZhcmlhdGlvbiIsInJlc3BvbnNlIiwiRmxvYXQzMkFycmF5IiwicG9zdE1lc3NhZ2UiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./workers/particle-worker.ts\n");

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