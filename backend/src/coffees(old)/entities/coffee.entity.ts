import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/* Coffee Entity FINAL CODE */
@Entity({
  name: 'coffees',
})
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  brand: string;
  @Column('json', { nullable: true })
  flavors: string[];
}
