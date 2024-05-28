import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import swaggerjsdoc from 'swagger-jsdoc'

import { options } from '../docs/swagger/options'
import { app } from './libs/express'

dotenv.config()

// listening PORT
const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})

// Swagger Docs
const specs = swaggerjsdoc(options)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs))

app.get('/', (req, res) => {
  res.status(200).json({
    author: 'yuefii',
    github_author: 'https://github.com/yuefii',
    github_project: 'https://github.com/Yuefii/starter-express-typescript',
    version: '1.0.0'
  })
})
