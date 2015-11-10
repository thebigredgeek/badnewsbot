import fs from 'fs';
import q from 'q';
import log from './log';

const fileLoc = `${process.cwd()}/.config.json`;

const session_stamp = new Date().getTime();

async function ensure () {
  try {
    await q.nfcall(fs.access, fileLoc, fs.F_OK);
  } catch (e) {
    await q.nfcall(fs.writeFile, fileLoc, '{}', 'utf8');
  }
}

async function read () {
  await ensure();
  return JSON.parse(await q.nfcall(fs.readFile, fileLoc, 'utf8'));
}

async function write (data) {
  await ensure();
  await q.nfcall(fs.writeFile, fileLoc, JSON.stringify(data), 'utf8');
  return await read();
}

async function setURL (url) {
  var data = await read();
  data.url = url;
  log(`saving url as ${data.url}`);
  return write(data);
}

async function recordUp () {
  var data = await read();
  if (!data[`session_${session_stamp}`]) data[`session_${session_stamp}`] = {stamp: session_stamp, log: []};
  data[`session_${session_stamp}`].log.push({
    event: 'up',
    time: new Date().getTime(),
    url: data.url || null
  });
  return write(data);
}

async function recordDown () {
  var data = await read();
  if (!data[`session_${session_stamp}`]) data[`session_${session_stamp}`] = {stamp: session_stamp, log: []};
  data[`session_${session_stamp}`].log.push({
    event: 'down',
    time: new Date().getTime(),
    url: data.url || null
  });
  return write(data);
}

export {
  read,
  setURL,
  recordUp,
  recordDown
};
