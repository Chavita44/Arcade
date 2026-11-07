const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const K="c33arcade",fm=s=>String(s/60|0).padStart(2,"0")+":"+String(s%60).padStart(2,"0");
let S={w:0,p:0,sec:0,st:0,best:{},last:null,dot:0,cfg:{}};
try{S=Object.assign(S,JSON.parse(localStorage.getItem(K)||"{}"))}catch(e){}
S.cfg=Object.assign({th:"dark",bar:"accent",nm:0,inf:0,n:8},S.cfg);
const save=()=>{try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}};
const ic=d=>`<svg class="ic" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${d}"/></svg>`;
const N=[["home","Inicio","M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10"],["games","Juegos","M6 8h12a4 4 0 0 1 4 4v2a3 3 0 0 1-5.2 2L15 14H9l-1.8 2A3 3 0 0 1 2 14v-2a4 4 0 0 1 4-4zM7 11v3M5.5 12.5h3M16 12h.01M18 13.5h.01"],["play","Jugar","M7 4l13 8-13 8z"],["stats","Stats","M5 20V10M12 20V4M19 20v-7"],["set","Ajustes","M4 7h10M18 7h2M4 17h2M10 17h10M16 4v6M8 14v6"]];
const GM=[{t:"Gatodoku",s:"Puzzle · 1 jugador",c:"linear-gradient(90deg,#43b8b8 25%,#c4668a 0 50%,#a8e293 0 75%,#dfb23f 0)",on:1},{t:"Memoria Neón",s:"Próximamente",c:"linear-gradient(135deg,#2b4634,#728156)"},{t:"Culebrita Retro",s:"Próximamente",c:"linear-gradient(135deg,#728156,#B6C99B)"}];
const card=g=>`<button class="gc" ${g.on?'data-v="play"':"data-soon"}><div class="cov" style="background:${g.c}">${g.on?'<svg><use href="#cat"/></svg>':ic("M6 11h12v9H6zM8 11V8a4 4 0 0 1 8 0v3")}</div><div class="t">${g.t}<small>${g.s}</small></div></button>`;
const barH=pv=>{const t=pv?"span":"button";return `<${t} class="lb lg b" ${pv?"":'data-v="home" aria-label="Inicio"'}></${t}>`+N.map((n,i)=>`<${t} class="nb${pv&&!i?" on":""}${pv&&n[0]=="stats"?" dt":""}" ${pv?"":`data-v="${n[0]}"`}>${ic(n[2])}<span>${n[1]}</span></${t}>`).join("")};
$("#side").innerHTML='<i class="lg b"></i>'+N.map(n=>`<button class="sb" data-v="${n[0]}" title="${n[1]}" aria-label="${n[1]}">${ic(n[2])}</button>`).join("");
$("#bar").innerHTML=barH(0);
$("#r1").innerHTML=$("#r2").innerHTML=GM.map(card).join("");
$(".sr").insertAdjacentHTML("afterbegin",ic("M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-5-5"));
$("#pvs").innerHTML=[["light","Clara"],["accent","Acento"],["dark","Oscura"]].map(([k,t])=>`<div class="pw" data-b="${k}" tabindex="0" role="button" aria-label="Barra ${t}"><small>${t}</small><div class="bar pv" data-b="${k}">${barH(1)}</div></div>`).join("");

