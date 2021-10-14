const express = require('express');
const app = express();
const fs = require('fs');
const PORT = 3001;
const path = require('path');

app.use(express.static('Develop/public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
    });

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, 'develop/public/notes.html'))
    });

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
})

