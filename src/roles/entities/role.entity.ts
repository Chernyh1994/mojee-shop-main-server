import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { RoleType, RoleValues } from '../types/roles.type';
import { User } from '../../users/entities/user.entity';

@Entity('roles')
export class Role {
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
  })
  name: RoleType;

  @Column()
  description: string;

  @Column({ default: new Date() })
  created_at: Date;

  @Column({ default: new Date() })
  updated_at: Date;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
