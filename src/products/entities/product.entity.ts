import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column({ type: 'decimal', precision: 7, scale: 2, default: 0.0 })
  price: number;

  @Column()
  currency: string;

  @Column()
  discount: boolean;

  @Column({ default: new Date() })
  created_at: Date;

  @Column({ default: new Date() })
  updated_at: Date;
}
