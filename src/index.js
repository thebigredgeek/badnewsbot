import {read as getData, setURL} from './file';
import {promptForURL} from './prompt';
import {start} from './check';
import {notifyUp, notifyDown} from './notification';
import log from './log';

(async function () {
  log('starting up...');
  var data = await getData();
  if (!data.url) data.url = await promptForURL();
  data = await setURL(data.url);
  log(`using url ${data.url}`);
  const emitter = start(data.url);
  emitter.on(emitter.UP, notifyUp);
  emitter.on(emitter.DOWN, notifyDown);
  log('running...');
}());
