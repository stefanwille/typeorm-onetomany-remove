import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(() => User, (user) => user.photos, {
    nullable: false,
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
  })
  user: User;
}
