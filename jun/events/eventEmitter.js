// const EventEmitter = require('events');

// const em = new EventEmitter();

// em.on('start', () => console.log('started'));
// em.emit('start');

// em.on('done', (data) => console.log(data));
// em.emit('done', 'The event is done executing');

class MyEventEmitter {
  constructor() {
    this.subscribers = {};
  }

  on(event, callback) {
    this.subscribers[event] = (this.subscribers[event] || []).concat(callback);
  }

  emit(event, data) {
    this.subscribers[event].forEach(subscriber => {
      subscriber(data);
    });
  }
}

const myEventEmitter = new MyEventEmitter();
myEventEmitter.on('start', () => console.log('started'));
myEventEmitter.emit('start');