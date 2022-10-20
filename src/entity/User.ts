import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Photo } from "./Photo";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @OneToMany(() => Photo, (photo) => photo.user, {
    cascade: ["insert", "update", "remove", "soft-remove", "recover"],
    orphanedRowAction: "delete",
    eager: true,
  })
  photos: Photo[];
}
