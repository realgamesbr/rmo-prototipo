/* ============================================
   Acessibilidade — A+/A-/contraste/skip
   ============================================ */

const A11Y = {
  applyFontSize(size) {
    document.documentElement.classList.remove('fs-large','fs-xlarge');
    if (size === 'large')  document.documentElement.classList.add('fs-large');
    if (size === 'xlarge') document.documentElement.classList.add('fs-xlarge');
    localStorage.setItem('rmo-fs', size);
    document.querySelectorAll('.a11y-tools button[data-fs]').forEach(b => {
      b.classList.toggle('active', b.dataset.fs === size);
    });
  },

  applyContrast(on) {
    document.body.classList.toggle('high-contrast', on);
    localStorage.setItem('rmo-contrast', on ? '1' : '0');
    const btn = document.querySelector('.a11y-tools button[data-contrast]');
    if (btn) btn.classList.toggle('active', on);
  },

  init() {
    // Restaurar
    this.applyFontSize(localStorage.getItem('rmo-fs') || 'normal');
    this.applyContrast(localStorage.getItem('rmo-contrast') === '1');

    document.addEventListener('click', e => {
      const fs = e.target.closest('button[data-fs]');
      if (fs) { this.applyFontSize(fs.dataset.fs); return; }
      const ct = e.target.closest('button[data-contrast]');
      if (ct) { this.applyContrast(!document.body.classList.contains('high-contrast')); return; }
    });
  }
};

document.addEventListener('layoutReady', () => A11Y.init());
