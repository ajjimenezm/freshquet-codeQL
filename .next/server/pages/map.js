"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/map";
exports.ids = ["pages/map"];
exports.modules = {

/***/ "./components/BottomNav.tsx":
/*!**********************************!*\
  !*** ./components/BottomNav.tsx ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/material */ \"@mui/material\");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _mui_icons_material_Home__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/icons-material/Home */ \"@mui/icons-material/Home\");\n/* harmony import */ var _mui_icons_material_Home__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Home__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _mui_icons_material_Search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/icons-material/Search */ \"@mui/icons-material/Search\");\n/* harmony import */ var _mui_icons_material_Search__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Search__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _mui_icons_material_Chat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/icons-material/Chat */ \"@mui/icons-material/Chat\");\n/* harmony import */ var _mui_icons_material_Chat__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Chat__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _mui_icons_material_Map__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/icons-material/Map */ \"@mui/icons-material/Map\");\n/* harmony import */ var _mui_icons_material_Map__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Map__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _mui_icons_material_AccountCircle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/icons-material/AccountCircle */ \"@mui/icons-material/AccountCircle\");\n/* harmony import */ var _mui_icons_material_AccountCircle__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_AccountCircle__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! next/router */ \"next/router\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_8__);\n\n\n\n\n\n\n\n\n\nfunction BottomNav(props) {\n    const { 0: value , 1: setValue  } = (0,react__WEBPACK_IMPORTED_MODULE_7__.useState)(props.value);\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_8__.useRouter)();\n    const onLink = (href)=>{\n        router.push(href);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_1__.Paper, {\n        sx: {\n            position: \"fixed\",\n            bottom: 0,\n            left: 0,\n            right: 0\n        },\n        elevation: 3,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_1__.BottomNavigation, {\n            showLabels: true,\n            value: value,\n            onChange: (event, newValue)=>{\n                setValue(newValue);\n            },\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_1__.BottomNavigationAction, {\n                    label: \"Home\",\n                    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((_mui_icons_material_Home__WEBPACK_IMPORTED_MODULE_2___default()), {}, void 0, false, void 0, void 0),\n                    onClick: ()=>onLink(\"/home\")\n                }, void 0, false, {\n                    fileName: \"/home/jorgemoreno/Documents/proyectos/freshquet-frontend/components/BottomNav.tsx\",\n                    lineNumber: 35,\n                    columnNumber: 17\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_1__.BottomNavigationAction, {\n                    label: \"Search\",\n                    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((_mui_icons_material_Search__WEBPACK_IMPORTED_MODULE_3___default()), {}, void 0, false, void 0, void 0),\n                    onClick: ()=>onLink(\"/search\")\n                }, void 0, false, {\n                    fileName: \"/home/jorgemoreno/Documents/proyectos/freshquet-frontend/components/BottomNav.tsx\",\n                    lineNumber: 41,\n                    columnNumber: 17\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_1__.BottomNavigationAction, {\n                    label: \"Map\",\n                    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((_mui_icons_material_Map__WEBPACK_IMPORTED_MODULE_5___default()), {}, void 0, false, void 0, void 0),\n                    onClick: ()=>onLink(\"/map\")\n                }, void 0, false, {\n                    fileName: \"/home/jorgemoreno/Documents/proyectos/freshquet-frontend/components/BottomNav.tsx\",\n                    lineNumber: 46,\n                    columnNumber: 17\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_1__.BottomNavigationAction, {\n                    label: \"Chat\",\n                    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((_mui_icons_material_Chat__WEBPACK_IMPORTED_MODULE_4___default()), {}, void 0, false, void 0, void 0),\n                    onClick: ()=>onLink(\"/chat\")\n                }, void 0, false, {\n                    fileName: \"/home/jorgemoreno/Documents/proyectos/freshquet-frontend/components/BottomNav.tsx\",\n                    lineNumber: 51,\n                    columnNumber: 17\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_1__.BottomNavigationAction, {\n                    label: \"Profile\",\n                    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((_mui_icons_material_AccountCircle__WEBPACK_IMPORTED_MODULE_6___default()), {}, void 0, false, void 0, void 0),\n                    onClick: ()=>onLink(\"/profile\")\n                }, void 0, false, {\n                    fileName: \"/home/jorgemoreno/Documents/proyectos/freshquet-frontend/components/BottomNav.tsx\",\n                    lineNumber: 56,\n                    columnNumber: 17\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"/home/jorgemoreno/Documents/proyectos/freshquet-frontend/components/BottomNav.tsx\",\n            lineNumber: 28,\n            columnNumber: 13\n        }, this)\n    }, void 0, false, {\n        fileName: \"/home/jorgemoreno/Documents/proyectos/freshquet-frontend/components/BottomNav.tsx\",\n        lineNumber: 24,\n        columnNumber: 9\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BottomNav);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL0JvdHRvbU5hdi50c3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQWdGO0FBQ2hDO0FBQ0k7QUFDSjtBQUNGO0FBQ2M7QUFDM0I7QUFFTztBQU14QyxTQUFTVSxTQUFTLENBQUNDLEtBQXFCLEVBQUU7SUFDdEMsTUFBTSxLQUFDQyxLQUFLLE1BQUVDLFFBQVEsTUFBSUwsK0NBQVEsQ0FBQ0csS0FBSyxDQUFDQyxLQUFLLENBQUM7SUFDL0MsTUFBTUUsTUFBTSxHQUFHTCxzREFBUyxFQUFFO0lBRTFCLE1BQU1NLE1BQU0sR0FBRyxDQUFDQyxJQUFZLEdBQUs7UUFDN0JGLE1BQU0sQ0FBQ0csSUFBSSxDQUFDRCxJQUFJLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUQscUJBQ0ksOERBQUNkLGdEQUFLO1FBQ0ZnQixFQUFFLEVBQUU7WUFBRUMsUUFBUSxFQUFFLE9BQU87WUFBRUMsTUFBTSxFQUFFLENBQUM7WUFBRUMsSUFBSSxFQUFFLENBQUM7WUFBRUMsS0FBSyxFQUFFLENBQUM7U0FBRTtRQUN2REMsU0FBUyxFQUFFLENBQUM7a0JBRVosNEVBQUN2QiwyREFBZ0I7WUFDYndCLFVBQVU7WUFDVlosS0FBSyxFQUFFQSxLQUFLO1lBQ1phLFFBQVEsRUFBRSxDQUFDQyxLQUFLLEVBQUVDLFFBQVEsR0FBSztnQkFDM0JkLFFBQVEsQ0FBQ2MsUUFBUSxDQUFDLENBQUM7WUFDdkIsQ0FBQzs7OEJBRUQsOERBQUMxQixpRUFBc0I7b0JBQ25CMkIsS0FBSyxFQUFDLE1BQU07b0JBQ1pDLElBQUksZ0JBQUUsOERBQUMxQixpRUFBUSxvQ0FBRztvQkFDbEIyQixPQUFPLEVBQUUsSUFBTWYsTUFBTSxDQUFDLE9BQU8sQ0FBQzs7Ozs7d0JBQ2hDOzhCQUVGLDhEQUFDZCxpRUFBc0I7b0JBQ25CMkIsS0FBSyxFQUFDLFFBQVE7b0JBQ2RDLElBQUksZ0JBQUUsOERBQUN6QixtRUFBVSxvQ0FBRztvQkFDcEIwQixPQUFPLEVBQUUsSUFBTWYsTUFBTSxDQUFDLFNBQVMsQ0FBQzs7Ozs7d0JBQ2xDOzhCQUNGLDhEQUFDZCxpRUFBc0I7b0JBQ25CMkIsS0FBSyxFQUFDLEtBQUs7b0JBQ1hDLElBQUksZ0JBQUUsOERBQUN2QixnRUFBTyxvQ0FBRztvQkFDakJ3QixPQUFPLEVBQUUsSUFBTWYsTUFBTSxDQUFDLE1BQU0sQ0FBQzs7Ozs7d0JBQy9COzhCQUNGLDhEQUFDZCxpRUFBc0I7b0JBQ25CMkIsS0FBSyxFQUFDLE1BQU07b0JBQ1pDLElBQUksZ0JBQUUsOERBQUN4QixpRUFBUSxvQ0FBRztvQkFDbEJ5QixPQUFPLEVBQUUsSUFBTWYsTUFBTSxDQUFDLE9BQU8sQ0FBQzs7Ozs7d0JBQ2hDOzhCQUNGLDhEQUFDZCxpRUFBc0I7b0JBQ25CMkIsS0FBSyxFQUFDLFNBQVM7b0JBQ2ZDLElBQUksZ0JBQUUsOERBQUN0QiwwRUFBVyxvQ0FBRztvQkFDckJ1QixPQUFPLEVBQUUsSUFBTWYsTUFBTSxDQUFDLFVBQVUsQ0FBQzs7Ozs7d0JBQ25DOzs7Ozs7Z0JBQ2E7Ozs7O1lBQ2YsQ0FDVjtBQUNOLENBQUM7QUFFRCxpRUFBZUwsU0FBUyxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZnJlc2hxdWV0LWZyb250ZW5kLy4vY29tcG9uZW50cy9Cb3R0b21OYXYudHN4P2M0NTIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQm90dG9tTmF2aWdhdGlvbiwgQm90dG9tTmF2aWdhdGlvbkFjdGlvbiwgUGFwZXIgfSBmcm9tIFwiQG11aS9tYXRlcmlhbFwiO1xuaW1wb3J0IEhvbWVJY29uIGZyb20gXCJAbXVpL2ljb25zLW1hdGVyaWFsL0hvbWVcIjtcbmltcG9ydCBTZWFyY2hJY29uIGZyb20gXCJAbXVpL2ljb25zLW1hdGVyaWFsL1NlYXJjaFwiO1xuaW1wb3J0IENoYXRJY29uIGZyb20gXCJAbXVpL2ljb25zLW1hdGVyaWFsL0NoYXRcIjtcbmltcG9ydCBNYXBJY29uIGZyb20gXCJAbXVpL2ljb25zLW1hdGVyaWFsL01hcFwiO1xuaW1wb3J0IFByb2ZpbGVJY29uIGZyb20gXCJAbXVpL2ljb25zLW1hdGVyaWFsL0FjY291bnRDaXJjbGVcIjtcbmltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgc3R5bGVzIGZyb20gXCIuLi9zdHlsZXMvQm90dG9tTmF2Lm1vZHVsZS5jc3NcIjtcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gXCJuZXh0L3JvdXRlclwiO1xuXG5pbnRlcmZhY2UgQm90dG9tTmF2UHJvcHMge1xuICAgIHZhbHVlOiBudW1iZXI7XG59XG5cbmZ1bmN0aW9uIEJvdHRvbU5hdihwcm9wczogQm90dG9tTmF2UHJvcHMpIHtcbiAgICBjb25zdCBbdmFsdWUsIHNldFZhbHVlXSA9IHVzZVN0YXRlKHByb3BzLnZhbHVlKTtcbiAgICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcblxuICAgIGNvbnN0IG9uTGluayA9IChocmVmOiBzdHJpbmcpID0+IHtcbiAgICAgICAgcm91dGVyLnB1c2goaHJlZik7XG4gICAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxQYXBlclxuICAgICAgICAgICAgc3g9e3sgcG9zaXRpb246IFwiZml4ZWRcIiwgYm90dG9tOiAwLCBsZWZ0OiAwLCByaWdodDogMCB9fVxuICAgICAgICAgICAgZWxldmF0aW9uPXszfVxuICAgICAgICA+XG4gICAgICAgICAgICA8Qm90dG9tTmF2aWdhdGlvblxuICAgICAgICAgICAgICAgIHNob3dMYWJlbHNcbiAgICAgICAgICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCwgbmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VmFsdWUobmV3VmFsdWUpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPEJvdHRvbU5hdmlnYXRpb25BY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCJIb21lXCJcbiAgICAgICAgICAgICAgICAgICAgaWNvbj17PEhvbWVJY29uIC8+fVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbkxpbmsoXCIvaG9tZVwiKX1cbiAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgPEJvdHRvbU5hdmlnYXRpb25BY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCJTZWFyY2hcIlxuICAgICAgICAgICAgICAgICAgICBpY29uPXs8U2VhcmNoSWNvbiAvPn1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25MaW5rKFwiL3NlYXJjaFwiKX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxCb3R0b21OYXZpZ2F0aW9uQWN0aW9uXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsPVwiTWFwXCJcbiAgICAgICAgICAgICAgICAgICAgaWNvbj17PE1hcEljb24gLz59XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uTGluayhcIi9tYXBcIil9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8Qm90dG9tTmF2aWdhdGlvbkFjdGlvblxuICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIkNoYXRcIlxuICAgICAgICAgICAgICAgICAgICBpY29uPXs8Q2hhdEljb24gLz59XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uTGluayhcIi9jaGF0XCIpfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPEJvdHRvbU5hdmlnYXRpb25BY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCJQcm9maWxlXCJcbiAgICAgICAgICAgICAgICAgICAgaWNvbj17PFByb2ZpbGVJY29uIC8+fVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbkxpbmsoXCIvcHJvZmlsZVwiKX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9Cb3R0b21OYXZpZ2F0aW9uPlxuICAgICAgICA8L1BhcGVyPlxuICAgICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJvdHRvbU5hdjtcbiJdLCJuYW1lcyI6WyJCb3R0b21OYXZpZ2F0aW9uIiwiQm90dG9tTmF2aWdhdGlvbkFjdGlvbiIsIlBhcGVyIiwiSG9tZUljb24iLCJTZWFyY2hJY29uIiwiQ2hhdEljb24iLCJNYXBJY29uIiwiUHJvZmlsZUljb24iLCJ1c2VTdGF0ZSIsInVzZVJvdXRlciIsIkJvdHRvbU5hdiIsInByb3BzIiwidmFsdWUiLCJzZXRWYWx1ZSIsInJvdXRlciIsIm9uTGluayIsImhyZWYiLCJwdXNoIiwic3giLCJwb3NpdGlvbiIsImJvdHRvbSIsImxlZnQiLCJyaWdodCIsImVsZXZhdGlvbiIsInNob3dMYWJlbHMiLCJvbkNoYW5nZSIsImV2ZW50IiwibmV3VmFsdWUiLCJsYWJlbCIsImljb24iLCJvbkNsaWNrIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/BottomNav.tsx\n");

