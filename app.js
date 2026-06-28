/* ====================================================================
   GuardianGrid · AI Mission Control — Engine
   ==================================================================== */
(function(){
'use strict';

/* ---------------- icons ---------------- */
const P=(d)=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const IC={
  shield:P('<path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/><path d="M9 12l2 2 4-4"/>'),
  brain:P('<path d="M9 3a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 1 5 3 3 0 0 0 5 1.5V5a2 2 0 0 0-1-2z"/><path d="M15 3a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-1 5 3 3 0 0 1-5 1.5V5a2 2 0 0 1 1-2z"/>'),
  cpu:P('<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/><rect x="10" y="10" width="4" height="4" rx="1"/>'),
  car:P('<path d="M5 12l1.5-4.5A2 2 0 0 1 8.4 6h7.2a2 2 0 0 1 1.9 1.5L19 12M5 12h14v5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H8v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z"/><circle cx="7.5" cy="14.5" r="1"/><circle cx="16.5" cy="14.5" r="1"/>'),
  wrench:P('<path d="M14.7 6.3a4 4 0 0 0-5.4 5l-6 6 2.4 2.4 6-6a4 4 0 0 0 5-5.4l-2.6 2.6-2-2z"/>'),
  alert:P('<path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>'),
  landmark:P('<path d="M3 21h18M4 10h16M5 21V10M19 21V10M9 21V10M15 21V10M12 3L4 7h16z"/>'),
  chart:P('<path d="M3 3v18h18"/><rect x="7" y="11" width="3" height="6" rx="1"/><rect x="12" y="7" width="3" height="10" rx="1"/><rect x="17" y="13" width="3" height="4" rx="1"/>'),
  play:P('<path d="M6 4l14 8-14 8z" fill="currentColor" stroke="none"/>'),
  check:P('<path d="M20 6L9 17l-5-5"/>'),
  arrow:P('<path d="M5 12h14M13 6l6 6-6 6"/>'),
  droplet:P('<path d="M12 2.7l5.5 6.4a7.3 7.3 0 1 1-11 0z"/>'),
  building:P('<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01"/>'),
  zap:P('<path d="M13 2L3 14h8l-1 8 10-12h-8z"/>'),
  route:P('<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h6a4 4 0 0 0 0-8H10a4 4 0 0 1 0-8h6"/>'),
  bell:P('<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>'),
  users:P('<circle cx="9" cy="8" r="3.5"/><path d="M3 21a6 6 0 0 1 12 0M16 4a3.5 3.5 0 0 1 0 7M21 21a6 6 0 0 0-4-5.6"/>'),
  sparkles:P('<path d="M12 3l1.8 4.7L18 9.5l-4.2 1.8L12 16l-1.8-4.7L6 9.5l4.2-1.8z"/><path d="M19 14l.9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9z"/>'),
  sun:P('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4"/>'),
  refresh:P('<path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5"/>'),
  leaf:P('<path d="M11 20A7 7 0 0 1 4 13c0-6 7-9 16-9 0 9-3 16-9 16z"/><path d="M11 20c0-5 2-9 6-12"/>'),
  target:P('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>'),
  gauge:P('<path d="M12 14l4-4"/><path d="M3.3 17a9 9 0 1 1 17.4 0z"/>'),
  clock:P('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
  pin:P('<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>'),
};

/* ---------------- guardians ---------------- */
const GUARDIANS=[
  { id:'traffic', name:'Traffic Guardian', call:'Alpha', role:'Routing & flow control', ico:IC.car, c:'#2563EB',
    conf:96, lat:'0.34s', tasks:128, obj:'Reroute traffic around the incident zone and hold green corridor.' },
  { id:'infra', name:'Infrastructure Guardian', call:'Delta', role:'Utilities & repair', ico:IC.wrench, c:'#06B6D4',
    conf:92, lat:'0.51s', tasks:74, obj:'Isolate the leak, close valve V-12 and dispatch repair crew.' },
  { id:'emergency', name:'Emergency Guardian', call:'Omega', role:'Life-safety coordination', ico:IC.alert, c:'#EF4444',
    conf:98, lat:'0.28s', tasks:53, obj:'Secure an emergency corridor to City Hospital, ETA 6 min.' },
  { id:'government', name:'Government Guardian', call:'Sigma', role:'Compliance & records', ico:IC.landmark, c:'#10B981',
    conf:94, lat:'0.47s', tasks:96, obj:'File complaint #GG-4821 and synchronise all departments.' },
  { id:'analytics', name:'Analytics Guardian', call:'Nova', role:'Prediction & learning', ico:IC.chart, c:'#8B5CF6',
    conf:90, lat:'0.19s', tasks:212, obj:'Forecast city impact and update the learning model.' },
];

/* brain reasoning script */
const BRAIN=[
  ['Analyzing citizen request…','info'],
  ['Detecting entities…','info'],
  ['Water leakage detected.','warn'],
  ['Confidence 98%.','ok'],
  ['City Hospital 240m away — high exposure.','info'],
  ['Traffic congestion predicted on Route 7.','warn'],
  ['Priority classified: HIGH.','warn'],
  ['Selecting optimal guardians…','info'],
  ['Traffic Guardian Alpha assigned.','ok'],
  ['Emergency Guardian Omega assigned.','ok'],
  ['Infrastructure Guardian Delta assigned.','ok'],
  ['Generating coordinated execution plan…','info'],
  ['Dispatching units · monitoring city response.','ok'],
  ['Incident contained. Learning model updated.','ok'],
];

const PIPELINE=['Citizen Request','Intent Detection','Supervisor AI','Guardians','Departments','Citizen Updated'];

/* ---------------- helpers ---------------- */
const $=(s,r=document)=>r.querySelector(s);
const el=(t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e;};
let TIMERS=[];
const after=(fn,ms)=>{const id=setTimeout(fn,ms);TIMERS.push(id);return id;};
const every=(fn,ms)=>{const id=setInterval(fn,ms);TIMERS.push(id);return id;};
const clearAll=()=>{TIMERS.forEach(clearTimeout);TIMERS.forEach(clearInterval);TIMERS=[];};
let missionStart=Date.now();
const stamp=()=>{const s=Math.floor((Date.now()-missionStart)/1000);const h=String(Math.floor(s/3600)).padStart(2,'0');
  const m=String(Math.floor(s/60)%60).padStart(2,'0');const ss=String(s%60).padStart(2,'0');return `${h}:${m}:${ss}`;};

function toast(title,sub,ico=IC.check,bg='rgba(16,185,129,.14)',color='#047857'){
  const t=el('div','toast',`<div class="t-ico" style="background:${bg};color:${color}">${ico}</div><div><div>${title}</div>${sub?`<div class="t-sub">${sub}</div>`:''}</div>`);
  $('#toastWrap').appendChild(t);requestAnimationFrame(()=>t.classList.add('show'));
  after(()=>{t.classList.remove('show');after(()=>t.remove(),450);},3400);
}

/* ====================================================================
   LANDING — particle field + cinematic city
==================================================================== */
function introParticles(){
  const cv=$('#introCanvas');const ctx=cv.getContext('2d');let w,h,pts;
  const resize=()=>{w=cv.width=innerWidth;h=cv.height=innerHeight;
    pts=Array.from({length:Math.min(90,Math.floor(w*h/18000))},()=>({x:Math.random()*w,y:Math.random()*h*.7,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4}));};
  resize();addEventListener('resize',resize);
  (function draw(){
    if(!document.body.contains(cv))return;
    ctx.clearRect(0,0,w,h);
    for(const p of pts){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h*.78)p.vy*=-1;}
    for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const a=pts[i],b=pts[j],d=Math.hypot(a.x-b.x,a.y-b.y);
      if(d<140){ctx.strokeStyle=`rgba(37,99,235,${.13*(1-d/140)})`;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}}
    for(const p of pts){const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,3.5);g.addColorStop(0,'rgba(6,182,212,.9)');g.addColorStop(1,'rgba(6,182,212,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(p.x,p.y,3.5,0,7);ctx.fill();}
    requestAnimationFrame(draw);
  })();
}

function introCity(){
  const svg=$('#introCity');
  let blds='',roads='',nets='',nodes='',extras='';
  // buildings
  let x=20,i=0;
  while(x<1420){const bw=40+Math.random()*70;const bh=120+Math.random()*300;
    blds+=`<rect class="bld" x="${x}" y="${600-bh}" width="${bw-8}" height="${bh}" rx="6" fill="url(#ig)" stroke="#BBD3F2" style="animation-delay:${(i*0.05).toFixed(2)}s"/>`;
    x+=bw;i++;}
  // road network
  roads+=`<path class="road" d="M0 560 H1440" stroke="#A9C2E6" stroke-width="3" style="animation-delay:.6s"/>`;
  roads+=`<path class="road" d="M0 590 H1440" stroke="#A9C2E6" stroke-width="2" style="animation-delay:.8s"/>`;
  // glowing net spreading
  nets+=`<path class="netline" d="M80 420 L300 330 L560 380 L820 280 L1080 350 L1360 300" stroke="url(#netg)" stroke-width="2" fill="none" style="animation-delay:1s"/>`;
  nets+=`<path class="netline" d="M300 330 L560 250 L820 280" stroke="url(#netg)" stroke-width="1.6" fill="none" style="animation-delay:1.3s"/>`;
  nets+=`<path class="netline" d="M560 380 L1080 350" stroke="url(#netg)" stroke-width="1.6" fill="none" style="animation-delay:1.6s"/>`;
  // ai nodes
  const np=[[300,330],[560,250],[820,280],[1080,350],[80,420],[1360,300],[560,380]];
  np.forEach((p,k)=>{nodes+=`<g class="ainode" style="animation-delay:${(1.2+k*0.12).toFixed(2)}s"><circle cx="${p[0]}" cy="${p[1]}" r="5" fill="#06B6D4"/><circle cx="${p[0]}" cy="${p[1]}" r="9" fill="none" stroke="#06B6D4" stroke-width="1.5" opacity=".5"/></g>`;});
  // emergency blink + drone + car (ambient)
  extras+=`<circle class="blink" cx="640" cy="540" r="4" fill="#EF4444" style="animation-delay:2s"/>`;
  extras+=`<g class="drone" style="animation-delay:2.2s"><circle cx="900" cy="200" r="4" fill="#2563EB"/><line x1="893" y1="200" x2="907" y2="200" stroke="#2563EB" stroke-width="2"/></g>`;
  extras+=`<rect x="-30" y="552" width="22" height="11" rx="3" fill="#2563EB"><animateMotion dur="6s" repeatCount="indefinite" path="M0 0 H1480"/></rect>`;
  extras+=`<rect x="-30" y="584" width="20" height="10" rx="3" fill="#06B6D4"><animateMotion dur="8s" begin="2s" repeatCount="indefinite" path="M0 0 H1480"/></rect>`;
  svg.innerHTML=`<defs>
    <linearGradient id="ig" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#CFE2FB"/><stop offset="100%" stop-color="#EAF3FF"/></linearGradient>
    <linearGradient id="netg" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#2563EB"/><stop offset="50%" stop-color="#06B6D4"/><stop offset="100%" stop-color="#10B981"/></linearGradient>
  </defs>${blds}${roads}${nets}${nodes}${extras}`;
}

/* ====================================================================
   MISSION CONTROL — build
==================================================================== */
function setIcons(){
  $('#llMark').innerHTML=IC.shield;$('#mtMark').innerHTML=IC.shield;
  $('#cityTagIco').innerHTML=IC.pin;$('#coreTagIco').innerHTML=IC.cpu;$('#brainTagIco').innerHTML=IC.brain;
  $('#holoIco').innerHTML=IC.sparkles;$('#coreIco').innerHTML=IC.shield;$('#rbIco').innerHTML=IC.play;
  $('#mtWeather').innerHTML=`${IC.sun} 24°C · Clear`;
  $('#morphIco').innerHTML=IC.refresh;$('#doneIco').innerHTML=IC.refresh;$('#completeCheck').innerHTML=IC.check;
}

/* ---- digital twin city ---- */
function buildCity(){
  const stage=$('#cityStage');
  const VB=`0 0 1000 720`;
  // procedural buildings within blocks
  const blocks=[[40,40,310,250],[420,40,260,250],[740,40,220,250],[40,420,300,250],[420,420,260,250],[740,420,220,250]];
  let blds='';
  blocks.forEach(b=>{let x=b[0]+14;while(x<b[0]+b[2]-30){const bw=26+Math.random()*40;const bh=24+Math.random()*70;
    blds+=`<rect x="${x}" y="${b[1]+b[3]-bh-14}" width="${bw-6}" height="${bh}" rx="4" fill="url(#cg)" stroke="#CFE0F4"/>`;x+=bw;}});
  // roads (grid)
  const HRoads=[150,330,510,660],VRoads=[170,400,630,850];
  let roads='';
  HRoads.forEach(y=>roads+=`<line class="road-base" x1="0" y1="${y}" x2="1000" y2="${y}" stroke-width="16"/>`);
  VRoads.forEach(x=>roads+=`<line class="road-base" x1="${x}" y1="0" x2="${x}" y2="720" stroke-width="16"/>`);
  // lane dashes (ambient traffic flow)
  let dashes='';
  HRoads.forEach((y,i)=>dashes+=`<line x1="0" y1="${y}" x2="1000" y2="${y}" stroke="#9FE0FF" stroke-width="2" stroke-dasharray="14 18" opacity=".7"><animate attributeName="stroke-dashoffset" from="0" to="-64" dur="${1.4+i*0.2}s" repeatCount="indefinite"/></line>`);
  // facilities (labelled glyph blocks)
  const fac=(x,y,c,glyph,label)=>`<g><rect x="${x-22}" y="${y-22}" width="44" height="44" rx="11" fill="#fff" stroke="${c}" stroke-width="2"/><g transform="translate(${x-11},${y-11}) scale(.92)" style="color:${c}">${glyph}</g><text x="${x}" y="${y+34}" text-anchor="middle" font-size="11" font-weight="700" fill="#42526B">${label}</text></g>`;
  const facilities=
    fac(630,230,'#EF4444','<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 6v12M6 12h12"/></svg>','Hospital')+
    fac(170,230,'#2563EB','<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 21V8l7-4 7 4v13"/><path d="M9 21v-6h6v6"/></svg>','Police')+
    fac(850,230,'#F59E0B','<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3c1 4 5 5 5 9a5 5 0 0 1-10 0c0-2 1-3 2-4"/></svg>','Fire')+
    fac(170,590,'#06B6D4','<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l5 6a6 6 0 1 1-10 0z"/></svg>','Water Plant')+
    fac(850,590,'#10B981','<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M5 21V10l7-4 7 4v11"/></svg>','City Hall');
  // traffic signals at some intersections
  const sigP=[[400,330],[630,330],[400,510]];
  let signals=sigP.map((p,i)=>`<circle class="signal" id="sig${i}" cx="${p[0]}" cy="${p[1]}" r="6" fill="#10B981"/>`).join('');
  // hot (red) roads around incident (x400,y330)
  let hot=`<line class="road-hot" x1="170" y1="330" x2="630" y2="330" stroke-width="16"/>
           <line class="road-hot" x1="400" y1="150" x2="400" y2="510" stroke-width="16"/>`;
  // green emergency route hospital(630,230)->incident(400,330)
  let green=`<path class="green-route" d="M630 250 L630 330 L400 330" stroke-width="6" fill="none"/>`;
  // incident marker
  let marker=`<g class="incident-marker"><circle cx="400" cy="330" r="9" fill="#2563EB"/><circle cx="400" cy="330" r="9" fill="none" stroke="#2563EB" class="pulse-ring"/><circle cx="400" cy="330" r="9" fill="none" stroke="#2563EB" class="pulse-ring" style="animation-delay:1s"/></g>`;
  // ambient vehicles
  const car=(color,path,dur,begin=0,w=20,h=10)=>`<rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="3" fill="${color}"><animateMotion dur="${dur}s" begin="${begin}s" repeatCount="indefinite" rotate="auto" path="${path}"/></rect>`;
  let cars=
    car('#2563EB','M0 150 H1000',7)+
    car('#06B6D4','M1000 510 H0',9,1)+
    car('#8B5CF6','M170 0 V720',8,2)+
    car('#10B981','M850 720 V0',10,0.5)+
    car('#42526B','M0 660 H1000',6,3,16,9)+
    car('#2563EB','M630 0 V720',9,1.5,16,9);
  // ambulance + repair truck (hidden until dispatch)
  let units=`
    <g class="amb"><rect x="-13" y="-7" width="26" height="14" rx="4" fill="#10B981"/><rect x="-13" y="-7" width="8" height="14" rx="3" fill="#fff" opacity=".85"/><circle cx="9" cy="-9" r="2.5" fill="#EF4444"><animate attributeName="opacity" values="1;.2;1" dur=".5s" repeatCount="indefinite"/></circle>
      <animateMotion id="ambMotion" dur="9s" begin="indefinite" rotate="auto" path="M630 250 L630 330 L400 330"/></g>
    <g class="truck"><rect x="-14" y="-7" width="20" height="14" rx="3" fill="#06B6D4"/><rect x="6" y="-5" width="9" height="12" rx="2" fill="#0E7490"/>
      <animateMotion id="truckMotion" dur="10s" begin="indefinite" rotate="auto" path="M170 590 L170 510 L400 510 L400 330"/></g>`;
  // drones + clouds
  let drones=`<g class="drone"><circle cx="300" cy="90" r="5" fill="#2563EB"/><line x1="291" y1="90" x2="309" y2="90" stroke="#2563EB" stroke-width="2"/></g>
              <g class="drone" style="animation-delay:1.5s"><circle cx="760" cy="120" r="5" fill="#06B6D4"/><line x1="751" y1="120" x2="769" y2="120" stroke="#06B6D4" stroke-width="2"/></g>`;
  let clouds=`<ellipse class="cloud-shadow" cx="200" cy="400" rx="160" ry="60" fill="#1E3A8A"/><ellipse class="cloud-shadow" cx="700" cy="250" rx="200" ry="70" fill="#1E3A8A" style="animation-delay:18s"/>`;

  stage.innerHTML=`<svg viewBox="${VB}" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#DCEAFB"/><stop offset="100%" stop-color="#F0F7FF"/></linearGradient>
      <radialGradient id="sky" cx="50%" cy="0%" r="100%"><stop offset="0%" stop-color="#EAF5FF"/><stop offset="100%" stop-color="#F7FBFF"/></radialGradient>
    </defs>
    <rect x="0" y="0" width="1000" height="720" fill="url(#sky)"/>
    ${clouds}
    <g>${blds}</g>
    <g>${roads}</g>
    <g>${dashes}</g>
    ${facilities}
    ${green}${hot}
    ${signals}
    <g>${cars}</g>
    ${units}
    ${marker}
    ${drones}
  </svg>`;
}

/* ---- AI core: guardians orbit + energy lines ---- */
function buildCore(){
  const orbit=$('#guardiansOrbit');orbit.innerHTML='';
  const energy=$('#energyLines');
  const R=120,cx=150,cy=150;
  let paths='';
  GUARDIANS.forEach((g,i)=>{
    const a=(-90+i*(360/GUARDIANS.length))*Math.PI/180;
    const gx=cx+R*Math.cos(a),gy=cy+R*Math.sin(a);
    const orb=el('div','gorb');orb.dataset.id=g.id;orb.style.setProperty('--ac',g.c);
    orb.style.left=(gx-25)+'px';orb.style.top=(gy-25)+'px';
    orb.innerHTML=`${g.ico}<span class="gorb-chk">${IC.check}</span>`;
    orb.title=g.name+' '+g.call;
    orbit.appendChild(orb);
    paths+=`<path data-id="${g.id}" d="M${cx} ${cy} L${gx} ${gy}"/>`;
  });
  energy.setAttribute('viewBox','0 0 300 300');
  energy.innerHTML=`<defs><linearGradient id="egrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#2563EB"/><stop offset="100%" stop-color="#10B981"/></linearGradient></defs>${paths}`;
}

/* ---- pipeline ---- */
function buildPipeline(){
  const p=$('#pipeline');p.innerHTML='';
  PIPELINE.forEach(s=>p.appendChild(el('div','pstep',`<span class="ps-dot"></span>${s}`)));
}

/* ---- shared memory hologram ---- */
const MEM=[['Location','City Hospital · S-7'],['Priority','HIGH'],['Departments','Water · Traffic'],['ETA','12 min'],['Confidence','94%'],['Learning','+38 pts']];
function buildHolo(){
  const g=$('#holoGrid');g.innerHTML='';
  MEM.forEach((m,i)=>g.appendChild(el('div','holo-cell',`<div class="hc-k">${m[0]}</div><div class="hc-v" id="mem${i}">${m[1]}</div>`)));
}
function flashMem(i,val){const c=$('#mem'+i);if(!c)return;c.textContent=val;const cell=c.closest('.holo-cell');cell.classList.remove('flash');void cell.offsetWidth;cell.classList.add('flash');}

/* ---- guardians sheet ---- */
function buildSheet(){
  const g=$('#sheetGrid');g.innerHTML='';
  GUARDIANS.forEach(gd=>{
    const c=el('div','gcard');c.style.setProperty('--ac',gd.c);
    c.innerHTML=`
      <div class="gc-top">
        <div class="gc-ico">${gd.ico}<span class="breathe"></span></div>
        <div><div class="gc-name">${gd.name} <span style="color:${gd.c}">${gd.call}</span></div><div class="gc-role">${gd.role}</div></div>
        <div class="gc-status"><div class="gc-think"><i></i><i></i><i></i></div><div class="gc-live">● ONLINE</div></div>
      </div>
      <div class="gc-body">
        <div class="conf-ring" style="--p:${gd.conf};--ac:${gd.c}"><div class="cr-hole"></div><div class="cr-v">${gd.conf}%</div></div>
        <div class="gc-metrics">
          <div class="gc-m"><div class="gm-k">Latency</div><div class="gm-v">${gd.lat}</div></div>
          <div class="gc-m"><div class="gm-k">Tasks done</div><div class="gm-v" data-tasks>${gd.tasks}</div></div>
        </div>
      </div>
      <div class="gc-obj"><b>Objective ·</b> ${gd.obj}</div>`;
    g.appendChild(c);
  });
}

/* ====================================================================
   MISSION SEQUENCE
==================================================================== */
let running=false;
function termLine(tag,tagCls,msg){
  const body=$('#termBody');if(!body)return;
  const l=el('div','term-line',`<span class="tl-time">[${stamp()}]</span><span class="tl-tag ${tagCls}">${tag}</span><span class="tl-msg">${msg}</span>`);
  body.appendChild(l);body.scrollTop=body.scrollHeight;
}
function pipe(i,state){const steps=document.querySelectorAll('.pstep');if(!steps[i])return;
  if(state==='active'){steps[i].classList.add('active');}
  if(state==='done'){steps[i].classList.remove('active');steps[i].classList.add('done');}}

function brainLine(text,type){
  return new Promise(res=>{
    const scroll=$('#brainScroll');if(!scroll){res();return;}
    const item=el('div','think '+(type==='ok'?'ok':type==='warn'?'warn':''),
      `<div class="th-rail"><span class="th-dot"></span><span class="th-line"></span></div><div class="th-text"></div>`);
    scroll.appendChild(item);scroll.scrollTop=scroll.scrollHeight;
    const tEl=item.querySelector('.th-text');tEl.classList.add('term-cursor');
    let i=0;const speed=18,chunk=2;
    const type1=()=>{
      if(i<text.length){i=Math.min(text.length,i+chunk);tEl.textContent=text.slice(0,i);scroll.scrollTop=scroll.scrollHeight;after(type1,speed);}
      else{tEl.classList.remove('term-cursor');
        // colorize keywords
        tEl.innerHTML=text.replace(/(HIGH|98%|94%|Water leakage|240m)/g,'<span class="hl">$1</span>').replace(/(assigned\.)/g,'<span class="hlg">$1</span>');
        res();}
    };
    type1();
  });
}
async function runBrain(){
  const scroll=$('#brainScroll');if(scroll)scroll.innerHTML='';
  for(const [t,ty] of BRAIN){ if(!running)break; await brainLine(t,ty); await wait(160); }
}
const wait=(ms)=>new Promise(r=>after(r,ms));

function setCore(state,label){const core=$('#aiCore');const cs=$('#coreState');
  if(core)core.classList.toggle('thinking',state==='thinking');if(cs)cs.textContent=label;}

function tokenStream(on){
  if(on){every(()=>{const t=$('#tps');if(t)t.textContent=(180+Math.floor(Math.random()*120));},220);}
}

async function runMission(){
  if(running)return;running=true;
  const btn=$('#runMission');btn.disabled=true;$('#runLabel').textContent='Mission Running…';
  $('#termStatus').innerHTML='<i class="dot dot-red"></i> live ops';
  setCore('thinking','THINKING');tokenStream(true);
  toast('Mission initiated','Citizen request received',IC.zap,'rgba(37,99,235,.14)','#2563EB');

  // brain runs in parallel
  runBrain();

  // pipeline + city + guardians timeline
  await wait(300);
  pipe(0,'active');termLine('SYS','tag-sys','Citizen request received · intake#voice');
  await wait(900);pipe(0,'done');pipe(1,'active');
  termLine('INFO','tag-info','Intent Detection · classifying request…');
  await wait(1100);
  // incident appears on city
  $('#cityStage').classList.add('incident');
  $('#cityStatus').innerHTML='<i class="dot dot-red"></i> Incident';
  $('#mtThreat').innerHTML='<i class="dot dot-amber"></i> High';
  setSignals('#EF4444');
  toast('Incident detected','Water leakage · City Hospital · S-7',IC.droplet,'rgba(239,68,68,.14)','#DC2626');
  termLine('WARN','tag-warn','Water leakage detected near City Hospital · priority HIGH');
  flashMem(1,'HIGH');flashMem(0,'City Hospital · S-7');
  pipe(1,'done');pipe(2,'active');
  await wait(900);
  termLine('SYS','tag-sys','Supervisor AI · allocating guardians');
  // light energy lines + guardians sequentially
  pipe(2,'done');pipe(3,'active');
  for(let i=0;i<GUARDIANS.length;i++){
    if(!running)break;
    const g=GUARDIANS[i];
    lightEnergy(g.id,true);
    const orb=document.querySelector(`.gorb[data-id="${g.id}"]`);if(orb)orb.classList.add('active');
    termLine('OK','tag-ok',`${g.name} ${g.call} connected · ${g.role}`);
    flashMem(2, i===0?'Water · Traffic':i===2?'Water · Traffic · Health':$('#mem2').textContent);
    // trigger city actions on relevant guardians
    if(g.id==='emergency'){ $('#cityStage').classList.add('dispatch'); beginMotion('ambMotion'); termLine('OK','tag-ok','Emergency corridor secured · ambulance A-04 en route'); setSignals('#10B981'); }
    if(g.id==='infra'){ beginMotion('truckMotion'); termLine('OK','tag-ok','Valve V-12 isolated · repair crew #12 dispatched'); flashMem(3,'8 min'); }
    if(g.id==='traffic'){ termLine('OK','tag-ok','Route 7 rerouted · green-wave applied'); }
    if(g.id==='government'){ termLine('OK','tag-ok','Complaint #GG-4821 filed · departments synced'); }
    if(g.id==='analytics'){ termLine('INFO','tag-info','Impact forecast complete · learning model queued'); flashMem(5,'+52 pts'); }
    await wait(950);
    if(orb){orb.classList.remove('active');orb.classList.add('done');}
    flashMem(4,(94+i)%100+'%');
  }
  pipe(3,'done');pipe(4,'active');
  await wait(700);
  termLine('SYS','tag-sys','Departments notified · Water · Traffic · Health · EMS');
  flashMem(3,'Resolving…');
  pipe(4,'done');pipe(5,'active');
  await wait(900);
  termLine('OK','tag-ok','Citizen notified · live tracking link sent');
  flashMem(3,'Done');
  pipe(5,'done');
  await wait(900);
  termLine('OK','tag-ok','Incident resolved in 12 min · learning model updated');
  // city returns to normal
  resolveCity();
  await wait(1100);
  missionComplete();
}

function setSignals(color){['sig0','sig1','sig2'].forEach(id=>{const s=$('#'+id);if(s)s.setAttribute('fill',color);});}
function lightEnergy(id,on){const p=document.querySelector(`#energyLines path[data-id="${id}"]`);if(p)p.classList.toggle('live',on);}
function beginMotion(id){const m=$('#'+id);if(m&&m.beginElement){try{m.beginElement();}catch(e){}}}

function resolveCity(){
  const stage=$('#cityStage');
  stage.classList.remove('incident');
  setSignals('#10B981');
  $('#cityStatus').innerHTML='<i class="dot dot-green"></i> Secure';
  $('#mtThreat').innerHTML='<i class="dot dot-green"></i> Low';
  document.querySelectorAll('#energyLines path').forEach(p=>p.classList.remove('live'));
  after(()=>stage.classList.remove('dispatch'),3000);
}

function missionComplete(){
  setCore('idle','SECURE');tokenStream(false);
  $('#termStatus').innerHTML='<i class="dot dot-green"></i> nominal';
  const ov=$('#completeOverlay');
  const lines=[['City Secure',IC.shield],['Response Time · 12 min',IC.clock],['System Learning Updated',IC.sparkles]];
  const cl=$('#completeLines');cl.innerHTML='';
  lines.forEach((l,i)=>{const d=el('div','cl',`<span class="cl-ico">${l[1]}</span>${l[0]}`);d.style.animationDelay=(0.3+i*0.25)+'s';cl.appendChild(d);});
  ov.classList.add('open');
  toast('Mission Completed','City secure · all units stood down',IC.check);
  // reset guardians/pipeline after closing
}
function resetMission(){
  running=false;clearAll();missionStart=missionStart; // keep clock
  $('#completeOverlay').classList.remove('open');
  $('#runMission').disabled=false;$('#runLabel').textContent='Run Mission';
  setCore('idle','IDLE');
  document.querySelectorAll('.gorb').forEach(o=>o.classList.remove('active','done'));
  document.querySelectorAll('.pstep').forEach(p=>p.classList.remove('active','done'));
  document.querySelectorAll('#energyLines path').forEach(p=>p.classList.remove('live'));
  const stage=$('#cityStage');if(stage){stage.classList.remove('incident','dispatch');}
  setSignals('#10B981');
  startClock();
}

/* ====================================================================
   REAL-WORLD IMPACT
==================================================================== */
function miniCity(mode){
  // mode 'trad' (red, congested) or 'grid' (green, flowing)
  const road=mode==='trad'?'#EF4444':'#10B981';
  const carColor=mode==='trad'?'#B91C1C':'#10B981';
  let cars='';
  if(mode==='grid'){
    cars=`<rect x="-8" y="-4" width="16" height="8" rx="2" fill="${carColor}"><animateMotion dur="3s" repeatCount="indefinite" path="M0 60 H260"/></rect>
          <rect x="-8" y="-4" width="16" height="8" rx="2" fill="#06B6D4"><animateMotion dur="3.6s" repeatCount="indefinite" path="M260 130 H0"/></rect>
          <g><circle cx="200" cy="40" r="6" fill="#2563EB"/><circle cx="200" cy="40" r="6" fill="none" stroke="#2563EB" class="pulse-ring"/></g>`;
  } else {
    // queued cars (static, bumper to bumper)
    for(let x=10;x<250;x+=22)cars+=`<rect x="${x}" y="56" width="16" height="8" rx="2" fill="#B91C1C"/>`;
    for(let y=10;y<180;y+=22)cars+=`<rect x="196" y="${y}" width="8" height="16" rx="2" fill="#B91C1C"/>`;
  }
  return `<svg viewBox="0 0 260 200" preserveAspectRatio="xMidYMid slice">
    <rect width="260" height="200" fill="${mode==='trad'?'#FFF6F6':'#F2FFFB'}"/>
    ${[20,90,160].map(y=>`<rect x="14" y="${y}" width="${mode==='trad'?70:50}" height="22" rx="4" fill="#fff" stroke="#E2E8F0"/>`).join('')}
    <line x1="0" y1="60" x2="260" y2="60" stroke="${road}" stroke-width="12" opacity=".8"/>
    <line x1="200" y1="0" x2="200" y2="200" stroke="${road}" stroke-width="12" opacity=".8"/>
    ${cars}
  </svg>`;
}
function buildImpact(){
  $('#tradCity').innerHTML=miniCity('trad');
  $('#ggCity').innerHTML=miniCity('grid');
  const li=(t,ico,c)=>`<li><span class="li-ico" style="background:${c}1a;color:${c}">${ico}</span>${t}</li>`;
  $('#tradList').innerHTML=li('48-hour complaint queues',IC.clock,'#EF4444')+li('Red, congested roads',IC.car,'#EF4444')+li('Manual coordination',IC.users,'#EF4444');
  $('#ggList').innerHTML=li('12-minute resolution',IC.zap,'#10B981')+li('Green, flowing traffic',IC.leaf,'#10B981')+li('Autonomous coordination',IC.cpu,'#10B981');
  const metrics=[['48 Hours','12 Minutes','Complaint Resolution'],['18 Minutes','7 Minutes','Emergency Response'],['15 Portals','1 AI Platform','Citizen Access']];
  $('#impactMetrics').innerHTML=metrics.map(m=>`<div class="imetric"><div class="im-row"><span class="im-old">${m[0]}</span><span class="im-arrow">${IC.arrow}</span><span class="im-new">${m[1]}</span></div><div class="im-label">${m[2]}</div></div>`).join('');
}

/* ====================================================================
   CLOCK / WIRING
==================================================================== */
let clockTimer=null;
function startClock(){if(clockTimer)clearInterval(clockTimer);const c=$('#missionClock');
  clockTimer=setInterval(()=>{if(c)c.textContent=stamp();},1000);}

let mcFrom='landing';
function buildMC(){
  missionStart=Date.now();startClock();
  buildCity();buildCore();buildPipeline();buildHolo();buildSheet();buildImpact();
  every(()=>{if(running)return;const conf=92+Math.floor(Math.random()*7);flashMem(4,conf+'%');},3400);
}
function enterMission(){
  mcFrom='landing';const l=$('#landing');l.classList.add('zooming');
  setTimeout(()=>{l.classList.add('hidden');$('#mc').classList.remove('hidden');buildMC();},950);
}
function enterMissionFromPortal(seed){
  mcFrom='portal';$('#portal').classList.add('hidden');$('#mc').classList.remove('hidden');buildMC();
  if(seed) after(()=>{try{runMission();}catch(e){}},700);
}
function exitMission(){clearAll();if(clockTimer)clearInterval(clockTimer);running=false;
  $('#mc').classList.add('hidden');
  if(mcFrom==='portal'){$('#portal').classList.remove('hidden');}
  else{const l=$('#landing');l.classList.remove('zooming','hidden');}}

/* ====================================================================
   CITIZEN GRIEVANCE PORTAL
==================================================================== */
Object.assign(IC,{
  camera:P('<path d="M14.5 4l1.5 2h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3l1.5-2z"/><circle cx="12" cy="13" r="3.5"/>'),
  upload:P('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v13"/>'),
  road:P('<path d="M4 21l3-18M20 21l-3-18M12 5v2M12 11v2M12 17v2"/>'),
  trash:P('<path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6"/>'),
  bulb:P('<path d="M9 18h6M10 22h4"/><path d="M12 2a6 6 0 0 0-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0 0 12 2z"/>'),
  paw:P('<circle cx="6" cy="11" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="11" r="2"/><path d="M8 16c0-2 1.8-3 4-3s4 1 4 3a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3z"/>'),
  plus:P('<path d="M12 5v14M5 12h14"/>'),
  list:P('<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>'),
  home:P('<path d="M3 11l9-8 9 8M5 9v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9"/>'),
  edit:P('<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4z"/>'),
  copy:P('<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>'),
  chevron:P('<path d="M9 6l6 6-6 6"/>'),
  phone:P('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z"/>'),
  megaphone:P('<path d="M3 11v2a1 1 0 0 0 1 1h2l9 5V5L6 10H4a1 1 0 0 0-1 1zM18 9a3 3 0 0 1 0 6"/>'),
  file:P('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>'),
  flag:P('<path d="M4 22V4M4 4h13l-2 4 2 4H4"/>'),
});

// All 28 states + 8 union territories with major cities / districts
const STATES={
  'Andhra Pradesh':{code:'AP',cities:['Visakhapatnam','Vijayawada','Guntur','Nellore','Kurnool','Rajahmundry','Tirupati','Kakinada','Anantapur','Kadapa','Eluru','Ongole','Vizianagaram','Srikakulam','Chittoor','Tenali','Proddatur','Adoni','Nandyal','Machilipatnam']},
  'Arunachal Pradesh':{code:'AR',cities:['Itanagar','Naharlagun','Pasighat','Tawang','Ziro','Bomdila','Tezu','Aalo','Roing','Khonsa','Namsai','Daporijo']},
  'Assam':{code:'AS',cities:['Guwahati','Silchar','Dibrugarh','Jorhat','Nagaon','Tinsukia','Tezpur','Bongaigaon','Dhubri','Diphu','Goalpara','Barpeta','Sivasagar','Karimganj','North Lakhimpur','Nalbari','Mangaldoi','Hailakandi']},
  'Bihar':{code:'BR',cities:['Patna','Gaya','Bhagalpur','Muzaffarpur','Darbhanga','Purnia','Arrah','Begusarai','Katihar','Munger','Chhapra','Bihar Sharif','Saharsa','Sasaram','Hajipur','Motihari','Bettiah','Siwan','Nawada','Kishanganj','Jamui','Buxar']},
  'Chhattisgarh':{code:'CG',cities:['Raipur','Bhilai','Bilaspur','Korba','Durg','Rajnandgaon','Jagdalpur','Raigarh','Ambikapur','Dhamtari','Mahasamund','Kanker','Janjgir','Dongargarh']},
  'Goa':{code:'GA',cities:['Panaji','Margao','Vasco da Gama','Mapusa','Ponda','Bicholim','Curchorem','Cuncolim','Valpoi','Sanquelim']},
  'Gujarat':{code:'GJ',cities:['Ahmedabad','Surat','Vadodara','Rajkot','Bhavnagar','Jamnagar','Junagadh','Gandhinagar','Anand','Nadiad','Morbi','Surendranagar','Bharuch','Vapi','Navsari','Mehsana','Bhuj','Porbandar','Palanpur','Valsad','Gondal','Veraval']},
  'Haryana':{code:'HR',cities:['Faridabad','Gurugram','Panipat','Ambala','Yamunanagar','Rohtak','Hisar','Karnal','Sonipat','Panchkula','Bhiwani','Sirsa','Bahadurgarh','Jind','Kaithal','Rewari','Palwal','Kurukshetra','Fatehabad','Narnaul']},
  'Himachal Pradesh':{code:'HP',cities:['Shimla','Mandi','Solan','Dharamshala','Bilaspur','Kullu','Hamirpur','Una','Nahan','Palampur','Chamba','Kangra','Manali','Nalagarh']},
  'Jharkhand':{code:'JH',cities:['Ranchi','Jamshedpur','Dhanbad','Bokaro','Deoghar','Hazaribagh','Giridih','Ramgarh','Phusro','Medininagar','Chaibasa','Dumka','Chatra','Gumla']},
  'Karnataka':{code:'KA',cities:['Bengaluru','Mysuru','Hubballi-Dharwad','Mangaluru','Belagavi','Kalaburagi','Davanagere','Ballari','Vijayapura','Shivamogga','Tumakuru','Raichur','Bidar','Hassan','Udupi','Hospet','Gadag','Chitradurga','Mandya','Chikkamagaluru']},
  'Kerala':{code:'KL',cities:['Thiruvananthapuram','Kochi','Kozhikode','Thrissur','Kollam','Kannur','Alappuzha','Palakkad','Malappuram','Kottayam','Pathanamthitta','Idukki','Wayanad','Kasaragod','Ernakulam','Thalassery']},
  'Madhya Pradesh':{code:'MP',cities:['Indore','Bhopal','Jabalpur','Gwalior','Ujjain','Sagar','Dewas','Satna','Ratlam','Rewa','Katni','Singrauli','Burhanpur','Khandwa','Chhindwara','Vidisha','Shivpuri','Damoh','Guna','Morena','Bhind']},
  'Maharashtra':{code:'MH',cities:['Mumbai','Pune','Nagpur','Nashik','Thane','Aurangabad','Solapur','Amravati','Navi Mumbai','Kolhapur','Sangli','Akola','Latur','Ahmednagar','Jalgaon','Nanded','Dhule','Chandrapur','Parbhani','Ichalkaranji','Satara','Ratnagiri']},
  'Manipur':{code:'MN',cities:['Imphal','Thoubal','Kakching','Bishnupur','Churachandpur','Ukhrul','Senapati','Jiribam','Moreh']},
  'Meghalaya':{code:'ML',cities:['Shillong','Tura','Jowai','Nongstoin','Williamnagar','Baghmara','Resubelpara','Nongpoh','Mairang']},
  'Mizoram':{code:'MZ',cities:['Aizawl','Lunglei','Champhai','Serchhip','Kolasib','Saiha','Mamit','Lawngtlai']},
  'Nagaland':{code:'NL',cities:['Kohima','Dimapur','Mokokchung','Tuensang','Wokha','Zunheboto','Mon','Phek','Kiphire']},
  'Odisha':{code:'OD',cities:['Bhubaneswar','Cuttack','Rourkela','Berhampur','Sambalpur','Puri','Balasore','Baripada','Bhadrak','Jharsuguda','Jeypore','Angul','Dhenkanal','Rayagada','Koraput']},
  'Punjab':{code:'PB',cities:['Ludhiana','Amritsar','Jalandhar','Patiala','Bathinda','Mohali','Hoshiarpur','Pathankot','Moga','Firozpur','Sangrur','Barnala','Kapurthala','Phagwara','Khanna','Muktsar','Faridkot','Gurdaspur','Rupnagar','Mansa']},
  'Rajasthan':{code:'RJ',cities:['Jaipur','Jodhpur','Udaipur','Kota','Bikaner','Ajmer','Bhilwara','Alwar','Sikar','Sri Ganganagar','Pali','Bharatpur','Tonk','Beawar','Hanumangarh','Churu','Jhunjhunu','Sawai Madhopur','Nagaur','Chittorgarh','Banswara','Barmer']},
  'Sikkim':{code:'SK',cities:['Gangtok','Namchi','Gyalshing','Mangan','Rangpo','Singtam','Jorethang','Ravangla']},
  'Tamil Nadu':{code:'TN',cities:['Chennai','Coimbatore','Madurai','Tiruchirappalli','Salem','Tirunelveli','Tiruppur','Vellore','Erode','Thoothukudi','Dindigul','Thanjavur','Ranipet','Sivakasi','Karur','Hosur','Nagercoil','Kanchipuram','Kumbakonam','Cuddalore','Tiruvannamalai','Pollachi']},
  'Telangana':{code:'TS',cities:['Hyderabad','Warangal','Nizamabad','Karimnagar','Khammam','Ramagundam','Mahbubnagar','Nalgonda','Adilabad','Suryapet','Siddipet','Miryalaguda','Secunderabad','Jagtial','Mancherial']},
  'Tripura':{code:'TR',cities:['Agartala','Udaipur','Dharmanagar','Kailashahar','Belonia','Ambassa','Khowai','Teliamura','Sabroom']},
  'Uttar Pradesh':{code:'UP',cities:['Lucknow','Kanpur','Ghaziabad','Agra','Varanasi','Meerut','Prayagraj','Bareilly','Aligarh','Moradabad','Saharanpur','Gorakhpur','Noida','Firozabad','Jhansi','Muzaffarnagar','Mathura','Ayodhya','Rampur','Shahjahanpur','Mirzapur','Bulandshahr','Etawah','Sitapur']},
  'Uttarakhand':{code:'UK',cities:['Dehradun','Haridwar','Roorkee','Haldwani','Rudrapur','Kashipur','Rishikesh','Nainital','Mussoorie','Pithoragarh','Almora','Kotdwar','Ranikhet','Tehri']},
  'West Bengal':{code:'WB',cities:['Kolkata','Howrah','Durgapur','Asansol','Siliguri','Bardhaman','Malda','Baharampur','Habra','Kharagpur','Shantipur','Darjeeling','Jalpaiguri','Krishnanagar','Medinipur','Raiganj','Cooch Behar','Haldia','Bankura']},
  'Andaman & Nicobar Islands':{code:'AN',cities:['Port Blair','Diglipur','Mayabunder','Rangat','Car Nicobar','Havelock']},
  'Chandigarh':{code:'CH',cities:['Chandigarh','Manimajra']},
  'Dadra & Nagar Haveli and Daman & Diu':{code:'DN',cities:['Silvassa','Daman','Diu']},
  'Delhi':{code:'DL',cities:['New Delhi','North Delhi','South Delhi','East Delhi','West Delhi','Dwarka','Rohini','Saket','Karol Bagh','Pitampura','Janakpuri']},
  'Jammu & Kashmir':{code:'JK',cities:['Srinagar','Jammu','Anantnag','Baramulla','Udhampur','Kathua','Sopore','Pulwama','Kupwara','Rajouri']},
  'Ladakh':{code:'LA',cities:['Leh','Kargil','Nubra','Drass','Zanskar']},
  'Lakshadweep':{code:'LD',cities:['Kavaratti','Agatti','Amini','Andrott','Minicoy','Kalpeni']},
  'Puducherry':{code:'PY',cities:['Puducherry','Karaikal','Yanam','Mahe','Oulgaret']},
};
const BODY_OVERRIDE={
  'New Delhi':'Municipal Corporation of Delhi (MCD)','North Delhi':'Municipal Corporation of Delhi (MCD)','South Delhi':'Municipal Corporation of Delhi (MCD)','East Delhi':'Municipal Corporation of Delhi (MCD)','West Delhi':'Municipal Corporation of Delhi (MCD)','Dwarka':'Municipal Corporation of Delhi (MCD)','Rohini':'Municipal Corporation of Delhi (MCD)','Saket':'Municipal Corporation of Delhi (MCD)','Karol Bagh':'Municipal Corporation of Delhi (MCD)','Pitampura':'Municipal Corporation of Delhi (MCD)','Janakpuri':'Municipal Corporation of Delhi (MCD)',
  'Mumbai':'Brihanmumbai Municipal Corporation (BMC)','Navi Mumbai':'Navi Mumbai Municipal Corporation (NMMC)','Pune':'Pune Municipal Corporation (PMC)','Nagpur':'Nagpur Municipal Corporation (NMC)',
  'Bengaluru':'Bruhat Bengaluru Mahanagara Palike (BBMP)','Chennai':'Greater Chennai Corporation','Kolkata':'Kolkata Municipal Corporation (KMC)','Howrah':'Howrah Municipal Corporation',
  'Hyderabad':'Greater Hyderabad Municipal Corporation (GHMC)','Ahmedabad':'Ahmedabad Municipal Corporation (AMC)','Surat':'Surat Municipal Corporation (SMC)','Gurugram':'Municipal Corporation of Gurugram (MCG)','Chandigarh':'Chandigarh Municipal Corporation','Hubballi-Dharwad':'Hubballi-Dharwad Municipal Corporation',
};
function cityCode(c){return (c.toUpperCase().replace(/[^A-Z]/g,'')+'XXX').slice(0,3);}
function bodyFor(c){return BODY_OVERRIDE[c]||c+' Municipal Corporation';}
function wardsFor(c){return Array.from({length:12},(_,i)=>'Ward '+(i+1));}

const CATS=[
  {id:'pothole',name:'Pothole / Road Damage',ico:IC.road,c:'#F59E0B',dept:'Public Works Dept · Roads (B&R)',kw:['pothole','road','crater','broken road','speed breaker','dug','tar']},
  {id:'garbage',name:'Garbage / Sanitation',ico:IC.trash,c:'#10B981',dept:'Sanitation & Solid Waste Mgmt',kw:['garbage','trash','waste','dump','dirty','overflow','litter','rubbish']},
  {id:'water',name:'Water Leakage / Supply',ico:IC.droplet,c:'#06B6D4',dept:'Jal Supply & Sewerage Board',kw:['water','leak','pipe','tap','supply','sewage','drain','overflow','sewer']},
  {id:'streetlight',name:'Streetlight / Electricity',ico:IC.bulb,c:'#8B5CF6',dept:'Street Lighting & Electricity',kw:['light','streetlight','dark','lamp','pole','electric','power','wire']},
  {id:'stray',name:'Stray Animals',ico:IC.paw,c:'#EF4444',dept:'Animal Control / Veterinary',kw:['dog','cattle','stray','animal','cow','monkey','bite']},
  {id:'encroach',name:'Encroachment',ico:IC.building,c:'#2563EB',dept:'Municipal Enforcement Wing',kw:['encroach','illegal','vendor','occupy','footpath','blocked','construction']},
];
const SAMPLES=[
  {label:'Pothole on road',cat:'pothole',c:'#F59E0B',desc:'Large pothole on the main road causing two-wheelers to swerve into traffic. Worsens after rain.'},
  {label:'Garbage overflow',cat:'garbage',c:'#10B981',desc:'Garbage bin overflowing for 4 days near the market. Foul smell and stray dogs gathering.'},
  {label:'Water leakage',cat:'water',c:'#06B6D4',desc:'Continuous water leakage from a burst pipeline near City Hospital, flooding the road and causing traffic.'},
  {label:'Streetlight out',cat:'streetlight',c:'#8B5CF6',desc:'Streetlight not working for over a week. The whole lane is dark and unsafe at night.'},
];

let user=null;
let curLoc={state:'Punjab',city:'Ludhiana',ward:'Ward 12 · Model Town'};
let complaints=[];
let seq=4821;
function seedComplaints(){
  const C=i=>CATS[i];const B='Ludhiana Municipal Corporation';
  const mk=(id,ci,t,ward,pri,st,cr,cit,smp,m)=>({id,cat:C(ci),title:t,desc:t,photo:null,sample:smp!=null?SAMPLES[smp]:null,state:'Punjab',city:'Ludhiana',ward,body:B,priority:pri,status:st,created:cr,citizen:cit,mine:!!m});
  complaints=[
    // the logged-in citizen's own reports
    mk('PB-LDH-2026-004820',1,'Garbage overflow near Model Town market','Ward 12','Medium',3,'2 days ago','You',1,true),
    mk('PB-LDH-2026-004817',3,'Streetlight not working in Sarabha Nagar','Ward 9','Low',2,'5 days ago','You',3,true),
    // other citizens' reports — these populate the officer inbox
    mk('PB-LDH-2026-004821',2,'Burst pipeline flooding road near City Hospital','Ward 7','High',2,'18 min ago','Harpreet Kaur',2),
    mk('PB-LDH-2026-004822',0,'Deep pothole on Ferozepur Road','Ward 4','High',1,'1 hour ago','Amit Verma',0),
    mk('PB-LDH-2026-004823',0,'Broken road dug up near bus stand','Ward 11','Medium',0,'35 min ago','Rohit Mehta',0),
    mk('PB-LDH-2026-004816',1,'Garbage not collected for a week','Ward 5','High',3,'1 day ago','Simran Gill',1),
    mk('PB-LDH-2026-004812',2,'Low water pressure in Phase 2','Ward 2','Medium',4,'3 days ago','Arjun Rao',2),
    mk('PB-LDH-2026-004808',3,'Dark stretch near the school gate','Ward 8','Low',4,'6 days ago','Neha Joshi',3),
    mk('PB-LDH-2026-004824',4,'Stray cattle blocking the main road','Ward 6','Medium',1,'4 hours ago','Kabir Singh',null),
    mk('PB-LDH-2026-004825',5,'Illegal encroachment on footpath','Ward 3','Low',0,'2 hours ago','Priya Nair',null),
  ];
  seq=4825;
}
const STATUSES=['Registered','Acknowledged','Assigned','In Progress','Resolved'];
const STBADGE=[['Registered','st-registered'],['Acknowledged','st-registered'],['Assigned','st-assigned'],['In Progress','st-progress'],['Resolved','st-resolved']];

/* ---- screen control ---- */
function show(id){['landing','auth','portal','gov','mc'].forEach(s=>$('#'+s).classList.toggle('hidden',s!==id));}
function mine(){return complaints.filter(c=>c.mine);}

/* ---- AUTH ---- */
function buildAuth(){
  $('#authMark').innerHTML=IC.shield;$('#sendOtpIco').innerHTML=IC.arrow;$('#verifyIco').innerHTML=IC.check;
  const pts=[['Snap, describe, submit — in under a minute',IC.camera],['AI routes it to the right department instantly',IC.sparkles],['Track your complaint till it\'s resolved',IC.check]];
  $('#authPoints').innerHTML=pts.map(p=>`<li><span class="ap-ico">${p[1]}</span>${p[0]}</li>`).join('');
  $('#authGov').innerHTML=`${IC.shield} <span>Government of India · Smart City Grievance Redressal</span>`;
  // otp boxes
  const ob=$('#otpBoxes');ob.innerHTML='';
  for(let i=0;i<4;i++){const inp=document.createElement('input');inp.maxLength=1;inp.inputMode='numeric';ob.appendChild(inp);}
  const boxes=[...ob.children];
  boxes.forEach((b,i)=>{
    b.addEventListener('input',()=>{b.value=b.value.replace(/\D/g,'');b.classList.toggle('filled',!!b.value);if(b.value&&boxes[i+1])boxes[i+1].focus();
      $('#verifyOtp').disabled=boxes.some(x=>!x.value);});
    b.addEventListener('keydown',e=>{if(e.key==='Backspace'&&!b.value&&boxes[i-1])boxes[i-1].focus();});
  });
  const phone=$('#phoneInput');
  phone.addEventListener('input',()=>{phone.value=phone.value.replace(/\D/g,'').slice(0,10);$('#sendOtp').disabled=phone.value.length!==10;});
  $('#sendOtp').onclick=()=>{$('#otpDest').textContent='+91 '+phone.value.replace(/(\d{5})(\d{5})/,'$1 $2');
    $('#authStepPhone').classList.add('hidden');$('#authStepOtp').classList.remove('hidden');boxes[0].focus();startResend();};
  $('#otpBack').onclick=()=>{$('#authStepOtp').classList.add('hidden');$('#authStepPhone').classList.remove('hidden');};
  $('#verifyOtp').onclick=()=>doLogin('+91 '+phone.value);
  $('#guestBtn').onclick=()=>doLogin(null);
  $('#resendOtp').onclick=startResend;
  $('#authBack').onclick=()=>{show('landing');};
}
let resendTimer=null;
function startResend(){let t=20;const el=$('#resendT');if(resendTimer)clearInterval(resendTimer);
  resendTimer=setInterval(()=>{t--;if(el)el.textContent=t+'s';if(t<=0){clearInterval(resendTimer);if(el)el.parentElement.innerHTML='Resend OTP';}},1000);}
function doLogin(phone){
  if(resendTimer)clearInterval(resendTimer);
  user={name:phone?'Citizen':'Guest User',phone:phone||'Guest'};
  show('portal');buildPortal();pgo('home');
}

/* ---- PORTAL ---- */
const PNAV=[['home','Home',IC.home],['report','Report Issue',IC.megaphone],['complaints','My Complaints',IC.list]];
function buildPortal(){
  $('#pMark').innerHTML=IC.shield;
  $('#pMenu').innerHTML=IC.list;
  $('#pNotif').insertAdjacentHTML('afterbegin',IC.bell);
  $('#pName').textContent=user.name;$('#pAva').textContent=(user.name[0]||'U');
  updateLocChip();
  const nav=$('#pNav');nav.innerHTML='';
  PNAV.forEach(n=>{const b=el('button','p-link',`${n[2]} ${n[1]}${n[0]==='complaints'?`<span class="pl-count" id="navCount">${mine().length}</span>`:''}`);
    b.dataset.v=n[0];b.onclick=()=>{pgo(n[0]);$('#pSide').classList.remove('open');$('#pScrim').classList.remove('show');};nav.appendChild(b);});
  $('#toOps').innerHTML=`<span class="so-ico">${IC.cpu}</span><span><b>AI Operations</b><span>See the agents at work</span></span>`;
  $('#toOps').onclick=()=>enterMissionFromPortal(false);
  $('#pMenu').onclick=()=>{$('#pSide').classList.toggle('open');$('#pScrim').classList.toggle('show');};
  $('#pScrim').onclick=()=>{$('#pSide').classList.remove('open');$('#pScrim').classList.remove('show');};
  $('#pLoc').onclick=()=>pgo('report');
  $('#pProfile').onclick=()=>{if(confirm('Log out of GuardianGrid?')){user=null;show('landing');}};
}
function updateLocChip(){$('#pLoc').innerHTML=`${IC.pin} <span>${curLoc.ward}, ${curLoc.city}</span><span class="pl-edit">▾</span>`;}
function setNav(v){[...$('#pNav').children].forEach(b=>b.classList.toggle('active',b.dataset.v===v));}

function pgo(view,arg){
  if(['home','report','complaints'].includes(view))setNav(view);
  const m=$('#pMain');m.innerHTML='';const v=el('div','p-view');m.appendChild(v);m.scrollTo(0,0);
  ({home:pHome,report:pReport,complaints:pComplaints,detail:pDetail,aiprocess:pAiProcess}[view]||pHome)(v,arg);
}

/* ---------- home ---------- */
function pHome(v){
  const my=mine();
  const open=my.filter(c=>c.status<4).length, resolved=my.filter(c=>c.status>=4).length;
  v.innerHTML=`
    <div class="p-hello">Welcome back</div>
    <h1 class="p-h1">Namaste, ${user.name.split(' ')[0]} <span class="wave">👋</span></h1>
    <p class="p-sub">Spotted something broken in your city? Report it — AI handles the rest.</p>
    <div class="home-hero">
      <div class="hh-l">
        <h2>Report a civic issue in 3 simple steps</h2>
        <p>Add a photo, describe the problem, confirm your locality. We route it to the right municipal department and give you a tracking number.</p>
        <button class="hh-btn" id="heroReport">${IC.megaphone} Report an Issue</button>
      </div>
      <div class="hh-illu">${heroIllu()}</div>
    </div>
    <div class="stat-row">
      <div class="stat-c"><div class="sc-ico" style="background:#EFF6FF;color:#2563EB">${IC.file}</div><div class="sc-v">${my.length}</div><div class="sc-l">Total reports</div></div>
      <div class="stat-c"><div class="sc-ico" style="background:#FFFBEB;color:#B45309">${IC.clock}</div><div class="sc-v">${open}</div><div class="sc-l">In progress</div></div>
      <div class="stat-c"><div class="sc-ico" style="background:#ECFDF5;color:#047857">${IC.check}</div><div class="sc-v">${resolved}</div><div class="sc-l">Resolved</div></div>
      <div class="stat-c"><div class="sc-ico" style="background:#F5F3FF;color:#6D28D9">${IC.sparkles}</div><div class="sc-v">11 min</div><div class="sc-l">Avg resolution</div></div>
    </div>
    <div class="sec-h"><h3>Recent reports</h3><button class="lnk" id="seeAll">View all →</button></div>
    <div class="cx-list" id="homeList"></div>
    <div class="sec-h"><h3>How it works</h3></div>
    <div class="steps3">
      ${[['Capture',IC.camera,'#2563EB','Take or upload a photo of the issue.'],['AI routes it',IC.sparkles,'#06B6D4','AI detects the category & the right department.'],['Track',IC.flag,'#10B981','Get a complaint ID and follow it to resolution.']].map((s,i)=>`<div class="step3"><div class="s3-n">0${i+1}</div><div class="s3-ico" style="background:${s[2]}1a;color:${s[2]}">${s[1]}</div><h4>${s[0]}</h4><p>${s[3]}</p></div>`).join('')}
    </div>`;
  const list=v.querySelector('#homeList');
  if(my.length) my.slice(0,3).forEach(c=>list.appendChild(cxCard(c)));
  else list.innerHTML=`<div class="empty-state" style="padding:30px"><div class="es-ico">${IC.megaphone}</div><h3>No reports yet</h3><p>Your submitted issues will appear here.</p></div>`;
  v.querySelector('#heroReport').onclick=()=>pgo('report');
  v.querySelector('#seeAll').onclick=()=>pgo('complaints');
}
function heroIllu(){return `<svg viewBox="0 0 200 150"><g fill="rgba(255,255,255,.18)" stroke="rgba(255,255,255,.4)"><rect x="20" y="60" width="34" height="80" rx="5"/><rect x="62" y="40" width="40" height="100" rx="5"/><rect x="110" y="70" width="30" height="70" rx="5"/><rect x="148" y="50" width="34" height="90" rx="5"/></g><circle cx="150" cy="34" r="13" fill="#fff"/><path d="M145 34l3.5 3.5L156 30" stroke="#2563EB" stroke-width="2.5" fill="none" stroke-linecap="round"/><g stroke="rgba(255,255,255,.5)" stroke-width="1.5" fill="none"><path d="M37 60 L82 40 L125 70 L165 50"/></g></svg>`;}

/* ---------- complaint card ---------- */
function cxCard(c){
  const card=el('div','cx');
  const thumb=c.photo?`<img src="${c.photo}">`:c.sample?sampleThumb(c.sample):`<span class="cxt-ico">${c.cat.ico}</span>`;
  card.innerHTML=`
    <div class="cx-thumb">${thumb}</div>
    <div class="cx-body">
      <div class="cx-top"><span class="cx-id">${c.id}</span><span class="cx-cat" style="color:${c.cat.c}">${c.cat.name.split(' ')[0]}</span></div>
      <div class="cx-title">${c.title}</div>
      <div class="cx-meta">${IC.pin} ${c.ward}, ${c.city} · <b style="color:${c.cat.c}">${c.cat.dept.split('·')[0]}</b></div>
    </div>
    <div class="cx-r"><span class="st-badge ${STBADGE[c.status][1]}"><span class="dot"></span>${STBADGE[c.status][0]}</span><span class="cx-chev">${IC.chevron}</span></div>`;
  card.onclick=()=>pgo('detail',c);
  return card;
}
function sampleThumb(s){return `<svg viewBox="0 0 80 80" style="width:100%;height:100%"><rect width="80" height="80" fill="${s.c}1a"/><g transform="translate(28,28)" style="color:${s.c}">${CATS.find(x=>x.id===s.cat).ico}</g></svg>`;}

/* ---------- REPORT WIZARD ---------- */
let wiz=null;
function pReport(v){
  wiz={step:0,photo:null,sample:null,cat:null,desc:'',priority:'Medium',state:curLoc.state,city:curLoc.city,ward:curLoc.ward,verified:false};
  renderWiz(v);
}
function renderWiz(v){
  const steps=['Photo','Describe','Location','Review'];
  v.innerHTML=`<div class="wiz-head">
    <button class="wiz-back" id="wizBack">${IC.chevron} ${wiz.step===0?'Back to home':'Previous step'}</button>
    <div class="stepper">${steps.map((s,i)=>`<div class="stp ${i===wiz.step?'active':i<wiz.step?'done':''}">
      <div class="stp-dot">${i<wiz.step?IC.check:i+1}</div><div class="stp-lab">${s}</div>${i<steps.length-1?`<div class="stp-bar"><i style="width:${i<wiz.step?100:0}%"></i></div>`:''}</div>`).join('')}</div>
  </div><div id="wizCard"></div>`;
  v.querySelector('#wizBack').onclick=()=>{if(wiz.step===0)pgo('home');else{wiz.step--;renderWiz(v);}};
  const c=v.querySelector('#wizCard');
  [wizPhoto,wizDescribe,wizLocation,wizReview][wiz.step](c,v);
}
function wizPhoto(c,v){
  c.innerHTML=`<div class="wiz-card"><h2>Add a photo of the issue</h2><p class="wc-sub">A clear photo helps our AI identify the problem and the right department.</p>
    <div id="dzArea"></div></div>
    <div class="wiz-actions"><span></span><button class="btn-primary" id="next" ${wiz.photo||wiz.sample?'':'disabled'}>Continue ${IC.arrow}</button></div>`;
  renderDz(c);
  v.querySelector('#next').onclick=()=>{wiz.step=1;renderWiz(v);};
}
function renderDz(c){
  const area=c.querySelector('#dzArea');
  if(wiz.photo||wiz.sample){
    const img=wiz.photo?`<img src="${wiz.photo}">`:`<div style="height:240px">${sampleBig(wiz.sample)}</div>`;
    area.innerHTML=`<div class="photo-preview">${img}<button class="pp-change" id="changeP">Change</button><div class="pp-ai">${IC.sparkles} AI vision analysing…</div></div>`;
    area.querySelector('#changeP').onclick=()=>{wiz.photo=null;wiz.sample=null;wiz.cat=null;renderDz(c);c.querySelector('#next').disabled=true;};
    after(()=>{const ai=area.querySelector('.pp-ai');if(ai)ai.innerHTML=`${IC.check} Detected: ${(wiz.cat||CATS.find(x=>x.id===(wiz.sample?wiz.sample.cat:'pothole'))).name}`;},1400);
    if(!wiz.cat&&wiz.sample)wiz.cat=CATS.find(x=>x.id===wiz.sample.cat);
  }else{
    area.innerHTML=`<div class="dropzone" id="dz"><div class="dz-ico">${IC.camera}</div><h4>Tap to upload or drag a photo here</h4><p>JPG or PNG · max 10MB</p>
      <input type="file" id="dzInput" accept="image/*" hidden></div>
      <div class="dz-or">— or try a sample —</div>
      <div class="dz-samples">${SAMPLES.map((s,i)=>`<button class="dz-sample" data-i="${i}">${s.label}</button>`).join('')}</div>`;
    const dz=area.querySelector('#dz'),input=area.querySelector('#dzInput');
    dz.onclick=()=>input.click();
    input.onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>{wiz.photo=ev.target.result;wiz.sample=null;renderDz(c);c.querySelector('#next').disabled=false;};r.readAsDataURL(f);};
    ['dragover','dragenter'].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.add('drag');}));
    ['dragleave','drop'].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.remove('drag');}));
    dz.addEventListener('drop',e=>{const f=e.dataTransfer.files[0];if(f){const r=new FileReader();r.onload=ev=>{wiz.photo=ev.target.result;renderDz(c);c.querySelector('#next').disabled=false;};r.readAsDataURL(f);}});
    area.querySelectorAll('.dz-sample').forEach(b=>b.onclick=()=>{const s=SAMPLES[+b.dataset.i];wiz.sample=s;wiz.cat=CATS.find(x=>x.id===s.cat);wiz.desc=s.desc;renderDz(c);c.querySelector('#next').disabled=false;});
  }
}
function sampleBig(s){return `<svg viewBox="0 0 400 240" style="width:100%;height:100%"><rect width="400" height="240" fill="${s.c}14"/><g transform="translate(176,86) scale(2.6)" style="color:${s.c}">${CATS.find(x=>x.id===s.cat).ico}</g><text x="200" y="210" text-anchor="middle" font-size="13" font-weight="700" fill="${s.c}">${s.label} · sample image</text></svg>`;}

