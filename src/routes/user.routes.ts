import * as express from 'express'
const routes = express.Router()
import {show, store, destroy, login} from '../controller/UserController'

import * as multer from 'multer'

// Middlewares
import multerConfig from '../middlewares/multer'
import auth from '../middlewares/auth'

// CRUD 
routes.get("/users", auth, show)

routes.post("/users", multer(multerConfig).single("file") ,store)

routes.delete("/users/:id", auth, destroy)

// Login
routes.post("/login", login)

export default routes