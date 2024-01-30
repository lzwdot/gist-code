const arr = [101, 19, 12, 51, 32, 7, 103, 8, 9, 10, 11];

function continuity(arr) {
    const _arr = arr.sort((a, b) => { return a - b })
    const res = []

    res.push(_arr[0])
    for (let i = 1; i < _arr.length; i++) {
        if (res[res.length - 1] + 1 === _arr[i]) {
            res.push(_arr[i])
        } else {
            res.push(_arr[i])
            res.pop()
        }
    }

    return res
}


function discontinuity(arr) {
    const _arr = arr.sort((a, b) => { return a - b })
    const res = []

    res.push(_arr[0])
    for (let i = 1; i < _arr.length; i++) {
        if (res[res.length - 1] + 1 === _arr[i]) {
            res.pop()
            res.push(_arr[i])
        } else {
            res.push(_arr[i])
        }
    }

    return res
}

// console.log(discontinuity(arr))

const str = 'aaafjkjkbbbdjkssjcc' // 输出 ['aaa','bbb','ss','cc']

function outArr(str) {
    let arr = []
    let first = str[0]

    for (let i = 1; i <= str.length; i++) {
        const tmp = str[i]
        if (first.indexOf(tmp) >= 0) {
            first += tmp
        } else {
            if (first.length > 1) arr.push(first)
            first = tmp
        }
    }

    return arr
}

// console.log(outArr(str))
// var arr2 = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10];
// console.log([...new Set(arr2.flat(Infinity))].sort((a,b)=>a-b))

const arr3 = ['A', 'B', 'C', 'D']
const arr4 = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2']

function concatArr(arr1, arr2) {
    let first = arr1.shift()
    let res = []
    for (let i = 0; i < arr2.length; i++) {
        if (arr2[i].indexOf(first) < 0) {
            res.push(first)
            first = arr1.shift()
        }
        res.push(arr2[i])
    }
    res.push(first)

    return res;
}

// console.log(concatArr(arr3, arr4))
// for (var i = 0; i < 10; i++) {
//     ((i)=>{
//         setTimeout(() => {
//             console.log(i);
//         }, 1000)
//     })(i)
// }


let obj = {1:222, 2:123, 5:888};

console.log(Array.from({length:12}).map((_,index)=>
    obj[index+1] || null
))

