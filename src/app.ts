import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import swaggerjsdoc from "swagger-jsdoc"
import swaggerUi from 'swagger-ui-express'
import fileUpload from 'express-fileupload';

import express, { Request, Response } from 'express';
import { router } from './router';
import { options } from "../docs/swagger/options"

dotenv.config();
const app = express()
app.use(fileUpload());

// listening PORT
const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})

// Swagger Docs
const specs = swaggerjsdoc(options);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(router);

app.get("/ping", (req: Request, res: Response) => {
    res.status(200).json({
        data: "hello this is works",
    })
})

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        "author": "yuefii",
        "github_author": "https://github.com/yuefii",
        "github_project": "https://github.com/Yuefii/starter-express-typescript",
        "version": "1.0.0"
    })
})
