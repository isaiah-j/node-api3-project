const express = require('express');
const app = require('./app');
const PORT = 1337

//custom middleware


app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`)
})