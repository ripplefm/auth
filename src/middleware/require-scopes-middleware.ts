import { NextFunction, Response } from 'express';
import { UserRequest } from '../types/user-request';
import InvalidScopesError from '../errors/invalid-scopes-error';

export function requireScopeMiddleware(scope: string) {
  return requireAllScopesMiddleware([scope]);
}

export function requireAllScopesMiddleware(scopes: string[]) {
  return function(req: UserRequest, res: Response, next: NextFunction) {
    const filtered = req.scopes.filter(
      scope => scopes.find(s => s === scope) !== undefined
    );
    if (filtered.length === scopes.length) {
      next();
    } else {
      throw new InvalidScopesError(req.scopes, scopes);
    }
  };
}

export function requireOneOfScopesMiddleware(scopes: string[]) {
  return function(req: UserRequest, res: Response, next: NextFunction) {
    const filtered = req.scopes.filter(
      scope => scopes.find(s => s === scope) !== undefined
    );
    if (filtered.length > 0) {
      next();
    } else {
      throw new InvalidScopesError(req.scopes, scopes);
    }
  };
}
