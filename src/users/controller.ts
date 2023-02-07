/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from './entity';
import { UserI } from './interfaces/userinterface';
import { UsersService } from './services';

@Controller('user')
export class UserController {

  constructor(private userService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
    // return 'Some dumb dumbness'
  }

  @Post()
  async create(@Body() createUser: UserI): Promise<UserI> {
    console.log(createUser, ' create user ')
    // return this.userService.findAll();
    return createUser;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<string> {
    console.log(id, ' create user ')
    // return this.userService.findAll();
    return id;
  }
}