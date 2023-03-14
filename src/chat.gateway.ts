/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { User } from './users/entity';
import { UsersService } from './users/services';

@WebSocketGateway(8001, { cors: '*' })
export class ChatGateway {
  @WebSocketServer()
  server;

  constructor(private userService: UsersService) {}

  async findAll(): Promise<User[]> {
    return this.userService.findAll();
    // return 'Some dumb dumbness'
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    // return 'Hello world!';
    this.server.emit('message', message);
  }

  @SubscribeMessage('new-connection')
  handleConnection(client: any, payload: any): string {
    console.log(client.id, ' client ', payload);
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
