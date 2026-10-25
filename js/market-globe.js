// Market sessions globe (three.js). Sample index figures; session times use the visitor's clock.
(()=>{
const LAND="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KAQFgKACVASCAlBRCAoAQQGoCAQFoKACVASCAlBRCAoARQWoCAQFoKIAVASCClBRKAoAQQWoCAQFoKIAVACCClARCApAQQGoCAQVoKIAFACCClARCApAQQGoCAQVoKJQFICCAlERCApARQEoABQVoiIQFACCAlERKipARYEoABUFoiJUFIiCAlEQCipAxQAoEAUFoCIUVICKAlAAKgpERQioEAUFoCIUVICKEFAgKgpARSioEAUlokBUFIiCEFEgCkpAwSioEAUhoEAUFIiCEFAhCkpAwagoAAUhoEAUnICCUVAhCkJAwSgoAAUhoEAUlICCUVEACkJAgagoAQUjoAIUjICCUVAiCkZAgSgoAQWjoAAUhIACUVACCkZAASgoAQWjoAQUjIAKUVACKkbBASgIARWioAQUjIACUFACKkZBASgIARWioARUjIACUBACCkRBCagYAQegoAQUhIoCUBECCkRFCSgIEQWgIgQUiIICUDACCkBBCSgIEQWgIAQUgIISUBACCkBBCSgABQWgYAQUgIoSUBACCkDBCCgABQWgIAQUgIISUAAKCkBBCCgABQWgIAQUgIIQUAAKCkBBCCgABQWgABQUgIIQUCAKCkBBCCgABSWgABQUgIIQUAAKCkQBCCgABSGgQBQUiIIQUAAKCkQBKCgABSGgQBQUioIQUAAKCkSBKCgQBSGgABQUiAJQUAAKSkSBKCgUBSGiABQUiAJRUAAKQkABKCgUBSCiABSUiAJRUCgKQkQBKCgUBaKiABSUiAJRUCgKQEQBKCgUBaKgQBSAiAJQUCgKQESBKCgVBaKgUBSAiAJQUCgKRESBKAAVBaKgUBSAiAJRQCgKRESBKAARBaKgUBSIiQJRQCoKRECBKAARBaKAUBSIiAJRACIKREGhKBARBaKAUBSIiAJRACIKREGhKBARBaIARBSIiAJRICIKRAGhKBARBaJARBSIiEJRICIKRAGgKBARBeJARBSICkJRICIKRIWoKBARBaJARBSICkBRICIKRIWIKBAVhaJARBSICkBRICIKxIGIKBAVgKJARBSICkFRICIKRIGIKBAVgqJARBSICgFRICoKRYGIKBAVgqJARBSICgFRICoERYGAKBAVAqJARBSIAgFRICoERYGIKBAVAqJARAiKAgFRICoERIGIKBAFAqJARAiIAgFRICoERIGIOBAFAqJAVAiIAgFRICoERIGIEBAFAqJAVAiIAhFxIAoERIGoEBAFAqJAVAiIAhExIAoERIGoEBAFAqJAFAiIAhEhIAoERIGoEBAFImJAFAiIAhEhIAoERIEoEBAFImJAFAiIAlEhIAoERIAoEBAFIkJAFAiIAlEhIAoExIAoEBAFIkJAFAiIAFEgIAoExIAoEBAFIkJAFAiIAFEgIApEhAAoEBABIkBAFAiIAVAgIApEhAAoEBABoEAAFAgIAVAgIApEgAAoEBABoEAAFIgIAVAgIAJAgAAoEBABIEAAFIgIAVAgAAJAgAAoEBACIEAABIAAARAgAAJAgAAIABACIEAIBAAAARAgAAJAgAAIAAACIEAABAAAARAgAAZAgBAIAAACIAAABIAAARAAAARAgAAIAAACIAAABIAAIRAAAARAAAAIAAECIAAABIAAARAAAARAAAAIAAFCIAAAAIAAABAAAIBAAAAIAABAIAAAAIAAABAAAIBAAAAAAAAAIAAAAIAAABAAAIBAAAAAAAAAIAAAAIAAABAAAABAAAAQAAAAIAAAAIAAAAAAAIBAAAAQAAAAIAAAAIAAACAAAIBAAAAAAAEAAAAAAIAAACAAAIBAAAAAAAEAAAAAAIEAAAAAAIBAAAAAAAEAAAAAAIAAAAAAAoAAAAAAAAEAAAAAAIEAAAAAAIAAAAAAAAEAAAAAAIEAAAAAAgAAAAAAAAEAAAAAAIAAAAAAAgAAAAAAAAEAAAAEAIAAAAAAAgAAAAAAAAEAAAAEAAAAAAAAAgAAAAAAAAAAAAAEAAAAAAAAAgAAAAgAAAAAAAAEAAAAAAAAAgAAAAAAAAAAAAAEAAAAAAAAAgAAAAgAAAAAAAAEgAAAAAAAAAAAAAgAAAAAAAAAAAAAEAAAAAAAAAgAAAAAAAAAAAAAEAAAAAAAAAAAAAAgBAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAQCAAABAQAgBQAEABQAkAKCAgBKSEgBKSEiJSQkAJSQkJKSAkRKSElBaSEmJSQkmJSUk5KSklxKSknpaWlvJSWlvbSWl5aS8tpaS0t7aXlsLSWlvfyUn5ey8v5eSkv7+el/Lycn/bzc35ez8/7+Xk/r+fn9fy+n9/z835+X8/v+fl9v+fn9fy9v9fz835+38/7+3l///////2/////////////", N=30000;

// ---------- data ----------
const REGIONS=[
  {id:"am",name:"Americas"},{id:"eu",name:"Europe"},{id:"af",name:"Africa"},{id:"as",name:"Asia"},{id:"oc",name:"Oceania"}];
const HUBS=[
 {id:"nyc",city:"New York",ex:"NYSE and Nasdaq",r:"am",lat:40.71,lon:-74.0,tz:"America/New_York",o:"09:30",c:"16:00",},
 {id:"tor",city:"Toronto",ex:"Toronto Stock Exchange",r:"am",lat:43.65,lon:-79.38,tz:"America/Toronto",o:"09:30",c:"16:00",},
 {id:"sao",city:"São Paulo",ex:"B3",r:"am",lat:-23.55,lon:-46.63,tz:"America/Sao_Paulo",o:"10:00",c:"17:00",},
 {id:"lon",city:"London",ex:"London Stock Exchange",r:"eu",lat:51.51,lon:-0.13,tz:"Europe/London",o:"08:00",c:"16:30",},
 {id:"fra",city:"Frankfurt",ex:"Deutsche Börse Xetra",r:"eu",lat:50.11,lon:8.68,tz:"Europe/Berlin",o:"09:00",c:"17:30",},
 {id:"par",city:"Paris",ex:"Euronext Paris",r:"eu",lat:48.86,lon:2.35,tz:"Europe/Paris",o:"09:00",c:"17:30",},
 {id:"los",city:"Lagos",ex:"Nigerian Exchange",r:"af",lat:6.45,lon:3.39,tz:"Africa/Lagos",o:"10:00",c:"14:30",},
 {id:"jnb",city:"Johannesburg",ex:"Johannesburg Stock Exchange",r:"af",lat:-26.2,lon:28.05,tz:"Africa/Johannesburg",o:"09:00",c:"17:00",},
 {id:"bom",city:"Mumbai",ex:"NSE and BSE",r:"as",lat:19.08,lon:72.88,tz:"Asia/Kolkata",o:"09:15",c:"15:30",},
 {id:"sha",city:"Shanghai",ex:"Shanghai Stock Exchange",r:"as",lat:31.23,lon:121.47,tz:"Asia/Shanghai",o:"09:30",c:"15:00",l:["11:30","13:00"],},
 {id:"hkg",city:"Hong Kong",ex:"Hong Kong Exchanges",r:"as",lat:22.32,lon:114.17,tz:"Asia/Hong_Kong",o:"09:30",c:"16:00",l:["12:00","13:00"],},
 {id:"tyo",city:"Tokyo",ex:"Tokyo Stock Exchange",r:"as",lat:35.68,lon:139.69,tz:"Asia/Tokyo",o:"09:00",c:"15:30",l:["11:30","12:30"],},
 {id:"syd",city:"Sydney",ex:"Australian Securities Exchange",r:"oc",lat:-33.87,lon:151.21,tz:"Australia/Sydney",o:"10:00",c:"16:00",},
];
// TradingView hotlists exchange codes. Only exchanges the widget supports are listed;
// the widget silently falls back to US stocks for unknown codes, so don't guess new ones.
const TV={nyc:"US",tor:"TSX",sao:"BMFBOVESPA",fra:"XETR",bom:"BSE",sha:"SSE",syd:"ASX"};
HUBS.forEach(h=>{h.tv=TV[h.id]||"";});

// ---------- sessions ----------
const toM=t=>{const[a,b]=t.split(":").map(Number);return a*60+b};
const fmtCache={};
function local(tz,now){
  const f=fmtCache[tz]||(fmtCache[tz]=new Intl.DateTimeFormat("en-GB",{timeZone:tz,weekday:"short",hour:"2-digit",minute:"2-digit",hourCycle:"h23"}));
  const p={}; f.formatToParts(now).forEach(x=>p[x.type]=x.value);
  const wd=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].indexOf(p.weekday);
  return {wd,m:(+p.hour)*60+(+p.minute),txt:p.hour+":"+p.minute};
}
const dur=m=>{const h=Math.floor(m/60),mm=m%60;return h?`${h}h ${mm}m`:`${mm}m`};
function session(h,now){
  const L=local(h.tz,now), o=toM(h.o), c=toM(h.c), wk=L.wd>=1&&L.wd<=5;
  if(wk&&L.m>=o&&L.m<c){
    if(h.l){const ls=toM(h.l[0]),le=toM(h.l[1]);
      if(L.m>=ls&&L.m<le) return {open:false,lunch:true,local:L.txt,text:`Lunch break, resumes in ${dur(le-L.m)}`};
      if(L.m<ls) return {open:true,local:L.txt,text:`Open, lunch break in ${dur(ls-L.m)}`};}
    return {open:true,local:L.txt,text:`Open, closes in ${dur(c-L.m)}`};
  }
  for(let d=0;d<8;d++){const w=(L.wd+d)%7; if(w>=1&&w<=5&&(d>0||L.m<o)) return {open:false,local:L.txt,text:`Closed, opens in ${dur(d*1440+o-L.m)}`};}
  return {open:false,local:L.txt,text:"Closed"};
}

// ---------- three ----------
const stage=document.getElementById("ms-stage");
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
const renderer=new THREE.WebGLRenderer({antialias:true,alpha:false});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.setClearColor(getComputedStyle(stage).getPropertyValue("--stage").trim()||"#2b2b2b",1);
stage.insertBefore(renderer.domElement,stage.firstChild);
const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(30,1,0.1,100);
const LOOK=new THREE.Vector3(0,1.1,0);
const GCENTER=new THREE.Vector3(0,1.32,0);

const ll=(lat,lon,r=1)=>{const a=lat*Math.PI/180,b=lon*Math.PI/180;return new THREE.Vector3(Math.cos(a)*Math.sin(b)*r,Math.sin(a)*r,Math.cos(a)*Math.cos(b)*r)};

const pivot=new THREE.Group(); pivot.position.copy(GCENTER); scene.add(pivot);
const tilt=new THREE.Group(); pivot.add(tilt);
const spin=new THREE.Group(); tilt.add(spin);

// core
spin.add(new THREE.Mesh(new THREE.SphereGeometry(0.992,64,48),new THREE.ShaderMaterial({
  vertexShader:`varying vec3 vN;varying vec3 vV;void main(){vN=normalize(normalMatrix*normal);vec4 mv=modelViewMatrix*vec4(position,1.);vV=normalize(-mv.xyz);gl_Position=projectionMatrix*mv;}`,
  fragmentShader:`varying vec3 vN;varying vec3 vV;void main(){float f=max(dot(vN,vV),0.);vec3 c=mix(vec3(.07,.07,.075),vec3(.135,.135,.145),pow(f,.7));c+=vec3(.025)*max(vN.y,0.);gl_FragColor=vec4(c,1.);}`
})));
// atmosphere
pivot.add(new THREE.Mesh(new THREE.SphereGeometry(1.14,64,48),new THREE.ShaderMaterial({
  side:THREE.BackSide,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,
  vertexShader:`varying vec3 vN;void main(){vN=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
  fragmentShader:`varying vec3 vN;void main(){float i=pow(clamp(.62-dot(vN,vec3(0,0,1.)),0.,1.),3.2);gl_FragColor=vec4(vec3(.6,.61,.65)*i*.55,1.);}`
})));
// graticule
{const pts=[];const seg=(a,b)=>pts.push(a.x,a.y,a.z,b.x,b.y,b.z);
 for(let lat=-60;lat<=60;lat+=30)for(let lon=-180;lon<180;lon+=4)seg(ll(lat,lon,1.001),ll(lat,lon+4,1.001));
 for(let lon=-180;lon<180;lon+=30)for(let lat=-88;lat<88;lat+=4)seg(ll(lat,lon,1.001),ll(lat+4,lon,1.001));
 const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.Float32BufferAttribute(pts,3));
 spin.add(new THREE.LineSegments(g,new THREE.LineBasicMaterial({color:0xffffff,transparent:true,opacity:.045,depthWrite:false})));}
// land dots
const hubLocal=HUBS.map(h=>ll(h.lat,h.lon));
const dotU={uHub:{value:hubLocal},uOpen:{value:new Array(HUBS.length).fill(0)},uI:{value:new Array(HUBS.length).fill(0)},uSize:{value:.0125},uScale:{value:500}};
{const bin=atob(LAND),pos=[],GA=Math.PI*(3-Math.sqrt(5));
 for(let i=0;i<N;i++){if(!(bin.charCodeAt(i>>3)&(1<<(i&7))))continue;
  const y=1-2*(i+.5)/N,r=Math.sqrt(1-y*y),ph=i*GA;pos.push(Math.cos(ph)*r,y,Math.sin(ph)*r);}
 const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.Float32BufferAttribute(pos,3));
 spin.add(new THREE.Points(g,new THREE.ShaderMaterial({uniforms:dotU,transparent:true,depthWrite:false,
  vertexShader:`uniform vec3 uHub[${HUBS.length}];uniform float uOpen[${HUBS.length}];uniform float uI[${HUBS.length}];uniform float uSize;uniform float uScale;
  varying float vA;varying float vB;varying float vF;
  void main(){float a=0.,b=0.;for(int i=0;i<${HUBS.length};i++){float d=distance(position,uHub[i]);float k=uI[i]*smoothstep(.34,.0,d);a+=k*uOpen[i];b+=k*(1.-uOpen[i]);}
  vA=min(a,1.);vB=min(b,1.);vec4 mv=modelViewMatrix*vec4(position*1.002,1.);vec3 n=normalize(normalMatrix*position);vF=dot(n,normalize(-mv.xyz));
  gl_PointSize=uSize*uScale*(1.+vA*.55)/(-mv.z);gl_Position=projectionMatrix*mv;}`,
  fragmentShader:`varying float vA;varying float vB;varying float vF;
  void main(){vec2 c=gl_PointCoord-.5;if(dot(c,c)>.25)discard;
  vec3 base=vec3(.55,.56,.59);vec3 col=mix(base,vec3(.66,.72,.8),vB*.8);col=mix(col,vec3(1.,.384,.004),vA);
  float al=mix(.18,.92,smoothstep(-.05,.55,vF));al=max(al,vA*.95*smoothstep(-.1,.3,vF));gl_FragColor=vec4(col,al);}`})));}

// hub markers
const glowTex=(()=>{const c=document.createElement("canvas");c.width=c.height=128;const x=c.getContext("2d");
  const g=x.createRadialGradient(64,64,0,64,64,64);g.addColorStop(0,"rgba(255,255,255,1)");g.addColorStop(.18,"rgba(255,255,255,.85)");g.addColorStop(.45,"rgba(255,255,255,.18)");g.addColorStop(1,"rgba(255,255,255,0)");
  x.fillStyle=g;x.fillRect(0,0,128,128);return new THREE.CanvasTexture(c)})();
const AMBER=new THREE.Color(0xff6201), COOL=new THREE.Color(0x8f8f96);
const beamMat=()=>new THREE.ShaderMaterial({uniforms:{uO:{value:0}},transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,
  vertexShader:`varying float vY;void main(){vY=uv.y;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
  fragmentShader:`uniform float uO;varying float vY;void main(){gl_FragColor=vec4(vec3(1.,.384,.004)*pow(1.-vY,1.6)*uO,1.);}`});
HUBS.forEach((h,i)=>{
  const n=hubLocal[i].clone(), q=new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,0,1),n);
  const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:glowTex,color:AMBER,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));
  sp.position.copy(n).multiplyScalar(1.012);spin.add(sp);
  const ring=new THREE.Mesh(new THREE.RingGeometry(.03,.036,40),new THREE.MeshBasicMaterial({color:AMBER,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));
  ring.position.copy(n).multiplyScalar(1.004);ring.quaternion.copy(q);spin.add(ring);
  const bg=new THREE.CylinderGeometry(.0028,.0028,.42,6,1,true);bg.translate(0,.21,0);
  const beam=new THREE.Mesh(bg,beamMat());beam.position.copy(n);beam.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),n);spin.add(beam);
  Object.assign(h,{sp,ring,beam,face:0,lit:0,phase:i*.7});
});

