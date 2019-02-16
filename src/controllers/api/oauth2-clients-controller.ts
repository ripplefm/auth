import { JsonController, Get, Param, NotFoundError } from 'routing-controllers';
import OAuth2ClientService from '../../services/oauth2-client-service';

@JsonController('/api/oauth2/clients')
export class OAuth2ClientController {
  @Get('/:clientName')
  async getClient(@Param('clientName') clientName: string) {
    const client = await OAuth2ClientService.findByName(clientName);
    if (!client) {
      throw new NotFoundError('Client not found');
    }
    return {
      id: client.id,
      name: client.name
    };
  }
}
