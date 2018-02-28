import {
  Controller,
  Get,
  Param,
  Post,
  Redirect,
  Req
} from 'routing-controllers';
import { Request } from 'express';
import UserService from '../services/user-service';

@Controller('/activate')
export class ActivationController {
  @Get('/:token')
  @Redirect('/?activated=false')
  async activate(@Req() req: Request, @Param('token') token: string) {
    const user = await UserService.findByActivationToken(token);
    if (user && !user.is_active) {
      user.is_active = true;
      await user.save();
      req.session.user = user;
      return '/?activated=true';
    } else if (user && user.is_active) {
      return '/?activated=false&activation_error=already_activated';
    } else {
      return '/?activated=false&activation_error=invalid_token';
    }
  }
}
