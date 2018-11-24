import { JsonController, Get, UseBefore, Req } from 'routing-controllers';
import { verifyTokenMiddleware } from '../../middleware/verify-token-middleware';
import { requireScopeMiddleware } from '../../middleware/require-scopes-middleware';
import { UserRequest } from '../../types/user-request';
import UserService from '../../services/user-service';

@JsonController('/api/users')
@UseBefore(verifyTokenMiddleware)
export class UsersController {
  @Get('/me')
  @UseBefore(requireScopeMiddleware('user:email:read'))
  async me(@Req() req: UserRequest) {
    return await UserService.findById(req.user.id);
  }
}
