
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to BEMAX AI server!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
