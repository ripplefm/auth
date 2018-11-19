import * as program from 'commander';
import initDB from '../db';

(async () => {
  const connection = await initDB();
  program.version('0.1.0', '-v, --version');

  program
    .command('migrate')
    .action(async _ => await connection.runMigrations());

  program.parse(process.argv);
})();
