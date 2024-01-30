import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('slug', ['slug'], {})
@Index('name', ['name'], {})
@Entity('js_term')
export class Term {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'term_id', unsigned: true })
  termId: string;

  @Column('varchar', { name: 'name', length: 200 })
  name: string;

  @Column('varchar', { name: 'slug', length: 200 })
  slug: string;

  @Column('bigint', { name: 'term_group', default: () => "'0'" })
  termGroup: string;
}
