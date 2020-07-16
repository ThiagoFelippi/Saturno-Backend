import { Studio } from './../entity/Studio';
import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";

import database from '../utils/env'


export const index = async (req: Request, res: Response, next: NextFunction) => {
  const users = await getRepository(Studio, database).find({relations: ["appointment"]})
  return res.status(200).send(users)
}

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const {id} = req.params
  const studio = await getRepository(Studio, database).findOne(id, {relations: ["appointment"]})
  res.status(200).send(studio)
}

export const store = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const { name , site, description } = req.body
    const verifyExists = await getRepository(Studio, database).findOne({where: {name}})

    if(!!verifyExists){
        return res.status(400).send("Studio already exists")
    }

    let image;
    if(req.file){
      const {filename} = req.file
      image = `http://localhost:3003/${filename.trim().split(" ").join("%20")}`
    }else{
      image = ""
    }


    const studioCreated = await getRepository(Studio, database).save({name, site, image, description})
    res.status(200).send(studioCreated)
}catch(err){
    res.status(400).send(err)
}

}

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const {id} = req.params
  const studio = await getRepository(Studio, database).findOne(id)
  if(!studio){
    return res.status(400).send("User not exists")
  }
  await getRepository(Studio, database).remove(studio)
  return res.status(200).send({deleted: true})

}