// platform
const PR=1.6; // platform radius (globe radius is 1)
function canvasTex(s,draw){const c=document.createElement("canvas");c.width=c.height=s;draw(c.getContext("2d"),s);const t=new THREE.CanvasTexture(c);t.anisotropy=renderer.capabilities.getMaxAnisotropy();return t;}
const base=new THREE.Mesh(new THREE.CircleGeometry(PR,128),new THREE.MeshBasicMaterial({map:canvasTex(1024,(x,s)=>{
  const c=s/2;const g=x.createRadialGradient(c,c,0,c,c,c);g.addColorStop(0,"#262626");g.addColorStop(.7,"#222222");g.addColorStop(1,"#1e1e1e");
  x.fillStyle=g;x.beginPath();x.arc(c,c,c,0,7);x.fill();
  x.strokeStyle="rgba(255,255,255,.055)";x.lineWidth=1.5;[.3,.52,.74,.86].forEach(k=>{x.beginPath();x.arc(c,c,c*k,0,7);x.stroke();});
  x.strokeStyle="rgba(255,255,255,.035)";for(let a=0;a<12;a++){const t=a/12*Math.PI*2;x.beginPath();x.moveTo(c+Math.cos(t)*c*.3,c+Math.sin(t)*c*.3);x.lineTo(c+Math.cos(t)*c*.86,c+Math.sin(t)*c*.86);x.stroke();}
  x.strokeStyle="rgba(255,255,255,.12)";x.lineWidth=3;x.beginPath();x.arc(c,c,c*.985,0,7);x.stroke();
})}));
base.rotation.x=-Math.PI/2;scene.add(base);
const edge=new THREE.Mesh(new THREE.CylinderGeometry(PR,PR*.99,.07,128,1,true),new THREE.MeshBasicMaterial({color:0x181818}));
edge.position.y=-.035;scene.add(edge);
// longitude dial
const dialG=new THREE.Group();scene.add(dialG);
const dial=new THREE.Mesh(new THREE.RingGeometry(PR*.875,PR*.975,180,1),new THREE.MeshBasicMaterial({transparent:true,depthWrite:false,map:canvasTex(1536,(x,s)=>{
  const c=s/2,R=c;x.lineCap="round";
  for(let d=0;d<360;d+=2){const t=d*Math.PI/180,sx=Math.sin(t),sy=Math.cos(t),big=d%30===0,mid=d%10===0;
    const r0=R*(big?.952:mid?.966:.978);x.strokeStyle=big?"rgba(231,228,220,.55)":mid?"rgba(231,228,220,.28)":"rgba(231,228,220,.13)";x.lineWidth=big?3:2;
    x.beginPath();x.moveTo(c+sx*r0,c+sy*r0);x.lineTo(c+sx*R*.995,c+sy*R*.995);x.stroke();
    if(big){const lon=d>180?d-360:d;const lab=lon===0?"0°":lon===180?"180°":Math.abs(lon)+"°"+(lon<0?"W":"E");
      x.save();x.translate(c+sx*R*.925,c+sy*R*.925);x.rotate(-t);x.fillStyle="rgba(231,228,220,.45)";x.font="500 24px 'IBM Plex Mono', ui-monospace, monospace";x.textAlign="center";x.textBaseline="middle";x.fillText(lab,0,0);x.restore();}}
})}));
dial.rotation.x=-Math.PI/2;dial.position.y=.003;dialG.add(dial);
// ring uv fix: RingGeometry uvs map like circle — fine (uses position-based uv)
// front pointer
{const s=new THREE.Shape();s.moveTo(0,-.045);s.lineTo(.035,.03);s.lineTo(-.035,.03);s.closePath();
 const m=new THREE.Mesh(new THREE.ShapeGeometry(s),new THREE.MeshBasicMaterial({color:0xff6201}));m.rotation.x=-Math.PI/2;m.position.set(0,.006,PR*.83);scene.add(m);}
