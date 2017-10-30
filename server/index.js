'use strict';

const app = require('./app'),
      PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`REST API running on ${PORT}!`);
});