function wizDescribe(c,v){
  c.innerHTML=`<div class="wiz-card"><h2>Describe the problem</h2><p class="wc-sub">Tell us what's wrong. Our AI will categorise it and pick the right department.</p>
    <textarea class="txt-area" id="descIn" placeholder="e.g. Large pothole on the main road near the market, causing accidents…">${wiz.desc||''}</textarea>
    <div id="classifyBox"></div></div>
    <div class="wiz-actions"><button class="btn-line" id="prev">${IC.chevron} Back</button><button class="btn-primary" id="next" disabled>Continue ${IC.arrow}</button></div>`;
  const ta=c.querySelector('#descIn'),box=c.querySelector('#classifyBox'),next=c.querySelector('#next');
  const run=()=>{wiz.desc=ta.value;if(wiz.desc.trim().length<6){box.innerHTML='';next.disabled=true;return;}
    box.innerHTML=`<div class="ai-classify"><div class="thinking-row"><span class="think-dots"><i></i><i></i><i></i></span> AI is analysing your report…</div></div>`;
    clearTimeout(ta._t);ta._t=after(()=>{wiz.cat=classify(wiz.desc)||wiz.cat||CATS[0];renderClassify(box);next.disabled=false;},900);};
  ta.addEventListener('input',run);
  if(wiz.desc)run();
  c.querySelector('#prev').onclick=()=>{wiz.step=0;renderWiz(v);};
  next.onclick=()=>{wiz.step=2;renderWiz(v);};
}
function classify(text){const t=text.toLowerCase();let best=null,score=0;
  CATS.forEach(cat=>{const s=cat.kw.reduce((a,k)=>a+(t.includes(k)?1:0),0);if(s>score){score=s;best=cat;}});return best;}