// shadow + pedestal glow
const shadow=new THREE.Mesh(new THREE.CircleGeometry(1.25,64),new THREE.MeshBasicMaterial({transparent:true,depthWrite:false,map:canvasTex(256,(x,s)=>{
  const g=x.createRadialGradient(s/2,s/2,0,s/2,s/2,s/2);g.addColorStop(0,"rgba(0,0,0,.6)");g.addColorStop(.6,"rgba(0,0,0,.24)");g.addColorStop(1,"rgba(0,0,0,0)");x.fillStyle=g;x.fillRect(0,0,s,s);})}));
shadow.rotation.x=-Math.PI/2;shadow.position.y=.004;scene.add(shadow);
const floorGlow=new THREE.Mesh(new THREE.CircleGeometry(.9,64),new THREE.MeshBasicMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,color:AMBER,opacity:0,map:glowTex}));
floorGlow.rotation.x=-Math.PI/2;floorGlow.position.y=.005;scene.add(floorGlow);

// ---------- UI ----------
const labelsEl=document.getElementById("labels");
HUBS.forEach(h=>{const b=document.createElement("button");b.className="hub-label";b.innerHTML=`<i></i>${h.city}`;
  b.setAttribute("aria-label",`${h.city}, ${h.ex}`);b.addEventListener("click",e=>{e.stopPropagation();selectHub(h.id);});
  b.addEventListener("pointerdown",e=>e.stopPropagation());labelsEl.appendChild(b);h.el=b;});
