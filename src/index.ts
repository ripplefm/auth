import 'reflect-metadata';
import * as path from 'path';
import * as express from 'express';
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as morgan from 'morgan';
import * as connectRedis from 'connect-redis';
import initDB from './db';
const RedisStore = connectRedis(session);
const app = express();

app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    store: new RedisStore({
      host: process.env.REDIS_HOST
    }),
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false
  })
);
app.use(morgan('tiny'));

initDB().then(() => app.listen(3000, () => console.log('listening...')));
