const {contextBridge,ipcRenderer}=require('electron');
contextBridge.exposeInMainWorld('whipBridge',{quit:()=>ipcRenderer.send('quit')});
