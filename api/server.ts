import app from './app';

const PORT = 3000;

app.listen(PORT, () => console.log(`Started at port ${ PORT }`));

app.get('/', () => console.log('pong'))

