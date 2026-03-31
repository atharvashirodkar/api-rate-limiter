const express = require('express');
const app = express();

const PORT = 3300;

// middleware
app.use(express.json());


app.get('/ping', (req, res) => {
  res.json({ status: 'ok'});
})

app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`);
})