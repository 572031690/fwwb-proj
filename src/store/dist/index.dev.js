"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_vue["default"].use(_vuex["default"]);

var SET_PERMISSION_NAME = 'SET_PERMISSION_NAME';
var store = new _vuex["default"].Store({
  // 1.state主要用于存储数据
  state: {
    permissionName: ''
  },
  // 2.mutations里面放的是方法,方法主要用于改变state里面的数据
  mutations: _defineProperty({}, SET_PERMISSION_NAME, function (state, data) {
    state.permissionName = data;
  }),
  getters: {
    getPermission: function getPermission(state) {
      return state.permissionName;
    }
  },
  actions: {},
  modules: {}
});
var _default = store;
exports["default"] = _default;