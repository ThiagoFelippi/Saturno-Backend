import { Appoitments } from './../entity/Appointments';
import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";

import database from '../utils/env'

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const {id} = req.params
  const appoitments = await getRepository(Appoitments, database).findOne(id, {relations: ["studioId", "userId"]})
  res.status(200).send(appoitments)
}

export const store = async (req: Request, res: Response, next: NextFunction) => {
try{
  const {date, user, studio, room, name, initial, end} = req.body
  const appoitmentCreated = await getRepository(Appoitments, database).save({date, userId: user, studioId: studio, room, name, initial, end})
  res.status(200).send(appoitmentCreated)
}catch(err){
  res.status(400).send(err)
}

}

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const {id} = req.params
  const appointment = await getRepository(Appoitments, database).findOne(id)
  if(!appointment){
    return res.status(400).send("Appointment not exists")
  }
  await getRepository(Appoitments, database).remove(appointment)
  res.status(200).send({deleted: true})

}
