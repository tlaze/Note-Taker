const express = require('express');
const routes = require("./Routes/routes.js");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use("/", routes);

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});

