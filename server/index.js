// npm run dev

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//middleware
app.use(bodyParser.json());
app.use(cors());

const projects = require('./routes/api/projects');
app.use('/api/projects', projects);

//port for heroku or 5000 (a port for our localhost)
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`)); //huomaa, et täytyy olla ` eikä '


