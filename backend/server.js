const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();
// import routes
const studentRoute = require('./routes/students')

const PORT = process.env.PORT

const app = express();

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.mongoDB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
},
() => console.log(`connected to mongodb at ${process.env.mongoDB_URL}`))

// mount routes
app.use('/api/student', studentRoute);

app.listen(PORT, () => console.log(`App is running on ${PORT}`))