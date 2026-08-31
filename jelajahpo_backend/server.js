const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('JelajahPo Backend API berjalan!!  ');
});

app.listen(PORT, () => {
    console.log(`Server JelajahPo berjalan di http://localhost:${PORT}`);
});