import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TermEntity } from './term.entity';
import { ReplyEntity } from './reply.entity';

@Index('post_slug', ['postSlug'], { unique: true })
@Index('created_at', ['createdAt'], {})
@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'post_id', unsigned: true })
  postId: number;

  @Column('varchar', { name: 'post_title', nullable: true, length: 150 })
  postTitle: string | null;

  @Column('varchar', {
    name: 'post_slug',
    nullable: true,
    unique: true,
    length: 150,
  })
  postSlug: string | null;

  @Column('longtext', { name: 'post_text', nullable: true })
  postText: string | null;

  @Column('int', {
    name: 'post_order',
    nullable: true,
    unsigned: true,
    default: () => "'0'",
  })
  postOrder: number | null;

  @Column('int', {
    name: 'post_author',
    nullable: true,
    unsigned: true,
    default: () => "'0'",
  })
  postAuthor: number | null;

  @Column('varchar', {
    name: 'post_status',
    nullable: true,
    length: 16,
    default: () => "'publish'",
  })
  postStatus: string | null;

  @Column('varchar', { name: 'post_password', nullable: true, length: 32 })
  postPassword: string | null;

  @Column('int', {
    name: 'reply_num',
    nullable: true,
    unsigned: true,
    default: () => "'0'",
  })
  replyNum: number | null;

  @Column('int', {
    name: 'view_num',
    nullable: true,
    unsigned: true,
    default: () => "'0'",
  })
  viewNum: number | null;

  @Column('char', {
    name: 'allow_reply',
    nullable: true,
    length: 1,
    default: () => "'0'",
  })
  allowReply: string | null;

  @Column('int', {
    name: 'post_parent',
    nullable: true,
    unsigned: true,
    default: () => "'0'",
  })
  postParent: number | null;

  @Column('int', {
    name: 'created_at',
    nullable: true,
    unsigned: true,
    default: () => "'0'",
  })
  createdAt: number | null;

  @Column('int', {
    name: 'updated_at',
    nullable: true,
    unsigned: true,
    default: () => "'0'",
  })
  updatedAt: number | null;

  @BeforeInsert()
  async created() {
    this.createdAt = Math.round(Date.now() / 1000);
  }

  @BeforeUpdate()
  async updated() {
    this.updatedAt = Math.round(Date.now() / 1000);
  }

  /**
   * many to term
   */
  @ManyToMany(() => TermEntity, (term) => term.posts, {
    createForeignKeyConstraints: false,
    cascade: true,
    eager: true,
  })
  @JoinTable({
    name: 'relations',
    joinColumn: {
      name: 'post_id',
    },
    inverseJoinColumn: {
      name: 'term_id',
    },
  })
  terms: TermEntity[];

  /**
   * one to reply
   */
  @OneToMany(() => ReplyEntity, (reply) => reply.post, {
    createForeignKeyConstraints: false,
    cascade: true,
    eager: true,
  })
  replys: ReplyEntity[];
}
