const express = require('express');
const path = require('path');
const setupProxy = require('./src/setupProxy.js');
const app = express();

app.use(express.static('build'));
setupProxy(app);

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build/index.html'))
})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App started on port ${port}`));
