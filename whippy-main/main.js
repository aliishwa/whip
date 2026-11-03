const {app,BrowserWindow,ipcMain,screen,globalShortcut}=require('electron');
const path=require('path');
let win;
const gotLock=app.requestSingleInstanceLock();
if(!gotLock)app.quit();
else {
  app.on('second-instance',()=>{if(win&&!win.isDestroyed()){win.show();win.focus()}});
  app.whenReady().then(()=>{
    const area=screen.getPrimaryDisplay().workArea;
    win=new BrowserWindow({x:area.x+Math.max(0,area.width-220),y:area.y+Math.max(0,area.height-400),width:210,height:380,transparent:true,frame:false,alwaysOnTop:true,hasShadow:false,resizable:false,show:false,webPreferences:{preload:path.join(__dirname,'preload.js'),contextIsolation:true,nodeIntegration:false,sandbox:true}});
    win.removeMenu();
    win.webContents.setWindowOpenHandler(()=>({action:'deny'}));
    win.webContents.on('will-navigate',e=>e.preventDefault());
    win.once('ready-to-show',()=>win.show());
    win.loadFile('index.html');
    globalShortcut.register('CommandOrControl+Shift+W',()=>{if(win&&!win.isDestroyed())win.isVisible()?win.hide():win.show()});
    win.on('closed',()=>{win=null});
  });
  ipcMain.on('quit',e=>{if(win&&e.sender===win.webContents)app.quit()});
  app.on('will-quit',()=>globalShortcut.unregisterAll());
  app.on('window-all-closed',()=>app.quit());
}
