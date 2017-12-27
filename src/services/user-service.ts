import { User } from '../entities/user';

class UserService {
  findByEmailOrUsername(emailOrUsername: string) {
    return User.createQueryBuilder('user')
      .select(['user.id', 'user.password', 'user.username', 'user.email'])
      .where('user.email = :emailOrUsername', { emailOrUsername })
      .orWhere('user.username = :emailOrUsername', { emailOrUsername })
      .getOne();
  }
}

export default new UserService();
