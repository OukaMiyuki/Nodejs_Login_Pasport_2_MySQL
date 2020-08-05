const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const db = require('./Config/db');
require('dotenv').config();
require('./Web/routes')(app);

app.use(expressLayouts);
app.set('view engine', 'ejs');

db.authenticate()
    .then(() => {
        console.log('Database terkoneksi!');
    })
    .catch((err) => console.log('Internal Server Error!'));

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server started on port ${port}...`);
});