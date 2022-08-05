import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CategoryEntity } from '../../categories/entities/category.entity';

@Entity('divisions')
export class DivisionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: new Date() })
  created_at: Date;

  @Column({ default: new Date() })
  updated_at: Date;

  @OneToMany(() => CategoryEntity, (category) => category.division)
  categories: CategoryEntity[];
}
