chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id) return;
  try {
    if (!/^https?:\/\//i.test(tab.url || '')) throw new Error('Abre una web http/https normal. No funciona en pestañas internas, tiendas de extensiones o el visor PDF.');
    await chrome.scripting.executeScript({target:{tabId:tab.id},files:['widget.js','content.js']});
    await chrome.action.setBadgeText({tabId:tab.id,text:''});
    await chrome.action.setTitle({tabId:tab.id,title:'Mostrar u ocultar Whippy en esta página'});
  } catch (err) {
    await chrome.action.setBadgeText({tabId:tab.id,text:'!'});
    await chrome.action.setBadgeBackgroundColor({tabId:tab.id,color:'#ad492f'});
    await chrome.action.setTitle({tabId:tab.id,title:'Whippy: no se puede añadir aquí. Abre una web normal y vuelve a pulsar el icono.'});
    console.warn('Whippy no se pudo activar:',err.message);
  }
});
