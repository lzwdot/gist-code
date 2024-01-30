import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostEntity } from './post.entity';

@Index('term_slug', ['termSlug'], { unique: true })
@Entity('terms')
export class TermEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'term_id', unsigned: true })
  termId: number;

  @Column('varchar', { name: 'term_name', nullable: true, length: 150 })
  termName: string | null;

  @Column('varchar', { name: 'term_slug', nullable: true, length: 150 })
  termSlug: string | null;

  @Column('varchar', { name: 'term_type', length: 32 })
  termType: string;

  @Column('varchar', { name: 'term_description', nullable: true, length: 150 })
  termDescription: string | null;

  @Column('int', {
    name: 'term_count',
    nullable: true,
    unsigned: true,
    default: () => "'0'",
  })
  termCount: number | null;

  @Column('int', {
    name: 'term_order',
    nullable: true,
    unsigned: true,
    default: () => "'0'",
  })
  termOrder: number | null;

  @Column('int', {
    name: 'term_parent',
    nullable: true,
    unsigned: true,
    default: () => "'0'",
  })
  termParent: number | null;

  /**
   * many to post
   */
  @ManyToMany(() => PostEntity, (post) => post.terms, {
    createForeignKeyConstraints: false,
  })
  posts: PostEntity[];
}
