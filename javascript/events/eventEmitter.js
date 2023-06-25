const EventEmitter = require('events');

const eventEmitter = new EventEmitter();

eventEmitter.on('start', () => console.log('started'));
eventEmitter.emit('start');

eventEmitter.on('done', (data) => console.log(data));
eventEmitter.emit('done', 'The event is done executing');

class MyEventEmitter {
   constructor() {
      this.listeners = {};
   }

   on(event, callback) {
      this.listeners[event] = (this.listeners[event] || []).concat(callback);
   }

   emit(event, data) {
      this.listeners[event]?.forEach(subscriber => {
         subscriber(data);
      });
   }
}

const myEventEmitter = new MyEventEmitter();
myEventEmitter.on('start', () => console.log('started'));
myEventEmitter.emit('start');