(() => {
  if (globalThis.__whippyWidget) {
    globalThis.__whippyWidget.destroy();
    delete globalThis.__whippyWidget;
    return;
  }
  globalThis.__whippyWidget = globalThis.mountWhippy({
    soundUrl:chrome.runtime.getURL('whip.mp3'),
    onClose:()=>{delete globalThis.__whippyWidget;}
  });
})();
