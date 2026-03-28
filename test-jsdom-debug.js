import { JSDOM, VirtualConsole } from 'jsdom';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3002;
const DIST_DIR = path.join(__dirname, 'dist/public');

async function test() {
  const app = express();
  app.use(express.static(DIST_DIR));
  app.get('*', (req, res) => {
    res.sendFile(path.join(DIST_DIR, 'index.html'));
  });
  
  const server = app.listen(PORT);
  
  const virtualConsole = new VirtualConsole();
  virtualConsole.on("error", (...args) => { console.log("JSDOM Error:", ...args); });
  virtualConsole.on("warn", (...args) => { console.log("JSDOM Warn:", ...args); });
  virtualConsole.on("info", (...args) => { console.log("JSDOM Info:", ...args); });
  virtualConsole.on("dir", (...args) => { console.log("JSDOM Dir:", ...args); });
  virtualConsole.on("log", (...args) => { console.log("JSDOM Log:", ...args); });
  virtualConsole.on("jsdomError", (e) => { console.error("JSDOM Internal Error:", e); });

  console.log('Loading page...');
  const dom = await JSDOM.fromURL(`http://localhost:${PORT}/`, {
    runScripts: "dangerously",
    resources: "usable",
    pretendToBeVisual: true,
    virtualConsole
  });
  
  console.log('Waiting for render...');
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  const html = dom.serialize();
  console.log('Root content:', dom.window.document.getElementById('root').innerHTML.substring(0, 200));
  
  dom.window.close();
  server.close();
}

test().catch(console.error);