const state={yaw:-0.3,pitch:.42,yawV:0,yawT:null,pitchT:null,auto:!reduce,region:null,hub:null,drag:null};
const wrapA=a=>Math.atan2(Math.sin(a),Math.cos(a));
const E=Math.atan2(GCENTER.y-LOOK.y+0,1);
function faceTo(lat,lon){state.yawT=state.yaw+wrapA(-lon*Math.PI/180-state.yaw);
  state.pitchT=Math.min(.75,Math.max(-.25,lat*Math.PI/180-.16));}
const panel=document.getElementById("panel"),pBody=document.getElementById("pBody");
function selectRegion(id,hubId,quiet){
  state.region=id;state.hub=hubId||null;
  const hs=HUBS.filter(h=>h.r===id);
  if(hubId){const h=HUBS.find(x=>x.id===hubId);faceTo(h.lat,h.lon);}
  else{let sx=0,sz=0,la=0;hs.forEach(h=>{sx+=Math.sin(h.lon*Math.PI/180);sz+=Math.cos(h.lon*Math.PI/180);la+=h.lat;});faceTo(la/hs.length,Math.atan2(sx,sz)*180/Math.PI);}
  renderPanel();
  HUBS.forEach(h=>h.el.classList.toggle("sel",h.id===hubId));
  if(quiet)return;
  if(innerWidth<=1100) setTimeout(()=>panel.scrollIntoView({behavior:reduce?"auto":"smooth",block:"start"}),60);
  else if(hubId){const el=pBody.querySelector(`[data-ex="${hubId}"]`);el&&el.scrollIntoView({block:"nearest"});}
}
function selectHub(id,quiet){const h=HUBS.find(x=>x.id===id);selectRegion(h.r,id,quiet);}

