const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();

// serving static files in Express
app.use(express.static(publicPath));

// starts a server on port 3000
app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

