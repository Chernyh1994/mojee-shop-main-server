import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { ProductEntity } from './product.entity';
import { SizeEnum } from '../enums/size.enum';
import { SizeType } from '../types/size.type';

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
    enum: [SizeEnum.XS, SizeEnum.S, SizeEnum.M, SizeEnum.L, SizeEnum.XL],
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
