(async () => {
  const mysql = require('mysql2/promise')
  const cfg = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'wordpress'
  }

  const connection = mysql.createConnection(cfg)
  const res = await (await connection).execute('select * from wp_posts limit 1')

  console.log(res)
})()