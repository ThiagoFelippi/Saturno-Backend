import { createConnection, getConnection } from 'typeorm';

import database from '../../src/utils/env';

import * as request from 'supertest'
import app from '../../src/app';

import * as bcrypt from 'bcryptjs'

interface IUser {
  id : number;
  name : string;
  email : string;
  password_hash : string;
  image: string;
}

interface User{
  user: IUser
}

interface Body {
  body: User
}

describe("Bcrypt on create user", () => {
  
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
  
  it("Should encrypt user password on create user", async () => {
    const user = {
      name : "thiago",
      email : "thiago@gmail.com",
      password: "12345"
    }

    const {body} : Body = await request(app)
      .post("/users")
      .send(user)

    const comparePassword = await bcrypt.compare(user.password, body.user.password_hash)

    expect(comparePassword).toBeTruthy()
  })
})