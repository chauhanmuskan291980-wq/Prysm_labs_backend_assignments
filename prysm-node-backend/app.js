const express = require("express");
const app = express();
require('dotenv').config();
const PORT  = 5000;
const authRouter = require('./router/auth.routes');
app.use(express.json());
app.use('/auth', authRouter);

app.listen(PORT,()=>{
    console.log(`Server is runing on ${PORT}`)
})