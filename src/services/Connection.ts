import { createConnection } from 'typeorm'

const Connection: Promise<any> = createConnection()

export default Connection