let V="home",G=0,n=S.cfg.n,R,sol,C,lives,sec,over,cr=0,cc=0,tt;
function app(){const c=S.cfg;document.documentElement.dataset.theme=c.th;$("#bar").dataset.b=c.bar;document.body.classList.toggle("nums",!!c.nm);
$$(".seg[data-k]").forEach(s=>[...s.children].forEach(b=>b.classList.toggle("on",String(c[s.dataset.k]||0)==b.dataset.x)));
$$(".pw").forEach(p=>p.classList.toggle("sel",p.dataset.b==c.bar))}
function ui(){const h=new Date().getHours();
$("#hi").innerHTML=`${h<6||h>=19?"Buenas noches":h<12?"Buenos días":"Buenas tardes"}, <span>Chavita33</span>`;
const tot=S.sec,t=tot>=3600?`${tot/3600|0}h ${tot%3600/60|0}m`:`${tot/60|0}m`,b=S.best[8];
const sh=`<h3 class="st">Tus estadísticas</h3><div class="ring" style="--p:${S.w%5*20}"><div><small>Tiempo total</small><b>${t}</b><small>Nivel ${1+(S.w/5|0)}</small></div></div><div class="tiles"><div class="tile"><b>${S.w}</b><small>Victorias</small></div><div class="tile"><b>${b?fm(b):"--"}</b><small>Mejor 8×8</small></div><div class="tile"><b>${S.st}</b><small>Racha</small></div></div>`;
$("#sp").innerHTML=$("#sp2").innerHTML=sh;
const L=S.last;$("#last").innerHTML=L?`<div class="lb2"><svg><use href="#cat"/></svg></div><div class="lm"><b>Gatodoku ${L.n}×${L.n}</b><small>${L.ok?"Ganada":"Sin vidas"} · ${fm(L.s)}</small></div><button class="btn" data-v="play">Otra vez</button>`:`<div class="lm"><b>Aún no hay partidas</b><small>Empieza con Gatodoku.</small></div><button class="btn" data-v="play">Jugar</button>`;
document.body.classList.toggle("nd",!!S.dot)}
function go(v){V=v;$("#win").hidden=true;if(v=="stats"){S.dot=0;save()}
$$(".view").forEach(e=>e.classList.toggle("on",e.id=="v-"+v));
$$(".sb,#bar .nb").forEach(e=>e.classList.toggle("on",e.dataset.v==v));
ui();if(v=="play"&&!G)newG();scrollTo(0,0);$("#bar").classList.remove("hide")}
function toast(m){const e=$("#toast");e.textContent=m;e.classList.add("on");clearTimeout(tt);tt=setTimeout(()=>e.classList.remove("on"),1900)}

