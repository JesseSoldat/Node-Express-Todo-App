require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const { mongoose } = require('./db/mongoose');
const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

require('./routes/userRoutes')(app);
require('./routes/todoRoutes')(app);

app.get('*', (req, res) => {
  res.send({'jlab': 'rocking around the clock!'});
});

app.listen(port, () => {
  console.log(`All ears on port ${port}`);
  
});