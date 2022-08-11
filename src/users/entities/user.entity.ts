import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne, Unique } from 'typeorm';
import { RoleEntity } from '../../roles/entities/role.entity';
import { ProfileEntity } from './profile.entity';

@Entity('users')
@Unique(['email'])
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, default: false })
  is_verified: boolean;

  @Column({ nullable: false, default: false })
  is_deleted: boolean;

  @Column({ nullable: false })
  profile_id: number;

  @Column({ nullable: false })
  role_id: number;

  @Column({ default: new Date() })
  created_at: Date;

  @Column({ default: new Date() })
  updated_at: Date;

  @OneToOne(() => ProfileEntity, (profile) => profile.user)
  @JoinColumn({ name: 'profile_id', referencedColumnName: 'id' })
  profile: ProfileEntity;

  @ManyToOne(() => RoleEntity, (role) => role.users)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  role: RoleEntity;
}
