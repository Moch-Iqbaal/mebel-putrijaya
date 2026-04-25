import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Static assets (if production)
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
  }

  // Vite middleware for Dev
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  // For a true MPA experience within a React setup,
  // we can either serve the same index.html and let React handle it,
  // or serve different entries. 
  // Given the simplicity, we'll use a single entry but ensure all routes
  // are handled correctly by the server.
  
  app.get('*', (req, res, next) => {
    if (process.env.NODE_ENV === 'production') {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    } else {
      next(); // Vite handles this in development
    }
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
