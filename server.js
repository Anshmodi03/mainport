import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;

// In development mode, use Vite's dev server
if (process.env.NODE_ENV !== 'production') {
  try {
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    
    app.use(vite.ssrFixStacktrace);
    app.use(vite.middlewares);
    
    console.log('Vite dev server started');
  } catch (error) {
    console.error('Error starting Vite dev server:', error);
  }
} else {
  // In production, serve static files
  app.use(express.static(path.join(__dirname, 'dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`JavaScript portfolio server running at http://localhost:${port}`);
});