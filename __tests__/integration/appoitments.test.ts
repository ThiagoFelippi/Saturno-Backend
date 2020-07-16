import { getRepository } from 'typeorm';
import { Studio } from './../../src/entity/Studio';
import { createConnection, getConnection } from 'typeorm';

import database from '../../src/utils/env';

import * as request from 'supertest'
import app from '../../src/app';
import { User } from '../../src/entity/User';

describe("appointments", () => {

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
  it("Should be able to find appointment with id", async  () => {

    const appointment = {
      room : "Sala A",
      name: "Thiago Crespo",
      date : "2020-07-10",
    }

    const {body} = await request(app)
      .post("/appointments")
      .send(appointment)
    
    await request(app)
      .get(`/appointments/:${body.id}`)
      .expect(200)
  })

  // Store
  it("Should be able to create appoitment with valid credentials", async () => {
    const user = {
      name : "thiago",
      email: "fcv cvcvc",
      password: "12345"
    }

    const studio = {
      name : "Estudio aeszcx ",
      site : "toca.com",
    }

    const userBody = await request(app)
      .post("/users")
      .send(user)

    const studioBody = await request(app)
      .post("/studios")
      .send(studio)

      
    const userId = userBody.body.id
    const studioId = studioBody.body.id

    const appointment = {
      initial : "14:00",
      end: "16:00",
      room : "Sala A",
      name: "Thiago Crespo",
      date : "2020-07-10",
      user: [ { id : userId } ],
      studio : [ {id : studioId }]
    }

    await request(app)
      .post("/appointments")
      .send(appointment)
      .expect(200)
  })

  // Destroy
  it("Should be able to destroy appoitment", async () => {
    const appointment = {
      initial : "14:00",
      end: "16:00",
      room : "Sala A",
      name: "Thiago Crespo",
      date : "2020-07-10",
    }

    const {body} =await request(app)
      .post("/appointments")
      .send(appointment)

    await request(app)
      .delete(`/appointments/${body.id}`)
      .expect(200)
  })

  it("Should not be able to delete user with user not exists", async () => {
    await request(app)
      .delete("/appointments/:::")
      .expect(400)
  })
})
