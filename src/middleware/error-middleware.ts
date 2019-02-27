import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'class-validator';
import { QueryFailedError } from 'typeorm';
import InvalidInputError from '../errors/invalid-input-error';
import InvalidScopesError from '../errors/invalid-scopes-error';
import { QueryFailedDetailError } from '../errors/query-failed-detail-error';
import OAuth2Error from '../errors/oauth2-error';
import { HttpError } from 'routing-controllers';
const AuthorizationError = require('oauth2orize/lib/errors/authorizationerror');

interface PrevFormFields {
  [key: string]: string;
}

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next?: NextFunction
) {
  const prevFormFields: PrevFormFields = {};
  Object.keys(req.body).forEach(
    param => (prevFormFields[`prev_${param}`] = req.body[param])
  );
  if (!res.headersSent) {
    if (err instanceof ValidationError) {
      req.flash('danger', err.constraints[Object.keys(err.constraints)[0]]);
      return res.render(req.path.substring(1), prevFormFields);
    } else if (err instanceof InvalidInputError) {
      req.flash('danger', err.message);
      return res.render(req.path.substring(1), prevFormFields);
    } else if (err instanceof QueryFailedError) {
      req.flash('danger', (err as QueryFailedDetailError).detail);
      return res.render(req.path.substring(1), prevFormFields);
    } else if (
      err instanceof OAuth2Error ||
      err instanceof AuthorizationError
    ) {
      return res.status(400).send(err.message);
    } else if (err instanceof InvalidScopesError) {
      return res.status(403).json({
        error: err.message,
        providedScopes: err.providedScopes,
        requiredScopes: err.requiredScopes
      });
    } else if (err instanceof HttpError) {
      return res.status(err.httpCode).json({ error: err.message });
    } else {
      console.error('Uncaught exception. HTTP 500');
      console.error(err);
      return res.status(500).send('Unknown error occurred.');
    }
  }
}
