// import { type } from 'node:os';

import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
@Entity()
@Unique(['email'])
// @Unique(['fullName'])
// @Unique(['profile'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column({ length: 50 })
  // fullName: string;

  // @Column()
  // profile: string;

  @Column({ length: 50 })
  email: string;

  @Column()
  password: string;

  // @Column({ length: 20 })
  // tel: string;
}
