import { ArgsType, Field } from "@nestjs/graphql";
import { IsBoolean, IsString, isString, Length } from "class-validator";

@ArgsType()
export class CreateRestaurantDto {

  @Field(type => String)
  @IsString()
  @Length(5, 10)
  name: string;

  @Field(type => Boolean)
  @IsBoolean()
  isVegan: boolean;

  @Field(type => String)
  @IsString()
  address: String;

  @Field(type => String)
  @IsString()
  ownerName: string;
  
}