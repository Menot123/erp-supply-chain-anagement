import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API Documentation For Customer Service',
        version: '1.0.0',
        description: 'Documentation for the API endpoints of  Customer Service',
    },
    servers: [{
        url: 'http://localhost:8086', // Thay đổi đường dẫn tùy theo cấu hình server của bạn
    },],
};

const options = {
    swaggerDefinition,
    apis: ['./src/route/*.js'], // Đường dẫn đến file chứa định nghĩa của các API
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
    app.use('/api/swagger-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: false }));
};

export default setupSwagger;