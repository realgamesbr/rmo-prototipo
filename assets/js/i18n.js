/* ============================================
   i18n — sistema de tradução PT/EN/ES
   - lê data-i18n="key.path" e troca textContent
   - carrega JSON via fetch
   - persiste idioma em localStorage
   ============================================ */

const I18N = {
  current: 'pt',
  dict: {},
  loaded: {},

  load(lang) {
    // Lê do window.I18N_DATA (definido em i18n-data.js, carregado antes deste script)
    const data = (window.I18N_DATA && window.I18N_DATA[lang]) || null;
    if (!data) {
      console.error('[i18n] Idioma não encontrado:', lang);
      return;
    }
    this.dict = data;
  },

  getValue(key) {
    return key.split('.').reduce((o,k) => (o && o[k] !== undefined) ? o[k] : null, this.dict);
  },

  apply() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = this.getValue(key);
      if (val !== null) {
        // Se o elemento tem só texto direto, troca textContent. Se tem HTML, preservar children seria ideal,
        // mas como nosso uso aqui é sempre texto puro, textContent é seguro.
        el.textContent = val;
      }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const val = this.getValue(key);
      if (val !== null) el.setAttribute('placeholder', val);
    });
    document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria-label');
      const val = this.getValue(key);
      if (val !== null) el.setAttribute('aria-label', val);
    });
    // Atualizar lang no <html>
    const langMap = { pt: 'pt-BR', en: 'en', es: 'es' };
    document.documentElement.setAttribute('lang', langMap[this.current] || 'pt-BR');
  },

  setLanguage(lang) {
    if (!['pt','en','es'].includes(lang)) lang = 'pt';
    this.current = lang;
    localStorage.setItem('rmo-lang', lang);
    this.load(lang);
    this.apply();
    // marcar botão ativo
    document.querySelectorAll('.lang-switcher button').forEach(b => {
      b.classList.toggle('active', b.dataset.lang === lang);
    });
  },

  init() {
    const saved = localStorage.getItem('rmo-lang') || 'pt';
    this.setLanguage(saved);
    document.addEventListener('click', e => {
      const btn = e.target.closest('.lang-switcher button');
      if (btn && btn.dataset.lang) {
        this.setLanguage(btn.dataset.lang);
      }
    });
  }
};

document.addEventListener('layoutReady', () => I18N.init());
