import express from 'express';
import { json } from 'body-parser';
import setRoutes from './routes/api';
import initDb from './initDb';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());

(async () => {
  try {
    await initDb();
  } catch (err) {
    console.error('Database init failed', err);
  }

  setRoutes(app);

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})();
