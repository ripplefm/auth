import * as randomstring from 'randomstring';
import { OAuth2Client } from '../entities/oauth2-client';

class OAuthClientService {
  create(
    name: string,
    description: string,
    redirectUris: string[],
    isTrusted: boolean
  ) {
    const client = OAuth2Client.create({
      clientSecret: randomstring.generate(64),
      name,
      description,
      redirectUris,
      isTrusted
    });

    return client.save();
  }

  findById(id: string) {
    return OAuth2Client.findOne({ where: { id } });
  }
}

export default new OAuthClientService();
