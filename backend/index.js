require('dotenv').config()
const express = require('express')
const { getToken } = require('./controllers/Controllers')
const app = express()
const port = 3000

app.get('/artist', (req, res) => {
    getToken()
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})