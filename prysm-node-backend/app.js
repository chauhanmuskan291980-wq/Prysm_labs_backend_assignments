const express = require("express");
const app = express();
require('dotenv').config();
const PORT  = 5000;
app.use(express.json());
const authRouter = require('./router/auth.routes');
const userRouter = require("./router/user.router");
const taskRouter = require("./router/task.routes");
const customersRouter = require("./router/customer.routes");
const customerRouter = require("./router/customers.routes");
const customersBySearch = require("./router/searchCustomer.router");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

app.use("/api-docs",swaggerUi.serve , swaggerUi.setup(swaggerSpec));
app.use('/auth', authRouter);
app.use("/",customersRouter);
app.use("/",customerRouter);
app.use('/',userRouter);
app.use("/",taskRouter);
app.use("/",customersBySearch);

app.listen(PORT,()=>{
    console.log(`Server is runing on ${PORT}`)
})