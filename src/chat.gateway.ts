/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { User } from './users/entity';
import { UsersService } from './users/services';
import { OnModuleInit } from '@nestjs/common';
import { ChatUserI } from './chat/interfaces/chatinterface';
import { Socket } from 'socket.io';

interface UserSocketList {
  socket: Socket;
  socketId: string;
  name: string;
}

@WebSocketGateway(8001, { cors: '*' })
export class ChatGateway {
  @WebSocketServer()
  server: Socket;

  private connectedUsers: Map<string, Socket> = new Map();

  constructor(private userService: UsersService) {}

  onModuleInit() {
    this.server.on('connection', (socket) => {
      // console.log(socket, socket.id);
    });
  }

  async findAll(): Promise<User[]> {
    return this.userService.findAll();
    // return 'Some dumb dumbness'
  }

  async registerUserOnline(payload: ChatUserI): Promise<any[]> {
    console.log(this.server.listeners);
    return (
      this.userService.registerOnline(payload) || [
        {
          userName: 'NO',
          socket: 'NO',
          isActive: false,
        },
      ]
    );
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    // return 'Hello world!';
    // console.log(client, ' socket ');
    this.server.emit('message', message);
  }

  @SubscribeMessage('user-name')
  subScribeUser(socket: Socket, payload: string): void {
    // console.log('----------------------');
    // console.log(socket, ' -- socket -- ', payload);
    this.connectedUsers.set(payload, socket);
    // console.log(this.connectedUsers);
    // eslint-disable-next-line prefer-const
    let list = [];
    this.connectedUsers.forEach((value: Socket, key: string) => {
      list.push(key);
    });
    const data = {
      type: 'onlineList',
      payload: list,
    };
    this.server.emit('message', JSON.stringify(data));
  }

  @SubscribeMessage('new-connection')
  handleConnection(client: any, payload: any): string {
    // console.log(client.id, ' client ', payload);
    const user = this.findAll();

    client.emit(
      'users',
      JSON.stringify({
        userlist: user,
      }),
    );
    return 'connection established';
  }
}
