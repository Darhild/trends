const express = require('express');
const path = require('path');
const app = express();
const API_URL = 'http://84.201.160.40:8080';
const axios = require('axios');

app.use(express.static('build'));
app.get('/api/*', (req, res) => {
    axios.get(`${API_URL}${req.originalUrl}`)
        .then((response) => {
            res.json(response.data)
        })
        .catch( e => {
            res.status(404)
            res.send(e)
        })
});

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build/index.html'))
})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App started on port ${port}`));
