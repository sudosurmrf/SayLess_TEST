const express = require('express');
const app = express();

app.use('/api/v1', require('./api/index.cjs'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`listening on port ${PORT}`)});