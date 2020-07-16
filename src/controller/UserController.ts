import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'


import database from '../utils/env'

const generateToken = async (params = {}) => {
    const token = await jwt.sign(params, process.env.SECRET, {
        expiresIn: 86400
    })
    return token
}

// CRUD


export const show = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req
    const user = await getRepository(User, database).findOne(id, {relations: ["appointment"]})
    if(user){
        return res.status(200).send(user)
    }
    res.status(400).send("User not exists")
}

export const store = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { name , email, password } = req.body
        const password_hash = await bcrypt.hash(password, 10)
        const verifyExists = await getRepository(User, database).findOne({where: {email}})

        if(verifyExists){
            return res.status(400).send("User already exists")
        }

        let image;
        if(req.file){
            const {filename} = req.file
            image = `http://localhost:3003/${filename.trim().split(" ").join("%20")}`
        }else{
            image = ""
        }


        const token = jwt.sign({}, process.env.SECRET, {
            expiresIn: 86400
        })

        const user = await getRepository(User, database).save({...req.body, password_hash, image})
        res.status(200).send({user, token})
     
    }catch(err){
        res.status(400).send(err)
    }
    
}

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params
    const user = await getRepository(User, database).findOne(id)
    if(user){
        const userToRemove = await getRepository(User, database).update(id, {
            ...user,
            deleted: 1
        })
    
        return res.status(200).send({deleted: true})
    }

    res.status(400).send("User not exists")
}

// Login
export const login = async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body

    const verifyEmail = await getRepository(User, database).findOne({where: {email}})
    if(verifyEmail){
        const verifyPassword = await bcrypt.compare(password, verifyEmail.password_hash)
        if(verifyPassword){
            const token = await generateToken({
                id: verifyEmail.id,
            })
            return res.status(200).send({user : verifyEmail, token})
        }
        return res.status(400).send("Invalid password")
    }

    res.status(400).send("User not found")
}