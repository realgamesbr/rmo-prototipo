/* ============================================
   Components — Header/Footer injection
   Mantém HTML compartilhado em JS pra evitar duplicação.
   ============================================ */

// Detecta profundidade lendo o próprio src do <script src="...components.js">.
// Funciona local (file://, python http.server) e em hospedagem (GitHub Pages, qualquer subpath).
function detectDepth() {
  const scripts = document.getElementsByTagName('script');
  for (let i = 0; i < scripts.length; i++) {
    const src = scripts[i].getAttribute('src') || '';
    if (src.endsWith('components.js')) {
      return (src.match(/\.\.\//g) || []).length;
    }
  }
  return 0;
}
const PATH_DEPTH = detectDepth();
function rel(path) {
  const prefix = PATH_DEPTH === 0 ? './' : '../'.repeat(PATH_DEPTH);
  return prefix + path;
}

const HEADER_HTML = `
<a class="skip-link" href="#main" data-i18n="skip">Pular para o conteúdo</a>

<div class="topbar">
  <div class="container">
    <div class="topbar-tools">
      <span class="label" data-i18n="topbar.lang_label">Idioma</span>
      <div class="lang-switcher" role="group" aria-label="Seletor de idioma">
        <button data-lang="pt" class="active" aria-label="Português">PT</button>
        <button data-lang="en" aria-label="English">EN</button>
        <button data-lang="es" aria-label="Español">ES</button>
      </div>
    </div>
    <div class="topbar-tools">
      <a href="${rel('contato.html')}" data-i18n="topbar.press">Imprensa</a>
      <span class="divider"></span>
      <a href="#newsletter" data-i18n="topbar.newsletter">Newsletter</a>
      <span class="divider"></span>
      <span class="label" data-i18n="topbar.a11y_label">Acessibilidade</span>
      <div class="a11y-tools" role="group" aria-label="Ferramentas de acessibilidade">
        <button data-fs="normal" class="active" aria-label="Tamanho normal">A</button>
        <button data-fs="large" aria-label="Aumentar fonte">A+</button>
        <button data-fs="xlarge" aria-label="Fonte muito grande">A++</button>
        <button data-contrast="toggle" aria-label="Alto contraste" title="Alto contraste">◐</button>
      </div>
    </div>
  </div>
</div>

<header class="site-header" role="banner">
  <div class="container">
    <a class="brand" href="${rel('index.html')}">
      <div class="brand-mark" aria-hidden="true">RMO</div>
      <div class="brand-text">
        <span class="name" data-i18n="brand.name">Rio Museu Olímpico</span>
        <span class="sub" data-i18n="brand.sub">Memória viva dos Jogos Rio 2016</span>
      </div>
    </a>

    <nav class="main-nav" id="mainNav" role="navigation" aria-label="Navegação principal">
      <ul>
        <li>
          <a href="${rel('museu/sobre.html')}" data-i18n="nav.museu">O Museu</a>
          <div class="mega-panel">
            <ul>
              <li><a href="${rel('museu/sobre.html')}" data-i18n="nav.museu_sobre">Sobre o Museu</a></li>
              <li><a href="${rel('museu/missao-visao.html')}" data-i18n="nav.museu_missao">Missão, visão e valores</a></li>
              <li><a href="${rel('museu/historia.html')}" data-i18n="nav.museu_historia">Nossa história</a></li>
              <li><a href="${rel('museu/parceiros.html')}" data-i18n="nav.museu_parceiros">Parceiros e patrocinadores</a></li>
            </ul>
          </div>
        </li>
        <li>
          <a href="${rel('exposicoes/longa-duracao.html')}" data-i18n="nav.exposicoes">Exposições</a>
          <div class="mega-panel">
            <ul>
              <li><a href="${rel('exposicoes/longa-duracao.html')}" data-i18n="nav.exp_longa">Longa duração</a></li>
              <li><a href="${rel('exposicoes/temporarias.html')}" data-i18n="nav.exp_atuais">Temporárias atuais</a></li>
              <li><a href="${rel('exposicoes/temporarias.html#proximas')}" data-i18n="nav.exp_proximas">Próximas</a></li>
              <li><a href="${rel('exposicoes/temporarias.html#anteriores')}" data-i18n="nav.exp_anteriores">Arquivo</a></li>
            </ul>
          </div>
        </li>
        <li>
          <a href="${rel('acervo/index.html')}" data-i18n="nav.acervo">Acervo</a>
          <div class="mega-panel">
            <ul>
              <li><a href="${rel('acervo/index.html')}" data-i18n="nav.acervo_busca">Buscar no acervo</a></li>
              <li><a href="${rel('acervo/index.html#destaques')}" data-i18n="nav.acervo_destaques">Coleções em destaque</a></li>
              <li><a href="${rel('acervo/index.html')}" data-i18n="nav.acervo_banco">Banco de dados completo</a></li>
              <li><a href="${rel('acervo/index.html?tipo=video')}" data-i18n="nav.acervo_depoimentos">Depoimentos Rio 2016</a></li>
            </ul>
          </div>
        </li>
        <li>
          <a href="${rel('programacao/index.html')}" data-i18n="nav.programacao">Programação</a>
          <div class="mega-panel">
            <ul>
              <li><a href="${rel('programacao/index.html')}" data-i18n="nav.prog_agenda">Agenda</a></li>
              <li><a href="${rel('programacao/index.html#educativo')}" data-i18n="nav.prog_educativo">Educativo</a></li>
              <li><a href="${rel('programacao/index.html#visitas')}" data-i18n="nav.prog_visitas">Visitas mediadas</a></li>
              <li><a href="${rel('programacao/index.html#eventos')}" data-i18n="nav.prog_eventos">Eventos especiais</a></li>
            </ul>
          </div>
        </li>
        <li>
          <a href="${rel('visite/index.html')}" data-i18n="nav.visite">Visite</a>
          <div class="mega-panel">
            <ul>
              <li><a href="${rel('visite/horarios-ingressos.html')}" data-i18n="nav.visite_horarios">Horários e ingressos</a></li>
              <li><a href="${rel('visite/como-chegar.html')}" data-i18n="nav.visite_chegar">Como chegar</a></li>
              <li><a href="${rel('visite/index.html#loja')}" data-i18n="nav.visite_loja">Loja</a></li>
              <li><a href="${rel('visite/index.html#politica')}" data-i18n="nav.visite_politica">Política de visitação</a></li>
              <li><a href="${rel('visite/acessibilidade.html')}" data-i18n="nav.visite_acessibilidade">Acessibilidade</a></li>
              <li><a href="${rel('visite/index.html#audioguias')}" data-i18n="nav.visite_audioguias">Audioguias</a></li>
              <li><a href="${rel('visite/horarios-ingressos.html#agendar')}" data-i18n="nav.visite_agendar">Agende sua visita</a></li>
            </ul>
          </div>
        </li>
        <li>
          <a href="${rel('midia/noticias.html')}" data-i18n="nav.midia">Mídia</a>
          <div class="mega-panel">
            <ul>
              <li><a href="${rel('midia/noticias.html')}" data-i18n="nav.midia_noticias">Notícias</a></li>
              <li><a href="${rel('midia/noticias.html#releases')}" data-i18n="nav.midia_releases">Releases</a></li>
              <li><a href="${rel('midia/noticias.html#galeria')}" data-i18n="nav.midia_galeria">Galeria</a></li>
              <li><a href="${rel('midia/noticias.html#instagram')}" data-i18n="nav.midia_instagram">Instagram</a></li>
            </ul>
          </div>
        </li>
        <li>
          <a href="${rel('gestao/index.html')}" data-i18n="nav.gestao">Gestão</a>
          <div class="mega-panel">
            <ul>
              <li><a href="${rel('gestao/index.html#estatuto')}" data-i18n="nav.gestao_estatuto">Estatuto</a></li>
              <li><a href="${rel('gestao/index.html#organograma')}" data-i18n="nav.gestao_organograma">Organograma</a></li>
              <li><a href="${rel('gestao/index.html#conselho')}" data-i18n="nav.gestao_conselho">Conselho</a></li>
              <li><a href="${rel('gestao/index.html#equipe')}" data-i18n="nav.gestao_equipe">A equipe</a></li>
              <li><a href="${rel('gestao/index.html#transparencia')}" data-i18n="nav.gestao_transparencia">Transparência</a></li>
              <li><a href="${rel('gestao/index.html#documentos')}" data-i18n="nav.gestao_documentos">Documentos</a></li>
            </ul>
          </div>
        </li>
        <li>
          <a href="${rel('contato.html')}" data-i18n="nav.contato">Fale Conosco</a>
          <div class="mega-panel">
            <ul>
              <li><a href="${rel('contato.html#atendimento')}" data-i18n="nav.contato_atendimento">Atendimento</a></li>
              <li><a href="${rel('contato.html#imprensa')}" data-i18n="nav.contato_imprensa">Imprensa</a></li>
              <li><a href="${rel('contato.html#faq')}" data-i18n="nav.contato_faq">Dúvidas frequentes</a></li>
              <li><a href="${rel('contato.html#trabalhe')}" data-i18n="nav.contato_trabalhe">Trabalhe conosco</a></li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>

    <div class="header-cta">
      <a class="btn btn-primary btn-sm" href="${rel('visite/horarios-ingressos.html')}">
        <span class="btn-text" data-i18n="topbar.tickets">Comprar ingresso</span>
      </a>
      <button class="mobile-toggle" id="mobileToggle" aria-label="Abrir menu" aria-expanded="false">
        <span></span>
      </button>
    </div>
  </div>
</header>
<div class="menu-backdrop" id="menuBackdrop"></div>
`;

const FOOTER_HTML = `
<footer class="site-footer" role="contentinfo">
  <div class="container">

    <div class="partners-row">
      <h5 data-i18n="footer.partners_title">Realização e Apoio</h5>
      <div class="partners-logos">
        <div class="partner-chip">PREFEITURA RIO</div>
        <div class="partner-chip">COI</div>
        <div class="partner-chip">OLYMPIC MUSEUM</div>
        <div class="partner-chip">COB</div>
        <div class="partner-chip">YDREAMS</div>
        <div class="partner-chip">GLOBO</div>
        <div class="partner-chip">INST. REALIZANDO FUTURO</div>
      </div>
    </div>

    <div class="footer-grid">
      <div class="footer-brand">
        <div class="brand">
          <div class="brand-mark" aria-hidden="true">RMO</div>
          <div class="brand-text">
            <span class="name" data-i18n="brand.name">Rio Museu Olímpico</span>
            <span class="sub" data-i18n="brand.sub">Memória viva dos Jogos Rio 2016</span>
          </div>
        </div>
        <p data-i18n="footer.about_text">Plataforma educativa, social e ambiental que preserva o legado Rio 2016.</p>
      </div>

      <div>
        <h4 data-i18n="footer.section_visit">Visitar</h4>
        <ul>
          <li><a href="${rel('visite/horarios-ingressos.html')}" data-i18n="nav.visite_horarios">Horários e ingressos</a></li>
          <li><a href="${rel('visite/como-chegar.html')}" data-i18n="nav.visite_chegar">Como chegar</a></li>
          <li><a href="${rel('visite/acessibilidade.html')}" data-i18n="nav.visite_acessibilidade">Acessibilidade</a></li>
          <li><a href="${rel('visite/index.html')}" data-i18n="nav.visite_audioguias">Audioguias</a></li>
        </ul>
      </div>

      <div>
        <h4 data-i18n="footer.section_explore">Explorar</h4>
        <ul>
          <li><a href="${rel('exposicoes/longa-duracao.html')}" data-i18n="nav.exp_longa">Longa duração</a></li>
          <li><a href="${rel('exposicoes/temporarias.html')}" data-i18n="nav.exp_atuais">Temporárias</a></li>
          <li><a href="${rel('acervo/index.html')}" data-i18n="nav.acervo">Acervo</a></li>
          <li><a href="${rel('programacao/index.html')}" data-i18n="nav.programacao">Programação</a></li>
        </ul>
      </div>

      <div>
        <h4 data-i18n="footer.section_about">Institucional</h4>
        <ul>
          <li><a href="${rel('museu/sobre.html')}" data-i18n="nav.museu_sobre">Sobre o museu</a></li>
          <li><a href="${rel('gestao/index.html')}" data-i18n="nav.gestao">Gestão</a></li>
          <li><a href="${rel('gestao/index.html#transparencia')}" data-i18n="nav.gestao_transparencia">Transparência</a></li>
          <li><a href="${rel('museu/parceiros.html')}" data-i18n="nav.museu_parceiros">Parceiros</a></li>
        </ul>
      </div>

      <div>
        <h4 data-i18n="footer.section_help">Ajuda</h4>
        <ul>
          <li><a href="${rel('contato.html')}" data-i18n="nav.contato">Fale conosco</a></li>
          <li><a href="${rel('contato.html#faq')}" data-i18n="nav.contato_faq">FAQ</a></li>
          <li><a href="${rel('contato.html#imprensa')}" data-i18n="nav.contato_imprensa">Imprensa</a></li>
          <li><a href="${rel('contato.html#trabalhe')}" data-i18n="nav.contato_trabalhe">Trabalhe conosco</a></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <span data-i18n="footer.rights">© 2026 Rio Museu Olímpico. Todos os direitos reservados.</span>
      <div style="display:flex; gap:1rem; flex-wrap: wrap;">
        <a href="#" data-i18n="footer.privacy">Privacidade</a>
        <a href="#" data-i18n="footer.lgpd">LGPD</a>
        <a href="${rel('visite/acessibilidade.html')}" data-i18n="footer.accessibility">Declaração de Acessibilidade</a>
        <a href="#" data-i18n="footer.sitemap">Mapa do site</a>
      </div>
    </div>
  </div>
</footer>
`;

// Injetar
document.addEventListener('DOMContentLoaded', () => {
  const headerHost = document.getElementById('site-header-host');
  const footerHost = document.getElementById('site-footer-host');
  if (headerHost) headerHost.innerHTML = HEADER_HTML;
  if (footerHost) footerHost.innerHTML = FOOTER_HTML;

  // Marcar item de menu ativo
  const path = window.location.pathname;
  document.querySelectorAll('.main-nav > ul > li > a').forEach(a => {
    const href = a.getAttribute('href') || '';
    const seg = href.split('/').filter(Boolean).pop() || '';
    const cur = path.split('/').filter(Boolean).pop() || '';
    const curDir = path.split('/').filter(Boolean).slice(-2,-1)[0] || '';
    if (href.includes(curDir + '/') && curDir !== 'prototipo' && curDir !== '') {
      a.classList.add('active');
    }
  });

  // Mobile toggle
  const toggle = document.getElementById('mobileToggle');
  const nav = document.getElementById('mainNav');
  const backdrop = document.getElementById('menuBackdrop');
  if (toggle && nav && backdrop) {
    function closeMenu() {
      nav.classList.remove('open');
      backdrop.classList.remove('show');
      toggle.setAttribute('aria-expanded','false');
    }
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      backdrop.classList.toggle('show', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    backdrop.addEventListener('click', closeMenu);
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      if (window.innerWidth <= 1024) closeMenu();
    }));
  }

  // Disparar evento custom pra avisar que header/footer estão prontos
  document.dispatchEvent(new CustomEvent('layoutReady'));
});
