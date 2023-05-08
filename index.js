require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const server = require('http').createServer(app)
const { mongoose } = require('./config')
const cors = require('cors')
const PORT = process?.env?.PORT || 4000


var db = mongoose.connection

db.on('error', (err) => {
  console.log('err', err)
})

db.on('open', async () => {
  console.log('DB running')
})

app.use(bodyParser.json({ limit: '50mb' }))

app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit: 50000
}))


// parse requests of content-type - application/json
app.use(express.json())
app.use(bodyParser.json())
app.use(cors())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ limit: '10000mb', extended: true }))
app.use(express.static(path.join(__dirname, './client/build')))

app.use('/api', require('./routes'))
app.get('/api/get/test', (req, res) => { return res.send({ success: true, message: 'BACKEND IS WORKING!' }) })

server.listen(PORT, () => {
  console.log(`Server up and running on ${PORT}`)
})
