import notifier from 'node-notifier';
import q from 'q';
import log from './log';
import {recordUp, recordDown} from './file';

async function publish (opts) {
  return await q.nfcall(notifier.notify.bind(notifier), opts);
}

async function notifyUp () {
  log('Notify up');
  await recordUp();
  return await publish({
    title: 'Online',
    message: 'The server is now online',
    sound: 'Ping'
  });
}

async function notifyDown () {
  log('Notify down');
  await recordDown();
  return await publish({
    title: 'Offline',
    message: 'The server is now offline',
    sound: 'Pop'
  });
}

export {
  notifyUp,
  notifyDown
};
