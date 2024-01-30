import { Column, Entity } from 'typeorm';

@Entity('relations')
export class RelationEntity {
  @Column('int', { primary: true, name: 'post_id', unsigned: true })
  postId: number;

  @Column('int', { primary: true, name: 'term_id', unsigned: true })
  metaId: number;
}
