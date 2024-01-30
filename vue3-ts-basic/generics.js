// 泛型
function echo(arg) {
    return arg;
}
var str = 'str';
var result = echo(str);
function swap(tuple) {
    return [tuple[1], tuple[0]];
}
var result2 = swap(['string', 123]);
result2[1];
// 约束泛型
function echoWithArr(arg) {
    console.log(arg.length);
    return arg;
}
var arrs = echoWithArr(['str']);
function echoWithLength(arg) {
    console.log(arg.length);
    return arg;
}
var str1 = echoWithLength('str');
var str2 = echoWithLength({ a: '1', length: 1 });
var str3 = echoWithLength([1, 2, 3]);
echoWithLength(111); // 报错
// 泛型其他使用
var Queue = /** @class */ (function () {
    function Queue() {
        this.data = [];
    }
    Queue.prototype.push = function (item) {
        return this.data.push(item);
    };
    Queue.prototype.pop = function () {
        return this.data.shift();
    };
    return Queue;
}());
var queue = new Queue();
queue.push(1);
queue.push('str');
console.log(queue.pop().toFixed());
console.log(queue.pop().toFixed());