function renderClassify(box){
  const cat=wiz.cat;const conf=88+Math.floor(Math.random()*9);
  const pri=/leak|fire|accident|hospital|burst|flood|urgent|danger/.test(wiz.desc.toLowerCase())?['High','#EF4444']:/dark|unsafe|overflow|days|week/.test(wiz.desc.toLowerCase())?['Medium','#F59E0B']:['Low','#10B981'];
  wiz.priority=pri[0];
  box.innerHTML=`<div class="ai-classify">
    <div class="aic-head">${IC.sparkles} AI Classification <span class="aic-conf">${conf}% confident</span></div>
    <div class="aic-body">
      <div class="aic-row">
        <div class="aic-cat-ico" style="background:${cat.c}1a;color:${cat.c}">${cat.ico}</div>
        <div><div class="aic-cat-name">${cat.name}</div><div class="aic-dept">Routes to <b>${cat.dept}</b></div></div>
        <div class="aic-pri"><div style="font-size:11px;color:var(--muted);font-weight:600">PRIORITY</div><div style="font-weight:800;color:${pri[1]}">${pri[0]}</div></div>
      </div>
      <div class="aic-chips"><span class="acl">Not right? Pick the correct category:</span>
        ${CATS.map(x=>`<button class="cat-chip ${x.id===cat.id?'sel':''}" data-id="${x.id}">${x.ico} ${x.name.split(' ')[0]}</button>`).join('')}
      </div>
    </div></div>`;
  box.querySelectorAll('.cat-chip').forEach(b=>b.onclick=()=>{wiz.cat=CATS.find(x=>x.id===b.dataset.id);renderClassify(box);});
}

