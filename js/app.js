const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const K="c33arcade",SZ=[6,8,10,12,15,20];
const fm=s=>String(s/60|0).padStart(2,"0")+":"+String(s%60).padStart(2,"0");
const fh=s=>s>=3600?`${s/3600|0}h ${s%3600/60|0}m`:s>=60?`${s/60|0}m`:`${s}s`;
const mk=()=>({tag:"",coins:0,earned:0,own:["logo"],eq:"logo",ach:{},xs:0,fl:0,ch:0,dot:0,last:null,g:{logodoku:{w:0,p:0,sec:0,st:0,bs:0,best:{}}},cfg:{}});
let S=mk();
try{const o=JSON.parse(localStorage.getItem(K)||"{}");
if(!o.g&&o.w!==undefined)o.g={logodoku:{w:o.w||0,p:o.p||0,sec:o.sec||0,st:o.st||0,bs:o.st||0,best:o.best||{}}};
S=Object.assign(mk(),o)}catch(e){}
S.g.logodoku=Object.assign(mk().g.logodoku,S.g.logodoku);
S.cfg=Object.assign({th:"dark",bar:"accent",nm:0,inf:0,n:8},S.cfg);
const gs=()=>S.g.logodoku,tot=k=>Object.values(S.g).reduce((a,g)=>a+g[k],0);
const save=()=>{try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}};
const ic=d=>`<svg class="ic" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${d}"/></svg>`;
const N=[["home","Inicio","M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10"],["shop","Tienda","M6 7h12l1 13H5zM9 7a3 3 0 0 1 6 0"],["play","Jugar","M7 4l13 8-13 8z"],["stats","Stats","M5 20V10M12 20V4M19 20v-7"],["set","Ajustes","M4 7h10M18 7h2M4 17h2M10 17h10M16 4v6M8 14v6"]];
const GM=[{t:"Logodoku",s:"Puzzle · 1 jugador",c:"linear-gradient(90deg,#43b8b8 25%,#c4668a 0 50%,#a8e293 0 75%,#dfb23f 0)",on:1},{t:"Memoria Neón",s:"Próximamente",c:"linear-gradient(135deg,#2b4634,#728156)"},{t:"Culebrita Retro",s:"Próximamente",c:"linear-gradient(135deg,#728156,#B6C99B)"}];
const card=g=>`<button class="gc" ${g.on?'data-v="play"':"data-soon"}><div class="cov" style="background:${g.c}">${g.on?'<i class="lg" style="width:3.8rem;height:3.8rem"></i>':ic("M6 11h12v9H6zM8 11V8a4 4 0 0 1 8 0v3")}</div><div class="t">${g.t}<small>${g.s}</small></div></button>`;
const barH=pv=>{const t=pv?"span":"button";return `<${t} class="lb lg b" ${pv?"":'data-v="home" aria-label="Inicio"'}></${t}>`+N.map((n,i)=>`<${t} class="nb${pv&&!i?" on":""}${pv&&n[0]=="stats"?" dt":""}" ${pv?"":`data-v="${n[0]}"`}>${ic(n[2])}<span>${n[1]}</span></${t}>`).join("")};
$("#side").innerHTML='<i class="lg b"></i>'+N.map(n=>`<button class="sb" data-v="${n[0]}" title="${n[1]}" aria-label="${n[1]}">${ic(n[2])}</button>`).join("");
$("#bar").innerHTML=barH(0);
$("#r1").innerHTML=$("#r2").innerHTML=GM.map(card).join("");
$("#sz").innerHTML=SZ.map(z=>`<button data-n="${z}">${z}×${z}</button>`).join("");
$(".sr").insertAdjacentHTML("afterbegin",ic("M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-5-5"));
$("#pvs").innerHTML=[["light","Clara"],["accent","Acento"],["dark","Oscura"]].map(([k,t])=>`<div class="pw" data-b="${k}" tabindex="0" role="button" aria-label="Barra ${t}"><small>${t}</small><div class="bar pv" data-b="${k}">${barH(1)}</div></div>`).join("");

