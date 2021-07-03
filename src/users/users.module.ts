import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],       //   ConfigModule.forRoot({    @Global()
  providers: [UsersResolver, UsersService],         //     isGlobal: true,         export class JwtModule
  exports: [UsersService],
})
export class UsersModule {}
