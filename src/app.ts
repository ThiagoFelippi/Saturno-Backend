import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from 'cors'
import * as path from 'path'

import userRoutes from './routes/user.routes'
import studioRoutes from './routes/studio.routes'
import appointmentRoutes from './routes/appoitments.routes'

interface App{
    app: express.Application
}

class AppController implements App{
    app: express.Application

    constructor(){
        this.app = express()

        this.middlewares()
        this.routes()
    }

    middlewares(){
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({extended: true}))
        this.app.use(cors())

        this.app.use(express.static(path.resolve(__dirname, "..", "uploads")))
    }

    routes(){
        this.app.use(userRoutes)
        this.app.use(studioRoutes)
        this.app.use(appointmentRoutes)
    }
}

export default new AppController().app