/* ---- Aspectos (tienda) ---- */
const SK=[["logo","Logo Chavita33","",0],["cat","Gato","🐱",50],["dog","Perro","🐶",80],["star","Estrella","⭐",100],["fox","Zorro","🦊",120],["pizza","Pizza","🍕",120],["panda","Panda","🐼",150],["frog","Rana","🐸",200],["octo","Pulpo","🐙",250],["ali","Alien","👾",300],["rocket","Cohete","🚀",350],["uni","Unicornio","🦄",400],["fire","Fuego","🔥",500],["dra","Dragón","🐲",600],["gem","Diamante","💎",800],["crown","Corona","👑",1500],["rb","Logo Arcoíris","",10000]];
function skin(){const s=SK.find(x=>x[0]==S.eq)||SK[0],b=document.body;b.classList.toggle("ske",!!s[2]);b.classList.toggle("skr",s[0]=="rb");b.style.setProperty("--e",`"${s[2]}"`)}
const pvw=s=>s[2]?`<span class="em">${s[2]}</span>`:`<i class="lg${s[0]=="rb"?" rbw":""}" style="width:3.4rem;height:3.4rem"></i>`;
function shop(){$("#shp").innerHTML=`<div class="me2"><i class="coin"></i><b>${S.coins.toLocaleString("es")}</b> monedas · ganas 10 por cada victoria</div><div class="row grid sk">${SK.map(s=>{const o=S.own.includes(s[0]),e=S.eq==s[0];return `<div class="sc${e?" eq":""}"><div class="pvw">${pvw(s)}</div><b>${s[1]}</b>${o?`<button class="btn${e?" g":""}" data-eq="${s[0]}" ${e?"disabled":""}>${e?"Equipado":"Equipar"}</button>`:`<button class="btn g" data-buy="${s[0]}" ${S.coins<s[3]?"disabled":""}><i class="coin"></i>${s[3].toLocaleString("es")}</button>`}</div>`}).join("")}</div>`}
function buy(id){const s=SK.find(x=>x[0]==id);if(!s||S.own.includes(id)||S.coins<s[3])return;S.coins-=s[3];S.own.push(id);S.eq=id;skin();chk();save();ui();shop();toast("¡Comprado: "+s[1]+"!")}
function equip(id){if(S.own.includes(id)){S.eq=id;skin();save();shop();ui()}}

