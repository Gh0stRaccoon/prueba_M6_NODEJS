import express from 'express'
import animeController from '../controllers/anime.controller.js'

const router = express.Router()

router.route('/')
  .get(animeController.getAnimes)
  .post(animeController.createAnime)

router.route('/:animeId')
  .get(animeController.getAnime)
  .put(animeController.updateAnime)
  .delete(animeController.deleteAnime)

export default router