/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway(8001, { cors: '*' })
export class ChatGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    // return 'Hello world!';
    this.server.emit('message', message);
  }
}