function wizLocation(c,v){
  const states=Object.keys(STATES);
  c.innerHTML=`<div class="wiz-card"><h2>Confirm the location</h2><p class="wc-sub">So we route your complaint to the correct local body.</p>
    <div class="loc-grid">
      <div>
        <div class="sel-fld"><label>State</label><select id="selState">${states.map(s=>`<option ${s===wiz.state?'selected':''}>${s}</option>`).join('')}</select></div>
        <div class="sel-fld"><label>City / District</label><select id="selCity"></select></div>
        <div class="sel-fld"><label>Ward / Zone</label><select id="selWard"></select></div>
        <div class="sel-fld"><label>Landmark (optional)</label><input id="selLand" placeholder="e.g. near City Hospital"></div>
      </div>
      <div>
        <div class="map-box">${miniMap()}<div class="map-pin-c">${IC.pin}</div></div>
        <div id="verifyBox"></div>
      </div>
    </div></div>
    <div class="wiz-actions"><button class="btn-line" id="prev">${IC.chevron} Back</button><button class="btn-primary" id="next" disabled>Review ${IC.arrow}</button></div>`;
  const selState=c.querySelector('#selState'),selCity=c.querySelector('#selCity'),selWard=c.querySelector('#selWard');
  const fillCities=()=>{const cities=STATES[wiz.state].cities;selCity.innerHTML=cities.map(ci=>`<option ${ci===wiz.city?'selected':''}>${ci}</option>`).join('');if(!cities.includes(wiz.city))wiz.city=cities[0];fillWards();};
  const fillWards=()=>{const wards=wardsFor(wiz.city);selWard.innerHTML=wards.map(w=>`<option ${w===wiz.ward?'selected':''}>${w}</option>`).join('');if(!wards.includes(wiz.ward))wiz.ward=wards[0];verify();};
  selState.onchange=()=>{wiz.state=selState.value;wiz.city=STATES[wiz.state].cities[0];fillCities();};
  selCity.onchange=()=>{wiz.city=selCity.value;fillWards();};
  selWard.onchange=()=>{wiz.ward=selWard.value;verify();};
  const verify=()=>{const body=bodyFor(wiz.city);wiz.body=body;wiz.verified=false;c.querySelector('#next').disabled=true;
    const vb=c.querySelector('#verifyBox');
    vb.innerHTML=`<div class="ai-verify"><div class="av-ava">${IC.sparkles}</div><div class="av-body"><div class="av-name">GuardianGrid Agent <span class="think-dots"><i></i><i></i><i></i></span></div><div class="av-msg">Verifying jurisdiction…</div></div></div>`;
    after(()=>{vb.innerHTML=`<div class="ai-verify"><div class="av-ava">${IC.sparkles}</div><div class="av-body">
      <div class="av-name">GuardianGrid Agent</div>
      <div class="av-msg">I'll file this with <b>${body}</b>, ${wiz.ward}, ${wiz.city}, ${wiz.state}. The <b>${wiz.cat?wiz.cat.dept:'relevant'}</b> department handles it here. Is this your locality?</div>
      <div class="av-confirm"><button class="av-yes" id="avYes">${IC.check} Yes, that's correct</button><button class="av-no" id="avNo">No, change it</button></div>
    </div></div>`;
      vb.querySelector('#avYes').onclick=function(){wiz.verified=true;this.classList.add('picked');this.innerHTML=`${IC.check} Confirmed`;c.querySelector('#next').disabled=false;};
      vb.querySelector('#avNo').onclick=()=>selState.focus();
    },900);};
  fillCities();
  c.querySelector('#prev').onclick=()=>{wiz.step=1;renderWiz(v);};
  c.querySelector('#next').onclick=()=>{wiz.land=c.querySelector('#selLand').value;wiz.step=3;renderWiz(v);};
}
function miniMap(){return `<svg viewBox="0 0 360 230" preserveAspectRatio="xMidYMid slice"><rect width="360" height="230" fill="#EAF3FD"/>
  <g stroke="#CBD9EC" stroke-width="8">${[50,115,180].map(y=>`<line x1="0" y1="${y}" x2="360" y2="${y}"/>`).join('')}${[70,170,270].map(x=>`<line x1="${x}" y1="0" x2="${x}" y2="230"/>`).join('')}</g>
  <g fill="#D6E6F8">${[[20,20],[90,20],[190,20],[290,20],[20,130],[190,130],[290,130]].map(p=>`<rect x="${p[0]}" y="${p[1]}" width="46" height="24" rx="3"/>`).join('')}</g>
  <circle cx="180" cy="106" r="40" fill="rgba(37,99,235,.1)"/><circle cx="180" cy="106" r="40" fill="none" stroke="#2563EB" stroke-dasharray="4 4"/></svg>`;}