let built=null; // region the panel DOM was built for; widgets persist while it is unchanged
function buildPanel(){
  const r=REGIONS.find(x=>x.id===state.region),hs=HUBS.filter(h=>h.r===state.region);
  document.getElementById("pTitle").textContent=r.name;
  pBody.innerHTML=hs.map(h=>`<div class="ex" data-ex="${h.id}" tabindex="-1">
    <div class="ex-top"><h4>${h.city}</h4><span class="local"></span></div>
    <div class="state"></div><div class="ex-widget"></div></div>`).join("");
  pBody.querySelectorAll(".ex").forEach(el=>el.addEventListener("click",()=>{const h=HUBS.find(x=>x.id===el.dataset.ex);
    state.hub=h.id;faceTo(h.lat,h.lon);HUBS.forEach(x=>x.el.classList.toggle("sel",x.id===h.id));renderPanel();}));
  built=state.region;
}
function mountMovers(h,host){
  const want=h.id===state.hub?h.tv:"";
  if(host.dataset.tv===want)return;
  host.dataset.tv=want;host.replaceChildren();
  if(!want)return;
  const box=document.createElement("div");box.className="tradingview-widget-container";
  const w=document.createElement("div");w.className="tradingview-widget-container__widget";box.appendChild(w);
  const s=document.createElement("script");s.async=true;s.src="https://s3.tradingview.com/external-embedding/embed-widget-hotlists.js";
  s.textContent=JSON.stringify({colorTheme:"dark",dateRange:"1D",exchange:want,showChart:false,locale:"en",isTransparent:true,
    showSymbolLogo:true,showFloatingTooltip:false,width:"100%",height:"100%"});
  box.appendChild(s);host.appendChild(box);
}
function renderPanel(){
  if(!state.region)return;
  if(built!==state.region)buildPanel();
  const now=new Date(),hs=HUBS.filter(h=>h.r===state.region),ss=hs.map(h=>session(h,now)),open=ss.filter(s=>s.open).length;
  document.getElementById("pSub").textContent=hs.length===1?(open?"Exchange open now":"Exchange closed now"):`${open} of ${hs.length} exchanges open now`;
  hs.forEach((h,i)=>{const el=pBody.querySelector(`[data-ex="${h.id}"]`);
    el.classList.toggle("sel",h.id===state.hub);
    el.querySelector(".local").textContent=`${ss[i].local} local`;
    const st=el.querySelector(".state");st.classList.toggle("open",ss[i].open);st.innerHTML=`${h.ex}. <b>${ss[i].text}</b>`;
    mountMovers(h,el.querySelector(".ex-widget"));});
}

