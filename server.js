//declares express dependency
const express = require('express');
//creates link to routes.js
const routes = require("./Routes/routes.js");
//sets app to use express
const app = express();
//uses heroku pork or port 3001
const PORT = process.env.PORT || 3001;

//lets you parse object data within files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//sets express.static to the public folder
app.use(express.static('public'));
//routing option when loading page, routes found on routes.js
app.use("/", routes);

//tells you what port the application is running on
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});

