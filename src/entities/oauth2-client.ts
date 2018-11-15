import ValidatedEntity from '../utils/validated-entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AccessToken } from './access-token';

@Entity('oauth2_clients')
export class OAuth2Client extends ValidatedEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({ name: 'client_secret' })
  clientSecret: string;

  @Column({ name: 'redirect_uris', type: 'simple-array' })
  redirectUris: string[];

  @Column() name: string;

  @Column() description: string;

  @Column({ name: 'is_trusted', default: false })
  isTrusted: boolean;

  @OneToMany(type => AccessToken, token => token.client)
  tokens: AccessToken[];
}
