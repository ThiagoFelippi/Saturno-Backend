import * as express from 'express'
const routes = express.Router()
import {show, store, destroy} from '../controller/AppoitmentsController'
import auth from '../middlewares/auth'

routes.get("/appointments/:id", auth, show)

routes.post("/appointments", auth, store)

routes.delete("/appointments/:id", auth, destroy)

export default routes