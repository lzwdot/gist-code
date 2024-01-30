import { genHash } from '@/util/crypto.util';
import { date } from '@/util/date.util';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('user_login_key', ['userLogin'], {})
@Index('user_nicename', ['userNicename'], {})
@Index('user_email', ['userEmail'], {})
@Entity('js_user')
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'ID', unsigned: true })
  id: string;

  @Column('varchar', {
    name: 'user_login',
    length: 60,
    default: null,
  })
  userLogin: string;

  @Column('varchar', {
    name: 'user_pass',
    length: 255,
    default: null,
  })
  userPass: string;

  @Column('varchar', {
    name: 'user_nicename',
    length: 50,
    default: null,
  })
  userNicename: string;

  @Column('varchar', {
    name: 'user_email',
    length: 100,
    default: null,
  })
  userEmail: string;

  @Column('varchar', { name: 'user_url', length: 100, default: null })
  userUrl: string;

  @Column('datetime', {
    name: 'user_registered',
    default: null,
  })
  userRegistered: Date;

  @Column('varchar', {
    name: 'user_activation_key',
    length: 255,
    default: null,
  })
  userActivationKey: string;

  @Column('int', { name: 'user_status', default: () => "'0'" })
  userStatus: number;

  @Column('varchar', {
    name: 'display_name',
    length: 250,
    default: null,
  })
  displayName: string;

  @Column('bigint', { name: 'github_id', unsigned: true, default: () => "'0'" })
  githubId: string;

  @BeforeInsert()
  @BeforeUpdate()
  async encryptPwd() {
    this.userPass = genHash(this.userPass);
  }

  @BeforeInsert()
  async insertTime() {
    this.userRegistered = date().toDate();
  }
}
