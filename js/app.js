/* Taolamba Gastrobar — interfaz (React + htm, sin compilación) */

const {useState,useRef,useEffect}=React;
const html=htm.bind(React.createElement);
const RM=window.matchMedia('(prefers-reduced-motion: reduce)').matches,dur=ms=>RM?1:ms;
const CREAM='#f1e8d6',GOLD='#d6b25a',CRIMSON='#b0002e',MUSTARD='#fdb644';
const IMG='assets/img/gramofono.webp',PIN='assets/img/eje.png',LOGO='assets/img/logo-taolamba.webp',TT='assets/img/monograma-t.webp',SPTR='assets/img/bugambilia-1.webp',SPBL='assets/img/bugambilia-2.webp',FLO='assets/img/adorno.webp';
// geometry measured on the gramophone photo (1402 x 1122)
const W=1402,H=1122,CX=713.5,CY=697,D=468,K=0.759,PX=938,PY=498,REST=-65,TOP=56;
const norm=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();

const Ico={
 search:()=>html`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21"/></svg>`,
 close:()=>html`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg>`,
 play:()=>html`<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M3 1.5v11l9-5.5z" fill="currentColor"/></svg>`
};

// monogram label shared by every disc (original brand artwork)
const Label=({r})=>html`<g>
  <circle cx="200" cy="200" r=${r} fill=${CRIMSON}/>
  <circle cx="200" cy="200" r=${r-1.5} fill="none" stroke=${MUSTARD} strokeWidth="2"/>
  <image href=${TT} x=${200-r*.46} y=${200-r*.55} width=${r*.92} height=${r*1.1} preserveAspectRatio="xMidYMid meet"/>
  <circle cx="200" cy="200" r=${r*.07} fill="#0a0605" stroke=${MUSTARD} strokeWidth="1.2"/>
</g>`;

