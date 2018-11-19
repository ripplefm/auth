import { readFileSync } from 'fs';
import * as jwt from 'jsonwebtoken';
import { AccessToken } from '../entities/access-token';
import { OAuth2Client } from '../entities/oauth2-client';
import { User } from '../entities/user';

class TokenService {
  private cert: Buffer;
  private public_cert: Buffer;
  private public_domain: string;

  constructor() {
    this.cert = readFileSync(process.env.PRIVATE_KEY_LOCATION);
    this.public_cert = readFileSync(process.env.PUBLIC_KEY_LOCATION);
    this.public_domain = process.env.PUBLIC_DOMAIN;
  }

  verify(token: string) {
    return jwt.verify(token, this.public_cert, {
      algorithms: ['RS256'],
      issuer: this.public_domain,
      maxAge: '30m'
    });
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
        issuer: this.public_domain,
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
