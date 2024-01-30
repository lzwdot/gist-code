// type inference 类型推论
let str = 'str'
str = 123

// union types 联合类型
let numberOrString: number | string
numberOrString.toString()


// 类型断言 as 
function getLength(input: string | number): number {
    const str = input as string
    if (str.length) {
        return str.length
    } else {
        const number = input as number
        return number.toString().length
    }
}

// type guard 类型守卫
function getLength2(input: string | number): number {
    if (typeof input === 'string') {
        return str.length
    } else {
        return input.toString().length
    }
}