function wizReview(c,v){
  const cat=wiz.cat;const photo=wiz.photo?`<img src="${wiz.photo}">`:wiz.sample?sampleBig(wiz.sample):'';
  c.innerHTML=`<div class="wiz-card"><h2>Review & submit</h2><p class="wc-sub">Check the details before filing your complaint.</p>
    <div class="rev-grid">
      <div class="rev-photo">${photo}</div>
      <div class="rev-rows">
        <div class="rev-row"><div class="rr-k">${cat.ico} Category</div><div class="rr-v" style="color:${cat.c}">${cat.name}</div></div>
        <div class="rev-row"><div class="rr-k">${IC.building} Department</div><div class="rr-v">${cat.dept}</div></div>
        <div class="rev-row"><div class="rr-k">${IC.flag} Priority</div><div class="rr-v">${wiz.priority}</div></div>
        <div class="rev-row"><div class="rr-k">${IC.pin} Location</div><div class="rr-v">${wiz.ward}, ${wiz.city}, ${wiz.state}</div></div>
        <div class="rev-row"><div class="rr-k">${IC.landmark} Local body</div><div class="rr-v">${wiz.body}</div></div>
        <div class="rev-row"><div class="rr-k">${IC.edit} Description</div><div class="rr-v" style="font-weight:500;color:var(--slate)">${wiz.desc||'—'}</div></div>
      </div>
    </div></div>
    <div class="wiz-actions"><button class="btn-line" id="prev">${IC.chevron} Back</button><button class="btn-primary" id="submit">${IC.check} Submit Complaint</button></div>`;
  c.querySelector('#prev').onclick=()=>{wiz.step=2;renderWiz(v);};
  c.querySelector('#submit').onclick=()=>submitComplaint(v);
}
function submitComplaint(v){
  seq++;
  const code=STATES[wiz.state].code+'-'+cityCode(wiz.city);
  const id=`${code}-2026-${String(seq).padStart(6,'0')}`;
  const title=(wiz.desc||wiz.cat.name).split('.')[0].slice(0,52)+(wiz.desc.length>52?'…':'');
  const comp={id,cat:wiz.cat,title,desc:wiz.desc,photo:wiz.photo,sample:wiz.sample,state:wiz.state,city:wiz.city,ward:wiz.ward,body:wiz.body,priority:wiz.priority,status:2,created:'Just now',citizen:'You',mine:true};
  complaints.unshift(comp);
  const cnt=$('#navCount');if(cnt)cnt.textContent=mine().length;
  curLoc={state:wiz.state,city:wiz.city,ward:wiz.ward};updateLocChip();
  renderSuccess(v,comp);
}
function renderSuccess(v,c){
  v.innerHTML=`<div class="wiz-card succ">
    <div class="succ-check">${IC.check}</div>
    <h2>Complaint registered!</h2>
    <p>Your report has been filed with <b>${c.body}</b>.</p>
    <div class="succ-id"><div class="si-k">COMPLAINT REGISTRATION NUMBER</div><div class="si-v">${c.id}</div><div class="si-copy" id="copyId">${IC.copy} Tap to copy</div></div>
    <div class="succ-meta">
      <div class="sm-c"><div class="smc-k">Department</div><div class="smc-v" style="color:${c.cat.c}">${c.cat.dept.split('·')[0]}</div></div>
      <div class="sm-c"><div class="smc-k">Priority</div><div class="smc-v">${c.priority}</div></div>
      <div class="sm-c"><div class="smc-k">Est. resolution</div><div class="smc-v">${c.priority==='High'?'24 hrs':c.priority==='Medium'?'3 days':'7 days'}</div></div>
    </div>
    <div class="succ-actions">
      <button class="btn-line" id="another">${IC.plus} Report another</button>
      <button class="btn-primary" id="track">${IC.flag} Track this complaint</button>
      <button class="btn-line" id="watchAi">${IC.cpu} Watch AI handle it</button>
    </div>
  </div>`;
  v.querySelector('#copyId').onclick=()=>{navigator.clipboard&&navigator.clipboard.writeText(c.id);toast('Copied','Complaint number copied',IC.copy,'rgba(37,99,235,.14)','#2563EB');};
  v.querySelector('#another').onclick=()=>pgo('report');
  v.querySelector('#track').onclick=()=>pgo('detail',c);
  v.querySelector('#watchAi').onclick=()=>pgo('aiprocess',c);
  toast('Complaint registered',c.id,IC.check);
}

