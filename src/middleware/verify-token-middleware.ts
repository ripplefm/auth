import { NextFunction, Response } from 'express';
import { UserRequest } from '../types/user-request';
import TokenService from '../services/token-service';
import { UnauthorizedError } from 'routing-controllers';

export function verifyTokenMiddleware(
  req: UserRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.header('authorization');
  if (authHeader === undefined) {
    throw new UnauthorizedError(
      'Missing Authorization header with access token'
    );
  }
  const token = authHeader.substring('Bearer '.length);
  const tokenRes = TokenService.verify(token);
  if (tokenRes === undefined) {
    throw new UnauthorizedError('Invalid or expired access token provided');
  }
  req.user = tokenRes.user;
  req.scopes = tokenRes.scopes;

  next();
}
