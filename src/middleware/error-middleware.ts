import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'class-validator';
import InvalidInputError from '../errors/invalid-input-error';
import { QueryFailedError } from 'typeorm';

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
  if (err instanceof ValidationError) {
    req.flash('danger', err.constraints[Object.keys(err.constraints)[0]]);
    return res.render(req.path.substring(1), prevFormFields);
  } else if (err instanceof InvalidInputError) {
    req.flash('danger', err.message);
    return res.render(req.path.substring(1), prevFormFields);
  } else if (err instanceof QueryFailedError) {
    req.flash('danger', err.message);
    return res.render(req.path.substring(1), prevFormFields);
  }
}
