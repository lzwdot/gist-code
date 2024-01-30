import { Column, Entity } from 'typeorm';

@Entity('options')
export class OptionEntity {
  @Column('varchar', { primary: true, name: 'option_name', length: 32 })
  optionName: string;

  @Column('int', {
    primary: true,
    name: 'user_id',
    unsigned: true,
    default: () => "'0'"
  })
  userId: number;

  @Column('text', { name: 'option_value', nullable: true })
  optionValue: string | null;
}
