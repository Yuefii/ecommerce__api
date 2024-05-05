import cors from 'cors'
import morgan from 'morgan'
import express from 'express'
import fileUpload from 'express-fileupload'

export const initializeServer = (app: express.Application) => {
  app.use(fileUpload())
  app.use(cors())
  app.use(express.json())
  app.use(morgan('dev'))
}
