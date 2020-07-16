import { createConnection } from 'typeorm';
import app from './app'
import database from './utils/env'
const port = 3003

createConnection(database)
  .then(() => {
    app.listen(port, () => {
      console.log(`App is running on port ${port}`)
    })
  })
  .catch(err => {
    console.log(`Ocorreu um erro ao conectar com o banco ` + err)
  })
