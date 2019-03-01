import { readFileSync } from 'fs';
import * as jwt from 'jsonwebtoken';
import { TokenClaims } from '../types/token-claims';
import { AccessToken } from '../entities/access-token';
import { OAuth2Client } from '../entities/oauth2-client';
import { User } from '../entities/user';

class TokenService {
  private cert: Buffer;
  private public_cert: Buffer;

  constructor() {
    this.cert = readFileSync(process.env.PRIVATE_KEY_LOCATION);
    this.public_cert = readFileSync(process.env.PUBLIC_KEY_LOCATION);
  }

  verify(token: string): TokenClaims | undefined {
    try {
      return jwt.verify(token, this.public_cert, {
        algorithms: ['RS256'],
        issuer: 'ripple.fm',
        maxAge: '30m'
      }) as TokenClaims;
    } catch (err) {
      return undefined;
    }
  }

  findByUserIdAndClientId(userId: string, clientId: string) {
    return AccessToken.createQueryBuilder('token')
      .where('token.user_id = :userId', { userId })
      .andWhere('token.client_id = :clientId', { clientId })
      .getOne();
  }

  create(scopes: string[], client: OAuth2Client, user: User) {
    const token = jwt.sign(
      {
        scopes,
        user: {
          id: user.id,
          username: user.username,
          is_active: user.is_active
        }
      },
      this.cert,
      {
        algorithm: 'RS256',
        expiresIn: '30m',
        issuer: 'ripple.fm',
        audience: client.id
      }
    );
    const accessToken = AccessToken.create({
      token,
      expiresAt: new Date(Date.now() + 60000 * 30),
      scopes,
      client,
      user
    });
    return accessToken.save();
  }
}
export default new TokenService();
