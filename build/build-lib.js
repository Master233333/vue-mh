const shell = require('shelljs');
const signale = require('signale');

const { Signale } = signale;
const tasks = [
  'npm i',
  'node build/build-components.js',
  'npm run build',
  // 'git add ./',
  // 'git commit -m "test"',
  // 'git push'
  // 'npm publish'
];

tasks.every(task => {
  signale.start(task);

  const interactive = new Signale({ interactive: true });
  interactive.pending(task);

  const result = shell.exec(`${task}`);

  if (result.code !== 0) {
    interactive.error(task);
    return false;
  }

  interactive.success(task);
  return true;
});
