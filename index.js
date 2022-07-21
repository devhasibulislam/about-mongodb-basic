const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('express app connected')
})

app.listen(3000, () => {
    console.log('express app listening on port 3000');
})