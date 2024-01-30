// type alias 类型别名
let sum: (x: number, y: number) => number
const result = sum(1, 2)

type PlusType = (x: number, y: number) => number
let sum2: PlusType
const result2 = sum2(2, 3)

type StrOrNumber = string | number
let result3: StrOrNumber = '2'
result3 = 11
result3 = true // error

// 字面量，只能原始类型
const str: 'name' = 'name'
const number: 1 = 1
type Directions = 'up' | 'down' | 'left' | 'right'
let toWhere: Directions = 'up'

// 交叉类型（联合类型相对应的）
interface IName {
    name: string
}

type IPerson = IName & { age: number }
let person: IPerson = { name: '123', age: 123 }