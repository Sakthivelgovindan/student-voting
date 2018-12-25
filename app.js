const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const vote = require('./routes/vote');
require('./config/db');
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use('/vote', vote);

app.listen(app.get('port'), () => console.log('Server listen on port', app.get('port')));
