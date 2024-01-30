"use strict";
exports.__esModule = true;
exports.JMap = exports.JSet = exports.hasOwnProperty = void 0;
var hasOwnProperty = function (obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
};
exports.hasOwnProperty = hasOwnProperty;
// 定义一个 Set 构造函数
var Stl = /** @class */ (function () {
  function JSet() {
    console.log(arguments)
    var arg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      arg[_i] = arguments[_i];
    }
    this.value = {}; // value 以键值对的形式表示集合的数据
    this.size = 0; // n 集合中值的个数
    // arguments 是实际参数的一个类数组对象
    // 保证在 new JSet(1,'sarah',{}) 初始化构造函数时调用原型上的 add 方法，将传入的参数添加到集合中
    this.add.apply(this, arg);
  }

  JSet.prototype.get = function () {
    return this.value;
  };
  JSet.prototype.set = function () {
    var arg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      arg[_i] = arguments[_i];
    }
    this.clear();
    this.add(arg);
  };
  JSet.prototype.notify = function () {
    var ob = this.__ob__;
    if (ob) {
      // notify change
      ob.dep.notify();
    }
  };
  // 将每个参数添加至集合中
  JSet.prototype.add = function () {
    var arg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      arg[_i] = arguments[_i];
    }
    // 遍历每一个参数
    for (var i = 0; i < arg.length; i++) {
      var val = arg[i], // 值
        str = JSet._v2s.get(val); // 键：通过值得到相应的键
      // 保证集合无重复值
      if (!(0, exports.hasOwnProperty)(this.value, str)) {
        this.value[str] = val;
        this.size++; // 集合中值的计数加一
        this.notify();
      }
    }
    return this; // 支持链式调用
  };
  // 删除元素
  JSet.prototype["delete"] = function () {
    var arg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      arg[_i] = arguments[_i];
    }
    // 遍历每一个参数
    for (var i = 0; i < arg.length; i++) {
      var str = JSet._v2s.get(arg[i]); // 通过值得到相应的键
      if ((0, exports.hasOwnProperty)(this.value, str)) { // 若 value 集合中存在该属性
        delete this.value[str]; // 删除元素
        this.size--; // 集合中值的计数减一
        this.notify();
      }
    }
    return this; // 支持链式调用
  };
  // 检测是否包含某个值
  JSet.prototype.has = function (value) {
    return (0, exports.hasOwnProperty)(this.value, JSet._v2s.get(value));
  };
  // 遍历集合中的所有元素，在指定的上下文中调用回调函数 f
  JSet.prototype.forEach = function (f, context) {
    for (var s in this.value) {
      if ((0, exports.hasOwnProperty)(this.value, s)) {
        f.call(context, this.value[s]);
      }
    }
  };
  // 清空
  JSet.prototype.clear = function () {
    this.value = {};
    this.size = 0;
    this.notify();
  };
  // 在 JSet 方法上定义一个自定义属性 _v2s
  // 该属性的值是一个方法，用于将传入的值转成对应的字符串（其实就像是打标签）
  JSet._v2s = {
    next: 100, get: function (val) {
      switch (val) {
        case undefined:
          return 'u'; // 如果是 undefined，就返回 'u'
        case null:
          return 'n';
        case true:
          return 't';
        case false:
          return 'f';
        default:
          switch (typeof val) {
            case 'number':
              return '#' + val; // 如果是数字，就添加 # 前缀 ,例如 #123, #0.5
            case 'string':
              return '"' + val; // 如果是字符串，就添加 " 前缀 , 例如 "hello, "world
            default:
              return '@' + objectId(val); // 如果是数组、函数、对象等，就添加 @ 前缀，objectId 方法会返回一个特定数字，如：@100
          }
      }

      function objectId(o) {
        var prop = "|**objectid**|"; // 给数组/ 函数/ 对象定义一个私有属性，用以存放 id
        if (!(0, exports.hasOwnProperty)(o, prop)) { // 添加该属性前先判断该对象是否已经存在该属性
          o[prop] = JSet._v2s.next++; // 不存在则添加该属性，值为 next
        }
        return o[prop];
      }
    }
  };
  return JSet;
}());
exports.JSet = Stl;
var JMap = /** @class */ (function () {
  function JMap() {
    this.value = new Array();
    this.size = 0;
  }

  JMap.prototype.notify = function () {
    this.size = this.value.length;
    var ob = this.__ob__;
    if (ob) {
      // notify change
      ob.dep.notify();
    }
  };
  // 删除map中所有的元素
  JMap.prototype.clear = function () {
    this.value = new Array();
    this.notify();
  }
  // 向map中增加元素（key, value)
  JMap.prototype.set = function (_key, _value) {
    this.value.push({
      key: _key, value: _value
    });
    this.notify();
  }
  // 获取指定key的元素值value
  JMap.prototype.get = function (_key) {
    try {
      for (var i = 0; i < this.value.length; i++) {
        if (this.value[i].key == _key) {
          return this.value[i].value;
        }
      }
    } catch (e) {
      return null;
    }
  }
  // 删除指定key的元素
  JMap.prototype["delete"] = function (_key) {
    var flag = false;
    try {
      for (var i = 0; i < this.value.length; i++) {
        if (this.value[i].key == _key) {
          this.value.splice(i, 1);
          this.notify();
          return true;
        }
      }
    } catch (e) {
      flag = false;
    }
    return flag;
  }
  JMap.prototype.forEach = function (f, context) {
    var len = this.value.length;
    for (var i = 0; i < len; i++) {
      var _a = this.value[i], key = _a.key, value = _a.value;
      f.call(context, key, value, this);
    }
  };
  // 获取指定value值的元素key，失败返回空
  JMap.prototype.getKey = function (_value) {
    try {
      for (var i = 0; i < this.value.length; i++) {
        if (this.value[i].value == _value) {
          return this.value[i].key;
        }
      }
    } catch (e) {
      return null;
    }
  }
  // 判断map中是否含有指定key的元素
  JMap.prototype.has = function (_key) {
    var flag = false;
    try {
      for (var i = 0; i < this.value.length; i++) {
        if (this.value[i].key == _key) {
          flag = true;
        }
      }
    } catch (e) {
      flag = false;
    }
    return flag;
  }
  // 判断map中是否含有指定value的元素
  JMap.prototype.containsValue = function (_value) {
    var flag = false;
    try {
      for (var i = 0; i < this.value.length; i++) {
        if (this.value[i].value == _value) {
          flag = true;
        }
      }
    } catch (e) {
      flag = false;
    }
    return flag;
  }
  // 返回一个新的包含 [key, value] 对的数组
  JMap.prototype.entries = function () {
    var arr = new Array();
    for (var i = 0; i < this.value.length; i++) {
      var _a = this.value[i], key = _a.key, value = _a.value;
      arr.push([key, value]);
    }
    return arr;
  };
  // 返回map中所有value的数组（ARRAY）
  JMap.prototype.values = function () {
    var arr = new Array();
    for (var i = 0; i < this.value.length; i++) {
      arr.push(this.value[i].value);
    }
    return arr;
  }
  // 返回map中所有key的数组（ARRAY）
  JMap.prototype.keys = function () {
    var arr = new Array();
    for (var i = 0; i < this.value.length; i++) {
      arr.push(this.value[i].key);
    }
    return arr;
  }
  return JMap;
}());
exports.JMap = JMap;
exports["default"] = {
  JSet: Stl, JMap: JMap
};
