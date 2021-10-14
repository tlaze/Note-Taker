const express = require('express');
const app = express();
const fs = require('fs');
const PORT = 3001;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
})

