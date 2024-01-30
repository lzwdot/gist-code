import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostEntity } from './post.entity';

@Index('created_at', ['createdAt'], {})
@Index('post_id', ['postId'], {})
@Entity('replys')
export class ReplyEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'reply_id', unsigned: true })
  replyId: number;

  @Column('int', {
    name: 'post_id',
    nullable: true,
    unsigned: true,
    default: () => "'0'",
  })
  postId: number | null;

  @Column('varchar', { name: 'reply_author', nullable: true, length: 150 })
  replyAuthor: string | null;

  @Column('varchar', { name: 'reply_email', nullable: true, length: 150 })
  replyEmail: string | null;

  @Column('varchar', { name: 'reply_url', nullable: true, length: 255 })
  replyUrl: string | null;

  @Column('varchar', { name: 'reply_ip', nullable: true, length: 64 })
  replyIp: string | null;

  @Column('varchar', { name: 'reply_agent', nullable: true, length: 511 })
  replyAgent: string | null;

  @Column('text', { name: 'reply_text', nullable: true })
  replyText: string | null;

  @Column('varchar', {
    name: 'reply_status',
    nullable: true,
    length: 16,
    default: () => "'approved'",
  })
  replyStatus: string | null;

  @Column('int', {
    name: 'reply_parent',
    nullable: true,
    unsigned: true,
    default: () => "'0'",
  })
  replyParent: number | null;

  @Column('int', {
    name: 'user_id',
    nullable: true,
    unsigned: true,
    default: () => "'0'",
  })
  userId: number | null;

  @Column('int', {
    name: 'created_at',
    nullable: true,
    unsigned: true,
    default: () => "'0'",
  })
  createdAt: number | null;

  /**
   * many to post
   */
  @ManyToOne(() => PostEntity, (post) => post.replys, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'post_id' })
  post: PostEntity;
}
