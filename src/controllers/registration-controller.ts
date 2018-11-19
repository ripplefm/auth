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
import { User } from '../entities/user';
import InvalidInputError from '../errors/invalid-input-error';
import EmailService from '../services/email-service';

@Controller('/register')
export class RegistrationController {
  @Get()
  @UseBefore(nextRedirectMiddleware)
  @UseBefore(queryStringMiddleware)
  index(@Req() req: Request, @Res() res: Response) {
    if (req.session.user) {
      return res.redirect(getNextRedirectUrl(req));
    }
    return res.render('register', {
      loginURL: `/login${res.locals.queryString}`,
      csrfToken: req.csrfToken()
    });
  }

  @Post()
  @Redirect('/')
  async create(
    @Req() req: Request,
    @BodyParam('email') email: string,
    @BodyParam('username') username: string,
    @BodyParam('password') password: string,
    @BodyParam('confirmPassword') confirmPassword: string
  ) {
    if (password !== confirmPassword) {
      throw new InvalidInputError('Passwords must match');
    }
    const user = User.create({ email, username, password });
    await user.save();
    req.session.user = user;
    await EmailService.sendActivationEmail(user);
    return getNextRedirectUrl(req);
  }
}
