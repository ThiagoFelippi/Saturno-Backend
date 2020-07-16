import {  Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'

interface Decode{
  id : string | number;
}

const auth = async (req: Request,res : Response,next : NextFunction) => {
  const header = req.headers.authorization

  if(!header){
    return res.status(401).send("Empty header")
  }

  const [Bearer, token] = header.split(" ")

  if(!Bearer || !token){
    return res.status(401).send("Token mallformated")
  }

  try{
    const decode = await jwt.verify(token, process.env.SECRET)
    const {id} =  decode as Decode

    req.id = id
    next()
  }catch(err){
    res.status(401).send("Invalid token")
  }
}

export default auth