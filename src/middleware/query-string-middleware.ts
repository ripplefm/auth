import { NextFunction, Request, Response } from 'express';
import { parse } from 'url';

export function queryStringMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { query } = parse(req.url);
  res.locals.queryString = query ? `?${query}` : '';
  next();
}
