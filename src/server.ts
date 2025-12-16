import 'dotenv/config';
import app from './app';
import config from './config';
import { Server } from 'http';




async function main() {
  const server :Server =app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`);
  });
}

main();