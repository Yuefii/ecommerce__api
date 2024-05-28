import cors from 'cors'
import morgan from 'morgan'
import express from 'express'
import fileUpload from 'express-fileupload'

import { router } from '../router'
import { HandleError } from '../middleware/handle-error'
import { publicRouter } from '../routes/api-public'
import { privateRouter } from '../routes/api-private'

export const app = express()
app.use(fileUpload())
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(router)
app.use(publicRouter)
app.use(privateRouter)
app.use(HandleError)