/* ---- Trofeos y logros: [id,icono,nombre,descripción,meta,valor,formato] ---- */
const bsz=()=>Object.keys(gs().best).filter(k=>gs().best[k]>0).length;
const A=[
["h100","⏳","100 horas de juego","Pasa 100 horas jugando",100,()=>tot("sec")/3600,v=>v.toFixed(1)],
["w25","🥉","25 victorias","Gana 25 partidas",25,()=>tot("w")],
["w100","🥈","100 victorias","Gana 100 partidas",100,()=>tot("w")],
["w500","🥇","500 victorias","Gana 500 partidas",500,()=>tot("w")],
["w1000","👑","1000 victorias","Gana 1000 partidas",1000,()=>tot("w")],
["f1","🎉","Primera victoria","Gana tu primera partida",1,()=>tot("w")],
["s5","🔥","Racha de 5","Encadena 5 victorias seguidas",5,()=>gs().bs],
["s10","🔥","Racha de 10","Encadena 10 victorias seguidas",10,()=>gs().bs],
["s25","☄️","Racha de 25","Encadena 25 victorias seguidas",25,()=>gs().bs],
["b20","🧠","Genio del 20×20","Gana un tablero de 20×20",1,()=>gs().best[20]?1:0],
["all","🧩","Todos los tamaños","Gana en los 6 tamaños",6,bsz],
["fl","💖","Sin rasguños","Gana sin ningún error",1,()=>S.fl],
["fa","⚡","Rayo","Gana un 6×6 en menos de 60 s",1,()=>gs().best[6]&&gs().best[6]<=60?1:0],
["x50","❌","Tachador","Marca 50 casillas con X",50,()=>S.xs],
["b1","🛍️","Primera compra","Compra un aspecto",1,()=>S.own.length-1],
["b5","🎨","Coleccionista","Ten 6 aspectos",6,()=>S.own.length],
["rbw","🌈","Leyenda arcoíris","Consigue el Logo Arcoíris",1,()=>S.own.includes("rb")?1:0],
["e1k","💰","Ahorrador","Gana 1000 monedas en total",1000,()=>S.earned]];
function chk(){const nw=A.filter(a=>!S.ach[a[0]]&&a[5]()>=a[4]);if(!nw.length)return;nw.forEach(a=>S.ach[a[0]]=1);S.dot=1;save();toast("🏆 Logro: "+nw.map(a=>a[2]).join(", "),3500)}
const ah=a=>{const v=Math.min(a[5](),a[4]),on=S.ach[a[0]];return `<div class="ach${on?" on":""}"><span class="ai">${a[1]}</span><div><b>${a[2]}</b><small>${a[3]}</small><div class="pb"><i style="width:${v/a[4]*100}%"></i></div><small>${a[6]?a[6](v):Math.floor(v)} / ${a[4]}</small></div></div>`};
function stx(){const g=gs(),t=x=>`<div class="tile"><b>${x[0]}</b><small>${x[1]}</small></div>`;
$("#sx").innerHTML=`<div class="tiles">${[[fh(tot("sec")),"Tiempo total"],[tot("w"),"Victorias"],[tot("p"),"Partidas"],[g.st,"Racha actual"],[g.bs,"Mejor racha"],[S.earned,"Monedas ganadas"]].map(t).join("")}</div>
<h3 class="st">Por juego</h3><div class="gcard"><div class="gh"><i class="lg b"></i>Logodoku</div><div class="tiles">${[[fh(g.sec),"Tiempo en juego"],[g.w,"Victorias"],[g.st,"Racha"]].map(t).join("")}</div><p class="bt">Récords de tiempo</p><div class="tiles">${SZ.map(z=>t([g.best[z]?fm(g.best[z]):"--",z+"×"+z])).join("")}</div></div>
<h3 class="st">Trofeos</h3><div class="alist">${A.slice(0,5).map(ah).join("")}</div>
<h3 class="st">Logros</h3><div class="alist">${A.slice(5).map(ah).join("")}</div>`}

