const express = require('express');
const mongoose = require('mongoose');
const todo = require('./todo/todo');

// express app initialization
const app = express();
app.use(express.json());

// mongodb connection with mongoose
mongoose.connect('mongodb://localhost/todo')
    .then(() => console.log('connection successful.'))
    .catch((error) => console.log(error))

// application route
app.use('/todo', todo);

// default check route
app.get('/', (req, res) => {
    res.send('express app connected')
})

// default error handler
app.use((err, req, res, next) => {
    if (err.headersSent) {
        return next(err);
    } else {
        res.status(500).json({ error: err });
    }
})

app.listen(3000, () => {
    console.log('express app listening on port 3000');
})