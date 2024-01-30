import { Column, Entity, Index } from 'typeorm';

@Index('term_taxonomy_id', ['termTaxonomyId'], {})
@Entity('js_term_relationship')
export class TermRelationship {
  @Column('bigint', {
    primary: true,
    name: 'object_id',
    unsigned: true,
    default: () => "'0'",
  })
  objectId: string;

  @Column('bigint', {
    primary: true,
    name: 'term_taxonomy_id',
    unsigned: true,
    default: () => "'0'",
  })
  termTaxonomyId: string;

  @Column('int', { name: 'term_order', default: () => "'0'" })
  termOrder: number;
}
