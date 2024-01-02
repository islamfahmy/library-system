import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Your API",
      version: "1.0.0",
    },
  },
  apis: ["./controller/**/index.ts"], // Specify the paths to your route files
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
