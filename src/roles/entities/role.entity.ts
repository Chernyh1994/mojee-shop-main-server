import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { RoleType, RoleValues } from '../types/roles.type';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('roles')
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: [
      RoleValues.OWNER,
      RoleValues.ADMIN,
      RoleValues.MODERATOR,
      RoleValues.VERIFY_USER,
      RoleValues.USER,
    ],
    default: RoleValues.USER,
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
