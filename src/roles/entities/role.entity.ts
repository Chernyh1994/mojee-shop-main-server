import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Unique } from 'typeorm';
import { RoleEnum } from '../enums/role.enum';
import { RoleType } from '../types/role.type';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('roles')
@Unique(['name'])
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: [RoleEnum.OWNER, RoleEnum.ADMIN, RoleEnum.MODERATOR, RoleEnum.VERIFY_USER, RoleEnum.USER],
    default: RoleEnum.USER,
    nullable: false,
  })
  name: RoleType;

  @Column({ nullable: true })
  description: string;

  @Column({ default: new Date() })
  created_at: Date;

  @Column({ default: new Date() })
  updated_at: Date;

  @OneToMany(() => UserEntity, (user) => user.role)
  users: UserEntity[];
}
