import ValidatedEntity from '../utils/validated-entity';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Length, IsEmail } from 'class-validator';
import * as bcrypt from 'bcrypt';
import * as randomstring from 'randomstring';

@Entity('users')
export class User extends ValidatedEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({ unique: true })
  @Length(4, 32)
  username: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ default: false })
  is_active: boolean;

  @Column({ unique: true })
  activation_token: string;

  @Column({ select: false })
  @Length(8, 128)
  password: string;

  @BeforeInsert()
  generateActivationToken() {
    if (!this.is_active) {
      this.activation_token = randomstring.generate(64);
    }
  }

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt(12);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  comparePassword(password: string) {
    return bcrypt.compare(password, this.password);
  }
}
