import TokenService from '../services/token-service';
import OAuthClientService from '../services/oauth2-client-service';
import OAuth2Error from '../errors/oauth2-error';
import { OAuth2Client } from '../entities/oauth2-client';
import { User } from '../entities/user';
import { Request } from 'express';

class OAuth2Service {
  async validate(clientId: string, redirectUri: string, done: Function) {
    try {
      const client = await OAuthClientService.findById(clientId);
      if (!client.redirectUris.find(uri => redirectUri.startsWith(uri))) {
        return done(null, false);
      }
      return done(null, client, redirectUri);
    } catch (e) {
      done(new OAuth2Error('invalid_client'));
    }
  }

  skipTrusted(
    client: OAuth2Client,
    user: User,
    scope: string[],
    type: string,
    areq: Request,
    done: Function
  ) {
    if (client.isTrusted) {
      return done(null, true, { scope }, null);
    }
    return TokenService.findByUserIdAndClientId(user.id, client.id)
      .then(token => done(null, true, { scope }, null))
      .catch(() => done(null, false, {}, null));
  }
}

export default new OAuth2Service();
