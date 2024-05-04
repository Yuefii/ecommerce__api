import express from 'express';

import { router } from '../router';

export const initializeRoutes = (app: express.Application) => {
    app.use(router);

    app.get('/ping', (req, res) => {
        res.status(200).json({
            data: 'hello this is works',
        });
    });

    app.get('/', (req, res) => {
        res.status(200).json({
            author: 'yuefii',
            documentation: 'http://localhost:8080/docs',
            github_author: 'https://github.com/yuefii',
            github_project: 'https://github.com/Yuefii/starter-express-typescript',
            version: '1.0.0',
        });
    });
};
