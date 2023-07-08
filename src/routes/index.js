import express from 'express'
import animeRoute from './anime.route.js'

const router = express.Router()

router.use('/anime', animeRoute)

export default router