/* ---------- my complaints ---------- */
function pComplaints(v){
  v.innerHTML=`<div class="p-hello">Track</div><h1 class="p-h1">My Complaints</h1><p class="p-sub">All the issues you've reported and their live status.</p>
    <div style="margin-top:22px" class="cx-list" id="allList"></div>`;
  const list=v.querySelector('#allList');
  const my=mine();
  if(my.length)my.forEach(c=>list.appendChild(cxCard(c)));
  else list.innerHTML=`<div class="empty-state"><div class="es-ico">${IC.megaphone}</div><h3>No complaints yet</h3><p>Report your first civic issue to see it here.</p><button class="btn-primary" id="firstReport">${IC.plus} Report an Issue</button></div>`;
  const fr=v.querySelector('#firstReport');if(fr)fr.onclick=()=>pgo('report');
}

/* ---------- detail / tracking ---------- */
function pDetail(v,c){
  if(!c){pgo('complaints');return;}
  const photo=c.photo?`<img src="${c.photo}">`:c.sample?sampleBig(c.sample):`<div style="display:grid;place-items:center;height:100%;color:${c.cat.c}">${c.cat.ico}</div>`;
  const tl=[['Registered','Complaint filed & ID issued',IC.file],['Acknowledged',`${c.body} received it`,IC.check],['Assigned',`Routed to ${c.cat.dept.split('·')[0]}`,IC.users],['In Progress','Field team working on it',IC.wrench],['Resolved','Issue fixed & verified',IC.flag]];
  v.innerHTML=`<button class="wiz-back" id="dBack" style="margin-bottom:14px">${IC.chevron} Back to complaints</button>
    <div class="p-hello" style="color:${c.cat.c}">${c.cat.name}</div>
    <h1 class="p-h1" style="font-size:24px">${c.title}</h1>
    <div class="cx-meta" style="margin-bottom:18px">${IC.pin} ${c.ward}, ${c.city} · ${c.created}</div>
    <div class="track-grid">
      <div>
        <div class="track-photo">${photo}</div>
        <div class="info-card" style="margin-top:16px"><h4>Status Timeline</h4>
          <div class="track-timeline">${tl.map((s,i)=>`<div class="tl-step ${i<c.status?'done':i===c.status?'now':'pending'}"><div class="tls-dot">${i<c.status?IC.check:s[2]}</div><div class="tls-t">${s[0]}</div><div class="tls-d">${s[1]}</div></div>`).join('')}</div>
        </div>
      </div>
      <div>
        <div class="info-card"><h4>Complaint Details</h4>
          <div class="info-row"><span class="ir-k">Complaint No.</span><span class="ir-v mono" style="color:${'var(--blue)'}">${c.id}</span></div>
          <div class="info-row"><span class="ir-k">Status</span><span class="ir-v"><span class="st-badge ${STBADGE[c.status][1]}"><span class="dot"></span>${STBADGE[c.status][0]}</span></span></div>
          <div class="info-row"><span class="ir-k">Department</span><span class="ir-v">${c.cat.dept.split('·')[0]}</span></div>
          <div class="info-row"><span class="ir-k">Local body</span><span class="ir-v">${c.body}</span></div>
          <div class="info-row"><span class="ir-k">Priority</span><span class="ir-v">${c.priority}</span></div>
        </div>
        <div class="info-card" style="margin-top:16px"><h4>Description</h4><p style="font-size:14px;color:var(--slate);line-height:1.6">${c.desc||c.cat.name}</p></div>
        <button class="btn-primary block" id="watchAi" style="margin-top:16px">${IC.sparkles} See how AI resolved this</button>
      </div>
    </div>`;
  v.querySelector('#dBack').onclick=()=>pgo('complaints');
  v.querySelector('#watchAi').onclick=()=>pgo('aiprocess',c);
}

