import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Restaurant {
  @Field(type => Number)
  @PrimaryGeneratedColumn()
  id: Number;

  @Field(type => String)
  @Column()
  name: String;

  @Field(type => Boolean)
  @Column()
  isVegan: Boolean;
  
  @Field(type => String)
  @Column()
  address: string;

  @Field(type => String)
  @Column()
  ownerName: string;

  @Field(type => String)
  @Column()
  categoryName: string;
}