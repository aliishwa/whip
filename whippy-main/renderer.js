(() => {
  const desktop=!!window.whipBridge;
  if(desktop)document.documentElement.classList.add('desktop');
  globalThis.mountWhippy({soundUrl:new URL('whip.mp3',location.href).href,desktop,onClose:()=>{if(desktop)window.whipBridge.quit()}});
  if(desktop)window.addEventListener('keydown',e=>{if(e.key==='Escape')window.whipBridge.quit()});
})();
