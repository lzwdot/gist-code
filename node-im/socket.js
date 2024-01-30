// 套接字编程
const net = require('net')
const chatSev = net.createServer()

const clientList = []

chatSev.on('connection', client => {
  client.write('welcome\n')
  clientList.push(client)
  client.on('data', data => {
    console.log('receive:', data.toString())
    clientList.forEach(v => {
      v.write(data)
    })
  })
})

chatSev.listen(8080)

// test

// telnet localhost 8080