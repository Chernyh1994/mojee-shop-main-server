import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn, OneToMany,
} from 'typeorm';
import { DivisionEntity } from '../../divisions/entities/division.entity';
import {UserEntity} from "../../users/entities/user.entity";
import {ProductEntity} from "../../products/entities/product.entity";

@Entity('categories')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  division_id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: new Date() })
  created_at: Date;

  @Column({ default: new Date() })
  updated_at: Date;

  @ManyToOne(() => DivisionEntity, (division) => division.categories)
  @JoinColumn({ name: 'division_id' })
  division: DivisionEntity;

  @OneToMany(() => ProductEntity, (product) => product.category)
  products: ProductEntity[];
}