/***/ }),

/***/ "./pages/map/index.tsx":
/*!*****************************!*\
  !*** ./pages/map/index.tsx ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ \"next/head\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_BottomNav__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/BottomNav */ \"./components/BottomNav.tsx\");\n\n\n\nconst Map = ()=>{\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_1___default()), {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"title\", {\n                        children: \"Freshquet - Map\"\n                    }, void 0, false, {\n                        fileName: \"/home/jorgemoreno/Documents/proyectos/freshquet-frontend/pages/map/index.tsx\",\n                        lineNumber: 10,\n                        columnNumber: 17\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                        name: \"description\",\n                        content: \"Freshquet\"\n                    }, void 0, false, {\n                        fileName: \"/home/jorgemoreno/Documents/proyectos/freshquet-frontend/pages/map/index.tsx\",\n                        lineNumber: 11,\n                        columnNumber: 17\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                        rel: \"icon\",\n                        href: \"/favicon.ico\"\n                    }, void 0, false, {\n                        fileName: \"/home/jorgemoreno/Documents/proyectos/freshquet-frontend/pages/map/index.tsx\",\n                        lineNumber: 12,\n                        columnNumber: 17\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"/home/jorgemoreno/Documents/proyectos/freshquet-frontend/pages/map/index.tsx\",\n                lineNumber: 9,\n                columnNumber: 13\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_BottomNav__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                value: 2\n            }, void 0, false, {\n                fileName: \"/home/jorgemoreno/Documents/proyectos/freshquet-frontend/pages/map/index.tsx\",\n                lineNumber: 14,\n                columnNumber: 13\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/jorgemoreno/Documents/proyectos/freshquet-frontend/pages/map/index.tsx\",\n        lineNumber: 8,\n        columnNumber: 9\n    }, undefined);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Map);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9tYXAvaW5kZXgudHN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQzZCO0FBRXNCO0FBRW5ELE1BQU1FLEdBQUcsR0FBYSxJQUFNO0lBQ3hCLHFCQUNJLDhEQUFDQyxLQUFHOzswQkFDQSw4REFBQ0gsa0RBQUk7O2tDQUNELDhEQUFDSSxPQUFLO2tDQUFDLGlCQUFlOzs7OztpQ0FBUTtrQ0FDOUIsOERBQUNDLE1BQUk7d0JBQUNDLElBQUksRUFBQyxhQUFhO3dCQUFDQyxPQUFPLEVBQUMsV0FBVzs7Ozs7aUNBQUc7a0NBQy9DLDhEQUFDQyxNQUFJO3dCQUFDQyxHQUFHLEVBQUMsTUFBTTt3QkFBQ0MsSUFBSSxFQUFDLGNBQWM7Ozs7O2lDQUFHOzs7Ozs7eUJBQ3BDOzBCQUNQLDhEQUFDVCw2REFBUztnQkFBQ1UsS0FBSyxFQUFFLENBQUM7Ozs7O3lCQUFJOzs7Ozs7aUJBQ3JCLENBQ1I7QUFDTixDQUFDO0FBRUQsaUVBQWVULEdBQUcsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2ZyZXNocXVldC1mcm9udGVuZC8uL3BhZ2VzL21hcC9pbmRleC50c3g/Y2E5MSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IE5leHRQYWdlIH0gZnJvbSBcIm5leHRcIjtcbmltcG9ydCBIZWFkIGZyb20gXCJuZXh0L2hlYWRcIjtcbmltcG9ydCBzdHlsZXMgZnJvbSBcIi4uL3N0eWxlcy9NYXAubW9kdWxlLmNzc1wiO1xuaW1wb3J0IEJvdHRvbU5hdiBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9Cb3R0b21OYXZcIjtcblxuY29uc3QgTWFwOiBOZXh0UGFnZSA9ICgpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPEhlYWQ+XG4gICAgICAgICAgICAgICAgPHRpdGxlPkZyZXNocXVldCAtIE1hcDwvdGl0bGU+XG4gICAgICAgICAgICAgICAgPG1ldGEgbmFtZT1cImRlc2NyaXB0aW9uXCIgY29udGVudD1cIkZyZXNocXVldFwiIC8+XG4gICAgICAgICAgICAgICAgPGxpbmsgcmVsPVwiaWNvblwiIGhyZWY9XCIvZmF2aWNvbi5pY29cIiAvPlxuICAgICAgICAgICAgPC9IZWFkPlxuICAgICAgICAgICAgPEJvdHRvbU5hdiB2YWx1ZT17Mn0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE1hcDtcbiJdLCJuYW1lcyI6WyJIZWFkIiwiQm90dG9tTmF2IiwiTWFwIiwiZGl2IiwidGl0bGUiLCJtZXRhIiwibmFtZSIsImNvbnRlbnQiLCJsaW5rIiwicmVsIiwiaHJlZiIsInZhbHVlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/map/index.tsx\n");