// anillos del disco: títulos de sección (dorado) + nombres de platos (crema), repartidos según la circunferencia
function rings(c){
  const ph=[];c.sections.forEach(s=>{ph.push({t:s.title.toUpperCase(),h:1});s.items.forEach(it=>{if(!it[4])ph.push({t:it[0]})})});
  const R=Math.min(6,Math.max(3,Math.ceil(ph.length/3))),step=R>1?Math.min(26,80/(R-1)):0;
  const rad=Array.from({length:R},(_,i)=>176-i*step),sum=rad.reduce((a,r)=>a+r,0);
  const w=p=>p.t.length+3,tot=ph.reduce((a,p)=>a+w(p),0);
  const out=rad.map(r=>({r,p:[]}));let acc=0,k=0,cum=tot*rad[0]/sum;
  ph.forEach(p=>{const mid=acc+w(p)/2;while(k<R-1&&mid>cum){k++;cum+=tot*rad[k]/sum}out[k].p.push(p);acc+=w(p)});
  return out.filter(o=>o.p.length);
}
function Vinyl({cat,uid}){
  const rg=rings(cat);
  return html`<svg viewBox="0 0 400 400" className="vsvg" aria-hidden="true">
    <defs>
      <radialGradient id=${'b'+uid} cx="50%" cy="50%" r="50%"><stop offset="0" stopColor=${cat.hi}/><stop offset=".45" stopColor=${cat.hi}/><stop offset=".78" stopColor=${cat.lo}/><stop offset="1" stopColor="#060404"/></radialGradient>
      ${rg.map((o,i)=>html`<path key=${i} id=${'p'+uid+i} d=${`M200,${200-o.r} a${o.r},${o.r} 0 1 1 0,${2*o.r} a${o.r},${o.r} 0 1 1 0,${-2*o.r}`}/>`)}
    </defs>
    <circle cx="200" cy="200" r="198" fill=${`url(#b${uid})`}/>
    <circle cx="200" cy="200" r="197" fill="none" stroke=${GOLD} strokeOpacity=".5" strokeWidth="1.2"/>
    ${Array.from({length:40},(_,i)=>html`<circle key=${i} cx="200" cy="200" r=${82+i*2.9} fill="none" stroke=${i%2?'rgba(255,255,255,.07)':'rgba(0,0,0,.35)'} strokeWidth=".6"/>`)}
    ${rg.map((o,i)=>{
      const circ=2*Math.PI*o.r,len=o.p.reduce((a,p)=>a+p.t.length+5,0)+8;
      const cap=Math.min(14.5,(rg.length>1?(rg[0].r-rg[1].r):26)*.8),k=Math.max(1,Math.round(circ/(len*.58*12.5))),fs=Math.max(9.5,Math.min(cap,circ/(len*.58*k)));
      return html`<text key=${i} fontFamily="Fraunces,Georgia,serif" fontWeight="600" fontSize=${fs} style=${{whiteSpace:'pre'}}>
        <textPath href=${'#p'+uid+i} textLength=${circ-3} lengthAdjust="spacing">
          ${Array.from({length:k},(_,j)=>html`<tspan key=${j}>${o.p.map((p,n)=>html`<tspan key=${n} fill=${p.h?GOLD:CREAM} fontWeight=${p.h?700:600}>${p.t+(n<o.p.length-1?'  ·  ':'')}</tspan>`)}<tspan fill=${GOLD}>${'   •   '}</tspan></tspan>`)}
        </textPath></text>`})}
    <circle cx="200" cy="200" r="66" fill="#000" opacity=".45"/>
    <${Label} r=${64}/>
  </svg>`;
}

function Mini({cat,uid}){
  return html`<svg viewBox="0 0 400 400" aria-hidden="true">
    <defs><radialGradient id=${'m'+uid}><stop offset="0" stopColor=${cat.hi}/><stop offset=".5" stopColor=${cat.hi}/><stop offset=".8" stopColor=${cat.lo}/><stop offset="1" stopColor="#060404"/></radialGradient></defs>
    <circle cx="200" cy="200" r="198" fill=${`url(#m${uid})`}/>
    <circle cx="200" cy="200" r="197" fill="none" stroke=${GOLD} strokeOpacity=".5" strokeWidth="3"/>
    ${[170,150,130,110,92].map(r=>html`<circle key=${r} cx="200" cy="200" r=${r} fill="none" stroke="rgba(0,0,0,.4)" strokeWidth="2"/>`)}
    <${Label} r=${78}/>
  </svg>`;
}

// brass tonearm in photo coordinates, pivoting at the sound box
function Tonearm({on}){
  const tube='M938 498 Q885 580 805 636';
  return html`<svg viewBox=${`0 0 ${W} ${H}`} style=${{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:20}} aria-hidden="true">
    <defs>
      <linearGradient id="tg" gradientUnits="userSpaceOnUse" x1="800" y1="520" x2="940" y2="600"><stop offset="0" stopColor="#8f6420"/><stop offset=".5" stopColor="#ffe9a0"/><stop offset="1" stopColor="#a8782a"/></linearGradient>
      <radialGradient id="cg"><stop offset="0" stopColor="#fff3bf"/><stop offset=".6" stopColor="#d9ad46"/><stop offset="1" stopColor="#6e4a12"/></radialGradient>
      <filter id="bl"><feGaussianBlur stdDeviation="3"/></filter>
    </defs>
    <g style=${{transformOrigin:`${PX}px ${PY}px`,transform:`rotate(${on?0:REST}deg)`,transition:on?'transform 1.25s cubic-bezier(.3,1.25,.5,1)':'transform 1s cubic-bezier(.45,.1,.25,1)'}}>
      <g filter="url(#bl)" opacity=${on?.5:.3} style=${{transform:on?'translate(5px,8px)':'translate(16px,30px)',transition:'transform 1s, opacity 1s'}}>
        <path d=${tube} fill="none" stroke="#000" strokeWidth="11" strokeLinecap="round"/>
        <rect x="-24" y="-10" width="48" height="20" rx="7" transform="translate(805 636) rotate(-40)"/>
      </g>
      <path d=${tube} fill="none" stroke="#6e4a12" strokeWidth="12" strokeLinecap="round"/>
      <path d=${tube} fill="none" stroke="url(#tg)" strokeWidth="8.5" strokeLinecap="round"/>
      <path d=${tube} fill="none" stroke="#fff6cf" strokeOpacity=".7" strokeWidth="2" strokeLinecap="round" transform="translate(-2 -2)"/>
      <g transform="translate(805 636) rotate(-40)">
        <rect x="-24" y="-10" width="48" height="20" rx="7" fill="url(#cg)" stroke="#5b3a0c" strokeWidth="2"/>
        <rect x="-24" y="-10" width="48" height="6" rx="3" fill="#fff6cf" opacity=".5"/>
        <circle cx="-14" cy="0" r="4" fill="#2a1d06"/>
        <path d="M-14 2 L-20 16" stroke="#1a1a1a" strokeWidth="2.4" strokeLinecap="round"/>
      </g>
    </g>
    <circle cx=${PX} cy=${PY} r="19" fill="url(#cg)" stroke="#5b3a0c" strokeWidth="2.5"/>
    <circle cx=${PX} cy=${PY} r="9" fill="#2a1d06" stroke="#e9c45f" strokeWidth="1.5"/>
    <circle cx=${PX-4} cy=${PY-5} r="3" fill="#fff6cf" opacity=".7"/>
  </svg>`;
}

function App(){
  const [ci,setCi]=useState(0),[open,setOpen]=useState(false),[up,setUp]=useState(false);
  const [lifted,setLifted]=useState(false),[leaving,setLeaving]=useState(false),[ready,setReady]=useState(false);
  const [searching,setSearching]=useState(false),[q,setQ]=useState(''),[hl,setHl]=useState(null),[pending,setPending]=useState(null);
  const [pn,setPn]=useState({left:0,right:0,margin:'0 auto',maxWidth:480,spacer:300});
  const discRef=useRef(null),spinRef=useRef(null),spA=useRef(null),fin=useRef(null),busy=useRef(false),tm=useRef([]);
  const xRef=useRef(null),panelRef=useRef(null),qRef=useRef(null),sbRef=useRef(null),openRef=useRef(null);
  const cat=CATS[ci],dim=open||searching;
  const T=(x,y,s,sy,rx,ry)=>`perspective(1100px) translate(${x}px,${y}px) scale(${s}) scaleY(${sy}) rotateX(${rx}deg) rotateY(${ry}deg)`;
  const BASE=`scaleY(${K})`,lerp=t=>K+(1-K)*t;

  useEffect(()=>{const t=setTimeout(()=>setReady(true),1000);return()=>clearTimeout(t)},[]);
  useEffect(()=>{const p=panelRef.current;if(p&&p.scrollTop)p.scrollTo({top:0,behavior:RM?'auto':'smooth'})},[ci]);
  useEffect(()=>{if(searching)setTimeout(()=>qRef.current&&qRef.current.focus(),60)},[searching]);
  useEffect(()=>{
    if(!open||!hl)return;
    const a=setTimeout(()=>{const el=document.getElementById('it-'+hl);if(el)el.scrollIntoView({block:'center',behavior:RM?'auto':'smooth'})},1500);
    const b=setTimeout(()=>setHl(null),4400);
    return()=>{clearTimeout(a);clearTimeout(b)};
  },[open,hl]);

  const openDisc=()=>{
    if(open||busy.current||leaving)return; busy.current=true;
    const el=discRef.current,sp=spinRef.current,r=el.getBoundingClientRect();
    const vw=window.innerWidth,vh=window.innerHeight,wide=vw>=860&&vw>vh*1.1;
    let size,cx,cy,p;
    if(wide){size=Math.min(vh*.44,vw*.24,340);cx=Math.max(vw*.24,size/2+32);cy=vh*.42;
      p={left:cx+size/2+48,right:32,margin:0,maxWidth:560,spacer:vh*.05};}
    else{size=Math.min(vw*.46,vh*.22,210);cx=vw/2;cy=TOP+size/2;
      p={left:0,right:0,margin:'0 auto',maxWidth:480,spacer:TOP+size+14};}
    const s=size/r.width,dx=cx-(r.left+r.width/2),dy=cy-(r.top+r.height/2);
    fin.current={dx,dy,s,wide}; if(panelRef.current)panelRef.current.scrollTop=0; setPn(p); setUp(true); setOpen(true);
    const m=new DOMMatrix(getComputedStyle(sp).transform);
    let ang=Math.atan2(m.b,m.a)*180/Math.PI; if(ang<0)ang+=360;
    sp.classList.remove('spin'); sp.style.transform=`rotate(${ang}deg)`;
    spA.current=sp.animate([{transform:`rotate(${ang}deg)`},{transform:`rotate(${ang>180?360:0}deg)`}],{duration:dur(1400),easing:'cubic-bezier(.2,.7,.2,1)',fill:'forwards'});
    const a=el.animate([
      {transform:T(0,0,1,K,0,0)},
      {offset:.3,transform:T(dx*.06,dy*.06-40,1.25,lerp(.45),22,-12)},
      {offset:.65,transform:T(dx*.65,dy*.65-26,(1+s)/2*1.06,lerp(.9),-9,9)},
      {transform:T(dx,dy,s,1,0,0)}],{duration:dur(1400),easing:'cubic-bezier(.35,.6,.25,1)',fill:'forwards'});
    a.onfinish=()=>{const sc=wide||!panelRef.current?0:panelRef.current.scrollTop;el.style.transform=T(dx,dy-sc,s,1,0,0);a.cancel();busy.current=false;if(xRef.current)xRef.current.focus({preventScroll:true});};
  };
  openRef.current=openDisc;

  const closeDisc=()=>{
    if(!open||busy.current)return; busy.current=true;
    const el=discRef.current,sp=spinRef.current,{dx,dy,s}=fin.current;
    const sc=fin.current.wide||!panelRef.current?0:panelRef.current.scrollTop,dy0=dy-sc;
    setOpen(false); el.style.transform=BASE;
    const a=el.animate([
      {transform:T(dx,dy0,s,1,0,0)},
      {offset:.4,transform:T(dx*.4,dy0*.4-30,1.1,lerp(.8),-10,8)},
      {transform:T(0,0,1,K,0,0)}],{duration:dur(1000),easing:'cubic-bezier(.35,.6,.25,1)',fill:'forwards'});
    a.onfinish=()=>{a.cancel();setUp(false);busy.current=false;if(panelRef.current)panelRef.current.scrollTop=0;el.focus({preventScroll:true});};
    if(spA.current)spA.current.cancel();
    sp.style.transform=''; sp.classList.add('spin');
  };

  // closed: arm lifts, disc leaves, new disc drops, arm lands again
  const pick=i=>{
    if(open||i===ci||leaving)return;
    tm.current.forEach(clearTimeout);
    setLifted(true); setLeaving(true); setPending(i);
    tm.current=[setTimeout(()=>{setCi(i);setPending(null);setLeaving(false)},dur(750)),setTimeout(()=>setLifted(false),dur(1700))];
  };
  // open: switch category from inside the sleeve
  const switchOpen=i=>{if(i!==ci&&!busy.current){setCi(i);setHl(null)}};

  const closeSearch=skip=>{setSearching(false);setQ('');if(skip!==true&&sbRef.current)sbRef.current.focus()};
  const goTo=(i,si,j)=>{closeSearch(true);setCi(i);setHl(i+'-'+si+'-'+j);setTimeout(()=>openRef.current&&openRef.current(),340)};
  useEffect(()=>{
    const k=e=>{if(e.key!=='Escape')return;if(searching)closeSearch();else closeDisc()};
    window.addEventListener('keydown',k);return()=>window.removeEventListener('keydown',k);
  });

  const onPanelScroll=e=>{const f=fin.current;if(!open||!f||f.wide||busy.current)return;discRef.current.style.transform=T(f.dx,f.dy-e.currentTarget.scrollTop,f.s,1,0,0)};
  const qt=q.trim(),nq=norm(qt);
  const res=qt?CATS.flatMap((c,i)=>c.sections.flatMap((s,si)=>s.items.map((it,j)=>({c,s,i,si,j,it})))).filter(o=>norm(o.it[0]+' '+o.it[2]).includes(nq)):[];
  const pct=v=>`${v*100}%`,inert=dim?'':undefined;
  return html`<${React.Fragment}>
    <header className="hd" inert=${inert}>
      <h1 className="lg"><img className="logo" src=${LOGO} width="984" height="360" alt="Taolamba Gastrobar"/></h1>
      <button ref=${sbRef} className="sbtn" onClick=${()=>setSearching(true)} aria-label="Buscar en la carta">${Ico.search()}</button>
    </header>

    <main className="main" inert=${inert}>
      <div className="stage">
        <img className="base" src=${IMG} alt="Gramófono antiguo de latón y caoba" draggable="false" decoding="async"/>
        <div ref=${discRef} className="disc" role="button" tabIndex="0" aria-label=${'Abrir la carta de '+cat.name}
          onClick=${openDisc} onKeyDown=${e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openDisc();}}}
          style=${{left:pct((CX-D/2)/W),top:pct((CY-D/2)/H),width:pct(D/W),aspectRatio:'1',zIndex:up?35:1,transform:BASE}}>
          <div key=${cat.id} className=${(leaving?'leave':'swap')+' in'}>
            <div ref=${spinRef} className=${(open?'':'spin ')+'sp'}><${Vinyl} cat=${cat} uid=${cat.id}/></div>
          </div>
          <div className="sheen"></div>
        </div>
        <img src=${PIN} alt="" aria-hidden="true" style=${{position:'absolute',pointerEvents:'none',zIndex:15,left:pct(690/W),top:pct(640/H),width:pct(50/W)}}/>
        <${Tonearm} on=${ready&&!up&&!lifted}/>
      </div>
      <p className="hint">Toca el disco para ver la carta</p>
    </main>

    <nav className="shelf" aria-label="Categorías" inert=${inert}>
      <div className="board"></div>
      <div className="row">
        ${CATS.map((c,i)=>html`<button key=${c.id} className=${'slot'+(i===ci?' on':'')+((i===ci||i===pending)?' away':'')} onClick=${()=>pick(i)} aria-pressed=${i===ci} aria-label=${c.name+(i===ci?' (en el tocadiscos)':'')}>
          <span className="rec"><${Mini} cat=${c} uid=${c.id}/><span className="rsh"></span></span>
          <span className="plq">${c.plaque}</span>
        </button>`)}
      </div>
    </nav>

    <div className=${'veil'+(open?' on':'')} onClick=${closeDisc} aria-hidden="true"></div>
    <button ref=${xRef} className=${'x'+(open?' on':'')} onClick=${closeDisc} aria-label="Volver al gramófono">${Ico.close()}</button>
    <section ref=${panelRef} className=${'panel'+(open?' on':'')} style=${{left:pn.left,right:pn.right,margin:pn.margin,maxWidth:pn.maxWidth}} onScroll=${onPanelScroll} role="dialog" aria-modal="true" aria-labelledby="ptt">
      <div className="spc" style=${{height:pn.spacer}} onClick=${closeDisc}></div>
      <div className="paper">
        <nav className="pills" aria-label="Categorías">
          ${CATS.map((c,i)=>html`<button key=${c.id} className=${'pill'+(i===ci?' on':'')} aria-pressed=${i===ci} aria-label=${c.name} onClick=${()=>switchOpen(i)}>${c.short}</button>`)}
        </nav>
        <div className="phd">
          <img className="spr tr" src=${SPTR} alt="" width="315" height="171" decoding="async"/>
          <h2 id="ptt" className="ptitle">${cat.name}</h2>
          <span className="pcount">${dishes(cat)} opciones</span>
        </div>
        ${cat.sections.map((s,si)=>html`<section key=${s.title} className="sec">
          <h3 className="sech">${s.title}</h3>
          ${s.note&&html`<p className="note">${s.note}</p>`}
          <ol className="trks">
            ${s.items.map((it,j)=>{const ex=!!it[4];return html`<li key=${j} id=${`it-${ci}-${si}-${j}`} className=${'trk'+(ex?' ex':'')+(hl===`${ci}-${si}-${j}`?' hl':'')}>
              <div className="tx"><h4>${it[0]}</h4>${it[2]&&html`<p>${it[2]}</p>`}${it[3]&&html`<img className="ph" src=${it[3]} alt=${it[0]} loading="lazy"/>`}</div>
              <span className="pr">${it[1]}</span>
            </li>`})}
          </ol></section>`)}
        <div className="pft" aria-hidden="true">
          <img className="spr bl" src=${SPBL} alt="" width="293" height="162" decoding="async"/>
          <img className="spr fl" src=${FLO} alt="" width="438" height="89" decoding="async"/>
        </div>
      </div>
    </section>

    <div className=${'sheet'+(searching?' on':'')} role="dialog" aria-modal="true" aria-label="Buscar en la carta">
      <div className="sbar">
        <input ref=${qRef} className="sin" type="search" value=${q} onChange=${e=>setQ(e.target.value)} placeholder="Busca un plato o ingrediente" aria-label="Buscar en la carta" autoComplete="off" enterKeyHint="search"/>
        <button className="sclose" onClick=${()=>closeSearch()}>Cerrar</button>
      </div>
      <div className="sres" aria-live="polite">
        ${!qt?html`<p className="smsg">Escribe el nombre de un plato o un ingrediente.</p>`
          :res.length===0?html`<p className="smsg">No encontramos “${qt}”. Prueba con otra palabra.</p>`
          :html`<p className="scount">${res.length} ${res.length===1?'resultado':'resultados'}</p>
            <ul>${res.map(o=>html`<li key=${o.i+'-'+o.si+'-'+o.j}><button className="res" onClick=${()=>goTo(o.i,o.si,o.j)}>
              <span className="rn">${o.it[0]}</span><span className="rp">${o.it[1]}</span><span className="rc">${o.s.title}</span></button></li>`)}</ul>`}
      </div>
    </div>
  <//>`;
}
ReactDOM.createRoot(document.getElementById('root')).render(html`<${App}/>`);
