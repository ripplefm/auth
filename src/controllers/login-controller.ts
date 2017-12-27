import {
  BodyParam,
  Controller,
  Get,
  Post,
  Redirect,
  Req,
  Res,
  UseBefore
} from 'routing-controllers';
import { Request, Response } from 'express';
import {
  nextRedirectMiddleware,
  getNextRedirectUrl
} from '../middleware/next-redirect-middleware';
import { queryStringMiddleware } from '../middleware/query-string-middleware';
import InvalidInputError from '../errors/invalid-input-error';
import UserService from '../services/user-service';

@Controller('/login')
export class LoginController {
  @Get()
  @UseBefore(nextRedirectMiddleware)
  @UseBefore(queryStringMiddleware)
  index(@Req() req: Request, @Res() res: Response) {
    if (req.session.user) {
      return res.redirect(getNextRedirectUrl(req));
    }
    return res.render('login', {
      registerURL: `/register${res.locals.queryString}`
    });
  }

  @Post()
  @Redirect('/')
  async login(
    @Req() req: Request,
    @Res() res: Response,
    @BodyParam('emailOrUsername') emailOrUsername: string,
    @BodyParam('password') password: string
  ) {
    const user = await UserService.findByEmailOrUsername(emailOrUsername);
    if (user) {
      if (await user.comparePassword(password)) {
        req.session.user = user;
        return getNextRedirectUrl(req);
      }
      throw new InvalidInputError('Incorrect password');
    } else {
      throw new InvalidInputError(
        'User with given email or username does not exist'
      );
    }
  }
}