/* ====================================================================
   AI RESOLUTION ENGINE  (per-complaint · human + explainable)
==================================================================== */
Object.assign(IC,{
  eye:P('<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>'),
  layers:P('<path d="M12 2l9 5-9 5-9-5z"/><path d="M3 12l9 5 9-5M3 17l9 5 9-5"/>'),
  message:P('<path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-4-1L3 20l1.1-4A8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5z"/>'),
  inbox:P('<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5 5h14l3 7v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6z"/>'),
});
const PAGENTS=[
  {id:'vision',name:'Vision Agent',role:'Image understanding',ico:IC.eye,c:'#2563EB'},
  {id:'triage',name:'Triage Agent',role:'Priority & severity',ico:IC.gauge,c:'#F59E0B'},
  {id:'pattern',name:'Pattern Agent',role:'Duplicate & trend detection',ico:IC.layers,c:'#8B5CF6'},
  {id:'routing',name:'Routing Agent',role:'Department & jurisdiction',ico:IC.route,c:'#06B6D4'},
  {id:'coord',name:'Coordination Agent',role:'Officer & crew dispatch',ico:IC.users,c:'#10B981'},
  {id:'comms',name:'Citizen Comms Agent',role:'Updates & transparency',ico:IC.message,c:'#EF4444'},
];
function computeAI(c){
  const visual={pothole:'a large pothole with broken asphalt on the carriageway',garbage:'an overflowing waste point with scattered garbage',water:'water pooling from what looks like a burst pipeline',streetlight:'a dead street-light pole over a dark stretch',stray:'stray animals gathered along a residential lane',encroach:'an unauthorised structure encroaching on public space'}[c.cat.id]||'the reported civic issue';
  const pr=c.priority;
  const prWhy={High:'it’s close to a hospital / busy area and poses a public-safety risk',Medium:'it has been affecting residents and is likely to get worse',Low:'it’s a localised issue with low immediate risk'}[pr]||'it needs municipal attention';
  const dup=1+Math.floor(Math.random()*3);
  const officers=[['Ravi Kumar','Junior Engineer','RK'],['Anjali Sharma','Assistant Engineer','AS'],['Suresh Patel','Junior Engineer','SP'],['Meena Iyer','Section Officer','MI'],['Vikram Singh','Field Engineer','VS']];
  const off=officers[Math.floor(Math.random()*officers.length)];
  const crew='#'+(10+Math.floor(Math.random()*80));
  const eta=pr==='High'?'8 hours':pr==='Medium'?'2 days':'5 days';
  const dept=c.cat.dept.split('·')[0].trim();
  const cf=()=>90+Math.floor(Math.random()*8);
  return {pr,prWhy,dup,off,crew,eta,dept,steps:[
    {reasoning:`Scanning the photo… I can see ${visual}. This matches your description of a ${c.cat.name.toLowerCase()} issue.`,decision:`${c.cat.name}`,why:'Matched visual features in the image with the words in your description.',conf:cf()},
    {reasoning:`Assessing how urgent this is. Based on the location and the wording, ${prWhy}.`,decision:`Priority · ${pr}`,why:'Severity model weighed proximity to sensitive places, safety risk and language cues.',conf:cf()},
    {reasoning:`Checking the neighbourhood… I found ${dup} similar open report${dup>1?'s':''} in ${c.ward}. Linking ${dup>1?'them':'it'} so the department sees ${dup>1?'a recurring hotspot':'a verified issue'}.`,decision:`${dup} report${dup>1?'s':''} linked`,why:'De-duplication prevents repeat work and auto-flags recurring civic hotspots.',conf:cf()},
    {reasoning:`A ${c.cat.name.toLowerCase()} in ${c.city} falls under the ${c.cat.dept}. Filing it with ${c.body}.`,decision:`Routed · ${dept}`,why:'Mapped issue category → responsible department → correct local municipal body.',conf:cf()},
    {reasoning:`Assigning to Er. ${off[0]}, ${off[1]}. Nearest field crew ${crew} is being dispatched. Target resolution within ${eta}.`,decision:`Crew ${crew} · ETA ${eta}`,why:'Picked the nearest available team that can meet the SLA for this priority.',conf:cf()},
    {reasoning:`Notifying you now — an SMS and a live tracking link are on the way. I'll keep you updated at every step, automatically.`,decision:'Citizen notified',why:'Full transparency — you follow every status change in real time.',conf:cf()},
  ]};
}

let aiToken=0;
function pAiProcess(v,c){
  if(!c){pgo('complaints');return;}
  const token=++aiToken;
  if(!c._ai)c._ai=computeAI(c);const ai=c._ai;
  const thumb=c.photo?`<img src="${c.photo}">`:c.sample?sampleThumb(c.sample):`<span class="cxt-ico">${c.cat.ico}</span>`;
  v.innerHTML=`
    <button class="wiz-back" id="aiBack" style="margin-bottom:14px">${IC.chevron} Back to tracking</button>
    <div class="aip-chip">
      <div class="cx-thumb" style="width:60px;height:60px">${thumb}</div>
      <div style="flex:1;min-width:0"><div class="cx-id">${c.id}</div><div class="aip-title">${c.title}</div>
        <div class="cx-meta">${IC.pin} ${c.ward}, ${c.city} · <b style="color:${c.cat.c}">${c.cat.name}</b></div></div>
      <span class="st-badge ${STBADGE[c.priority==='High'?3:2][1]}">${c.priority} priority</span>
    </div>
    <div class="aip-head">
      <div><div class="p-hello" style="color:#06B6D4">Autonomous Resolution</div><h1 class="p-h1" style="font-size:24px">AI Resolution Engine</h1></div>
      <div class="aip-counter"><div class="aic-num"><b id="decCount">0</b> autonomous decisions</div><div class="aic-sub"><b style="color:#10B981">0</b> human actions required</div></div>
    </div>
    <div class="aip-grid">
      <div class="agent-flow" id="agentFlow">${PAGENTS.map((a,i)=>`
        <div class="agentp" data-id="${a.id}" style="--ac:${a.c}">
          <div class="ap-rail"><span class="ap-node">${a.ico}<span class="ap-chk">${IC.check}</span></span>${i<PAGENTS.length-1?'<span class="ap-line"></span>':''}</div>
          <div class="ap-card">
            <div class="ap-top"><b>${a.name}</b><span class="ap-role">${a.role}</span><span class="ap-state" data-st>queued</span></div>
            <div class="ap-think"></div>
            <div class="ap-decision"></div>
          </div>
        </div>`).join('')}</div>
      <div class="aip-side">
        <div class="declog-card"><div class="declog-h">${IC.sparkles} Autonomous Decisions</div><div class="declog" id="decLog"><div class="declog-empty" id="decEmpty">Decisions will appear here as the agents reason…</div></div></div>
        <div class="resplan" id="resPlan"></div>
      </div>
    </div>
    <div class="aip-actions">
      <button class="btn-line" id="aiReplay">${IC.refresh} Replay</button>
      <button class="btn-line" id="aiSkip">Skip to result ${IC.arrow}</button>
      <button class="btn-primary" id="aiOps">${IC.cpu} Open City Mission Control</button>
    </div>`;
  v.querySelector('#aiBack').onclick=()=>pgo('detail',c);
  v.querySelector('#aiReplay').onclick=()=>{c._ai=computeAI(c);pgo('aiprocess',c);};
  v.querySelector('#aiSkip').onclick=()=>aiSkip(v,c,ai);
  v.querySelector('#aiOps').onclick=()=>enterMissionFromPortal(false);
  runAi(v,c,ai,token);
}
function setSt(card,txt,cls){const s=card.querySelector('[data-st]');s.textContent=txt;s.className='ap-state '+(cls||'');}
function typeInto(el,text,speed,token){return new Promise(res=>{let i=0;const step=()=>{if(token!==aiToken){res();return;}i=Math.min(text.length,i+2);el.textContent=text.slice(0,i);if(i<text.length)after(step,speed);else res();};step();});}
function revealDecision(card,d,a){
  card.querySelector('.ap-decision').innerHTML=`<div class="apd-badge" style="background:${a.c}1a;color:${a.c}">${IC.check} ${d.decision}<span class="apd-conf">${d.conf}%</span></div><div class="apd-why">${IC.sparkles} ${d.why}</div>`;
}
function addDecision(log,d,a,n){
  const e=$('#decEmpty');if(e)e.remove();
  const item=el('div','declog-item',`<span class="dl-n" style="background:${a.c}">${n}</span><div><div class="dl-d">${d.decision}</div><div class="dl-w">${d.why}</div></div>`);
  log.appendChild(item);log.scrollTop=log.scrollHeight;
  const cc=$('#decCount');if(cc)cc.textContent=n;
}
async function runAi(root,c,ai,token){
  const log=root.querySelector('#decLog');
  for(let i=0;i<PAGENTS.length;i++){
    if(token!==aiToken||!document.body.contains(root))return;
    const a=PAGENTS[i],card=root.querySelector(`.agentp[data-id="${a.id}"]`);
    card.classList.add('active');setSt(card,'thinking…','thinking');
    await wait(480);if(token!==aiToken)return;
    await typeInto(card.querySelector('.ap-think'),ai.steps[i].reasoning,15,token);
    if(token!==aiToken)return;
    revealDecision(card,ai.steps[i],a);addDecision(log,ai.steps[i],a,i+1);
    setSt(card,'done','done');card.classList.add('done');
    await wait(560);
  }
  if(token!==aiToken)return;showResolution(root,c,ai);
}
function aiSkip(root,c,ai){
  aiToken++; // stop running sequence
  const log=root.querySelector('#decLog');log.innerHTML='';const e=$('#decEmpty');
  PAGENTS.forEach((a,i)=>{const card=root.querySelector(`.agentp[data-id="${a.id}"]`);
    card.classList.add('active','done');setSt(card,'done','done');
    card.querySelector('.ap-think').textContent=ai.steps[i].reasoning;revealDecision(card,ai.steps[i],a);
    addDecision(log,ai.steps[i],a,i+1);});
  showResolution(root,c,ai);
}
function showResolution(root,c,ai){
  if(c.status<2){c.status=2;}
  const last6=c.id.slice(-6);
  const rp=root.querySelector('#resPlan');
  rp.innerHTML=`
    <div class="rp-h">${IC.check} Resolution plan ready</div>
    <div class="officer"><span class="off-ava">${ai.off[2]}</span><div><div class="off-n">Er. ${ai.off[0]}</div><div class="off-r">${ai.off[1]} · ${ai.dept}</div></div><span class="off-eta">ETA ${ai.eta}</span></div>
    <div class="sms"><div class="sms-h">${IC.message} SMS sent to citizen</div><div class="sms-b">GuardianGrid: Complaint <b>${c.id}</b> registered & assigned to ${c.body}. Priority ${ai.pr}. Track live: gg.in/t/${last6}</div></div>
    <div class="autonomy"><div class="au-big"><b>6</b> autonomous decisions</div><div class="au-small">resolved end-to-end · <b style="color:#10B981">0 human dispatchers</b></div></div>`;
  rp.classList.add('show');
  const cc=$('#decCount');if(cc)cc.textContent='6';
  toast('AI resolution complete','Routed & dispatched autonomously',IC.sparkles,'rgba(6,182,212,.14)','#0891B2');
}

