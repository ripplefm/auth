import { User } from '../entities/user';

export type TokenClaims = {
  scopes: string[];
  user: User;
  iat: Date;
  exp: Date;
  aud: string;
  iss: string;
};
