const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config');
const PORT = process.env.PORT || Number(5100);
require('dotenv').config();


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use(cookieParser());

mongoose.Promise = global.Promise;
mongoose.connect(config.prod, {
    useNewUrlParser: true
}, err => {
    if (err) throw err;
    console.log('mongodb connected');
});

app.use('/user', require('./route/userRoute'));
app.use('/api', require('./route/courseRoute'));

app.all(`*`, (req, res) => {
    return res.status(404).json({ msg: `requested path not found, try with https://course-api-2022.herokuapp.com/api/course` })
})

app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
});
