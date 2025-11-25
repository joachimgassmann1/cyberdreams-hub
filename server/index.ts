import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  // Serve static files with explicit priority
  app.use(express.static(staticPath, {
    index: false, // Don't serve index.html automatically
    setHeaders: (res, filePath) => {
      // Set proper content types for SEO files
      if (filePath.endsWith('.xml')) {
        res.setHeader('Content-Type', 'application/xml');
      } else if (filePath.endsWith('.txt')) {
        res.setHeader('Content-Type', 'text/plain');
      } else if (filePath.endsWith('.html') && !filePath.endsWith('index.html')) {
        res.setHeader('Content-Type', 'text/html');
      }
    }
  }));

  // Handle client-side routing - serve index.html for all routes
  // This will only be reached if express.static didn't find a file
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
