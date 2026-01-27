const express = require("express");
const app = express();
require('dotenv').config();
const PORT  = 5000;
app.use(express.json());
const authRouter = require('./router/auth.routes');
const userRouter = require("./router/user.router")
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

app.use("/api-docs",swaggerUi.serve , swaggerUi.setup(swaggerSpec));
app.use('/auth', authRouter);
app.use('/',userRouter);

app.listen(PORT,()=>{
    console.log(`Server is runing on ${PORT}`)
})