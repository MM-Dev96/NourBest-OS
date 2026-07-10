const {app,BrowserWindow,shell}=require("electron");
const http=require("node:http");
const fs=require("node:fs");
const path=require("node:path");

const mime={".html":"text/html; charset=utf-8",".js":"text/javascript; charset=utf-8",".css":"text/css; charset=utf-8",".json":"application/json; charset=utf-8",".png":"image/png",".svg":"image/svg+xml",".webmanifest":"application/manifest+json"};
let server;
function startServer(){const root=app.isPackaged?path.join(process.resourcesPath,"nourbest"):path.resolve(__dirname,"..");return new Promise(resolve=>{server=http.createServer((req,res)=>{const requestPath=decodeURIComponent(new URL(req.url,"http://localhost").pathname),safe=path.normalize(requestPath).replace(/^(\.\.[/\\])+/,""),file=path.join(root,safe==="/"?"index.html":safe);if(!file.startsWith(root)){res.writeHead(403).end();return;}fs.readFile(file,(error,data)=>{if(error){fs.readFile(path.join(root,"index.html"),(fallback,html)=>{res.writeHead(fallback?404:200,{"Content-Type":"text/html; charset=utf-8"});res.end(fallback?"Not found":html);});return;}res.writeHead(200,{"Content-Type":mime[path.extname(file)]||"application/octet-stream"});res.end(data);});}).listen(0,"127.0.0.1",()=>resolve(server.address().port));});}
app.whenReady().then(async()=>{const port=await startServer(),window=new BrowserWindow({width:1440,height:900,minWidth:360,minHeight:600,title:"NourBest OS",backgroundColor:"#07111f",webPreferences:{contextIsolation:true,sandbox:true}});window.removeMenu();window.webContents.setWindowOpenHandler(({url})=>{shell.openExternal(url);return{action:"deny"};});await window.loadURL(`http://127.0.0.1:${port}`);});
app.on("window-all-closed",()=>{server?.close();if(process.platform!=="darwin")app.quit();});
