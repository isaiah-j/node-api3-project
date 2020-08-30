const dotenv = require('dotenv')

dotenv.config({ path: './config.env' })

const express = require('express');
const app = require('./app');
const PORT = process.env.PORT || 3000

//custom middleware


app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`)
})