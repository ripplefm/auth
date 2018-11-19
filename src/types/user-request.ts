import { Request } from 'express';
import { User } from '../entities/user';
export interface UserRequest extends Request {
  user: User;
  claims: any;
  scopes: string[];
}
