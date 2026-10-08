/* Framework-independent progressive enhancement, reusable in a Hugo template.
   Content stays visible with no JavaScript. Motion runs once, never in a loop. */
(() => {
  function start() {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches || !('IntersectionObserver' in window) || !Element.prototype.animate) return;
    const running = new Set();
    function animate(element, frames, options = {}) {
      const animation = element.animate(frames, {
        duration: 650,
        easing: 'cubic-bezier(.22, 1, .36, 1)',
        fill: 'backwards',
        ...options,
      });
      running.add(animation);
      animation.onfinish = animation.oncancel = () => running.delete(animation);
    }
    const observer = new IntersectionObserver(entries => {
      let stagger = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target;
        observer.unobserve(element);
        if (preference.matches) continue;
        if (element.matches('.ecosystem-connections path')) {
          const length = element.getTotalLength();
          animate(element, [
            { strokeDasharray: `${length} ${length}`, strokeDashoffset: length, opacity: .2 },
            { strokeDasharray: `${length} ${length}`, strokeDashoffset: 0, opacity: 1 },
          ], { duration: 1100 });
        } else if (element.matches('.evidence-bar-track > span')) {
          animate(element, [
            { transform: 'scaleX(.25)', transformOrigin: 'left center' },
            { transform: 'scaleX(1)', transformOrigin: 'left center' },
          ], { duration: 850 });
        } else if (element.matches('.dataverse-rings')) {
          animate(element, [
            { transform: 'rotate(-35deg)', opacity: .4 },
            { transform: 'rotate(0deg)', opacity: 1 },
          ], { duration: 950 });
        } else {
          animate(element, [
            { translate: '0 18px' },
            { translate: '0 0' },
          ], { duration: 750, delay: (stagger++ % 4) * 65 });
        }
      }
    }, { threshold: .08 });
    const selectors = [
      '.hero-poster', '.verified-stats', '.model-grid', '.ecosystem-map-panel',
      '.number-figure', '.reach-path > div', '.citation-ledger', '.path-grid',
      '.roadmap-theme-grid article', '.release-chart-scroll',
      '.partner-grid li',
      '.ecosystem-connections path', '.evidence-bar-track > span', '.dataverse-rings',
    ];
    document.querySelectorAll(selectors.join(',')).forEach(element => observer.observe(element));
    preference.addEventListener('change', event => {
      if (!event.matches) return;
      observer.disconnect();
      for (const animation of running) animation.cancel();
    });
    window.addEventListener('pagehide', () => {
      observer.disconnect();
      for (const animation of running) animation.cancel();
    }, { once: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
