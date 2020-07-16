import * as express from 'express'
const routes = express.Router()
import {show, store, destroy, index} from '../controller/StudioController'

import * as multer from 'multer'

// Middlewares
import auth from '../middlewares/auth'
import multerConfig from '../middlewares/multer'

routes.get("/studios/", auth, index)

routes.get("/studios/:id", auth, show)

routes.post("/studios", multer(multerConfig).single("file"), auth, store)

routes.delete("/studios/:id", auth, destroy)


export default routes