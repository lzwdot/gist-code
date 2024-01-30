import { date } from '@/util/date.util';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('post_name', ['postName'], {})
@Index('type_status_date', ['postType', 'postStatus', 'postDate', 'id'], {})
@Index('post_parent', ['postParent'], {})
@Index('post_author', ['postAuthor'], {})
@Entity('js_post')
export class Post {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'ID', unsigned: true })
  id: string;

  @Column('bigint', {
    name: 'post_author',
    unsigned: true,
    default: () => "'0'",
  })
  postAuthor: string;

  @Column('datetime', {
    name: 'post_date',
    default: null,
  })
  postDate: Date;

  @Column('datetime', {
    name: 'post_date_gmt',
    default: null,
  })
  postDateGmt: Date;

  @Column('longtext', { name: 'post_content', default: null })
  postContent: string;

  @Column('text', { name: 'post_title', default: null })
  postTitle: string;

  @Column('text', { name: 'post_excerpt', default: null })
  postExcerpt: string;

  @Column('varchar', {
    name: 'post_status',
    length: 20,
    default: () => "'publish'",
  })
  postStatus: string;

  @Column('varchar', {
    name: 'comment_status',
    length: 20,
    default: () => "'open'",
  })
  commentStatus: string;

  @Column('varchar', {
    name: 'ping_status',
    length: 20,
    default: () => "'open'",
  })
  pingStatus: string;

  @Column('varchar', { name: 'post_password', length: 255, default: null })
  postPassword: string;

  @Column('varchar', { name: 'post_name', length: 200, default: null })
  postName: string;

  @Column('text', { name: 'to_ping', default: null })
  toPing: string;

  @Column('text', { name: 'pinged', default: null })
  pinged: string;

  @Column('datetime', {
    name: 'post_modified',
    default: null,
  })
  postModified: Date;

  @Column('datetime', {
    name: 'post_modified_gmt',
    default: null,
  })
  postModifiedGmt: Date;

  @Column('longtext', { name: 'post_content_filtered', default: null })
  postContentFiltered: string;

  @Column('bigint', {
    name: 'post_parent',
    unsigned: true,
    default: () => "'0'",
  })
  postParent: string;

  @Column('varchar', { name: 'guid', length: 255, default: null })
  guid: string;

  @Column('int', { name: 'menu_order', default: () => "'0'" })
  menuOrder: number;

  @Column('varchar', { name: 'post_type', length: 20, default: () => "'post'" })
  postType: string;

  @Column('varchar', { name: 'post_mime_type', length: 100, default: null })
  postMimeType: string;

  @Column('bigint', { name: 'comment_count', default: () => "'0'" })
  commentCount: string;

  @BeforeInsert()
  async insertTime() {
    this.postDate = date().toDate();
    this.postDateGmt = date().toDate();
  }

  @BeforeUpdate()
  async updateTime() {
    this.postModified = date().toDate();
    this.postModifiedGmt = date().toDate();
  }
}
