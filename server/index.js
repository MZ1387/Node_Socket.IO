const path = require('path');
const express = require('express');

let app = express();

const publicPath = path.join(__dirname, '../public')

app.use(express.static(publicPath))

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT: ${PORT}`);
})
