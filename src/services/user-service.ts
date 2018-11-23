import { User } from '../entities/user';

class UserService {
  findByEmailOrUsername(emailOrUsername: string) {
    return User.createQueryBuilder('user')
      .select([
        'user.id',
        'user.password',
        'user.username',
        'user.email',
        'user.is_active'
      ])
      .where('user.email = :emailOrUsername', { emailOrUsername })
      .orWhere('user.username = :emailOrUsername', { emailOrUsername })
      .getOne();
  }

  findByActivationToken(token: string) {
    return User.createQueryBuilder('user')
      .select([
        'user.id',
        'user.password',
        'user.username',
        'user.email',
        'user.is_active'
      ])
      .where('user.activation_token = :token', { token })
      .getOne();
  }

  findById(id: string) {
    return User.findOne({
      where: { id },
      select: ['id', 'username', 'email', 'is_active']
    });
  }
}

export default new UserService();
