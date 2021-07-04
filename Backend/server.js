const express = require('express');
const app = express();
const cors = require('cors');
const pool=require("./db");
const port = process.env.PORT || 5000;

require('dotenv').config();

//middleware
app.use(cors());
app.use(express.static('public'));
app.use(express.json({
    type: ['application/json', 'text/plain']
  }));

//app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
