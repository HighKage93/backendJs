/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { UserI } from './interfaces/userinterface';
import { UsersService } from './services';

@Controller('user')
export class UserController {

  constructor(private userService: UsersService) {}

  @Get()
  async findAll(): Promise<UserI[]> {
    return this.userService.findAll();
  }
}