/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Req } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }

  @Post()
  saveUser(@Req() req: any): string {
    console.log(req)
    return 'This action returns all cats';
  }
}