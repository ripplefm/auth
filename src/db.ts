import * as path from 'path';
import { createConnection } from 'typeorm';

export default async function() {
  const connection = await createConnection({
    type: 'postgres',
    url: process.env.POSTGRES_URL,
    synchronize: false,
    entities: [path.join(__dirname, 'entities', '*')],
    migrations: [path.join(__dirname, 'migrations', '*')],
    migrationsRun: true,
    logging: process.env.NODE_ENV !== 'production'
  });

  return connection;
}
