const express = require('express');
const app = express();
const db = require('./Config/db');
require('dotenv').config();
require('./Web/routes')(app);

db.authenticate()
    .then(() => {
        console.log('Database terkoneksi!');
    })
    .catch((err) => console.log('Internal Server Error!'));

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server started on port ${port}...`);
});