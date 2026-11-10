import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 4173);
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.pdf':'application/pdf','.png':'image/png','.ico':'image/x-icon'};
const server = http.createServer(async(req,res)=>{
  try {
    const pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    const filename = path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
    const relative = path.relative(root,filename);
    if(relative.startsWith('..')||path.isAbsolute(relative)) { res.writeHead(403);res.end('Forbidden');return; }
    if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);res.end('Method not allowed');return;}
    const info = await stat(filename);
    if(!info.isFile()){res.writeHead(404);res.end('Not found');return;}
    const data = await readFile(filename);
    res.writeHead(200,{'Content-Type':types[path.extname(filename)]||'application/octet-stream','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'});
    res.end(req.method==='HEAD'?undefined:data);
  }catch(error){res.writeHead(error instanceof URIError?400:404);res.end('Not found');}
});
server.listen(port,'127.0.0.1',()=>console.log(`Portfolio ready at http://127.0.0.1:${port}`));
server.on('error',error=>{console.error(error.code==='EADDRINUSE'?`Port ${port} is in use. Set PORT to another port, or open index.html directly.`:error.message);process.exitCode=1;});
