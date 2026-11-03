(() => {
  globalThis.mountWhippy = function({soundUrl,onClose=()=>{},desktop=false}) {
    const host=document.createElement('div');
    host.setAttribute('data-whippy','widget');
    host.style.cssText='all:initial!important;position:fixed!important;right:24px!important;bottom:24px!important;width:160px!important;height:330px!important;z-index:2147483647!important;display:block!important;pointer-events:auto!important;';
    const shadow=host.attachShadow({mode:'open'});
    shadow.innerHTML=`<style>
      :host{font-family:system-ui,sans-serif;color:#eef7ff;color-scheme:dark}
      *{box-sizing:border-box} .panel{width:160px;height:330px;border:1px solid #9bbbd344;border-radius:20px;background:linear-gradient(160deg,#13263ae6,#16394be6);box-shadow:0 8px 26px #0004;overflow:hidden}
      .bar{height:40px;display:flex;align-items:center;justify-content:space-between;padding:5px 9px;gap:5px;font:600 12px system-ui,sans-serif;${desktop?'-webkit-app-region:drag;':''}}
      .bar span{color:#a6d8eb;letter-spacing:1px}.bar button{font:600 13px system-ui,sans-serif;color:white;background:#ffffff15;border:1px solid #ffffff25;border-radius:8px;width:28px;height:27px;cursor:pointer;-webkit-app-region:no-drag}.bar button:hover{background:#ffffff35}
      button:focus-visible{outline:2px solid #83ebcb;outline-offset:-3px}
      #whip{display:block;border:0;background:transparent;color:inherit;width:120px;height:258px;margin:0 20px;cursor:${desktop?'pointer':'grab'};padding:0;touch-action:none;user-select:none;-webkit-app-region:no-drag}
      #whip svg{width:100%;height:100%;display:block;pointer-events:none;filter:drop-shadow(0 2px 3px #fff5)}
      #hint{font:10px/13px system-ui,sans-serif;text-align:center;color:#b7d1df;margin:0;height:30px;padding:0 6px}
      #impact{position:absolute;pointer-events:none;left:28px;top:72px;font:800 25px system-ui;color:#fff2ae;opacity:0;text-shadow:0 0 12px #ffd965}
      .quiet{font-size:11px!important}
    </style><div class="panel"><div class="bar"><span title="${desktop?'Arrastra esta barra para mover la ventana':'Arrastra el látigo para moverlo'}">WHIPPY</span><button id="mute" title="Silenciar sonido" aria-label="Silenciar sonido" aria-pressed="false">♫</button><button id="close" title="Cerrar Whippy" aria-label="Cerrar Whippy">×</button></div><button id="whip" aria-label="Hacer sonar el látigo"><svg viewBox="0 0 120 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="wood" x1="0" x2="1">
          <stop offset="0" stop-color="#5a3317" />
          <stop offset=".5" stop-color="#9a5b2c" />
          <stop offset="1" stop-color="#5a3317" />
        </linearGradient>
      </defs>
      <g transform="translate(0,300) scale(1,-1)">
        <path d="M60 78 C 60 140, 20 170, 40 230 S 80 280, 70 295" fill="none" stroke="#2b1a10" stroke-width="5"
          stroke-linecap="round" />
        <rect x="46" y="8" width="28" height="74" rx="12" fill="url(#wood)" />
        <g stroke="#2b1a10" stroke-width="2" opacity=".6">
          <line x1="46" y1="28" x2="74" y2="28" />
          <line x1="46" y1="44" x2="74" y2="44" />
          <line x1="46" y1="60" x2="74" y2="60" />
        </g>
      </g>
    </svg></button><p id="hint">${desktop?'Clic: chasquido · barra: mover':'Clic: chasquido · arrastra: mover'}</p><div id="impact" aria-hidden="true">¡CRACK!</div></div>`;
    (document.body||document.documentElement).appendChild(host);
    const whip=shadow.getElementById('whip'),impact=shadow.getElementById('impact'),muteButton=shadow.getElementById('mute');
    const sound=new Audio(soundUrl);sound.volume=.65;
    let muted=false,drag=null,skipClick=false,destroyed=false,timer=null,animation=null,flash=null;
    const clamp=(n,min,max)=>Math.max(min,Math.min(n,Math.max(min,max)));
    function position(x,y){host.style.setProperty('left',clamp(x,0,innerWidth-160)+'px','important');host.style.setProperty('top',clamp(y,0,innerHeight-330)+'px','important');host.style.setProperty('right','auto','important');host.style.setProperty('bottom','auto','important')}
    function onResize(){const r=host.getBoundingClientRect();position(r.left,r.top)}
    function swing(){
      if(destroyed)return;
      clearTimeout(timer);animation?.cancel();flash?.cancel();sound.pause();sound.currentTime=0;
      const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
      animation=whip.animate([{transform:'rotate(0deg)'},{transform:'rotate(12deg)',offset:.25},{transform:'rotate(-14deg)',offset:.5},{transform:'rotate(0deg)'}],{duration:reduced?160:650,easing:'ease-in-out'});
      timer=setTimeout(()=>{if(destroyed)return;if(!muted)sound.play().catch(()=>{shadow.getElementById('hint').textContent='Audio bloqueado: vuelve a hacer clic';});flash=impact.animate([{opacity:0,transform:'scale(.5)'},{opacity:1,offset:.25},{opacity:0,transform:'scale(1.1)'}],{duration:350})},reduced?20:190);
    }
    whip.style.transformOrigin='50% 88%';
    whip.addEventListener('pointerdown',e=>{if(e.button!==0||desktop)return;e.stopPropagation();const r=host.getBoundingClientRect();drag={id:e.pointerId,sx:e.clientX,sy:e.clientY,x:r.left,y:r.top,moved:false};whip.setPointerCapture(e.pointerId)});
    whip.addEventListener('pointermove',e=>{if(!drag||drag.id!==e.pointerId)return;e.stopPropagation();const dx=e.clientX-drag.sx,dy=e.clientY-drag.sy;if(Math.hypot(dx,dy)>5)drag.moved=true;if(drag.moved){position(drag.x+dx,drag.y+dy);whip.style.cursor='grabbing'}});
    function endDrag(e){if(!drag||drag.id!==e.pointerId)return;skipClick=drag.moved||e.type==='pointercancel';drag=null;whip.style.cursor=desktop?'pointer':'grab';if(whip.hasPointerCapture(e.pointerId))whip.releasePointerCapture(e.pointerId)}
    whip.addEventListener('pointerup',endDrag);whip.addEventListener('pointercancel',endDrag);
    whip.addEventListener('lostpointercapture',()=>{if(drag){skipClick=true;drag=null}});
    whip.addEventListener('click',e=>{e.stopPropagation();if(skipClick){skipClick=false;return}swing()});
    muteButton.addEventListener('click',e=>{e.stopPropagation();muted=!muted;muteButton.textContent=muted?'∅':'♫';muteButton.setAttribute('aria-pressed',String(muted));muteButton.setAttribute('aria-label',muted?'Activar sonido':'Silenciar sonido');muteButton.title=muted?'Activar sonido':'Silenciar sonido';if(muted)sound.pause()});
    function destroy(){if(destroyed)return;destroyed=true;clearTimeout(timer);sound.pause();animation?.cancel();flash?.cancel();window.removeEventListener('resize',onResize);host.remove();onClose()}
    shadow.getElementById('close').addEventListener('click',e=>{e.stopPropagation();destroy()});
    window.addEventListener('resize',onResize);onResize();
    return {destroy,host};
  };
})();
