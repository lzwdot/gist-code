import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('user_email', ['userEmail'], { unique: true })
@Index('user_login', ['userLogin'], { unique: true })
@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'user_id', unsigned: true })
  userId: number;

  @Column('varchar', {
    name: 'user_login',
    nullable: true,
    unique: true,
    length: 32,
  })
  userLogin: string | null;

  @Column('varchar', { name: 'user_pass', nullable: true, length: 64 })
  userPass: string | null;

  @Column('varchar', {
    name: 'user_email',
    nullable: true,
    unique: true,
    length: 150,
  })
  userEmail: string | null;

  @Column('varchar', { name: 'user_url', nullable: true, length: 150 })
  userUrl: string | null;

  @Column('varchar', { name: 'display_name', nullable: true, length: 32 })
  displayName: string | null;

  @Column('int', {
    name: 'created_at',
    nullable: true,
    unsigned: true,
    default: () => "'0'",
  })
  createdAt: number | null;

  @Column('int', {
    name: 'activated_at',
    nullable: true,
    unsigned: true,
    default: () => "'0'",
  })
  activatedAt: number | null;

  @Column('int', {
    name: 'logged_at',
    nullable: true,
    unsigned: true,
    default: () => "'0'",
  })
  loggedAt: number | null;

  @Column('varchar', {
    name: 'user_group',
    nullable: true,
    length: 16,
    default: () => "'user'",
  })
  userGroup: string | null;

  @Column('varchar', { name: 'auth_code', nullable: true, length: 64 })
  authCode: string | null;

  @Column('int', {
    name: 'github_id',
    nullable: true,
    unsigned: true,
    default: () => "'0'",
  })
  githubId: number | null;

  @BeforeInsert()
  async created() {
    this.createdAt = Math.round(Date.now() / 1000);
  }
}