let V="home",G=0,n=SZ.includes(S.cfg.n)?S.cfg.n:8,R,sol,C,M,lives,sec,over=1,err=0,cr=0,cc=0,tt,gid=0,lt=0,lc=-1,snap=null;
const nm=()=>document.body.classList.toggle("nums",!!S.cfg.nm||n>12);
function app(){const c=S.cfg;document.documentElement.dataset.theme=c.th;$("#bar").dataset.b=c.bar;nm();
$$(".seg[data-k]").forEach(s=>[...s.children].forEach(b=>b.classList.toggle("on",String(c[s.dataset.k]||0)==b.dataset.x)));
$$(".pw").forEach(p=>p.classList.toggle("sel",p.dataset.b==c.bar))}
function ui(){const h=new Date().getHours(),g=gs(),sc=tot("sec");
$("#hi").innerHTML=`${h<6||h>=19?"Buenas noches":h<12?"Buenos días":"Buenas tardes"}, <span>${S.tag||"jugador"}</span>`;
$("#me").innerHTML=`<i class="pc"></i><b>${S.tag||"..."}</b><small>Nv 1</small><i class="coin"></i><b>${S.coins.toLocaleString("es")}</b>`;
$("#sp").innerHTML=`<h3 class="st">Tus estadísticas</h3><div class="ring" style="--p:${Math.min(100,sc/3600)}"><div><small>Tiempo total</small><b>${fh(sc)}</b><small>Nivel 1</small></div></div><div class="tiles"><div class="tile"><b>${tot("w")}</b><small>Victorias</small></div><div class="tile"><b>${g.st}</b><small>Racha</small></div><div class="tile"><b>${S.coins}</b><small>Monedas</small></div></div>`;
const L=S.last;$("#last").innerHTML=L?`<i class="lg b"></i><div class="lm"><b>Logodoku ${L.n}×${L.n}</b><small>${L.ok?"Ganada":"Sin vidas"} · ${fm(L.s)}</small></div><button class="btn" data-v="play">Otra vez</button>`:`<div class="lm"><b>Aún no hay partidas</b><small>Empieza con Logodoku.</small></div><button class="btn" data-v="play">Jugar</button>`;
document.body.classList.toggle("nd",!!S.dot)}
function go(v){V=v;$("#win").hidden=true;if(v=="stats"){S.dot=0;save()}
$$(".view").forEach(e=>e.classList.toggle("on",e.id=="v-"+v));
$$(".sb,#bar .nb").forEach(e=>e.classList.toggle("on",e.dataset.v==v));
ui();if(v=="shop")shop();if(v=="stats")stx();if(v=="play"&&!G)newG();scrollTo(0,0);$("#bar").classList.remove("hide")}
function toast(m,ms){const e=$("#toast");e.textContent=m;e.classList.add("on");clearTimeout(tt);tt=setTimeout(()=>e.classList.remove("on"),ms||1900)}

/* ---- Gamer tag (se elige una sola vez) ---- */
$("#tg").hidden=!!S.tag;
$("#tgb").onclick=()=>{const v=$("#tgi").value.trim();if(!/^[A-Za-z0-9_]{3,16}$/.test(v)){$("#tge").textContent="Usa de 3 a 16 letras, números o _";return}
S.tag=v;save();$("#tg").hidden=true;ui();toast("¡Bienvenido, "+v+"!")};
$("#tgi").onkeydown=e=>{if(e.key=="Enter")$("#tgb").click()};

