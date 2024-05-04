import express from 'express';

import { initializeServer } from './app/initializeServer';
import { initializeSwagger } from './app/initializeSwagger';
import { initializeRoutes } from './app/initializeRoutes';

const app = express();

initializeServer(app);
initializeSwagger(app);
initializeRoutes(app);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
