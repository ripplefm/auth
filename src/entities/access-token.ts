import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { User } from './user';
@Entity('access_tokens')
export class AccessToken extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column() token: string;

  @Column({ name: 'expires_at' })
  expiresAt: Date;

  @Column('simple-array') scopes: string[];

  @ManyToOne(type => User, user => user.tokens)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
