const express = require('express');
const app = express();

// application route
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