// drag + click
const cv=renderer.domElement;
cv.addEventListener("pointerdown",e=>{state.drag={x:e.clientX,y:e.clientY,sx:e.clientX,sy:e.clientY,t:performance.now()};state.yawT=state.pitchT=null;stage.classList.add("dragging");cv.setPointerCapture(e.pointerId);});
cv.addEventListener("pointermove",e=>{const d=state.drag;if(!d)return;const dx=e.clientX-d.x,dy=e.clientY-d.y;d.x=e.clientX;d.y=e.clientY;
  state.yaw+=dx*.006;state.yawV=dx*.006;state.pitch=Math.min(.8,Math.max(-.35,state.pitch+dy*.004));});
const endDrag=e=>{const d=state.drag;if(!d)return;state.drag=null;stage.classList.remove("dragging");
  if(Math.hypot(e.clientX-d.sx,e.clientY-d.sy)<6){state.yawV=0;pick(e.clientX,e.clientY);}};
cv.addEventListener("pointerup",endDrag);cv.addEventListener("pointercancel",endDrag);
const tmp=new THREE.Vector3();
function pick(cx,cy){const r=cv.getBoundingClientRect();let best=null,bd=34;
  HUBS.forEach(h=>{if(h.face<.12)return;h.sp.getWorldPosition(tmp).project(camera);
    const d=Math.hypot((tmp.x+1)/2*r.width-(cx-r.left),(1-tmp.y)/2*r.height-(cy-r.top));if(d<bd){bd=d;best=h;}});
  if(best)selectHub(best.id);}

