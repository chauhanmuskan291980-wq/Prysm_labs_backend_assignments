const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Prysm Labs Backend API",
      version: "1.0.0",
      description: "API Documentation for Backend Assignment"
    },
    servers: [
      {
        url: "http://localhost:5000"
      }
    ]
  },
  apis: ["./router/*.js"]
};

module.exports = swaggerJsdoc(options);
