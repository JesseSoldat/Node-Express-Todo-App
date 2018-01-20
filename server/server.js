const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.get('*', (req, res) => {
  res.send({'jlab': 'rocking around the clock!'});
});

app.listen(port, () => {
  console.log(`All ears on port ${port}`);
  
});