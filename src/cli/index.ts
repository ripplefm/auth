import * as program from 'commander';
import initDB from '../db';
import OAuth2ClientService from '../services/oauth2-client-service';

(async () => {
  const connection = await initDB();
  program.version('0.1.1', '-v, --version');

  program
    .command('migrate')
    .action(async _ => await connection.runMigrations());

  program
    .command('createOAuth2Client <name> <redirectUris...>')
    .option('-t, --trusted', 'Whether or not this client is trusted')
    .action(async (name, redirectUris, cmd) => {
      try {
        const client = await OAuth2ClientService.create(
          name,
          'default description',
          redirectUris,
          cmd.trusted
        );
        console.log('Successfully created client:', client);
      } catch (err) {
        console.error('Error creating client:', err);
      }
    });

  program.parse(process.argv);
})();