/* ---- Gatodoku ---- */
const COL=["#43b8b8","#a8c0dc","#c4668a","#9b7ed6","#a8e293","#5bb0e6","#dfb23f","#e6a1bb","#f08c6a","#8fb36b"];
const shuf=a=>{for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
function rsol(n){const s=[],u=Array(n).fill(0);const go=r=>{if(r==n)return 1;for(const c of shuf([...Array(n).keys()])){if(u[c]||(r&&Math.abs(c-s[r-1])<2))continue;u[c]=1;s[r]=c;if(go(r+1))return 1;u[c]=0}return 0};go(0);return s}
function grow(n,s){const R=Array.from({length:n},()=>Array(n).fill(-1));s.forEach((c,r)=>R[r][c]=r);
for(let k=n*n-n;k>0;k--){const f=[];
for(let r=0;r<n;r++)for(let c=0;c<n;c++)if(R[r][c]<0)for(const[a,b]of[[1,0],[-1,0],[0,1],[0,-1]]){const g=(R[r+a]||[])[c+b];if(g>=0)f.push([r,c,g])}
const[r,c,g]=f[Math.random()*f.length|0];R[r][c]=g}
return R}
function cnt(R,n){let k=0;const cu=Array(n).fill(0),ru=Array(n).fill(0);
const go=(r,pc)=>{if(r==n){k++;return}for(let c=0;c<n&&k<2;c++){const g=R[r][c];if(cu[c]||ru[g]||Math.abs(c-pc)<2)continue;cu[c]=ru[g]=1;go(r+1,c);cu[c]=ru[g]=0}};
go(0,-9);return k}
function gen(n){const t=performance.now();let s,R;do{s=rsol(n);R=grow(n,s)}while(cnt(R,n)!=1&&performance.now()-t<400);return{R,s}}
function newG(k){if(k)n=k;S.cfg.n=n;const g=gen(n);R=g.R;sol=g.s;const pal=shuf(COL.slice());
C=Array(n).fill(-1);lives=3;sec=0;over=0;cr=cc=0;G=1;
const b=$("#board");b.style.setProperty("--n",n);
b.innerHTML=R.map((row,r)=>row.map((g,c)=>`<div class="cell" data-r="${r}" data-c="${c}" data-g="${g+1}" style="--rc:${pal[g]}" role="gridcell" aria-label="Fila ${r+1}, columna ${c+1}"><svg><use href="#cat"/></svg></div>`).join("")).join("");
$$("#sz button").forEach(e=>e.classList.toggle("on",+e.dataset.n==n));$("#win").hidden=true;hud();save()}
function hud(){$("#cnt").textContent=C.filter(x=>x>=0).length+"/"+n;
$("#hp").innerHTML=[0,1,2].map(i=>`<svg class="hr${i<lives?"":" x"}"><use href="#ht"/></svg>`).join("");$("#tm").textContent=fm(sec);
[...$("#board").children].forEach((e,i)=>{const r=i/n|0,c=i%n;e.classList.toggle("cat",C[r]==c);e.classList.toggle("cur",r==cr&&c==cc)})}
function why(r,c){if(C[r]>=0&&C[r]!=c)return"Ya hay un gato en esa fila";
for(let i=0;i<n;i++){if(i==r||C[i]<0)continue;
if(Math.abs(i-r)<2&&Math.abs(C[i]-c)<2)return"Los gatos no pueden tocarse";
if(C[i]==c)return"Ya hay un gato en esa columna";
if(R[i][C[i]]==R[r][c])return"Ya hay un gato en esa zona de color"}
return""}
function tap(r,c){if(over)return;cr=r;cc=c;
if(C[r]==c){C[r]=-1;hud();return}
const w=why(r,c);
if(w){if(!S.cfg.inf)lives--;const e=$("#board").children[r*n+c];e.classList.remove("bad");void e.offsetWidth;e.classList.add("bad");toast(w);hud();if(!lives)end(0);return}
C[r]=c;hud();if(C.every(x=>x>=0))end(1)}
function end(ok){over=1;S.p++;let nb=0;
if(ok){S.w++;S.st++;if(!S.best[n]||sec<S.best[n]){S.best[n]=sec;nb=1}}else S.st=0;
S.last={n,s:sec,ok};S.dot=1;save();ui();
$("#wt").textContent=ok?"¡Ganaste!":"¡Sin vidas!";
$("#wd").textContent=ok?`Tiempo ${fm(sec)}${nb?" · ¡Nuevo récord!":""}`:"Inténtalo de nuevo, tú puedes.";
$("#win").hidden=false;$("#again").focus()}
function hint(){if(over)return;for(let r=0;r<n;r++)if(C[r]<0&&!why(r,sol[r])){cr=r;cc=sol[r];hud();const e=$("#board").children[r*n+cc];e.classList.add("hint");setTimeout(()=>e.classList.remove("hint"),2300);return}
toast("Revisa tus gatos: alguno está mal ubicado")}

/* ---- Controles ---- */
function act(k,pad){document.body.classList.add("kb");
if(!$("#win").hidden){if(k=="A")newG();else if(k=="B")go("home");return}
if(V!="play"){if(!pad)return;const i=N.findIndex(x=>x[0]==V);if(k=="L")go(N[(i+4)%5][0]);else if(k=="R")go(N[(i+1)%5][0]);else if(k=="A"&&V!="set")go("play");return}
if(k=="u")cr=(cr+n-1)%n;else if(k=="d")cr=(cr+1)%n;else if(k=="l")cc=(cc+n-1)%n;else if(k=="r")cc=(cc+1)%n;
else if(k=="A")return tap(cr,cc);else if(k=="X")return hint();else if(k=="Y")return newG();else if(k=="B")return go("home");
hud()}
const KM={ArrowUp:"u",ArrowDown:"d",ArrowLeft:"l",ArrowRight:"r",Enter:"A"," ":"A",Escape:"B",h:"X",n:"Y",w:"u",s:"d",a:"l",d:"r"};
addEventListener("keydown",e=>{if(e.target.matches("input")||e.ctrlKey||e.metaKey||e.altKey)return;const k=KM[e.key];
if(!k||(V!="play"&&$("#win").hidden))return;
if(e.target.closest("button")&&(e.key=="Enter"||e.key==" "))return;
e.preventDefault();act(k)});
const pv={},MV="udlr";
function pad(t){const g=[...(navigator.getGamepads?navigator.getGamepads():[])].find(Boolean);
if(g){const b=i=>g.buttons[i]&&g.buttons[i].pressed,a=g.axes;
const st={u:b(12)||a[1]<-.6,d:b(13)||a[1]>.6,l:b(14)||a[0]<-.6,r:b(15)||a[0]>.6,A:b(0),B:b(1),X:b(2),Y:b(3),L:b(4),R:b(5)};
for(const k in st){if(st[k]){if(!pv[k]||(MV.includes(k)&&t-pv[k]>170)){act(k,1);pv[k]=t}}else pv[k]=0}}
requestAnimationFrame(pad)}
addEventListener("gamepadconnected",()=>toast("Mando conectado"));
addEventListener("pointerdown",()=>document.body.classList.remove("kb"));

/* ---- Eventos ---- */
document.addEventListener("click",e=>{const b=e.target.closest("[data-v]");
if(b&&!b.closest(".pv"))go(b.dataset.v);else if(e.target.closest("[data-soon]"))toast("Próximamente, vuelve pronto");
if(e.target.closest(".ac .btn"))e.target.closest("button").blur()});
$("#board").onclick=e=>{const c=e.target.closest(".cell");if(c)tap(+c.dataset.r,+c.dataset.c)};
$("#sz").onclick=e=>{const b=e.target.closest("button");if(b)newG(+b.dataset.n)};
$("#nw").onclick=()=>newG();$("#again").onclick=()=>newG();$("#ht").onclick=hint;
$("#un").onclick=()=>{C.fill(-1);lives=3;sec=0;over=0;hud()};
$("#q").oninput=()=>{if(V!="home"&&V!="games")go("games");const v=$("#q").value.trim().toLowerCase();$$(".gc").forEach(e=>e.hidden=!e.textContent.toLowerCase().includes(v))};
$("#v-set").onclick=e=>{const b=e.target.closest(".seg button");if(!b)return;const x=b.dataset.x;S.cfg[b.parentNode.dataset.k]=isNaN(x)?x:+x;save();app()};
$("#pvs").onclick=e=>{const p=e.target.closest(".pw");if(p){S.cfg.bar=p.dataset.b;save();app()}};
$("#pvs").onkeydown=e=>{if(e.key=="Enter"||e.key==" "){e.preventDefault();e.target.click()}};
$("#rs").onclick=()=>{const r=$("#rs");if(r.dataset.s){S.w=S.p=S.sec=S.st=0;S.best={};S.last=null;save();ui();r.textContent="Borrar";delete r.dataset.s;toast("Progreso borrado")}else{r.dataset.s=1;r.textContent="¿Seguro? Toca otra vez";setTimeout(()=>{r.textContent="Borrar";delete r.dataset.s},3000)}};
let ly=0;addEventListener("scroll",()=>{const y=scrollY,b=$("#bar");if(y>ly+6&&y>80)b.classList.add("hide");else if(y<ly-6)b.classList.remove("hide");ly=y},{passive:true});
setInterval(()=>{if(V=="play"&&G&&!over&&!document.hidden){sec++;S.sec++;$("#tm").textContent=fm(sec);if(S.sec%10==0)save()}},1000);
addEventListener("visibilitychange",save);
app();go("home");requestAnimationFrame(pad);
