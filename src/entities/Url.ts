import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("urls")
export class Url {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  url: string;

  @Column()
  hash: string;

  @Column({ type: "timestamptz"})
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
