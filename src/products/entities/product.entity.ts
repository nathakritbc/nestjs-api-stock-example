import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
@Entity()
@Unique(['p_image'])
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  p_name: string;

  @Column()
  p_price: number;

  @Column()
  p_count: number;

  @Column()
  p_image: string;
}
