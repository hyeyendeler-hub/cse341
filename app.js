
import express from 'express';
import router from './src/router.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();

app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Books and Authors API',
      version: '1.0.0',
      description: 'API for managing books and authors'
    },
    components: {
      schemas: {
        Author: {
          type: 'object',
          required: ['id', 'name', 'birthYear'],
          properties: {
            id: { type: 'string', example: 'a1' },
            name: { type: 'string', example: 'Maya Rivera' },
            birthYear: { type: 'integer', example: 1990 }
          }
        }
      }
    }
  },
  apis: ['./src/router.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

app.use(router);

export default app;