import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AdoptMe API",
      version: "1.0.0",
      description: "Documentacion de la API para la aplicacion Adopt Me",
      termsOfService: "https://example.com/terms",
      contact: {
        name: 'Andher DEV',
        url: 'https://andherdev.com',
        email: 'andherdev82@gmail.com',
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      }
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}