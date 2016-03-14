import { EventEmitter2 } from 'eventemitter2';
import Connect from '../services/connect';

const CONNECTED_CLIENT = 'connected-client';
const DISCONNECTED_CLIENT = 'disconnected-client';

class Client extends EventEmitter2 {
  constructor(sender) {
    super();
    this.connect = new Connect(sender);
    this.connect.send('server', {type: CONNECTED_CLIENT, client: sender});

    this.connect.on('message', (...args) => {
      this.emit('message', ...args);
    });

    window.addEventListener('unload', () => {
      this.connect.send('server', {type: DISCONNECTED_CLIENT, client: sender});
    });
  }

  send(sender, packet) {
    this.connect.send(sender, packet);
  }
}

export default Client;
