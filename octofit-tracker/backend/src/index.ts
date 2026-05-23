import express from 'express';
import { getApiBaseUrl } from './config/api';
import { connectToDatabase } from './config/database';
import apiRoutes from './routes/api';

const app = express();
const port = Number(process.env.PORT) || 8000;
const apiBaseUrl = getApiBaseUrl();

app.use(express.json());
app.use('/api', apiRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend', apiBaseUrl });
});

app.use((error: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
});

async function start(): Promise<void> {
  try {
    await connectToDatabase();
    console.log('Connected to MongoDB octofit_db');

    app.listen(port, () => {
      console.log(`OctoFit backend listening on port ${port}`);
      console.log(`API base URL: ${apiBaseUrl}`);
    });
  } catch (error) {
    console.error('Failed to start backend:', error);
    process.exit(1);
  }
}

void start();