/* ---- Logodoku: generación (solución única) ---- */
const COL=["#43b8b8","#a8c0dc","#c4668a","#9b7ed6","#a8e293","#5bb0e6","#dfb23f","#e6a1bb","#f08c6a","#8fb36b","#e4e079","#b8865b","#e36b5f","#4aa37a","#d49fe0","#f2c9a0","#9aa5ad","#c3d94e","#3f7fbf","#7fd8c8"];
const shuf=a=>{for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const sleep=()=>new Promise(r=>setTimeout(r));
function rsol(n){const s=[],u=Array(n).fill(0);const go=r=>{if(r==n)return 1;for(const c of shuf([...Array(n).keys()])){if(u[c]||(r&&Math.abs(c-s[r-1])<2))continue;u[c]=1;s[r]=c;if(go(r+1))return 1;u[c]=0}return 0};go(0);return s}
function grow(n,s){const R=Array.from({length:n},()=>Array(n).fill(-1));s.forEach((c,r)=>R[r][c]=r);
for(let k=n*n-n;k>0;k--){const f=[];
for(let r=0;r<n;r++)for(let c=0;c<n;c++)if(R[r][c]<0)for(const[a,b]of[[1,0],[-1,0],[0,1],[0,-1]]){const g=(R[r+a]||[])[c+b];if(g>=0)f.push([r,c,g])}
const[r,c,g]=f[Math.random()*f.length|0];R[r][c]=g}
return R}
function sc(R,n,lim){const N=n*n,rg=new Uint8Array(N);for(let i=0;i<N;i++)rg[i]=R[i/n|0][i%n];
let k=0,nd=0;const out=[],cl=s=>({al:s.al.slice(),rd:s.rd.slice(),cd:s.cd.slice(),gd:s.gd.slice(),ct:s.ct.slice()});
const put=(s,i)=>{const r=i/n|0,c=i%n,g=rg[i];s.rd[r]=s.cd[c]=s.gd[g]=1;s.ct.push(i);for(let j=0;j<N;j++){const a=j/n|0,b=j%n;if(a==r||b==c||rg[j]==g||(Math.abs(a-r)<2&&Math.abs(b-c)<2))s.al[j]=0}};
const dfs=s=>{for(;;){
if(++nd>60000)return;
if(s.ct.length==n){k++;out.push(s.ct);return}
const cn=[new Int16Array(n),new Int16Array(n),new Int16Array(n)];
const gR=new Int16Array(n).fill(-1),gC=new Int16Array(n).fill(-1),rG=new Int16Array(n).fill(-1),cG=new Int16Array(n).fill(-1);
for(let j=0;j<N;j++)if(s.al[j]){const r=j/n|0,c=j%n,g=rg[j];cn[0][r]++;cn[1][c]++;cn[2][g]++;
gR[g]=gR[g]==-1?r:gR[g]==r?r:-2;gC[g]=gC[g]==-1?c:gC[g]==c?c:-2;rG[r]=rG[r]==-1?g:rG[r]==g?g:-2;cG[c]=cG[c]==-1?g:cG[c]==g?g:-2}
const ro=new Int16Array(n).fill(-1),co=new Int16Array(n).fill(-1),gr=new Int16Array(n).fill(-1),gc=new Int16Array(n).fill(-1);
for(let x=0;x<n;x++){if(gR[x]>=0)ro[gR[x]]=x;if(gC[x]>=0)co[gC[x]]=x;if(rG[x]>=0)gr[rG[x]]=x;if(cG[x]>=0)gc[cG[x]]=x}
let ch=0;for(let j=0;j<N;j++)if(s.al[j]){const r=j/n|0,c=j%n,g=rg[j];
if((ro[r]>=0&&ro[r]!=g)||(co[c]>=0&&co[c]!=g)||(gr[g]>=0&&gr[g]!=r)||(gc[g]>=0&&gc[g]!=c)){s.al[j]=0;ch=1}}
if(ch)continue;
const dn=[s.rd,s.cd,s.gd];let bt=999,bk=0,bi=0;
for(let t=0;t<3;t++)for(let x=0;x<n;x++)if(!dn[t][x]&&cn[t][x]<bt){bt=cn[t][x];bk=t;bi=x}
if(!bt)return;
const cand=[];for(let j=0;j<N;j++)if(s.al[j]&&[j/n|0,j%n,rg[j]][bk]==bi)cand.push(j);
if(bt==1){put(s,cand[0]);continue}
for(const j of cand){const t=cl(s);put(t,j);dfs(t);if(k>=lim||nd>60000)return}
return}};
dfs({al:new Uint8Array(N).fill(1),rd:new Uint8Array(n),cd:new Uint8Array(n),gd:new Uint8Array(n),ct:[]});
return{k,out,cap:nd>60000}}
function conn(R,n,A,x,seed){const seen=new Set([seed]),q=[seed];let k=0;
for(const i of q){k++;const r=i/n|0,c=i%n;for(const[a,b]of[[1,0],[-1,0],[0,1],[0,-1]]){const rr=r+a,cc=c+b,j=rr*n+cc;if(rr<0||cc<0||rr>=n||cc>=n||j==x||seen.has(j)||R[rr][cc]!=A)continue;seen.add(j);q.push(j)}}
return k}
async function gen(n,id){const t0=performance.now();let ly=t0,s,R;
for(let at=0;at<80;at++){s=rsol(n);R=grow(n,s);const si=s.map((c,r)=>r*n+c);
for(let it=0;it<500;it++){
if(id!=gid)return;
const q=sc(R,n,2);if(q.cap)break;if(q.k==1)return{R,s};
if(performance.now()-t0>6000)return{R,s};
const alt=q.out.find(o=>o.some(i=>!si.includes(i)));if(!alt)break;
let ok=0;
for(const x of shuf(alt.filter(i=>!si.includes(i)))){
const r=x/n|0,c=x%n,A=R[r][c];let z=0;R.forEach(w=>w.forEach(v=>{if(v==A)z++}));
if(conn(R,n,A,x,A*n+s[A])!=z-1)continue;
const nb=shuf([[1,0],[-1,0],[0,1],[0,-1]]).map(([a,b])=>(R[r+a]||[])[c+b]).filter(v=>v>=0&&v!=A);
if(nb.length){R[r][c]=nb[0];ok=1;break}}
if(!ok)break;
if(performance.now()-ly>12){ly=performance.now();await sleep()}}}
return{R,s}}
async function newG(k){if(k)n=k;S.cfg.n=n;const id=++gid;over=1;
$$("#sz button").forEach(e=>e.classList.toggle("on",+e.dataset.n==n));
$("#board").classList.add("busy");toast("Generando tablero…",60000);
const g=await gen(n,id);if(id!=gid)return;
R=g.R;sol=g.s;const pal=shuf(COL.slice());
C=Array(n).fill(-1);M=new Uint8Array(n*n);lives=3;sec=0;err=0;over=0;cr=cc=0;G=1;snap=null;lc=-1;
const b=$("#board");b.style.setProperty("--n",n);b.classList.remove("busy");$("#toast").classList.remove("on");
b.innerHTML=R.map((row,r)=>row.map((g,c)=>`<div class="cell" data-r="${r}" data-c="${c}" data-g="${g+1}" style="--rc:${pal[g]}" role="gridcell" aria-label="Fila ${r+1}, columna ${c+1}"><i class="pc"></i></div>`).join("")).join("");
nm();fit();$("#win").hidden=true;hud();save()}
function hud(){$("#cnt").textContent=C.filter(x=>x>=0).length+"/"+n;
$("#hp").innerHTML=[0,1,2].map(i=>`<svg class="hr${i<lives?"":" x"}"><use href="#ht"/></svg>`).join("");$("#tm").textContent=fm(sec);
[...$("#board").children].forEach((e,i)=>{const r=i/n|0,c=i%n;e.classList.toggle("cat",C[r]==c);e.classList.toggle("x",!!M[i]);e.classList.toggle("cur",r==cr&&c==cc)})}
function why(r,c){if(C[r]>=0&&C[r]!=c)return"Ya hay un logo en esa fila";
for(let i=0;i<n;i++){if(i==r||C[i]<0)continue;
if(Math.abs(i-r)<2&&Math.abs(C[i]-c)<2)return"Los logos no pueden tocarse";
if(C[i]==c)return"Ya hay un logo en esa columna";
if(R[i][C[i]]==R[r][c])return"Ya hay un logo en esa zona de color"}
return""}
function tap(r,c){if(over)return;cr=r;cc=c;
if(C[r]==c){C[r]=-1;hud();return}
const w=why(r,c);
if(w){err++;if(!S.cfg.inf)lives--;const e=$("#board").children[r*n+c];e.classList.remove("bad");void e.offsetWidth;e.classList.add("bad");toast(w);hud();if(!lives)end(0);return}
C[r]=c;M[r*n+c]=0;hud();if(C.every(x=>x>=0))end(1)}
function cyc(r,c){if(over)return;const i=r*n+c;cr=r;cc=c;
if(C[r]==c){C[r]=-1;hud();return}
if(M[i]){tap(r,c);return}
M[i]=1;S.xs++;chk();save();hud()}
function end(ok){over=1;const g=gs();g.p++;let nb=0;
if(ok){g.w++;g.st++;g.bs=Math.max(g.bs,g.st);S.coins+=10;S.earned+=10;S.ch++;if(!err)S.fl++;if(!g.best[n]||sec<g.best[n]){g.best[n]=sec;nb=1}}else g.st=0;
S.last={n,s:sec,ok};S.dot=1;chk();save();ui();if(V=="stats")stx();
$("#wt").textContent=ok?"¡Ganaste!":"¡Sin vidas!";
$("#wd").textContent=ok?`Tiempo ${fm(sec)}${nb?" · ¡Nuevo récord!":""}`:"Inténtalo de nuevo, tú puedes.";
$("#ch").hidden=!ok;$("#ch b").textContent="+10 monedas";
$("#win").hidden=false;$("#again").focus()}
function hint(){if(over)return;for(let r=0;r<n;r++)if(C[r]<0&&!why(r,sol[r])){cr=r;cc=sol[r];M[r*n+cc]=0;hud();const e=$("#board").children[r*n+cc];e.classList.add("hint");setTimeout(()=>e.classList.remove("hint"),2300);return}
toast("Revisa tus logos: alguno está mal ubicado")}

/* ---- Controles ---- */
function act(k,pad){if(!S.tag)return;document.body.classList.add("kb");
if(!$("#win").hidden){if(k=="A")newG();else if(k=="B")go("home");return}
if(V!="play"){if(!pad)return;const i=N.findIndex(x=>x[0]==V);if(k=="L")go(N[(i+4)%5][0]);else if(k=="R")go(N[(i+1)%5][0]);else if(k=="A"&&V!="set")go("play");return}
if(k=="u")cr=(cr+n-1)%n;else if(k=="d")cr=(cr+1)%n;else if(k=="l")cc=(cc+n-1)%n;else if(k=="r")cc=(cc+1)%n;
else if(k=="A")return cyc(cr,cc);else if(k=="X")return tap(cr,cc);else if(k=="Y")return hint();else if(k=="N")return newG();else if(k=="B")return go("home");
if(!over)hud()}
const KM={ArrowUp:"u",ArrowDown:"d",ArrowLeft:"l",ArrowRight:"r",Enter:"A"," ":"A",Escape:"B",x:"X",h:"Y",n:"N",w:"u",s:"d",a:"l",d:"r"};
addEventListener("keydown",e=>{if(e.target.matches("input")||e.ctrlKey||e.metaKey||e.altKey)return;const k=KM[e.key];
if(!k||(V!="play"&&$("#win").hidden))return;
if(e.target.closest("button")&&(e.key=="Enter"||e.key==" "))return;
e.preventDefault();act(k)});
const pv={},MV="udlr";
function pad(t){const g=[...(navigator.getGamepads?navigator.getGamepads():[])].find(Boolean);
if(g){const b=i=>g.buttons[i]&&g.buttons[i].pressed,a=g.axes;
const st={u:b(12)||a[1]<-.6,d:b(13)||a[1]>.6,l:b(14)||a[0]<-.6,r:b(15)||a[0]>.6,A:b(0),B:b(1),X:b(2),Y:b(3),L:b(4),R:b(5),N:b(9)};
for(const k in st){if(st[k]){if(!pv[k]||(MV.includes(k)&&t-pv[k]>170)){act(k,1);pv[k]=t}}else pv[k]=0}}
requestAnimationFrame(pad)}
addEventListener("gamepadconnected",()=>toast("Mando conectado"));
addEventListener("pointerdown",()=>document.body.classList.remove("kb"));

/* ---- Eventos ---- */
document.addEventListener("click",e=>{const b=e.target.closest("[data-v]"),by=e.target.closest("[data-buy]"),eq=e.target.closest("[data-eq]");
if(by)buy(by.dataset.buy);else if(eq)equip(eq.dataset.eq);
else if(b&&!b.closest(".pv"))go(b.dataset.v);else if(e.target.closest("[data-soon]"))toast("Próximamente, vuelve pronto");
if(e.target.closest(".ac .btn"))e.target.closest("button").blur()});
let dr=null;
const cellAt=(x,y)=>{const e=document.elementFromPoint(x,y);return e&&e.closest?e.closest(".cell"):null};
function paint(r,c){const i=r*n+c;if(C[r]==c)return;if(dr.m=="x"&&!M[i]){M[i]=1;S.xs++}else if(dr.m=="e")M[i]=0;cr=r;cc=c;hud()}
$("#board").onpointerdown=e=>{if(e.button||over)return;const c=e.target.closest(".cell");if(!c)return;const r=+c.dataset.r,k=+c.dataset.c;
dr={r,k,m:M[r*n+k]?"e":C[r]==k?"":"x",mv:0,l:r*n+k}};
$("#board").onpointermove=e=>{if(!dr||!dr.m)return;const c=cellAt(e.clientX,e.clientY);if(!c)return;const r=+c.dataset.r,k=+c.dataset.c,i=r*n+k;if(i==dr.l)return;
if(!dr.mv){dr.mv=1;paint(dr.r,dr.k)}dr.l=i;paint(r,k)};
addEventListener("pointerup",()=>{if(!dr)return;const d=dr;dr=null;if(d.mv){chk();save()}else cyc(d.r,d.k)});
addEventListener("pointercancel",()=>{dr=null});
$("#board").oncontextmenu=e=>{e.preventDefault();const c=e.target.closest(".cell");if(c)tap(+c.dataset.r,+c.dataset.c)};
const fit=()=>{const b=$(".bd");$("#board").classList.toggle("fit",b.scrollWidth<=b.clientWidth+1)};
addEventListener("resize",fit);
$("#sz").onclick=e=>{const b=e.target.closest("button");if(b)newG(+b.dataset.n)};
$("#nw").onclick=()=>newG();$("#again").onclick=()=>newG();$("#ht").onclick=hint;
$("#un").onclick=()=>{C.fill(-1);M.fill(0);lives=3;sec=0;err=0;over=0;hud()};
$("#q").oninput=()=>{if(V!="home"&&V!="games")go("games");const v=$("#q").value.trim().toLowerCase();$$(".gc").forEach(e=>e.hidden=!e.textContent.toLowerCase().includes(v))};
$("#v-set").onclick=e=>{const b=e.target.closest(".seg button");if(!b)return;const x=b.dataset.x;S.cfg[b.parentNode.dataset.k]=isNaN(x)?x:+x;save();app()};
$("#pvs").onclick=e=>{const p=e.target.closest(".pw");if(p){S.cfg.bar=p.dataset.b;save();app()}};
$("#pvs").onkeydown=e=>{if(e.key=="Enter"||e.key==" "){e.preventDefault();e.target.click()}};
$("#rs").onclick=()=>{const r=$("#rs");if(r.dataset.s){S=Object.assign(mk(),{tag:S.tag,cfg:S.cfg});skin();save();ui();r.textContent="Borrar";delete r.dataset.s;toast("Progreso borrado")}else{r.dataset.s=1;r.textContent="¿Seguro? Toca otra vez";setTimeout(()=>{r.textContent="Borrar";delete r.dataset.s},3000)}};
let ly=0;addEventListener("scroll",()=>{const y=scrollY,b=$("#bar");if(y>ly+6&&y>80)b.classList.add("hide");else if(y<ly-6)b.classList.remove("hide");ly=y},{passive:true});
setInterval(()=>{if(V=="play"&&G&&!over&&!document.hidden){sec++;gs().sec++;$("#tm").textContent=fm(sec);if(sec%10==0)save()}},1000);
addEventListener("visibilitychange",save);
skin();app();go("home");requestAnimationFrame(pad);
if(!S.tag)setTimeout(()=>$("#tgi").focus(),100);
