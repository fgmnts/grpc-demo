import 'source-map-support/register';
import { Server, ServerCredentials } from '@grpc/grpc-js';

import { Addition, AdditionService } from './services/Addition';


// Do not use @grpc/proto-loader
const server = new Server({
  'grpc.max_receive_message_length': -1,
  'grpc.max_send_message_length': -1,
});

server.addService(AdditionService, new Addition());

server.bindAsync('0.0.0.0:9090', ServerCredentials.createInsecure(), (err: Error | null, bindPort: number) => {
  if (err) {
    throw err;
  }

  console.log(`gRPC:Server:${bindPort}`, new Date().toLocaleString());
  server.start();
});

