import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { CategoryEntity } from '../../categories/entities/category.entity';
import { PriceEntity } from './price.entity';
import { DetailEntity } from './detail.entity';
import { ImageEntity } from '../../images/entities/image.entity';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  category_id: number;

  @Column({ nullable: false })
  price_id: number;

  @Column({ nullable: false })
  detail_id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ default: new Date() })
  created_at: Date;

  @Column({ default: new Date() })
  updated_at: Date;

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @OneToOne(() => PriceEntity, (price) => price.product)
  @JoinColumn({ name: 'price_id' })
  price: PriceEntity;

  @OneToOne(() => DetailEntity, (detail) => detail.product)
  @JoinColumn({ name: 'detail_id' })
  detail: DetailEntity;

  @OneToMany(() => ImageEntity, (image) => image.product)
  images: ImageEntity[];
}
