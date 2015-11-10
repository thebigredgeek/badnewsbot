import request from 'request-promise';
import q from 'q';
import EventEmitter from 'events';
import log from './log';

const emitter = new EventEmitter();

emitter.UP = 'up';
emitter.DOWN = 'down';
emitter._state = emitter.DOWN;

var inFlight = false;

async function check (url) {
  if (!inFlight) {
    inFlight = true;
    try {
      log(`making check request to ${url}`);
      await request({
        url: url,
        method: 'GET',
        agentOptions: {
          rejectUnauthorized: false
        }
      });
      if (emitter._state === emitter.DOWN) emitter.emit(emitter.UP);
      emitter._state = emitter.UP;
    } catch (e) {
      if (emitter._state === emitter.UP) emitter.emit(emitter.DOWN);
      emitter._state = emitter.DOWN;
    }
    inFlight = false;
  }
}


function start (url) {
  setInterval(() => check(url), 5000);
  return emitter;
}

export {
  start
};
