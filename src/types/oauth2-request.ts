import { MiddlewareRequest } from 'oauth2orize';

type Query = { scope: string[] };

export interface OAuth2Request extends MiddlewareRequest {
  query: Query;
}
