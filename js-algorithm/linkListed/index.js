const a = { val: 'a' }
const b = { val: 'b' }
const c = { val: 'c' }
const d = { val: 'd' }

a.next = b;
b.next = c;
c.next = d;

console.log(11)

let p = a;

while(p){
    console.log(p.val)
    p = p.next
}

