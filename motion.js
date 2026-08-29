(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(pointer:fine) and (hover:hover)').matches;
  const root = document.documentElement;
  const body = document.body;
  const hero = document.querySelector('.hero');
  const progress = document.querySelector('.scroll-progress');
  const clamp = (n,min,max) => Math.min(max,Math.max(min,n));

  /* Top scan-line progress: transform only, one read batch per frame. */
  let scrollQueued = false;
  const paintScroll = () => {
    const max = Math.max(1, root.scrollHeight - innerHeight);
    root.style.setProperty('--scroll-progress', String(clamp(scrollY / max, 0, 1)));
    scrollQueued = false;
  };
  addEventListener('scroll', () => {
    if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(paintScroll); }
  }, {passive:true});
  addEventListener('resize', paintScroll, {passive:true});
  paintScroll();

  /* Reveal: one observer, one-time, ~80ms stagger within each visual group. */
  const revealItems = [...document.querySelectorAll('.section-intro,.project-story,.domain,.process-grid article,.about-panel,.contact')];
  revealItems.forEach((el,i) => {
    el.classList.add('reveal');
    const parent = el.parentElement;
    const siblings = parent ? [...parent.children].filter(x => revealItems.includes(x)) : [];
    const localIndex = Math.max(0, siblings.indexOf(el));
    el.style.setProperty('--reveal-delay', `${Math.min(localIndex * 80, 320)}ms`);
  });
  if (reduced) revealItems.forEach(el => el.classList.add('visible'));
  else {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      });
    }, {threshold:.15});
    revealItems.forEach(el => revealObserver.observe(el));
  }

  /* Hero headline decrypt: text nodes only, preserving span structure. */
  const headline = document.querySelector('.hero h1');
  if (headline && !reduced) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/{}[]';
    const targets = [...headline.querySelectorAll('span')];
    const originals = targets.map(el => el.textContent);
    const start = performance.now(), duration = 420;
    const scramble = now => {
      const p = clamp((now-start)/duration,0,1);
      targets.forEach((el,idx) => {
        const real = originals[idx];
        const settled = Math.floor(real.length * p);
        let out = '';
        for (let i=0;i<real.length;i++) {
          const c = real[i];
          if (/\s/.test(c) || i < settled) out += c;
          else out += chars[(Math.random()*chars.length)|0];
        }
        el.textContent = out;
      });
      if (p < 1) requestAnimationFrame(scramble);
      else targets.forEach((el,idx) => el.textContent = originals[idx]);
    };
    requestAnimationFrame(scramble);
  }

  /* Stat counters: opt-in via data-count; existing visible numbers are auto-tagged without changing content. */
  const autoStats = [document.querySelector('.noshow-scene strong')].filter(Boolean);
  autoStats.forEach(el => {
    const raw = el.textContent.trim();
    const value = Number(raw.replace(/[^0-9.]/g,''));
    if (Number.isFinite(value)) {
      el.dataset.count = String(value);
      el.dataset.prefix = raw.startsWith('$') ? '$' : '';
      el.dataset.suffix = raw.endsWith('%') ? '%' : '';
      el.dataset.format = raw.includes(',') ? 'comma' : '';
    }
  });
  const counters = [...document.querySelectorAll('[data-count]')];
  const runCounter = el => {
    const end = Number(el.dataset.count || 0);
    const prefix = el.dataset.prefix || '', suffix = el.dataset.suffix || '';
    if (reduced) return;
    const start = performance.now(), duration = 950;
    const tick = now => {
      const p = clamp((now-start)/duration,0,1);
      const eased = 1 - Math.pow(1-p,3);
      const n = Math.round(end*eased);
      el.textContent = prefix + (el.dataset.format==='comma' ? n.toLocaleString() : n) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if (!reduced && counters.length) {
    const counterObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { runCounter(entry.target); counterObserver.unobserve(entry.target); }
    }), {threshold:.35});
    counters.forEach(el => counterObserver.observe(el));
  }

  /* Custom cursor: dot follows pointer, ring lerps in one perpetual rAF only while fine-pointer mode applies. */
  if (finePointer && !reduced) {
    const dot = document.createElement('div'), ring = document.createElement('div');
    dot.className='cursor-dot'; ring.className='cursor-ring';
    body.append(dot,ring);
    let tx=innerWidth/2, ty=innerHeight/2, rx=tx, ry=ty, seen=false;
    addEventListener('pointermove', e => { tx=e.clientX; ty=e.clientY; if(!seen){rx=tx;ry=ty;seen=true;body.classList.add('cursor-on');} }, {passive:true});
    addEventListener('pointerleave', () => body.classList.remove('cursor-on'));
    addEventListener('pointerenter', () => seen && body.classList.add('cursor-on'));
    const cursorFrame = () => {
      rx += (tx-rx)*.16; ry += (ty-ry)*.16;
      dot.style.transform=`translate3d(${tx}px,${ty}px,0)`;
      ring.style.transform=`translate3d(${rx}px,${ry}px,0)`;
      requestAnimationFrame(cursorFrame);
    };
    requestAnimationFrame(cursorFrame);
    document.querySelectorAll('a,button,[role="button"],input,textarea,select,.project-story').forEach(el => {
      el.addEventListener('pointerenter',()=>body.classList.add('cursor-interactive'));
      el.addEventListener('pointerleave',()=>body.classList.remove('cursor-interactive'));
    });
  }

  /* Project tilt: max 6deg; rect read only on enter/resize, transform writes on rAF. */
  if (finePointer && !reduced) {
    document.querySelectorAll('.project-story').forEach(card => {
      let rect=null, queued=false, px=0, py=0;
      card.classList.add('tilt');
      const measure=()=>{rect=card.getBoundingClientRect()};
      card.addEventListener('pointerenter',()=>{card.classList.remove('tilt-reset');measure()});
      card.addEventListener('pointermove',e=>{
        if(!rect) measure(); px=e.clientX;py=e.clientY;
        if(!queued){queued=true;requestAnimationFrame(()=>{
          const x=clamp((px-rect.left)/rect.width,-0.2,1.2)-.5;
          const y=clamp((py-rect.top)/rect.height,-0.2,1.2)-.5;
          card.style.setProperty('--rx',`${(-y*12).toFixed(2)}deg`);
          card.style.setProperty('--ry',`${(x*12).toFixed(2)}deg`);
          queued=false;
        })}
      },{passive:true});
      card.addEventListener('pointerleave',()=>{card.classList.add('tilt-reset');card.style.setProperty('--rx','0deg');card.style.setProperty('--ry','0deg');rect=null});
    });
  }

  /* Signature signal: heartbeat at idle; pointer proximity adds a scan/oscilloscope disturbance. */
  if (hero && !reduced) {
    hero.insertAdjacentHTML('afterbegin', `<svg class="hero-signal" viewBox="0 0 1200 300" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="signalGradient" x1="0" x2="1"><stop offset="0" stop-color="#82adff" stop-opacity=".05"/><stop offset=".46" stop-color="#70f5b5"/><stop offset="1" stop-color="#82adff" stop-opacity=".08"/></linearGradient></defs><path class="signal-base" d="M0 150H1200"/><path class="signal-scan" d="M0 150H1200"/><path class="signal-live"/></svg>`);
    const svg=hero.querySelector('.hero-signal'), path=svg.querySelector('.signal-live');
    let mx=.5,my=.5,targetInfluence=0,influence=0,lastPointer=0;
    hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect();mx=clamp((e.clientX-r.left)/r.width,0,1);my=clamp((e.clientY-r.top)/r.height,0,1);targetInfluence=finePointer?1:0;lastPointer=performance.now()},{passive:true});
    hero.addEventListener('pointerleave',()=>targetInfluence=0);
    const signalFrame = now => {
      if(now-lastPointer>900) targetInfluence=0;
      influence += (targetInfluence-influence)*.055;
      const points=[], center=150, scanX=mx*1200;
      for(let x=0;x<=1200;x+=8){
        const phase=(x/1200)*Math.PI*10 - now*.0021;
        let y=center + Math.sin(phase)*1.8;
        const beat=((x + now*.085)%360);
        if(beat>154&&beat<164)y-=10*(1-Math.abs(beat-159)/5);
        if(beat>=164&&beat<174)y+=34*(1-Math.abs(beat-169)/5);
        if(beat>=174&&beat<186)y-=62*(1-Math.abs(beat-180)/6);
        if(beat>=186&&beat<200)y+=18*(1-Math.abs(beat-193)/7);
        const dist=(x-scanX)/155, envelope=Math.exp(-dist*dist);
        y += influence*envelope*(Math.sin((x-scanX)*.11 + now*.018)*12 + (my-.5)*34);
        points.push(`${x===0?'M':'L'}${x.toFixed(1)} ${y.toFixed(1)}`);
      }
      path.setAttribute('d',points.join(' '));
      requestAnimationFrame(signalFrame);
    };
    requestAnimationFrame(signalFrame);
  }
})();
