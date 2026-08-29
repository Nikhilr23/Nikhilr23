const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine=matchMedia('(pointer:fine)').matches;
const header=document.querySelector('.site-header');
const progress=document.querySelector('.scroll-progress');
const light=document.querySelector('.cursor-light');

requestAnimationFrame(()=>document.body.classList.add('hero-ready'));

const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
},{threshold:.1,rootMargin:'0px 0px -6% 0px'});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

let ticking=false;
function renderScroll(){
  const max=document.documentElement.scrollHeight-innerHeight;
  if(progress) progress.style.width=`${max?Math.min(100,scrollY/max*100):0}%`;
  if(header) header.classList.toggle('scrolled',scrollY>24);
  if(!reduce){
    document.querySelectorAll('[data-depth]').forEach(el=>{
      const r=el.getBoundingClientRect();
      const depth=Number(el.dataset.depth||0);
      const offset=(innerHeight/2-r.top-r.height/2)*depth;
      el.style.translate=`0 ${Math.max(-34,Math.min(34,offset))}px`;
    });
  }
  ticking=false;
}
function requestScrollRender(){
  if(!ticking){ticking=true;requestAnimationFrame(renderScroll)}
}
addEventListener('scroll',requestScrollRender,{passive:true});
addEventListener('resize',requestScrollRender,{passive:true});
renderScroll();

if(fine&&!reduce&&light){
  let lx=innerWidth*.5,ly=innerHeight*.35,tx=lx,ty=ly,raf=0;
  addEventListener('pointermove',e=>{
    tx=e.clientX;ty=e.clientY;
    if(!raf) raf=requestAnimationFrame(moveLight);
  },{passive:true});
  function moveLight(){
    lx+=(tx-lx)*.18;ly+=(ty-ly)*.18;
    light.style.left=`${lx}px`;light.style.top=`${ly}px`;
    if(Math.abs(tx-lx)+Math.abs(ty-ly)>.5) raf=requestAnimationFrame(moveLight);else raf=0;
  }
}

if(fine&&!reduce){
  document.querySelectorAll('.tilt').forEach(card=>{
    card.addEventListener('pointermove',e=>{
      const r=card.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5;
      const y=(e.clientY-r.top)/r.height-.5;
      card.style.setProperty('--rx',`${y*-2.2}deg`);
      card.style.setProperty('--ry',`${x*2.8}deg`);
    });
    card.addEventListener('pointerleave',()=>{
      card.style.setProperty('--rx','0deg');
      card.style.setProperty('--ry','0deg');
    });
  });

  document.querySelectorAll('.magnetic').forEach(el=>{
    el.addEventListener('pointermove',e=>{
      const r=el.getBoundingClientRect();
      const x=(e.clientX-r.left-r.width/2)*.07;
      const y=(e.clientY-r.top-r.height/2)*.08;
      el.style.transform=`translate3d(${x}px,${y}px,0)`;
    });
    el.addEventListener('pointerleave',()=>{el.style.transform=''});
  });
}
