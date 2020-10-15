const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');
const express = require('express');
// const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

require('./database/connection');

const app = express();
const server = http.createServer(app);

// Then use it before your routes are set up:
app.use(cors());

app.use(bodyParser.json()); // parse the body data in json format post by http 
app.use(bodyParser.urlencoded({ extended: true }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res) {
    res.render('index.ejs');
});

app.use('/', require('./routes/endPoints'));


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));