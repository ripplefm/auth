import 'reflect-metadata';
import * as path from 'path';
import * as express from 'express';
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as csurf from 'csurf';
import * as morgan from 'morgan';
import * as connectRedis from 'connect-redis';
import flash = require('express-flash');
import { useExpressServer } from 'routing-controllers';
import initDB from './db';
import { errorMiddleware } from './middleware/error-middleware';
import OAuthRouter from './controllers/oauth2-controller';

const RedisStore = connectRedis(session);
const app = express();

app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        frameAncestors: [process.env.PUBLIC_DOMAIN]
      }
    },
    frameguard: {
      action: 'allow-from',
      domain: process.env.PUBLIC_DOMAIN
    }
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    store: new RedisStore({
      host: process.env.REDIS_HOST,
      pass: process.env.REDIS_PASSWORD
    }),
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false
  })
);
app.use(csurf());
app.use(flash());
app.use(morgan('tiny'));

app.use('/oauth2', OAuthRouter);
useExpressServer(app, {
  cors: {
    origin: '*'
  },
  controllers: [
    path.join(__dirname, 'controllers', '*'),
    path.join(__dirname, 'controllers', 'api', '*')
  ],
  defaultErrorHandler: false
});

app.use(errorMiddleware);

initDB().then(() => app.listen(3000, () => console.log('listening...')));

export default app;