/* ====================================================================
   GOVERNMENT / OFFICER CONSOLE  (closes the loop)
==================================================================== */
const GOV_TABS=['Open','Resolved','All'];
let govState={dept:'all',tab:'Open',sel:null};
function buildGov(){
  $('#govMark').innerHTML=IC.shield;
  $('#govExit').onclick=()=>show('landing');
  govState={dept:'all',tab:'Open',sel:null};
  govRender();
}
const priRank=p=>p==='High'?3:p==='Medium'?2:1;
function govScope(){return govState.dept==='all'?complaints:complaints.filter(c=>c.cat.id===govState.dept);}
function govRender(){renderGovSide();renderGovMain();}
function renderGovSide(){
  const side=$('#govSide');
  const items=[['all','All Departments',IC.list,'#2563EB',complaints.length]]
    .concat(CATS.map(cat=>[cat.id,cat.dept.split('·')[0].trim(),cat.ico,cat.c,complaints.filter(c=>c.cat.id===cat.id).length]));
  side.innerHTML=`<div class="gov-side-h">Departments</div>`+items.map(it=>`
    <button class="gov-dept ${govState.dept===it[0]?'active':''}" data-d="${it[0]}">
      <span class="gd-ico" style="background:${it[3]}1a;color:${it[3]}">${it[2]}</span>
      <span class="gd-n">${it[1]}</span><span class="gd-c">${it[4]}</span></button>`).join('');
  side.querySelectorAll('.gov-dept').forEach(b=>b.onclick=()=>{govState.dept=b.dataset.d;govState.sel=null;govRender();});
}
function govKpi(label,val,ico,c){return `<div class="gov-kpi"><div class="gk-ico" style="background:${c}1a;color:${c}">${ico}</div><div><div class="gk-v">${val}</div><div class="gk-l">${label}</div></div></div>`;}
function renderGovMain(){
  const scope=govScope();
  const open=scope.filter(c=>c.status<4).length,prog=scope.filter(c=>c.status===3).length,res=scope.filter(c=>c.status===4).length,high=scope.filter(c=>c.priority==='High'&&c.status<4).length;
  const list=scope.filter(c=>govState.tab==='Open'?c.status<4:govState.tab==='Resolved'?c.status===4:true)
    .sort((a,b)=>(priRank(b.priority)-priRank(a.priority))||(a.status-b.status));
  const title=govState.dept==='all'?'All Departments':CATS.find(c=>c.id===govState.dept).dept;
  const main=$('#govMain');
  main.innerHTML=`
    <div class="gov-head"><div class="p-hello" style="color:#06B6D4">Municipal Command · Ludhiana</div><h1 class="p-h1" style="font-size:23px">${title}</h1></div>
    <div class="gov-kpis">${govKpi('Open',open,IC.inbox,'#2563EB')}${govKpi('In Progress',prog,IC.clock,'#F59E0B')}${govKpi('Resolved',res,IC.check,'#10B981')}${govKpi('High Priority',high,IC.alert,'#EF4444')}</div>
    <div class="gov-body">
      <div class="gov-list-wrap">
        <div class="gov-tabs">${GOV_TABS.map(t=>`<button class="gtab ${govState.tab===t?'active':''}" data-t="${t}">${t} <span>${t==='Open'?open:t==='Resolved'?res:scope.length}</span></button>`).join('')}</div>
        <div class="gov-list" id="govList"></div>
      </div>
      <div class="gov-detail" id="govDetail"></div>
    </div>`;
  main.querySelectorAll('.gtab').forEach(b=>b.onclick=()=>{govState.tab=b.dataset.t;renderGovMain();});
  const gl=$('#govList');
  if(list.length)list.forEach(c=>gl.appendChild(govRow(c)));
  else gl.innerHTML=`<div class="empty-state" style="padding:40px"><div class="es-ico">${IC.check}</div><h3>Inbox clear</h3><p>No ${govState.tab.toLowerCase()} complaints in this queue.</p></div>`;
  if((!govState.sel||!list.includes(govState.sel))&&list.length)govState.sel=list[0];
  renderGovDetail();
}
function govRow(c){
  const thumb=c.photo?`<img src="${c.photo}">`:c.sample?sampleThumb(c.sample):`<span class="cxt-ico">${c.cat.ico}</span>`;
  const sel=govState.sel&&govState.sel.id===c.id;
  const pcls={High:'st-progress',Medium:'st-assigned',Low:'st-registered'}[c.priority];
  const row=el('div','gov-row'+(sel?' sel':''));
  row.innerHTML=`<div class="cx-thumb" style="width:54px;height:54px">${thumb}</div>
    <div style="flex:1;min-width:0"><div class="gr-top"><span class="cx-id">${c.id}</span><span class="st-badge ${pcls}">${c.priority}</span></div>
      <div class="gr-title">${c.title}</div><div class="cx-meta">${IC.users} ${c.citizen} · ${c.ward}</div></div>
    <div class="gr-r"><span class="st-badge ${STBADGE[c.status][1]}"><span class="dot"></span>${STBADGE[c.status][0]}</span><span class="gr-time">${c.created}</span></div>`;
  row.onclick=()=>{govState.sel=c;renderGovMain();};
  return row;
}
function renderGovDetail(){
  const d=$('#govDetail'),c=govState.sel;
  if(!c){d.innerHTML=`<div class="empty-state" style="padding:50px"><div class="es-ico">${IC.inbox}</div><h3>Select a complaint</h3><p>Pick an item to review and act on it.</p></div>`;return;}
  if(!c._ai)c._ai=computeAI(c);const ai=c._ai;
  const photo=c.photo?`<img src="${c.photo}">`:c.sample?sampleBig(c.sample):`<div style="display:grid;place-items:center;height:100%;color:${c.cat.c}">${c.cat.ico}</div>`;
  const nextLabels=['Acknowledge complaint','Assign field crew','Mark In Progress','Mark Resolved'];
  const tl=['Registered','Acknowledged','Assigned','In Progress','Resolved'];
  d.innerHTML=`
    <div class="gd-photo">${photo}</div>
    <div class="gd-body">
      <div class="gd-id">${c.id}</div><div class="gd-title">${c.title}</div>
      <div class="cx-meta" style="margin:6px 0 13px">${IC.users} ${c.citizen} · ${IC.pin} ${c.ward} · ${c.created}</div>
      <div class="gd-ai"><div class="gd-ai-h">${IC.sparkles} AI Triage (auto-routed to you)</div>
        <div class="gd-ai-row"><span>Category</span><b style="color:${c.cat.c}">${c.cat.name}</b></div>
        <div class="gd-ai-row"><span>Priority</span><b>${c.priority}</b></div>
        <div class="gd-ai-row"><span>Suggested crew</span><b>${ai.crew}</b></div>
        <div class="gd-ai-row"><span>SLA target</span><b>${ai.eta}</b></div>
      </div>
      <div class="gd-status-h">Status</div>
      <div class="gd-steps">${tl.map((s,i)=>`<div class="gds ${i<c.status?'done':i===c.status?'now':''}"><span></span>${s}</div>`).join('')}</div>
      ${c.status<4?`<button class="btn-primary block" id="govAdvance">${IC.check} ${nextLabels[c.status]}</button>
        <button class="btn-line block" id="govReassign" style="margin-top:8px">Reassign department</button>`
        :`<div class="gd-resolved">${IC.check} Resolved & verified</div>`}
    </div>`;
  const adv=$('#govAdvance');if(adv)adv.onclick=()=>{c.status=Math.min(4,c.status+1);toast(STBADGE[c.status][0],c.id+' · status updated',IC.check);renderGovMain();const n=$('#navCount');if(n)n.textContent=mine().length;};
  const rb=$('#govReassign');if(rb)rb.onclick=()=>toast('Reassignment','Department override (demo only)',IC.route,'rgba(37,99,235,.14)','#2563EB');
}

function init(){
  setIcons();introParticles();introCity();
  seedComplaints();buildAuth();

  $('#reportIco').innerHTML=IC.megaphone;$('#opsIco').innerHTML=IC.cpu;
  $('#reportEntry').onclick=()=>{show('auth');};
  $('#govEntry').onclick=()=>{show('gov');buildGov();};
  $('#launchMission').onclick=enterMission;
  $('#runMission').onclick=runMission;
  $('#exitBtn').onclick=exitMission;
  $('#completeDone').onclick=resetMission;

  $('#guardiansBtn').onclick=()=>$('#guardianSheet').classList.add('open');
  $('#closeSheet').onclick=()=>$('#guardianSheet').classList.remove('open');

  $('#impactBtn').onclick=()=>$('#impactOverlay').classList.add('open');
  $('#impactClose').onclick=()=>$('#impactOverlay').classList.remove('open');
  $('#impactMorph').onclick=function(){
    const trad=$('#impactTrad'),grid=$('#impactGrid');
    trad.style.transition='opacity .6s, transform .6s';
    trad.style.opacity='.35';trad.style.transform='scale(.96)';
    grid.style.transition='box-shadow .6s, transform .6s';
    grid.style.transform='scale(1.04)';grid.style.boxShadow='0 0 60px rgba(16,185,129,.4)';
    this.innerHTML=`<span>${IC.check}</span> Transformed`;
    after(()=>{trad.style.opacity='1';trad.style.transform='none';grid.style.transform='none';grid.style.boxShadow='none';this.innerHTML=`<span>${IC.refresh}</span> Transform`;},2600);
  };

  // mouse parallax on city camera + core
  const mc=$('#mc');
  mc.addEventListener('mousemove',e=>{
    const x=(e.clientX/innerWidth-.5),y=(e.clientY/innerHeight-.5);
    const cam=$('#cityCam');if(cam)cam.parentElement.querySelector('.city-stage svg').style.transform=`scale(1.05) translate(${-x*14}px,${-y*14}px)`;
    const core=$('#coreStage');if(core)core.style.transform=`translate(${-x*8}px,${-y*8}px)`;
  });

  // esc closes overlays
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){$('#impactOverlay').classList.remove('open');$('#guardianSheet').classList.remove('open');}});
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
else init();
})();
