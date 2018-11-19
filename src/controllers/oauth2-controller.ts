import { Router, Response } from 'express';
import * as oauth2orize from 'oauth2orize';
import { OAuth2Request } from '../types/oauth2-request';
import { ensureLoggedInMiddleware } from '../middleware/ensure-logged-in-middleware';
import OAuthClientService from '../services/oauth2-client-service';
import TokenService from '../services/token-service';
import ScopeService from '../services/scope-service';
import OAuth2Service from '../services/oauth2-service';
import OAuth2Error from '../errors/oauth2-error';

const server = oauth2orize.createServer();

const OAuthRouter = Router();

server.grant(
  oauth2orize.grant.token((client, user, ares, done) => {
    TokenService.create(ScopeService.normalize(ares.scope), client, user)
      .then(token => done(null, token.token))
      .catch(err => done(err));
  })
);

server.serializeClient((client, done) => done(null, client.id));

server.deserializeClient((id, done) =>
  OAuthClientService.findById(id)
    .then(client => done(null, client))
    .catch(err => done(err))
);

OAuthRouter.get(
  '/authorize',
  ensureLoggedInMiddleware,
  server.authorization(OAuth2Service.validate, OAuth2Service.skipTrusted),
  (req: OAuth2Request, res: Response) => {
    // const { transactionID, user, client } = req.oauth2;
    // res.render('authorize', {
    //   transactionID,
    //   user,
    //   scopes: ScopeService.normalize(req.query.scope),
    //   client
    // });
    throw new OAuth2Error('Only trusted clients are currently supported');
  }
);

OAuthRouter.post('/authorize', ensureLoggedInMiddleware, server.decision);

export default OAuthRouter;
