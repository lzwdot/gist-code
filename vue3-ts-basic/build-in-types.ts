// global objects
const a: Array<number> = [1, 2, 3]
const date = new Date()
date.getDate()

const reg = /abc/
reg.test('abc')

// build-in object
Math.pow(2, 2)


// dom and bom
let body = document.body
let allLis = document.querySelectorAll('li')
allLis.keys()

document.addEventListener('click', (e) => {
    e.preventDefault()
})

// utility types
interface IPerson1 {
    name: string
    age: number
}
let lzw: IPerson1 = { name: 'lzw', age: 30 }

type IPartial = Partial<IPerson1>
let lzw2: IPartial = { name: 'lzw' }

type IOmit = Omit<IPerson1, 'name'>
let lzw3: IOmit = { age: 20 }