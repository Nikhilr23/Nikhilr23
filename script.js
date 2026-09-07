(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const root = document.documentElement;
  const items = document.querySelectorAll('.reveal');
  let observer;
  if (!reduced.matches && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    items.forEach(item => observer.observe(item));
    document.body.classList.add('motion-enabled');
  }
  reduced.addEventListener('change', () => {
    if (reduced.matches) {
      document.body.classList.remove('motion-enabled');
      if (observer) observer.disconnect();
    }
  });
  let queued = false;
  const update = () => {
    const available = root.scrollHeight - innerHeight;
    root.style.setProperty('--scroll-progress', available > 0 ? Math.min(1, Math.max(0, scrollY / available)) : 0);
    queued = false;
  };
  addEventListener('scroll', () => {
    if (!queued) { queued = true; requestAnimationFrame(update); }
  }, { passive: true });
  addEventListener('resize', update, { passive: true });
  update();
  if ('IntersectionObserver' in window) {
    const links = [...document.querySelectorAll('.nav nav a')];
    const sections = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(link => {
          if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-10% 0px -55% 0px', threshold: 0 });
    document.querySelectorAll('section[id]').forEach(section => sections.observe(section));
  }
})();
