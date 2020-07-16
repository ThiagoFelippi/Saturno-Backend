import 'express'

declare module "express"{
  export interface Request{
    id : string | number;
    name: string;
  }
}