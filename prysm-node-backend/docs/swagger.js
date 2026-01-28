const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Prysm Labs Backend API",
    version: "1.0.0",
    description: "Backend API Documentation"
  },
  servers: [
    {
      url: "http://localhost:5002"
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  },
  security: [
    {
      bearerAuth: []
    }
  ]
};

const options = {
  swaggerDefinition,
  apis: ["./router/*.js"],   // 👈 where your route files exist
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
