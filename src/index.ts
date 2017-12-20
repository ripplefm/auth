import * as express from 'express';
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as morgan from 'morgan';
import * as connectRedis from 'connect-redis';
const RedisStore = connectRedis(session);

const app = express();

app.set('view engine', 'pug');

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

app.listen(3000, () => console.log('listening...'));
