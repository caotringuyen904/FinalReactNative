const express = require('express')
const app = express()
const path = require('path')
const morgan = require('morgan')
const cors = require('cors')
const env = require('dotenv')
const router = require('./router')
const mongoose = require("mongoose")

env.config()
const url = process.env.MONGO_URI

app.use(express.json())
app.use(cors({
    // All domains can access
    origin: "*"
}))

app.use(morgan('combined'));

app.use(express.static(path.join(__dirname))) // xu ly file static lay path den cho hien tai

app.use(router)


mongoose
  .connect(url)
  .then(() => {
    //make the server listening on port 4567
    app.listen(process.env.PORT, () => {
      console.log("connect & listen on " +  process.env.PORT);
    });
  })
  .catch((e) => {
    console.log(e);
  })

