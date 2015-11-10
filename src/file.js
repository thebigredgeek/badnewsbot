import fs from 'fs';
import q from 'q';
import log from './log';

const fileLoc = `${process.cwd()}/.config.json`;

async function ensure () {
  try {
    await q.nfcall(fs.access, fileLoc, fs.F_OK);
  } catch (e) {
    await q.nfcall(fs.writeFile, fileLoc, '{}', 'utf8');
  }
}

async function get () {
  await ensure();
  return JSON.parse(await q.nfcall(fs.readFile, fileLoc, 'utf8'));
}

async function setURL (url) {
  var data = await get();
  data.url = url;
  log(`saving url as ${data.url}`);
  await q.nfcall(fs.writeFile, fileLoc, JSON.stringify(data), 'utf8');
  return await get();
}

export {
  get,
  setURL
};
