const express = require('express');
const mongoose = require('mongoose');

const server = express();

// mongoose.connect('mongodb+srv://italo:uBpKLuyxHBnM16kA@apimongo-6vn6x.gcp.mongodb.net/tindev?retryWrites=true&w=majority',
//     { useNewUrlParser: true}
// );

mongoose.connect('mongodb://localhost:27017/tindev',
    { useNewUrlParser: true}
);


server
    .use(require('cors')())
    .use(express.json())
    .use(require('./routes'))
    .listen("3333");