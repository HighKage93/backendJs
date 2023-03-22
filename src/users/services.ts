/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatUserI } from 'src/chat/interfaces/chatinterface';
import { Repository } from 'typeorm';
import { User } from './entity';

@Injectable()
export class UsersService {

  
  userRepository;
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  chatList: ChatUserI[] = [{
    userName: 'No 1',
    socket: 'NO 1',
    isActive: false,
  }];
  async registerOnline(payload: ChatUserI): Promise<ChatUserI[]> {
    this.chatList.push(payload);
    // console.log(this.chatList);
    return this.chatList;
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async addOne(data: User): Promise<User> {
    return this.usersRepository.save(data);
  }
}
