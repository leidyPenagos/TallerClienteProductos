import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API RESTFul con Mongoose',
    version: '1.0.0',
    description: 'Documentación de la API de gestión de clientes, productos y pedidos con autenticación JWT.',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor de desarrollo',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], 
};

export default swaggerJSDoc(options);
