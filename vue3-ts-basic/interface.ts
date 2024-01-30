interface Person {
  readonly id: number
  name: string
  age?: number
}

let lzw: Person = {
  id: 1,
  name: 'lzw',
  // age: 1
}

lzw.id = 2