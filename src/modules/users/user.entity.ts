import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";


/**
 * List of user roles
 * @readonly
 * @enum M Male
 * @enum F Female
 **/
export enum UserRoles {
  ADMIN = "admin",
  DOCTOR = "doctor",
  PATIENT = "patient",
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    length: 150,
  })
  name: string;

  @Column({ unique: true, length: 64 })
  email: string;

  @Column({
    type: "enum",
    enum: UserRoles,
  })
  role: UserRoles;

  @Column()
  password: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt?: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt?: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt?: Date;
}