// resize
function resize(){const w=stage.clientWidth,h=stage.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;
  const k=Math.max(1,Math.min(1.15/camera.aspect,1.55)); // pull back on narrower stages so the globe keeps side margins
  camera.position.set(0,1.95*k*.82+.4,6*k);camera.lookAt(LOOK);camera.updateProjectionMatrix();
  dotU.uScale.value=h*renderer.getPixelRatio()/(2*Math.tan(camera.fov*Math.PI/360));}
new ResizeObserver(resize).observe(stage);resize();

// ---------- loop ----------
const camDir=new THREE.Vector3(),wn=new THREE.Vector3(),q=new THREE.Quaternion(),sm=(a,b,x)=>{const t=Math.min(1,Math.max(0,(x-a)/(b-a)));return t*t*(3-2*t)};
let last=performance.now(),sess=[],sessT=0;
const utcEl=document.getElementById("utc"),statusEl=document.getElementById("status");
function tickSessions(){const now=new Date();sess=HUBS.map(h=>session(h,now));
  utcEl.textContent=now.toISOString().slice(11,16)+" UTC";
  HUBS.forEach((h,i)=>{h.open=sess[i].open;h.el.classList.toggle("open",h.open);dotU.uOpen.value[i]=h.open?1:0;});
  if(state.region)renderPanel();}
