import { fileToJson, saveFile } from "../helpers/fileHandle.js"
import { randomUUID } from 'crypto'


const animePath = '../mocks/animes.json'

const getAnimes = async (req, res) => {
  try {
    const animeList = await fileToJson(import.meta.url, animePath)
    res.status(200).json({ data: { ...animeList }, message: 'Lista obtenida con éxito' })
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' })
  }
}

const getAnime = async (req, res) => {
  try {
    const animeList = await fileToJson(import.meta.url, animePath)
    const anime = animeList[req.params.animeId]
    if (anime) {
      return res.status(200).json({ data: anime, message: "Anime encontrado" })
    }
    return res.status(404).json({ message: 'Anime no encontrado' })
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor' })
  }
}

const createAnime = async (req, res) => {
  try {
    const { nombre, genero, año, autor } = req.body
    if (nombre && genero && año && autor) {
      const id = randomUUID()
      const animeList = await fileToJson(import.meta.url, animePath)
      animeList[id] = { nombre, genero, año, autor, }
      await saveFile(import.meta.url, animePath, animeList)
      return res.status(201).json({ data: { id, nombre, genero, año, autor }, message: 'Anime guardado con éxito' })
    }
    return res.status(400).json({ message: 'Faltan datos' })
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor' })
  }
}

const updateAnime = async (req, res) => {
  try {
    const { nombre, genero, año, autor } = req.body
    const id = req.params.animeId
    const animeList = await fileToJson(import.meta.url, animePath)
    if (Object.keys(animeList).some(key => key === id)) {
      animeList[id] = {
        nombre: nombre || animeList[id].nombre,
        genero: genero || animeList[id].genero,
        año: año || animeList[id].año,
        autor: autor || animeList[id].autor,
      }
      await saveFile(import.meta.url, animePath, animeList)
      return res.json({ data: { id, ...animeList[id] }, message: 'Anime actualizado' })
    }
    return res.status(404).json({ message: 'Anime no encontrado.' })

  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor' })
  }
}

const deleteAnime = async (req, res) => {
  try {
    const id = req.params.animeId
    const animeList = await fileToJson(import.meta.url, animePath)
    if (Object.keys(animeList).some(key => key === id)) {
      const anime = structuredClone(animeList[id])
      const { [id]: _, ...newAnimeList } = animeList
      await saveFile(import.meta.url, animePath, newAnimeList)
      res.set('Content-Type', 'application/json')
      return res.status(200).json({ data: { ...anime }, message: 'Anime eliminado' })
    }
    return res.status(404).json({ message: 'Anime no encontrado' })

  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor' })
  }
}



const animeController = {
  createAnime, deleteAnime, getAnime, getAnimes, updateAnime
}

export default animeController