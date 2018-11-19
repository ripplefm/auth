import { QueryFailedError } from 'typeorm';

// Fix for TypeORMs QueryFailedError not having the 'detail' property
export class QueryFailedDetailError extends QueryFailedError {
  detail: string;
}