tickSessions();setInterval(tickSessions,20000);
selectHub("nyc",true); // the panel is always shown; New York is the default market
let onScreen=true;new IntersectionObserver(([e])=>{onScreen=e.isIntersecting;}).observe(stage);
function frame(t){const dt=Math.min(.05,(t-last)/1000);last=t;
  if(!onScreen){requestAnimationFrame(frame);return;}
  if(!state.drag){
    if(state.yawT!=null){state.yaw+=(state.yawT-state.yaw)*Math.min(1,dt*4.5);if(Math.abs(state.yawT-state.yaw)<.001)state.yawT=null;}
    else{state.yaw+=state.yawV;state.yawV*=.93;if(state.auto&&!state.region&&Math.abs(state.yawV)<.002)state.yaw+=dt*.12;}
    if(state.pitchT!=null){state.pitch+=(state.pitchT-state.pitch)*Math.min(1,dt*4);if(Math.abs(state.pitchT-state.pitch)<.001)state.pitchT=null;}}
  tilt.rotation.x=state.pitch;spin.rotation.y=state.yaw;dialG.rotation.y=state.yaw;
  scene.updateMatrixWorld();
  camDir.copy(camera.position).sub(GCENTER).normalize();spin.getWorldQuaternion(q);
  const r=stage.getBoundingClientRect();let litOpen=0,fg=0;
  HUBS.forEach((h,i)=>{
    wn.copy(hubLocal[i]).applyQuaternion(q);h.face=wn.dot(camDir);
    const vis=sm(-.02,.38,h.face),hide=false,inR=!state.region||h.r===state.region,sel=h.id===state.hub;
    const target=hide?0:(h.open?1:.42)*(inR?1:.35)*(sel?1.35:1)*vis;
    h.lit+=(target-h.lit)*Math.min(1,dt*5);
    dotU.uI.value[i]=h.lit;
    const col=h.open?AMBER:COOL;h.sp.material.color.copy(col);h.ring.material.color.copy(col);
    const pulse=reduce?.5:((t/1000*.6+h.phase)%1);
    h.sp.material.opacity=Math.min(1,h.lit*1.1);h.sp.scale.setScalar((h.open?.13:.075)*(sel?1.35:1)*(.9+.1*Math.sin(t/400+h.phase)));
    h.ring.scale.setScalar(1+pulse*(h.open?2.4:1.2));h.ring.material.opacity=h.lit*(1-pulse)*.8;
    h.beam.material.uniforms.uO.value=h.open?h.lit*.9:0;h.beam.scale.y=sel?1.4:1;
    if(h.open&&h.lit>.4)litOpen++; if(h.open)fg=Math.max(fg,h.lit*sm(.4,.9,h.face));
    // label
    h.sp.getWorldPosition(tmp);tmp.addScaledVector(wn,.05).project(camera);
    const lv=hide?0:sm(.18,.42,h.face)*(inR?1:.45);
    h.el.style.transform=`translate(${((tmp.x+1)/2*r.width).toFixed(1)}px,${((1-tmp.y)/2*r.height).toFixed(1)}px) translate(-50%,-135%)`;
    h.el.style.opacity=lv.toFixed(2);h.el.style.pointerEvents=lv>.3?"auto":"none";h.el.tabIndex=lv>.3?0:-1;
  });
  floorGlow.material.opacity=fg*.12;
  if(sessT++%15===0){let lon=Math.round(wrapA(-state.yaw)*180/Math.PI);const lt=lon===0?"0°":Math.abs(lon)+"°"+(lon<0?"W":"E");
    const openN=HUBS.filter(h=>h.open).length;statusEl.textContent=`Facing ${lt}. ${openN} of ${HUBS.length} markets open`;}
  renderer.render(scene,camera);requestAnimationFrame(frame);}
requestAnimationFrame(frame);
})();
