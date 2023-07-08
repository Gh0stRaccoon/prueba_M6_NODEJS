import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import router from './routes/index.js'
const app = express()

const port = process.env.PORT || 5000

dotenv.config()
process.env.NODE_ENV !== 'production' && app.use(morgan('dev'))
app.use(express.json())

app.use('/', router)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

export { app }