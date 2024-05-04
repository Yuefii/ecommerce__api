import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerjsdoc from 'swagger-jsdoc';

import { options } from '../../docs/swagger/options';

export const initializeSwagger = (app: express.Application) => {
    const specs = swaggerjsdoc(options);
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
};
