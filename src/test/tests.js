import chai, { expect } from "chai"
import chaiHttp from "chai-http"
import { app } from "../index.js"
import crypto from 'crypto'

chai.use(chaiHttp)

let postedId;

describe('Probando rutas de API', () => {
  describe('GET /animes', () => {
    it('Debería retornar codigo 200 y un objeto en la propiedad data', async () => {
      const res = await chai.request(app).get('/anime/')
      expect(res).to.have.status(200)
      expect(res.body).to.have.property('data').that.is.a('object')
    })
    it('Debería retornar un objeto con las propiedades nombre, genero, año y autor', async () => {
      const res = await chai.request(app).get('/anime/')
      expect(res).to.have.status(200)
      const objValue = Object.values(res.body.data)[0]
      expect(objValue).to.have.keys('nombre', 'genero', 'año', 'autor')
    })
  })

  describe('GET /anime/:id', () => {
    it('Debería retornar codigo 200 y un objeto en la propiedad data', async () => {
      const res = await chai.request(app).get('/anime/1')
      expect(res).to.have.status(200)
      expect(res.body).to.have.property('data').that.is.a('object')
    })
    it('La respuesta debería incluir las propiedades nombre, genero, año y autor', async () => {
      const res = await chai.request(app).get('/anime/1')
      expect(res).to.have.status(200)
      expect(res.body.data).to.have.keys('nombre', 'genero', 'año', 'autor')
    })
  })

  describe('POST /anime/', () => {
    it('Debería retornar codigo 201 y un objeto con la propiedad message', async () => {
      const animeToSend = {
        "nombre": "Boku hero academia",
        "genero": "Shonen",
        "año": "2014",
        "autor": "no sabemos"
      }
      const res = await chai.request(app).post('/anime/').send(animeToSend)
      expect(res).to.have.status(201)
      expect(res.body).to.have.property('data').that.is.a('object')
      expect(res.body.data).to.have.keys('nombre', 'genero', 'año', 'autor', 'id')
      expect(res.body).to.have.keys('message', 'data')
      expect(res.body.data.nombre).to.be.equal(animeToSend.nombre)
      expect(res.body.message).to.be.equal('Anime guardado con éxito')
      postedId = res.body.data.id
    })
    it('Debería retornar codigo 400 y un objeto con la propiedad message si no se entregan todos los datos', async () => {
      const animeToSend = {}
      const res = await chai.request(app).post('/anime/').send(animeToSend)
      expect(res).to.have.status(400)
      expect(res.body).to.have.property('message').that.is.a('string')
      expect(res.body.message).to.be.equal('Faltan datos')
    })
  })

  describe('GET /anime/:id', async () => {
    it('Debería encontrar un anime con el id ingresado anteriormente', async () => {
      const res = await chai.request(app).get(`/anime/${postedId}`)
      expect(res).to.have.status(200)
      expect(res.body).to.have.keys('message', 'data')
      expect(res.body.message).to.be.equal('Anime encontrado')
    })
    it('No debería encontrar ningun anime ingresando un Id aleatorio', async () => {
      const res = await chai.request(app).get(`/anime/${crypto.randomUUID()}`)
      expect(res).to.have.status(404)
      expect(res.body).to.have.keys('message')
      expect(res.body.message).to.be.equal('Anime no encontrado')
    })
  })

  describe('UPDATE /anime/:id', async () => {
    it('Debería actualizar el anime con el id ingresado anteriormente', async () => {
      const animeToSend = {
        "nombre": "Boku no hero academia",
        "genero": "Shonen",
        "año": "2014",
        "autor": "Kōhei Horikoshi"
      }
      const res = await chai.request(app).put(`/anime/${postedId}`).send(animeToSend)
      expect(res).to.have.status(200)
      expect(res.body).to.have.keys('message', 'data')
      expect(res.body.data).to.have.keys('nombre', 'genero', 'año', 'autor', 'id')
      expect(res.body.message).to.be.equal('Anime actualizado')
    })
    it('No debería actualizar ningun anime ingresando un Id aleatorio', async () => {
      const res = await chai.request(app).get(`/anime/${crypto.randomUUID()}`)
      expect(res).to.have.status(404)
      expect(res.body).to.have.keys('message')
      expect(res.body.message).to.be.equal('Anime no encontrado')
    })
  })
  describe('DELETE /anime/:id', async () => {
    it('Debería eliminar el anime con el id ingresado anteriormente', async () => {
      const res = await chai.request(app).delete(`/anime/${postedId}`)
      expect(res).to.have.status(200)
      expect(res.body).to.have.keys('message', 'data')
      expect(res.body.data).to.have.keys('nombre', 'genero', 'año', 'autor')
      expect(res.body.message).to.be.equal('Anime eliminado')
    })
    it('No debería actualizar ningun anime ingresando un Id aleatorio', async () => {
      const res = await chai.request(app).get(`/anime/${crypto.randomUUID()}`)
      expect(res).to.have.status(404)
      expect(res.body).to.have.keys('message')
      expect(res.body.message).to.be.equal('Anime no encontrado')
    })
  })


})