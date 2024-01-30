// 泛型
function echo<T>(arg: T): T {
    return arg
}

const str: string = 'str'
const result = echo(str)

function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]]
}
const result2 = swap(['string', 123])
result2[1]

// 约束泛型
function echoWithArr<T>(arg: T[]): T[] {
    console.log(arg.length)
    return arg
}

const arrs = echoWithArr(['str'])

interface IWithLength {
    length: number
}

function echoWithLength<T extends IWithLength>(arg: T): T {
    console.log(arg.length)
    return arg
}
const str1 = echoWithLength('str')
const str2 = echoWithLength({ a: '1', length: 1 })
const str3 = echoWithLength([1, 2, 3])

echoWithLength(111) // 报错

// 泛型其他使用
class Queue<T> {
    private data = []
    push(item: T) {
        return this.data.push(item)
    }

    pop(): T {
        return this.data.shift()
    }
}

const queue = new Queue<number>()
queue.push(1)
queue.push('str') // 报错

console.log(queue.pop().toFixed())
console.log(queue.pop().toFixed())

interface IKeyPair<T, U> {
    key: T
    value: U
}

let kp1: IKeyPair<number, string> = { key: 1, value: 'string' }
let kp2: IKeyPair<string, number> = { key: '1', value: 1 }
let arr: number[] = [1, 2, 3]
let arr2: Array<number> = [1, 2, 3]