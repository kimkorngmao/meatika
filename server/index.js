const express = require('express');
const app = express();
const accountRoute = require('./routes/accountRoute');
const articleRoute = require('./routes/articleRoute');
const categoryRoute = require('./routes/categoryRoute');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config()

// Middleware
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS
}));
  
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Router
app.use('/accounts', accountRoute);
app.use('/articles', articleRoute);
app.use('/categories', categoryRoute);

// Database connection
mongoose.connect(process.env.DB_CONNECT_STR)
.then(()=>{
    app.listen(process.env.PORT, () => {
      console.log("Server listening on Port", process.env.PORT, "http://localhost:"+process.env.PORT);
});
})