import express from 'express';
import appRouting from './appRouting';

const app = express();

app.use(express.static('public'));

app.use(appRouting);

const PORT = 3000;

const server = app.listen(PORT, () => {
  console.log(`Server listening to the port: ${PORT}`);
});

module.exports = {
  app,
  server,
};
