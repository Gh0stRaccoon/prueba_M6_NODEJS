import dotenv from 'dotenv'
dotenv.config()



export default {
  general: {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV
  }
}