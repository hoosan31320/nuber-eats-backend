import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsString, Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Restaurant {

  @Field(type => Number)
  @PrimaryGeneratedColumn()
  id: Number;

  @Field(type => String)
  @Column()
  @IsString()
  @Length(5)
  name: String;

  @Field(type => Boolean)
  @Column()
  @IsBoolean()
  isVegan: Boolean;
  
  @Field(type => String)
  @Column()
  @IsString()
  address: string;

  @Field(type => String)
  @Column()
  @IsString()
  ownerName: string;

  @Field(type => String)
  @Column()
  @IsString()
  categoryName: string;
}