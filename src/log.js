import debug from 'debug';

debug.log = console.info.bind(console);

export default debug('badnewsbot');
