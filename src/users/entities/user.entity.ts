import { InternalServerErrorException } from "@nestjs/common";
import { 
  Field, 
  InputType,
  ObjectType, 
  registerEnumType
} from "@nestjs/graphql";
import * as bcrypt from "bcrypt";
import { IsBoolean, IsEmail, IsEnum, IsString } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { Order } from "src/orders/entities/order.entity";
import { Restaurant } from "src/restaurants/entities/restaurant.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';

export enum UserRole {
  Client = 'Client',
  Owner = 'Owner',
  Delivery = 'Delivery',
}

registerEnumType(UserRole, { name: 'UserRole' })

@InputType('UserInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column({ unique: true })  //editProfile에서 변경시 중복체크 없음.
  @Field(type => String)
  @IsEmail()
  email: string;

  @Column({ select: false })
  @Field(type => String)
  @IsString()
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  @Field(type => UserRole)
  @IsEnum(UserRole)
  role: UserRole;

  @Column({ default: false })    // TypeOrm Code
  @Field(type => Boolean)        // GrapnQl
  @IsBoolean()                   // Validator
  verified: boolean;             // DB name - type

  @Field(type => [Restaurant])
  @OneToMany(
    type => Restaurant,
    restaurant => restaurant.owner,
  )
  restaurants: Restaurant[];

  @Field(type => [Order])
  @OneToMany(
    type => Order,
    order => order.customer,
  )
  orders: Order[];

  @Field(type => [Order])
  @OneToMany(
    type => Order,
    order => order.driver,
  )
  rides: Order[];


  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (e) {
        console.log(e);
        throw new InternalServerErrorException();
      }
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      const ok = await bcrypt.compare(aPassword, this.password);
      return ok;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

}