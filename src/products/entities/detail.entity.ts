import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { ProductEntity } from './product.entity';

enum SizeValues {
  XS = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
}

type SizeType = keyof typeof SizeValues;

@Entity('details')
export class DetailEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  full_name: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: [
      SizeValues.XS,
      SizeValues.S,
      SizeValues.M,
      SizeValues.L,
      SizeValues.XL,
    ],
    nullable: false,
  })
  size: SizeType;

  @Column({ nullable: false })
  fabric_type: string;

  @Column({ nullable: false })
  product_country: string;

  @Column({ nullable: false })
  brand: string;

  @Column({ default: new Date() })
  created_at: Date;

  @Column({ default: new Date() })
  updated_at: Date;

  @OneToOne(() => ProductEntity, (product) => product.detail)
  product: ProductEntity;
}
