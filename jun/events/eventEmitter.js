const EventEmitter = require('events');

const em = new EventEmitter();

em.on('start', () => console.log('started'));
em.emit('start');

em.on('done', (data) => console.log(data));
em.emit('done', 'The event is done executing');