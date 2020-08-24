import path from 'path';
import { nodos } from '@nodosjs/core';
import runCurrent from '../lib/current.js';

const projectRoot = path.join(__dirname, '../__fixtures__/site');

test('nodos/console', async () => {
  const replServer = { context: {} };
  const container = {
    repl: {
      start: () => replServer,
    },
  };

  const app = nodos(projectRoot);
  // app.listen = jest.fn().mockResolvedValue();
  await runCurrent(app, { container, args: ['console'] });
  expect(replServer.context).toHaveProperty('app');
});

// FIXME fix test
// test('nodos/server', async () => {
//   const app = nodos(projectRoot);
//   app.listen = jest.fn().mockResolvedValue();
//   await runCurrent(app, { args: ['server'] });
//   expect(app.listen).toHaveBeenCalled();
// });

test('nodos/routes', async () => {
  const app = nodos(projectRoot);
  const container = {
    print: (output) => { expect(output).toMatchSnapshot(); },
  };
  await runCurrent(app, { container, args: ['routes'] });
});
