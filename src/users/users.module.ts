import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from 'src/jwt/jwt.service';
import { User } from './entities/user.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],       //   ConfigModule.forRoot({    @Global()
  providers: [UsersResolver, UsersService],          //     isGlobal: true,         export class JwtModule
})
export class UsersModule {}
