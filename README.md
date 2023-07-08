# PRUEBA M6: NODE JS - ANIME REST

Esta es una implementación de una API REST para manejar una lista de animes que está guardada en la memoria local del servidor como un archivo JSON, ubicada específicamente en la ruta `src/mocks/animes.json`.

Para levantar el servidor es necesario clonar este repositorio
`git clone [RUTA - REPO]`

Luego instalar sus dependencias
`npm intall`

Y ejecutarlo
`npm start`

Si quieres ejecutarlo y que vuelva a levantar cada vez que hay cambios (digamos que modo desarrollo)
`npm run dev`

Si quieres ejecutar los test:
`npm run test`

El servidor contiene las siguientes rutas:
- `/animes`: Ruta raíz del manejo de animes
  - GET - `/`: Para obtener todos los animes que hay en el archivo.
  - POST - `/`: Para guardar un nuevo anime.
  - GET- `/:animeId`: Obtiene un anime en específico.
  - PUT - `/:animeId`: Actualiza un anime.
  - DELETE - `/:animeId`: Elimina un anime.

Las tecnologías usadas son
 - Nodemon
 - Morgan
 - Express
 - Dotenv
 - Mocha y Chai