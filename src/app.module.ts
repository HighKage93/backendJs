/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entity';
import { UserController } from './users/controller';
import { UsersModule } from './users/module';
import { UsersService } from './users/services';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'patankar595',
      database: 'highkage93',
      entities: [User],
      synchronize: true,
      autoLoadEntities: true,
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: process.env.HOST,
    //   port: parseInt(process.env.PORT, 10),
    //   username: process.env.USERNAME,
    //   password: process.env.PASSWORD,
    //   database: process.env.DATABASE,
    //   entities: [User],
    //   synchronize: true,
    //   autoLoadEntities: true,
    // }),
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UsersService, ChatGateway],
})
export class AppModule {}
