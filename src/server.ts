import 'dotenv/config';
import app from './app';

const port = 5001;

async function main() {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

main();