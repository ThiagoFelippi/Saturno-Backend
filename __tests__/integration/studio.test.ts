import { getRepository } from 'typeorm';
import { Studio } from './../../src/entity/Studio';
import { createConnection, getConnection } from 'typeorm';

import database from '../../src/utils/env';

import * as request from 'supertest'
import app from '../../src/app';

describe("Studio CRUD", () => {

  beforeAll(async () => {
    await createConnection(database)
  })

  afterAll(async () => {
    await getConnection().close()
  })

  beforeEach(async () => {
    const connection = getConnection("test");
    const entities = connection.entityMetadatas;

    entities.forEach(async (entity) => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });

  })

  // Show
  it("Should be able to find studio by name", async () => {
    const studio = {
      name: "Estudio toca",
      site: "estudioToca.com",
      image: "image.jpeg"
    }

    const {body} = await request(app)
      .post("/studios")
      .set( "authorization" , "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk0NTEzNDMyLCJleHAiOjE1OTQ1OTk4MzJ9.DbOxWVup0YSe6BEiCp1AYf4aq0wkc1YwXY6WdS5A7AY",
)
      .send(studio)

    await request(app)
      .get(`/studios/${body.name}`)
      .set( "authorization" , "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk0NTEzNDMyLCJleHAiOjE1OTQ1OTk4MzJ9.DbOxWVup0YSe6BEiCp1AYf4aq0wkc1YwXY6WdS5A7AY",
)
      .expect(200)
  })


  // Store

  it("Should not be able to create studio if studio with same name already exists", async () => {
    const studio = {
      name: "Estudio toca",
      site: "estudioToca.com"
    }

    await request(app)
      .post("/studios")
      .set( "authorization" , "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk0NTEzNDMyLCJleHAiOjE1OTQ1OTk4MzJ9.DbOxWVup0YSe6BEiCp1AYf4aq0wkc1YwXY6WdS5A7AY")
      .send(studio)

    await request(app)
      .post("/studios")
      .set( "authorization" , "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk0NTEzNDMyLCJleHAiOjE1OTQ1OTk4MzJ9.DbOxWVup0YSe6BEiCp1AYf4aq0wkc1YwXY6WdS5A7AY")
      .send(studio)
      .expect(400)

  })

  it("Should be able to create studio", async () => {
    const studio = {
      name: "sdvx dxc toca",
      site: "dbfxvdxcv.com",
    }

    await request(app)
      .post("/studios")
      .set( "authorization" , "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk0NTEzNDMyLCJleHAiOjE1OTQ1OTk4MzJ9.DbOxWVup0YSe6BEiCp1AYf4aq0wkc1YwXY6WdS5A7AY")
      .send(studio)
      .expect(200)
  })

  // Destroy

  it("Should not be able to delete studio with user not exists", async () => {

    await request(app)
      .delete(`/studios/qualquerid1234`)
      .set( "authorization" , "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk0NTEzNDMyLCJleHAiOjE1OTQ1OTk4MzJ9.DbOxWVup0YSe6BEiCp1AYf4aq0wkc1YwXY6WdS5A7AY")
      .expect(400)
  })

  it("Should be able to delete studio with valid credentials", async () => {
    const studio = {
      name: "wesdvxcesdx toca",
      site: "qewrfd.com"
    }

    const {body} = await request(app)
      .post("/studios")
      .set( "authorization" , "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk0NTEzNDMyLCJleHAiOjE1OTQ1OTk4MzJ9.DbOxWVup0YSe6BEiCp1AYf4aq0wkc1YwXY6WdS5A7AY")
      .send(studio)

    await request(app)
      .delete(`/studios/${body.id}`)
      .set( "authorization" , "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk0NTEzNDMyLCJleHAiOjE1OTQ1OTk4MzJ9.DbOxWVup0YSe6BEiCp1AYf4aq0wkc1YwXY6WdS5A7AY")
      .expect(200)
  })

})
