const express = require('express')
const app = express()

app.get('/api/info', (req, res) => {
  res.json({
    name: 'webpack'
  })
})

app.listen('8090')