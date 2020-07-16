import { createConnection, getConnection } from 'typeorm';

import database from '../../src/utils/env';

import * as request from 'supertest'
import app from '../../src/app';

describe("JWT", () => {
  
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
  
  it("Should send jwt token when user login", async () => {
    const user = {
      name: "thiago",
      email : "thiaggo@gmail.com",
      password: "12345"
    }

    await request(app)
      .post("/users")
      .send(user)

    const {body} = await request(app)
      .post("/login")
      .send(user)
    
    const token = body.token

    expect(!!token).toBeTruthy()
  })
})