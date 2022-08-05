import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProductEntity } from '../../products/entities/product.entity';

@Entity('images')
export class ImageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  product_id: number;

  @Column({ nullable: false })
  origin_name: string;

  @Column({ nullable: false })
  system_name: string;

  @Column({ nullable: false })
  url: string;

  @Column({ default: new Date() })
  created_at: Date;

  @Column({ default: new Date() })
  updated_at: Date;

  @ManyToOne(() => ProductEntity, (product) => product.images)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;
}
