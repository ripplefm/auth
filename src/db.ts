import * as path from 'path';
import { createConnection } from 'typeorm';

const numRetries = process.env.DB_RETRIES || 5;
let numTries = 0;

function connect() {
  return createConnection({
    type: 'postgres',
    url: process.env.POSTGRES_URL,
    synchronize: false,
    entities: [path.join(__dirname, 'entities', '*')],
    migrations: [path.join(__dirname, 'migrations', '*')],
    migrationsRun: true,
    logging: process.env.NODE_ENV !== 'production'
  });
}

function sleep(durationMs = 1000) {
  return new Promise(resolve => setTimeout(resolve, durationMs));
}

export default async function() {
  while (numTries < numRetries) {
    try {
      return await connect();
    } catch (e) {
      await sleep(1000);
      numTries++;
    }
  }
  throw new Error(
    'Reached maximum number of retries for connecting to database'
  );
}