/***/ }),

/***/ "@mui/icons-material/AccountCircle":
/*!****************************************************!*\
  !*** external "@mui/icons-material/AccountCircle" ***!
  \****************************************************/
/***/ ((module) => {

module.exports = require("@mui/icons-material/AccountCircle");

/***/ }),

/***/ "@mui/icons-material/Chat":
/*!*******************************************!*\
  !*** external "@mui/icons-material/Chat" ***!
  \*******************************************/
/***/ ((module) => {

module.exports = require("@mui/icons-material/Chat");

/***/ }),

/***/ "@mui/icons-material/Home":
/*!*******************************************!*\
  !*** external "@mui/icons-material/Home" ***!
  \*******************************************/
/***/ ((module) => {

module.exports = require("@mui/icons-material/Home");

/***/ }),

/***/ "@mui/icons-material/Map":
/*!******************************************!*\
  !*** external "@mui/icons-material/Map" ***!
  \******************************************/
/***/ ((module) => {

module.exports = require("@mui/icons-material/Map");

/***/ }),

/***/ "@mui/icons-material/Search":
/*!*********************************************!*\
  !*** external "@mui/icons-material/Search" ***!
  \*********************************************/
/***/ ((module) => {

module.exports = require("@mui/icons-material/Search");

/***/ }),

/***/ "@mui/material":
/*!********************************!*\
  !*** external "@mui/material" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("@mui/material");

/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("next/head");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/map/index.tsx"));
module.exports = __webpack_exports__;

})();