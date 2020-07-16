import { getRepository } from 'typeorm';
import { createConnection, getConnection } from 'typeorm';

import database from '../../src/utils/env';

import * as request from 'supertest'
import app from '../../src/app';
import { User } from '../../src/entity/User';

describe("User CRUD", () => {

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

  it("Should be return error when user try find user with invalid id", async () => {
    await request(app)
      .get("/users/asdfghgsdfgdfgb")
      .set("authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk0NTEzNDMyLCJleHAiOjE1OTQ1OTk4MzJ9.DbOxWVup0YSe6BEiCp1AYf4aq0wkc1YwXY6WdS5A7AY")
      .expect(400)
  })

  it("Should be able to find user by id", async () => {
    const user = {
      name : "Thiago",
      email: "thiago@gmail.com",
      password: "12345"
    }

    const {body} = await request(app)
      .post("/users")
      .send(user)

    await request(app)
      .get(`/users/${body.user.id}`)
      .set("authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk0NTEzNDMyLCJleHAiOjE1OTQ1OTk4MzJ9.DbOxWVup0YSe6BEiCp1AYf4aq0wkc1YwXY6WdS5A7AY")
      .expect(200)

  })

  // Store

  it("Should not be able to create user with invalid credentials", async () => {
    const user = {
      name : "Thiago",
      email: "thiago@gmail.com",
    }

    const userCreated = await request(app)
      .post("/users")
      .set("authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk0NTEzNDMyLCJleHAiOjE1OTQ1OTk4MzJ9.DbOxWVup0YSe6BEiCp1AYf4aq0wkc1YwXY6WdS5A7AY")
      .send(user)
      .expect(400)
  })

  it("Should be able to create user with valid credentials", async () => {
    const user = {
      name : "Thiago",
      email: "thiago@gmail.com",
      password: "12345",
      image: "image.jpg"
    }

    const userCreated = await request(app)
      .post("/users")
      .set("authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk0NTEzNDMyLCJleHAiOjE1OTQ1OTk4MzJ9.DbOxWVup0YSe6BEiCp1AYf4aq0wkc1YwXY6WdS5A7AY")
      .send(user)
      .expect(200)

  })

  // Destroy ( Soft Delete )

  it("it should be able to make soft delete on users", async () => {
    const user = {
      name : "Thiago",
      email: "thiago@gmail.com",
      password: "12345"
    }

    const {body} = await request(app)
      .post("/users")
      .send(user)

      const userToRemove = await request(app)
      .delete(`/users/${body.user.id}`)
      .set("authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk0NTEzNDMyLCJleHAiOjE1OTQ1OTk4MzJ9.DbOxWVup0YSe6BEiCp1AYf4aq0wkc1YwXY6WdS5A7AY")
      .expect(200)
      
  })

})