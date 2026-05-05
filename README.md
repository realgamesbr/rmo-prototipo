# Protótipo — Rio Museu Olímpico

Protótipo navegável estático (HTML/CSS/JS puro) do novo site do Rio Museu Olímpico.

## Como abrir

**Opção 1 — Servidor local (recomendado, mais rápido):**

```bash
cd "D:\Claude\projetos\YD site museu IBRAM\prototipo"
python -m http.server 8000
```

Abra no navegador: <http://localhost:8000/>

**Opção 2 — Direto no navegador:**

Dê duplo clique em `index.html`. Funciona em Chrome, Firefox, Edge e Safari modernos.
(O i18n usa dados embedados em JS, então não precisa de servidor HTTP.)

## Páginas (17 telas)

| Caminho | Página |
|---|---|
| `index.html` | Home |
| `museu/sobre.html` | Sobre o Museu |
| `museu/missao-visao.html` | Missão, visão e valores |
| `museu/historia.html` | Linha do tempo |
| `museu/parceiros.html` | Parceiros e patrocinadores |
| `exposicoes/longa-duracao.html` | 13 núcleos da exposição |
| `exposicoes/temporarias.html` | Temporárias (atuais, próximas, anteriores) |
| `exposicoes/nucleo-os-jogos.html` | Detalhe de um núcleo (modelo) |
| `acervo/index.html` | Grid + filtros (mock Tainacan) |
| `acervo/objeto-tocha-olimpica.html` | Ficha de objeto (modelo) |
| `programacao/index.html` | Agenda + educativo + visitas |
| `visite/index.html` | Visite (agregador) |
| `visite/horarios-ingressos.html` | Horários, valores, canais de venda |
| `visite/como-chegar.html` | Endereço + transporte |
| `visite/acessibilidade.html` | Recursos de acessibilidade |
| `midia/noticias.html` | Notícias + releases + galeria + Instagram |
| `gestao/index.html` | Gestão, conselho, equipe, transparência, documentos |
| `contato.html` | Formulário + canais + FAQ (10 perguntas) |

## Funcionalidades demonstradas

### Idiomas (PT / EN / ES)
- Botões PT / EN / ES no topo direito da topbar.
- Troca títulos do header, menus, footer e blocos com `data-i18n`.
- Preferência salva em `localStorage` (`rmo-lang`).
- Para acrescentar idioma: editar `assets/i18n/{pt,en,es}.json`, regerar `assets/js/i18n-data.js`.

### Acessibilidade
- **A / A+ / A++** — três níveis de tamanho de fonte. Aplica `fs-large` ou `fs-xlarge` no `<html>`.
- **◐ Alto contraste** — paleta amarelo/preto pra leitura WCAG AAA. Aplica `body.high-contrast` (CSS variables sobrescritas em `tokens.css`).
- **Skip link** — Tab no início da página revela "Pular para o conteúdo".
- **Estado** salvo em `localStorage` (`rmo-fs`, `rmo-contrast`).
- Foco visível, navegação por teclado em todos os interativos.

### Mega-menu
- Hover desktop (CSS `:hover`).
- Hambúrguer + drawer mobile (JS, < 1024 px).
- Links destacados quando estão na página atual.

### Acervo (mock Tainacan)
- 15 itens fake (tocha, medalhas, fotos, vídeos, documentos, áudios).
- Filtros por **tipo de mídia** (objeto, foto, vídeo, áudio, documento) e **categoria**.
- Busca textual.
- Paginação (não funcional — só ilustrativa).
- Ficha de objeto modelo (`objeto-tocha-olimpica.html`) com metadados Dublin Core.

### Conteúdo migrado do site atual (museuolimpico.rio)
- Horários, endereço, valores, restrições, regras de visitação, FAQ — extraídos em [conteudo_site_atual.md](../conteudo_site_atual.md).

## Estrutura de arquivos

```
prototipo/
├── index.html
├── contato.html
├── museu/         (4 páginas)
├── exposicoes/    (3 páginas)
├── acervo/        (2 páginas)
├── programacao/   (1 página)
├── visite/        (4 páginas)
├── midia/         (1 página)
├── gestao/        (1 página)
├── assets/
│   ├── css/
│   │   ├── tokens.css      # design tokens (cores, fontes, spacing)
│   │   ├── base.css        # reset + tipografia + grid utils
│   │   ├── components.css  # header, mega-menu, cards, btns, hero
│   │   └── pages.css       # estilos de páginas específicas
│   ├── js/
│   │   ├── i18n-data.js    # dicionários PT/EN/ES embedados
│   │   ├── components.js   # injeta header/footer + mobile menu
│   │   ├── i18n.js         # troca de idioma
│   │   ├── accessibility.js # A+/A-/contraste/skip
│   │   └── acervo.js       # grid + filtros do acervo
│   ├── i18n/               # JSONs originais (fonte de verdade pros idiomas)
│   └── img/                # placeholder pra imagens reais do museu
└── README.md
```

## Identidade visual

- **Paleta:** azul olímpico `#0a2540` (institucional) + dourado `#ffb612` (accent) + laranja `#f47920` (CTA) + vermelho/verde/azul/amarelo dos aros olímpicos.
- **Tipografia:** **Bebas Neue** (display, todos os títulos) + **Inter** (corpo) + **Source Serif 4** (citações).
- Carregadas via Google Fonts CDN.

## O que NÃO faz (está fora do escopo do protótipo)

- Backend / login admin
- Tainacan funcionando de verdade (página de acervo é mock)
- Formulários enviam de verdade (apenas alert)
- Newsletter ativa
- Compra de ingresso (link aponta pro Sympla externo)
- Embed real do Instagram
- Mapa Google interativo (placeholder)

Tudo isso entra na fase de produção, quando portarmos o protótipo para tema WordPress + Tainacan.

## Próxima fase (produção)

1. Validar visual e UX deste protótipo com a equipe do museu
2. Setup local: WordPress 6.x + Tainacan + ambiente Docker/LocalWP
3. Portar HTML/CSS/JS deste protótipo para tema WordPress custom (PHP/Twig)
4. Configurar CPTs (Exposição, Núcleo, Evento) e ACF fields
5. Cadastrar acervo real no Tainacan
6. Migrar conteúdo do site atual
7. Homologação em servidor staging
8. Go-live com DNS de `riomuseuolimpico.com.br`

Veja o plano completo em [PLANO_SITE.md](../PLANO_SITE.md).
