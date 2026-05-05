/* ============================================
   Acervo mock — gera grid de itens fake imitando Tainacan
   ============================================ */

const ACERVO_MOCK = [
  { id:'tocha-olimpica', titulo:'Tocha Olímpica Rio 2016', tipo:'objeto', categoria:'Cerimônias', ano:2016, autor:'Chelles & Hayashi Design', cor:'#e8112d', desc:'Tocha desenhada em alumínio reciclado com mecanismo de expansão telescópica.' },
  { id:'medalha-ouro',   titulo:'Medalha de Ouro Rio 2016', tipo:'objeto', categoria:'Premiação', ano:2016, autor:'Casa da Moeda do Brasil', cor:'#ffb612', desc:'Medalha de ouro produzida com padrões sustentáveis e prata reciclada.' },
  { id:'uniforme-jud',   titulo:'Quimono de Rafaela Silva', tipo:'objeto', categoria:'Vestuário', ano:2016, autor:'CBJ', cor:'#0085c7', desc:'Quimono utilizado pela judoca na conquista do ouro nos -57 kg.' },
  { id:'vid-cerimonia',  titulo:'Cerimônia de Abertura — Rio 2016', tipo:'video', categoria:'Cerimônias', ano:2016, autor:'COB / Globo', cor:'#0a3161', desc:'Highlights da cerimônia de abertura no Estádio do Maracanã.' },
  { id:'foto-mascote',   titulo:'Vinicius e Tom — mascotes', tipo:'foto', categoria:'Mascotes', ano:2016, autor:'Birdo Studio', cor:'#009a44', desc:'Apresentação oficial dos mascotes olímpico e paralímpico.' },
  { id:'doc-relatorio',  titulo:'Relatório de Sustentabilidade Rio 2016', tipo:'documento', categoria:'Documentos', ano:2017, autor:'Comitê Rio 2016', cor:'#6b7280', desc:'Documento oficial sobre o legado ambiental dos Jogos.' },
  { id:'dep-bebeto',     titulo:'Depoimento — Daiane dos Santos', tipo:'video', categoria:'Depoimentos', ano:2024, autor:'Acervo RMO', cor:'#df0024', desc:'Memórias da ex-ginasta sobre o Rio 2016 e o legado para o esporte.' },
  { id:'plano-velo',     titulo:'Planta arquitetônica — Velódromo', tipo:'documento', categoria:'Arquitetura', ano:2014, autor:'Tetra Arquitetos', cor:'#0a2540', desc:'Projeto executivo do Velódromo do Parque Olímpico.' },
  { id:'foto-tocha',     titulo:'Revezamento da tocha em Brasília', tipo:'foto', categoria:'Cerimônias', ano:2016, autor:'Rio 2016 / Fernando Soutello', cor:'#f47920', desc:'Passagem da tocha olímpica pela Esplanada dos Ministérios.' },
  { id:'uni-volei',      titulo:'Uniforme Vôlei Feminino', tipo:'objeto', categoria:'Vestuário', ano:2016, autor:'Olympikus', cor:'#fcd116', desc:'Uniforme oficial usado pela seleção brasileira de vôlei.' },
  { id:'audio-hino',     titulo:'Execução do hino — Pódio', tipo:'audio', categoria:'Áudios', ano:2016, autor:'Acervo COB', cor:'#0085c7', desc:'Hino nacional executado em premiação nos Jogos.' },
  { id:'foto-paral',     titulo:'Daniel Dias na Piscina Olímpica', tipo:'foto', categoria:'Paralímpicos', ano:2016, autor:'CPB', cor:'#009a44', desc:'Conquista de medalha do nadador paralímpico.' },
  { id:'doc-decreto',    titulo:'Decreto de criação do RMO', tipo:'documento', categoria:'Institucional', ano:2024, autor:'Prefeitura RJ', cor:'#0a2540', desc:'Decreto municipal que institui o Rio Museu Olímpico.' },
  { id:'vid-aros',       titulo:'Aros olímpicos no Pão de Açúcar', tipo:'video', categoria:'Cerimônias', ano:2016, autor:'COI', cor:'#df0024', desc:'Instalação dos aros olímpicos durante os Jogos.' },
  { id:'foto-cerim-pa',  titulo:'Cerimônia Paralímpica de Abertura', tipo:'foto', categoria:'Paralímpicos', ano:2016, autor:'CPB / Roberto Castro', cor:'#f47920', desc:'Abertura dos Jogos Paralímpicos no Maracanã.' },
];

function renderAcervo(items) {
  const grid = document.getElementById('acervoGrid');
  if (!grid) return;
  if (items.length === 0) {
    grid.innerHTML = '<div class="empty-state" style="grid-column: 1/-1;"><h3>Nenhum item encontrado</h3><p>Tente ajustar os filtros ou a busca.</p></div>';
    return;
  }
  grid.innerHTML = items.map(it => `
    <a href="objeto-tocha-olimpica.html" class="acervo-item">
      <div class="acervo-thumb" style="background: linear-gradient(135deg, ${it.cor}, ${shade(it.cor,-30)});">
        <span class="type-badge">${it.tipo.toUpperCase()}</span>
      </div>
      <div class="acervo-item-body">
        <h4>${it.titulo}</h4>
        <div class="meta">${it.categoria} · ${it.ano}</div>
      </div>
    </a>
  `).join('');
}

function shade(hex, amt) {
  const h = hex.replace('#','');
  const r = Math.max(0, Math.min(255, parseInt(h.slice(0,2),16) + amt));
  const g = Math.max(0, Math.min(255, parseInt(h.slice(2,4),16) + amt));
  const b = Math.max(0, Math.min(255, parseInt(h.slice(4,6),16) + amt));
  return '#' + [r,g,b].map(v => v.toString(16).padStart(2,'0')).join('');
}

function applyFilters() {
  const q = (document.getElementById('acervoSearch')?.value || '').toLowerCase();
  const tipos = Array.from(document.querySelectorAll('input[name="tipo"]:checked')).map(i => i.value);
  const cats  = Array.from(document.querySelectorAll('input[name="categoria"]:checked')).map(i => i.value);
  let items = ACERVO_MOCK.filter(it => {
    if (tipos.length && !tipos.includes(it.tipo)) return false;
    if (cats.length  && !cats.includes(it.categoria)) return false;
    if (q && !(it.titulo + ' ' + it.desc).toLowerCase().includes(q)) return false;
    return true;
  });
  renderAcervo(items);
  const counter = document.getElementById('acervoCount');
  if (counter) counter.textContent = items.length;
}

document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('acervoGrid')) return;
  renderAcervo(ACERVO_MOCK);
  const counter = document.getElementById('acervoCount');
  if (counter) counter.textContent = ACERVO_MOCK.length;
  document.querySelectorAll('input[name="tipo"], input[name="categoria"]').forEach(i => i.addEventListener('change', applyFilters));
  const search = document.getElementById('acervoSearch');
  if (search) search.addEventListener('input', applyFilters);

  // Suporte a ?tipo=video na URL
  const params = new URLSearchParams(window.location.search);
  const tipo = params.get('tipo');
  if (tipo) {
    const cb = document.querySelector(`input[name="tipo"][value="${tipo}"]`);
    if (cb) { cb.checked = true; applyFilters(); }
  }
});
