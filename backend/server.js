require('dotenv').config()
const express = require('express')
const app = express()
const logger = require('npmlog')
const cors = require('cors')
const morgan = require('morgan')
const {getColors, deleteColors, createList, updateList} = require('./controllers/colorsControllers')
//middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())


//routes
app.get('/colors', getColors)
app.delete('/colors/:colorsid', deleteColors)
app.post('/colors', createList)
app.patch('/colors/:listid', updateList)

//errors 404
app.use((req, res) => {
  res.status(404).send({
    status: "error",
    message: "Not found",
  });
});

//middleware errors
app.use((error, req, res, next) => {
  res.status(error.httpStatus || 500).send({
    status: "error",
    message: error.message,
  });
});

// server listening
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  logger.info("SERVER", `http://localhost:${PORT}`);
});