const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine=matchMedia('(pointer:fine)').matches;
const header=document.querySelector('.site-header');
const progress=document.querySelector('.scroll-progress');
const light=document.querySelector('.cursor-light');
const hero=document.querySelector('.hero');
const portrait=document.querySelector('.portrait-frame');

requestAnimationFrame(()=>document.body.classList.add('hero-ready'));

const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}
  });
},{threshold:.1,rootMargin:'0px 0px -7% 0px'});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

let ticking=false;
function renderScroll(){
  const max=document.documentElement.scrollHeight-innerHeight;
  const p=max?Math.min(1,scrollY/max):0;
  if(progress)progress.style.width=`${p*100}%`;
  if(header)header.classList.toggle('scrolled',scrollY>28);
  document.documentElement.style.setProperty('--page-progress',p.toFixed(4));
  if(!reduce){
    document.querySelectorAll('[data-depth]').forEach(el=>{
      const r=el.getBoundingClientRect(),depth=Number(el.dataset.depth||0);
      const offset=Math.max(-30,Math.min(30,(innerHeight/2-r.top-r.height/2)*depth));
      el.style.translate=`0 ${offset}px`;
    });
    document.querySelectorAll('.project-scene').forEach(scene=>{
      const r=scene.getBoundingClientRect();
      const local=Math.max(-1,Math.min(1,(innerHeight/2-r.top-r.height/2)/innerHeight));
      scene.style.setProperty('--scene-shift',`${local*12}px`);
    });
  }
  ticking=false;
}
function requestScrollRender(){if(!ticking){ticking=true;requestAnimationFrame(renderScroll)}}
addEventListener('scroll',requestScrollRender,{passive:true});
addEventListener('resize',requestScrollRender,{passive:true});
renderScroll();

if(fine&&!reduce&&light){
  let lx=innerWidth*.5,ly=innerHeight*.35,tx=lx,ty=ly,raf=0;
  function moveLight(){lx+=(tx-lx)*.14;ly+=(ty-ly)*.14;light.style.left=`${lx}px`;light.style.top=`${ly}px`;if(Math.abs(tx-lx)+Math.abs(ty-ly)>.5)raf=requestAnimationFrame(moveLight);else raf=0}
  addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY;if(!raf)raf=requestAnimationFrame(moveLight)},{passive:true});
}

if(fine&&!reduce){
  document.querySelectorAll('.tilt').forEach(card=>{
    card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.setProperty('--rx',`${y*-1.6}deg`);card.style.setProperty('--ry',`${x*2.1}deg`);card.style.setProperty('--mx',`${(x+.5)*100}%`);card.style.setProperty('--my',`${(y+.5)*100}%`)});
    card.addEventListener('pointerleave',()=>{card.style.setProperty('--rx','0deg');card.style.setProperty('--ry','0deg')});
  });
  document.querySelectorAll('.magnetic').forEach(el=>{
    el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left-r.width/2)*.055,y=(e.clientY-r.top-r.height/2)*.065;el.style.transform=`translate3d(${x}px,${y}px,0)`});
    el.addEventListener('pointerleave',()=>el.style.transform='');
  });
  if(hero&&portrait){
    hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;portrait.style.setProperty('--portrait-x',`${x*7}px`);portrait.style.setProperty('--portrait-y',`${y*7}px`);portrait.style.setProperty('--portrait-rx',`${y*-1.4}deg`);portrait.style.setProperty('--portrait-ry',`${x*1.8}deg`)});
    hero.addEventListener('pointerleave',()=>{portrait.style.setProperty('--portrait-x','0px');portrait.style.setProperty('--portrait-y','0px');portrait.style.setProperty('--portrait-rx','0deg');portrait.style.setProperty('--portrait-ry','0deg')});
  }
}
