//require modules

const express = require('express');
const morgan = require('morgan');
const mainRoute = require('./routes/mainRoute');
const connectionRoute = require('./routes/connectionRoute');
const methodOverride = require('method-override');
const mongoose = require('mongoose');



//create app
const app = express();

//configure app
let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');


//mount the middleware 
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));
app.use('/', mainRoute);
app.use('/', connectionRoute);


//set up routes


//start the server
mongoose.connect('mongodb://localhost:27017/nbadProject', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        //start the server
        app.listen(port, host, () => {
            console.log('Server is running on port', port);
        });
    })
    .catch(err => console.log(err.message));

app.use((req, res, next) => {
    let err = new Error('The server cannot locate' + req.url);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    if (!err.status) {
        err.status = 500;
        err.message = ("Internal Server Error");
    }

    res.status(err.status);
    res.render('error', { error: err });
});

