import * as dotenv from 'dotenv'

const database = process.env.NODE_ENV === "test" ? "test" : "default"

export default database
