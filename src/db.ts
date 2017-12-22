import * as path from 'path';
import { Connection, createConnection } from 'typeorm';

export default async function() {
  const connection = await createConnection({
    type: 'postgres',
    url: process.env.POSTGRES_URL,
    synchronize: true,
    entities: [path.join(__dirname, 'entities', '*.js')],
    logging: process.env.NODE_ENV !== 'production'
  });

  return connection;
}
