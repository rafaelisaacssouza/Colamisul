#!/usr/bin/env node
/* Gera o site estático da Colamisul em /dist
   Uso:
     node build.js            -> URLs limpas (/produtos/) para publicar em servidor
     node build.js --relative -> links relativos com index.html (abre direto do disco)
*/
const fs = require('fs');
const path = require('path');

const RELATIVE = process.argv.includes('--relative');
const OUT = path.join(__dirname, 'dist');
const SRC = path.join(__dirname, 'src');

const D = require('./src/data/site');
const PRODUTOS = require('./src/data/produtos');
const RECEITAS = require('./src/data/receitas');
const PRIVACIDADE = require('./src/data/privacidade');
const S = D.site, B = D.banners;

/* ---------------- Grid 12 colunas (gerado) ---------------- */
function gridCSS() {
  let css = `/* =========================================================
   Sistema de grid — Colamisul
   Mobile  (< 768px):   4 colunas  · gutter 16px · margem 20px
   Tablet  (≥ 768px):   8 colunas  · gutter 24px · margem 32px
   Desktop (≥ 1024px): 12 colunas  · gutter 24px · container 1280px
   Uso: <div class="grid"> <div class="s-4 m-4 l-6">…</div> </div>
        s-* = mobile · m-* = tablet · l-* = desktop · *-start-N = coluna inicial
   Sem classe, o item ocupa a linha inteira.
   ========================================================= */
:root { --container: 1280px; --gutter: 16px; --margin: 20px; --row-gap: 24px; --cols: 4; }
@media (min-width: 768px) { :root { --gutter: 24px; --margin: 32px; --row-gap: 32px; --cols: 8; } }
@media (min-width: 1024px) { :root { --margin: 40px; --cols: 12; } }
.container { width: 100%; max-width: calc(var(--container) + var(--margin) * 2); margin-inline: auto; padding-inline: var(--margin); }
.container--narrow { max-width: calc(880px + var(--margin) * 2); }
.grid { display: grid; grid-template-columns: repeat(var(--cols), minmax(0, 1fr)); column-gap: var(--gutter); row-gap: var(--row-gap); }
.grid > * { grid-column: 1 / -1; min-width: 0; }
.grid--dense { row-gap: var(--gutter); }
.grid--center { align-items: center; }
.grid--end { align-items: end; }
`;
  for (let i = 1; i <= 4; i++) css += `.grid > .s-${i} { grid-column: auto / span ${i}; }\n`;
  css += `@media (min-width: 768px) {\n`;
  for (let i = 1; i <= 8; i++) css += `  .grid > .m-${i} { grid-column: auto / span ${i}; }\n`;
  for (let i = 1; i <= 8; i++) css += `  .grid > .m-start-${i} { grid-column-start: ${i}; }\n`;
  css += `}\n@media (min-width: 1024px) {\n`;
  for (let i = 1; i <= 12; i++) css += `  .grid > .l-${i} { grid-column: auto / span ${i}; }\n`;
  for (let i = 1; i <= 12; i++) css += `  .grid > .l-start-${i} { grid-column-start: ${i}; }\n`;
  css += `}\n`;
  // grade de debug: adicione ?grid na URL
  css += `.grid-overlay { position: fixed; inset: 0; pointer-events: none; z-index: 9999; }
.grid-overlay .grid { height: 100%; }
.grid-overlay .grid > div { grid-column: span 1; background: rgba(241,135,0,.10); border-inline: 1px solid rgba(241,135,0,.35); }
`;
  return css;
}

/* ---------------- Helpers ---------------- */
let currentDepth = 0;
const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const href = p => {
  if (/^(https?:|mailto:|tel:|#)/.test(p)) return p;
  if (!RELATIVE) return p;
  const pre = currentDepth ? '../'.repeat(currentDepth) : './';
  const clean = p.replace(/^\//, '');
  if (!clean || clean.endsWith('/')) return pre + clean + 'index.html';
  return pre + clean;
};
const tel = t => 'tel:+55' + t.replace(/\D/g, '');

const I = {
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  chev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h10"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 22s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.4 1.8.7 2.7a2 2 0 01-.5 2.1L8 9.8a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.7.7a2 2 0 011.7 2z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
  doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/></svg>',
  id: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9h4M7 13h10M7 17h6"/></svg>',
  up: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6"/></svg>',
  insta: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
  whats: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001.1 2.7 11.8 11.8 0 004.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 001.8-1.2 2.2 2.2 0 00.1-1.2c0-.1-.2-.2-.5-.3z"/></svg>',
};
const wave = (fill, pos = 'top', bg = 'transparent') => `<svg class="wave wave--${pos}" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true" style="background:${bg}"><path fill="${fill}" d="${pos === 'top'
  ? 'M0 60V28c120-18 240-26 360-18s240 30 360 26 240-28 360-30 240 14 360 22v32z'
  : 'M0 0v30c120 18 240 26 360 18s240-30 360-26 240 28 360 30 240-14 360-22V0z'}"/></svg>`;

const btn = (label, url, cls = 'btn--primary') => `<a class="btn ${cls}" href="${href(url)}">${esc(label)} ${I.arrow}</a>`;
const img = (src, alt = '', attrs = '') => `<img src="${src}" alt="${esc(alt)}" loading="lazy" decoding="async" ${attrs}>`;

/* ---------------- Layout ---------------- */
function navDesktop(active) {
  return `<nav class="main-nav" aria-label="Principal"><ul>${D.nav.map(item => {
    if (item.children) {
      const isActive = item.children.some(c => c.href === active);
      return `<li class="has-sub"><button type="button" aria-expanded="false" ${isActive ? 'aria-current="page"' : ''}>${esc(item.label)} ${I.chev}</button><ul class="sub">${item.children.map(c => `<li><a href="${href(c.href)}" ${c.href === active ? 'aria-current="page"' : ''}>${esc(c.label)}</a></li>`).join('')}</ul></li>`;
    }
    if (item.href === '/contato/') return '';
    return `<li><a href="${href(item.href)}" ${item.href === active ? 'aria-current="page"' : ''}>${esc(item.label)}</a></li>`;
  }).join('')}</ul></nav>`;
}
function navMobile() {
  return `<div class="mobile-nav" id="mobile-nav" aria-hidden="true" data-lenis-prevent>
    <div class="top"><img src="${href(S.logoBranca)}" alt="Colamisul" width="150" height="40"><button class="close" type="button" aria-label="Fechar menu">${I.close}</button></div>
    <ul><li><a href="${href('/')}">Home</a></li>${D.nav.map(item => item.children
      ? `<li><span class="group-label">${esc(item.label)}</span><ul class="sub">${item.children.map(c => `<li><a href="${href(c.href)}">${esc(c.label)}</a></li>`).join('')}</ul></li>`
      : `<li><a href="${href(item.href)}">${esc(item.label)}</a></li>`).join('')}</ul>
  </div>`;
}
function header(active) {
  return `<a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
<header class="site-header"><div class="container bar">
  <a class="brand" href="${href('/')}" aria-label="Colamisul — página inicial"><img src="${href(S.logo)}" alt="Colamisul" width="172" height="46"></a>
  ${navDesktop(active)}
  <a class="btn btn--primary btn--sm header-cta" href="${href('/contato/')}">Contato</a>
  <button class="menu-toggle" type="button" aria-label="Abrir menu" aria-controls="mobile-nav" aria-expanded="false">${I.menu}</button>
</div></header>
${navMobile()}`;
}
function footer() {
  const col1 = [['Home', '/'], ['Nossa história', '/nossa-historia/'], ['Presidentes', '/presidentes/'], ['Missão, Visão e Valores', '/missao-visao-e-valores/'], ['Responsabilidade Social e Ambiental', '/responsabilidade-social-e-ambiental/'], ['Serviços ao Cooperado', '/servicos-ao-cooperado/']];
  const col2 = [['Informações Gerais', '/informacoes-gerais/'], ['Produtos', '/produtos/'], ['Informativo Colamisul', '/informativo-colamisul/'], ['Pontos de vendas', '/pontos-de-vendas/'], ['Receitas', '/receitas/'], ['Contato', '/contato/']];
  const li = arr => arr.map(([l, u]) => `<li><a href="${href(u)}">${esc(l)}</a></li>`).join('');
  // fundo da onda = cor da última seção da página (definido no CSS via --footer-wave-bg)
  return `${wave('#0B4D26', 'top', 'var(--footer-wave-bg, transparent)')}
<footer class="site-footer">
  <div class="container top"><div class="grid">
    <div class="s-4 m-8 l-4">
      <img class="logo" src="${href(S.logoBranca)}" alt="Colamisul" width="180" height="48">
      <p>${esc(S.tagline)}</p>
      <img src="${href(S.seloCoop)}" alt="Somos Coop" width="64" style="width:64px">
    </div>
    <nav class="s-2 m-3 l-3" aria-label="Institucional"><h4>Institucional</h4><ul>${li(col1)}</ul></nav>
    <nav class="s-2 m-2 l-2" aria-label="Conteúdo"><h4>Navegue</h4><ul>${li(col2)}</ul></nav>
    <div class="s-4 m-3 l-3">
      <h4>Contato</h4>
      <p style="margin:-8px 0 12px;font-size:.85rem;font-weight:700">Horário comercial</p>
      <ul class="contact">
        ${S.phones.map(p => `<li>${I.phone}<a href="${tel(p)}">${p}</a></li>`).join('')}
        <li>${I.mail}<a href="mailto:${S.email}">${S.email}</a></li>
        <li>${I.pin}<span>${esc(S.address)}</span></li>
      </ul>
      <div class="socials"><a href="${S.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${I.insta}</a><a href="${S.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp">${I.whats}</a></div>
    </div>
  </div></div>
  <div class="bottom"><div class="container">© Copyright <span data-year>2026</span> – ${S.cnpj} – ${esc(S.fullName)} – Todos os Direitos Reservados · <a href="${href('/politica-de-privacidade/')}">Política de Privacidade</a></div></div>
</footer>
<div class="float-actions"><a class="fa-whats" href="${S.whatsapp}" target="_blank" rel="noopener" aria-label="Fale no WhatsApp">${I.whats}</a><button class="fa-top" type="button" aria-label="Voltar ao topo">${I.up}</button></div>`;
}

function page({ title, desc, active, body, depthPath }) {
  currentDepth = depthPath.split('/').filter(Boolean).length;
  const fullTitle = title ? `${title} – Colamisul | Cooperativa de Laticínios de Mimoso do Sul` : 'Colamisul | Cooperativa de Laticínios de Mimoso do Sul';
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(desc || S.slogan)}">
<meta name="theme-color" content="#007A2F">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(desc || S.slogan)}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Merriweather+Sans:wght@400;600;700&display=swap" rel="stylesheet">
<script>document.documentElement.classList.add('js')</script>
<link rel="stylesheet" href="${href('/assets/css/grid.css')}">
<link rel="stylesheet" href="${href('/assets/css/style.css')}">
</head>
<body>
${header(active)}
<main id="conteudo">
${body}
</main>
${footer()}
<script src="${href('/assets/vendor/lenis.min.js')}" defer></script>
<script src="${href('/assets/vendor/gsap.min.js')}" defer></script>
<script src="${href('/assets/vendor/ScrollTrigger.min.js')}" defer></script>
<script src="${href('/assets/js/main.js')}" defer></script>
<script>if(location.search.includes('grid')){document.write('<div class="grid-overlay"><div class="container" style="height:100%"><div class="grid">'+'<div></div>'.repeat(12)+'</div></div></div>')}</script>
</body>
</html>`;
}

/* ---------------- Blocos reutilizáveis ---------------- */
const crumbs = list => `<ol class="breadcrumb">${list.map(([l, u]) => u ? `<li><a href="${href(u)}">${esc(l)}</a></li>` : `<li aria-current="page">${esc(l)}</li>`).join('')}</ol>`;

// Banner original (a arte já vem na imagem) + bloco de título centralizado abaixo
const banner = (image, video) => video
  ? `<section class="banner banner--video"><iframe src="https://www.youtube-nocookie.com/embed/${video}?autoplay=1&mute=1&loop=1&playlist=${video}&controls=0&disablekb=1&fs=0&iv_load_policy=3&playsinline=1&rel=0&modestbranding=1" title="Vídeo institucional Colamisul" allow="autoplay; encrypted-media" tabindex="-1"></iframe></section>`
  : `<section class="banner"><img src="${image}" alt="" fetchpriority="high"></section>`;

function pageHero({ title, eyebrow, lead, image, video, trail, bg = '', hideTitle = false }) {
  return `${banner(image, video)}
<section class="page-intro ${bg}"><div class="container"><div class="grid">
  <div class="s-4 m-6 m-start-2 l-8 l-start-3 center">
    ${crumbs([['Início', '/'], ...(trail || []), [title]])}
    ${eyebrow ? `<span class="eyebrow">${esc(eyebrow)}</span>` : ''}
    ${hideTitle ? '' : `<h1 class="display-l t-green">${esc(title)}</h1>`}
    ${lead ? `<p class="lead">${esc(lead)}</p>` : ''}
  </div>
</div></div></section>`;
}

const productCard = p => `<div class="s-4 m-4 l-4 reveal" data-cat="${esc(p.cat)}"><a class="card product-card" href="${href('/produtos/' + p.slug + '/')}">
  <div class="card__media">${img(p.img, p.alt)}</div>
  <div class="card__body"><span class="tag">${esc(p.cat)}</span><h3 class="card__title">${esc(p.nome)}</h3><p class="chamada">${esc(p.chamada)}</p><p class="card__text">${esc(p.desc)}</p>
  <div class="card__foot"><span class="link-arrow">Tabela nutricional ${I.arrow}</span></div></div>
</a></div>`;

const recipeCard = (r, cls = 's-4 m-4 l-3') => `<div class="${cls} reveal"><a class="card recipe-card" href="${href('/_receitas/' + r.slug + '/')}">
  <div class="card__media">${img(r.thumb, r.nome)}</div>
  <div class="card__body"><h3 class="card__title">${esc(r.nome)}</h3><div class="card__foot"><span class="link-arrow">Ver receita ${I.arrow}</span></div></div>
</a></div>`;

const newsCard = (n, cls = 's-4 m-4 l-4') => `<div class="${cls} reveal"><a class="card" href="${href(n.url)}">
  <div class="card__media">${img(n.img, n.t)}</div>
  <div class="card__body"><span class="tag">${esc(n.data)}</span><h3 class="card__title">${esc(n.t)}</h3><p class="card__text">${esc(n.resumo)}</p><div class="card__foot"><span class="link-arrow">Leia mais ${I.arrow}</span></div></div>
</a></div>`;

const presidentCard = p => `<div class="s-2 m-2 l-2 president reveal" id="${p.slug}"><figure>
  <div class="photo">${img(p.img, p.nome)}<span class="ord" aria-hidden="true">${p.ordem}</span></div>
  <figcaption>${esc(p.nome)}</figcaption></figure></div>`;

const ctaParceiro = (tone = '') => `<section class="section--tight"><div class="container"><div class="cta-band reveal ${tone ? 'cta-band--' + tone : ''}"><div class="grid grid--center">
  <div class="s-4 m-5 l-8"><h2 class="display-l cta-band__title">Torne-se um parceiro Colamisul.</h2></div>
  <div class="s-4 m-3 l-4" style="justify-self:start">${btn('Saiba mais', '/contato/', 'btn--yellow')}</div>
</div></div></div></section>`;

const infoBoxes = () => `<div class="info-stack">
  <div class="info-box"><span class="ico">${I.pin}</span><div><h3>Onde estamos?</h3><p>${esc(S.address)}</p></div></div>
  <div class="info-box"><span class="ico">${I.phone}</span><div><h3>Contato</h3>${S.phones.map(p => `<p><a href="${tel(p)}">${p}</a></p>`).join('')}</div></div>
  <div class="info-box"><span class="ico">${I.mail}</span><div><h3>Email</h3><p><a href="mailto:${S.email}">${S.email}</a></p></div></div>
</div>`;

const contactForm = () => `<form class="form-card" data-contact="${S.email}" novalidate>
  <div class="grid grid--dense">
    <div class="field s-4 m-4 l-6"><label for="f-nome">Nome</label><input id="f-nome" name="nome" required autocomplete="name"></div>
    <div class="field s-4 m-4 l-6"><label for="f-tel">Telefone</label><input id="f-tel" name="telefone" type="tel" autocomplete="tel"></div>
    <div class="field s-4 m-8 l-12"><label for="f-email">E-mail</label><input id="f-email" name="email" type="email" required autocomplete="email"></div>
    <div class="field s-4 m-8 l-12"><label for="f-assunto">Assunto</label><input id="f-assunto" name="assunto"></div>
    <div class="field s-4 m-8 l-12"><label for="f-msg">Sua mensagem</label><textarea id="f-msg" name="mensagem" required></textarea></div>
  </div>
  <button class="btn btn--primary" type="submit" style="width:100%;justify-content:center">Enviar ${I.arrow}</button>
  <p class="form-status" role="status"></p>
</form>`;

const contactSection = (withMap = true) => `<section class="section bg-cream" id="contato">
  <div class="container"><div class="grid">
    <div class="s-4 m-8 l-5 reveal">
      <span class="eyebrow">Fale com a gente</span>
      <h2 class="display-l t-lime">Vamos nos conectar</h2>
      <p class="lead">Acesse nossas plataformas para saber mais e receber notícias sobre a cooperativa e nossos produtos.</p>
      <div class="socials" style="margin-top:24px"><a href="${S.instagram}" target="_blank" rel="noopener" aria-label="Instagram" style="background:var(--green);color:#fff">${I.insta}</a><a href="${S.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp" style="background:var(--green);color:#fff">${I.whats}</a></div>
    </div>
    <div class="s-4 m-8 l-7 reveal">${contactForm()}</div>
  </div></div>
</section>
${withMap ? mapSection() : ''}`;

const mapSection = (bg = 'bg-cream') => `<section class="section--tight ${bg}"><div class="container"><div class="grid">
  <div class="s-4 m-8 l-7 reveal"><iframe class="map-frame" src="${S.mapEmbed}" title="Mapa: ${esc(S.address)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  <div class="s-4 m-8 l-5 reveal">${infoBoxes()}</div>
</div></div></section>`;

const instagramBand = () => `<section class="section--tight"><div class="container"><div class="cta-band reveal"><div class="grid grid--center">
  <div class="s-4 m-5 l-8"><span class="eyebrow on-dark">Instagram</span><h2 class="display-m">${esc(S.instagramHandle)}</h2><p class="mb-0">Mantenha-se atualizado sobre nossos lançamentos e ofertas seguindo nosso perfil no instagram!</p></div>
  <div class="s-4 m-3 l-4"><a class="btn btn--yellow" href="${S.instagram}" target="_blank" rel="noopener">Seguir no Instagram ${I.arrow}</a></div>
</div></div></div></section>`;

/* ---------------- Páginas ---------------- */
const pages = [];
const add = (route, opts) => pages.push({ route, ...opts });

// HOME
add('/', {
  title: '', active: '/',
  body: () => `
<section class="hero">
  <picture><source media="(max-width: 767px)" srcset="${B.home.mobile}"><img src="${B.home.desktop}" alt="Linha de produtos Colamisul: leites, iogurtes, queijos, requeijão e doce de leite" fetchpriority="high"></picture>
</section>
<section class="section" id="sobre"><div class="container"><div class="grid grid--center">
  <div class="s-4 m-8 l-6 reveal"><div class="art-frame">${img(B.historiaArte, 'Colamisul — laticínios desde 1954')}</div></div>
  <div class="s-4 m-8 l-5 l-start-8 reveal">
    <span class="eyebrow">Sobre nós</span>
    <h2 class="display-l t-lime">Nossa história</h2>
    ${D.historia.intro.map(p => `<p class="lead">${esc(p)}</p>`).join('')}
    <div class="mt-l">${btn('Saiba mais', '/nossa-historia/', 'btn--outline')}</div>
  </div>
</div></div></section>

<section class="section bg-cream"><div class="container">
  <div class="section-head reveal"><div><span class="eyebrow">${esc(S.slogan)}</span><h2 class="display-l t-lime mb-0">Produtos</h2></div>${btn('Ver todos', '/produtos/', 'btn--outline')}</div>
  <div class="grid">${PRODUTOS.slice(0, 6).map(productCard).join('')}</div>
</div></section>

<section class="section"><div class="container">
  <div class="section-head reveal"><div><h2 class="display-l t-lime">Notícias</h2><p class="lead">Acompanhe tudo sobre a Colamisul.</p></div>${btn('Ver todos', '/informacoes-gerais/', 'btn--outline')}</div>
  <div class="grid">${D.noticias.map(n => newsCard(n, 's-4 m-4 m-start-3 l-4 l-start-5')).join('')}</div>
</div></section>

${wave('#007A2F', 'top')}
<section class="section bg-green"><div class="container"><div class="grid">
  <div class="s-4 m-6 m-start-2 l-8 l-start-3 reveal sust-intro"><span class="eyebrow on-dark">Sustentabilidade</span><h2 class="display-l">Qualidade com responsabilidade</h2><p class="lead" style="color:rgba(255,255,255,.9)">Conheça as iniciativas ambientais e sociais que reforçam nosso compromisso com a sustentabilidade, o cooperativismo e o futuro da nossa região.</p><div class="mt-l">${btn('Saiba mais', '/responsabilidade-social-e-ambiental/', 'btn--ghost-light')}</div></div>
</div></div></section>
${wave('#007A2F', 'bottom', '#FFED00')}

<section class="section bg-yellow" style="padding-top:calc(var(--space-section)*.7)"><div class="container">
  <div class="section-head reveal"><div><span class="eyebrow">Aqui tem sabores</span><h2 class="display-l t-green">Receitas</h2><p class="lead" style="color:var(--ink)">Dê um toque irresistível às suas receitas com nossos produtos e transforme cada refeição em uma experiência de sabor única!</p></div>${btn('Ver todas', '/receitas/', 'btn--primary')}</div>
  <div class="grid">${RECEITAS.slice(0, 4).map(r => recipeCard(r)).join('')}</div>
</div></section>
${wave('#FFED00', 'bottom', '#FFF7E6')}

${contactSection(true)}`,
});

// NOSSA HISTÓRIA
add('/nossa-historia/', {
  title: 'Nossa história', active: '/nossa-historia/', desc: D.historia.intro[0],
  body: () => `${banner(null, D.historia.video)}
<section class="section"><div class="container"><div class="grid">
  <div class="s-4 m-8 l-6 reveal"><div class="art-frame sticky-media">${img(B.historiaArte, 'Colamisul — laticínios desde 1954')}</div></div>
  <div class="s-4 m-8 l-5 l-start-8 prose reveal">
    ${crumbs([['Início', '/'], ['A Empresa'], ['Nossa história']]).replace('breadcrumb', 'breadcrumb breadcrumb--dark')}
    <span class="eyebrow">Sobre nós</span>
    <h1 class="display-l t-lime">Nossa história</h1>
    ${D.historia.intro.concat(D.historia.rest).map(p => `<p>${esc(p)}</p>`).join('')}
    <p class="quote-band mt-l">${esc(S.slogan)}</p>
  </div>
</div></div></section>
<section class="section bg-yellow"><div class="container">
  <div class="section-head reveal"><div><span class="eyebrow">Um pouco mais da nossa história</span><h2 class="display-l t-lime">Galeria de Presidentes</h2><p class="lead">Nossa história também é construída por grandes lideranças. Conheça os presidentes que marcaram diferentes gerações da Colamisul.</p></div>${btn('Ver todos', '/presidentes/', 'btn--outline')}</div>
  <div class="grid">${D.presidentes.slice(0, 6).map(presidentCard).join('')}</div>
</div></section>
${ctaParceiro()}`,
});

// PRESIDENTES
add('/presidentes/', {
  title: 'Presidentes', active: '/presidentes/',
  body: () => `${pageHero({ title: 'Galeria de Presidentes', eyebrow: 'Um pouco mais da nossa história', lead: 'Nossa história também é construída por grandes lideranças. Conheça os presidentes que marcaram diferentes gerações da Colamisul.', image: B.presidentes, trail: [['A Empresa'], ['Nossa história', '/nossa-historia/']] })}
<section class="section"><div class="container"><div class="grid">${D.presidentes.map(presidentCard).join('')}</div></div></section>
${ctaParceiro()}`,
});

// MISSÃO VISÃO VALORES
add('/missao-visao-e-valores/', {
  title: 'Missão, Visão e Valores', active: '/missao-visao-e-valores/',
  body: () => `${pageHero({ title: 'Missão, Visão e Valores', eyebrow: 'Propósito', image: B.mvv, trail: [['A Empresa']] })}
<section class="section" style="padding-top:0"><div class="container"><div class="grid">
  <div class="s-4 m-8 l-4 l-start-2 reveal"><div class="media-frame sticky-media media-frame--tall">${img(B.mvvVertical, 'Colamisul — propósito')}</div></div>
  <ol class="s-4 m-8 l-6 l-start-7 vtimeline">
    ${D.mvv.map(m => `<li class="reveal"><span class="dot">${m.n}</span><h2 class="display-s t-green">${m.t}</h2>${m.d ? `<p>${esc(m.d)}</p>` : `<ul class="values-list">${m.list.map(([k, v]) => `<li><strong>${k}:</strong> ${esc(v)}</li>`).join('')}</ul>`}</li>`).join('')}
  </ol>
</div></div></section>
${ctaParceiro()}`,
});

// RESPONSABILIDADE
add('/responsabilidade-social-e-ambiental/', {
  title: 'Responsabilidade Social e Ambiental', active: '/responsabilidade-social-e-ambiental/',
  body: () => { const R = D.responsabilidade; return `${pageHero({ title: 'Responsabilidade Social e Ambiental', eyebrow: 'Sustentabilidade', image: B.responsabilidade, trail: [['A Empresa']], hideTitle: true })}
<section class="section" style="padding-top:0"><div class="container"><div class="grid">
  <div class="s-4 m-8 l-10 l-start-2 center reveal"><h1 class="display-l t-green">${esc(R.titulo)}</h1></div>
  <div class="s-4 m-8 l-8 l-start-3 prose reveal">${R.ambiental.map(p => `<p>${esc(p)}</p>`).join('')}</div>
</div></div></section>
<section class="section bg-lime"><div class="container"><div class="grid">
  <div class="s-4 m-8 l-6 reveal"><div class="media-frame travel-media media-frame--tall">${img(B.responsabilidade2, 'Cooperativismo Colamisul')}</div></div>
  <div class="s-4 m-8 l-5 l-start-8 reveal on-lime">
    <span class="eyebrow on-dark">Cooperativismo</span>
    <h2 class="display-l">${esc(R.coopTitulo)}</h2>
    ${R.coop.map(p => `<p>${esc(p)}</p>`).join('')}<p><strong>${esc(R.principiosIntro)}</strong></p>
    <ol class="principles">${R.principios.map(p => `<li>${esc(p)}</li>`).join('')}</ol>
    <p class="mt-l">${esc(R.fechamento)}</p>
  </div>
</div></div></section>
${ctaParceiro()}`; },
});

// INFORMAÇÕES GERAIS (notícias)
add('/informacoes-gerais/', {
  title: 'Informações Gerais', active: '/informacoes-gerais/',
  body: () => `${pageHero({ title: 'Acompanhe tudo sobre a Colamisul', eyebrow: 'Informações Gerais', image: B.informacoes })}
<section class="section bg-cream"><div class="container"><div class="grid">${D.noticias.map(n => newsCard(n)).join('')}</div></div></section>`,
});

// NOTÍCIA SINGLE
D.noticias.forEach(n => add(n.url, {
  title: n.t, active: '/informacoes-gerais/', desc: n.corpo[0].slice(0, 155),
  body: () => `<section class="page-hero page-hero--article"><div class="container inner"><div class="grid" style="width:100%"><div class="s-4 m-8 l-8">
  ${crumbs([['Início', '/'], ['Notícias', '/informacoes-gerais/'], [n.t]])}<span class="eyebrow on-dark">${esc(n.data)}</span><h1 class="display-l">${esc(n.t)}</h1></div></div></div></section>
<section class="section" style="padding-top:0"><div class="container"><div class="grid">
  <div class="s-4 m-8 l-10 l-start-2"><div class="article-cover">${img(n.img, n.t, 'fetchpriority="high"')}</div></div>
  <article class="s-4 m-8 l-8 l-start-3 article-body mt-l">${n.corpo.map(p => `<p>${esc(p)}</p>`).join('')}
    <div class="mt-l">${btn('Voltar para notícias', '/informacoes-gerais/', 'btn--outline')}</div></article>
</div></div></section>
${mapSection()}`,
}));

// PRODUTOS
const cats = [...new Set(PRODUTOS.map(p => p.cat))];
add('/produtos/', {
  title: 'Produtos', active: '/produtos/',
  body: () => `${banner(B.produtos)}<h1 class="sr-only">Produtos</h1>
<section class="section bg-cream"><div class="container">
  <div class="toolbar reveal"><div class="chips" data-filter="produtos" role="group" aria-label="Filtrar por categoria">
    <button class="chip" type="button" data-value="todos" aria-pressed="true">Todos</button>
    ${cats.map(c => `<button class="chip" type="button" data-value="${esc(c)}" aria-pressed="false">${esc(c)}</button>`).join('')}
  </div><span style="color:var(--ink-2);font-size:.9rem">${PRODUTOS.length} produtos</span></div>
  <div class="grid">${PRODUTOS.map(productCard).join('')}</div>
</div></section>
${contactSection(false)}`,
});

// PRODUTO SINGLE
PRODUTOS.forEach((p, idx) => {
  const t = p.tabela;
  const rel = PRODUTOS.filter(x => x.cat === p.cat && x.slug !== p.slug).concat(PRODUTOS.filter(x => x.cat !== p.cat)).slice(0, 3);
  add('/produtos/' + p.slug + '/', {
    title: p.nome, active: '/produtos/', desc: p.chamada + ' ' + p.desc,
    body: () => `<section class="product-hero"><div class="container"><div class="grid">
  <div class="s-4 m-8 l-12">${crumbs([['Início', '/'], ['Produtos', '/produtos/'], [p.nome]])}</div>
  <div class="s-4 m-8 l-6 reveal"><div class="product-figure">${img(p.img, p.alt, 'fetchpriority="high"')}</div></div>
  <div class="s-4 m-8 l-5 l-start-8 reveal self-center">
    <span class="tag">${esc(p.cat)}</span>
    <h1 class="display-l t-lime" style="margin-top:14px">${esc(p.nome)}</h1>
    <p style="font-weight:700;font-size:1.1rem">${esc(p.chamada)}</p>
    <p class="lead">${esc(p.desc)}</p>
    <div class="mt-l" style="display:flex;gap:12px;flex-wrap:wrap"><a class="btn btn--primary" href="#tabela">Tabela nutricional ${I.arrow}</a>${btn('Onde comprar', '/pontos-de-vendas/', 'btn--outline')}</div>
  </div>
</div></div></section>
<section class="section" id="tabela" style="padding-top:0"><div class="container"><div class="grid">
  <div class="s-4 m-8 l-4 reveal">
    <span class="eyebrow">Tabela nutricional</span>
    <h2 class="display-m t-green">${esc(t.titulo)}</h2>
    <dl>
      ${t.ingredientes ? `<div class="spec"><dt>Ingredientes</dt><dd>${esc(t.ingredientes)}</dd></div>` : ''}
      <div class="spec"><dt>Embalagem</dt><dd>${esc(t.embalagem)}</dd></div>
    </dl>
  </div>
  <div class="s-4 m-8 l-7 l-start-6 reveal">
    <div class="table-wrap"><table class="nutri"><caption class="sr-only">Informação Nutricional — ${esc(t.titulo)}</caption>
      <thead><tr><th scope="col">Descrição</th><th scope="col">${t.cols[0]}</th><th scope="col">${t.cols[1]}</th><th scope="col">%VD*</th></tr></thead>
      <tbody>${t.rows.map(r => `<tr><th scope="row" style="font-weight:400">${esc(r[0])}</th><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td></tr>`).join('')}</tbody>
    </table></div>
    ${t.notas.map(n => `<p class="small-note">${esc(n)}</p>`).join('')}
  </div>
</div></div></section>
<section class="section bg-cream"><div class="container">
  <div class="section-head reveal"><h2 class="display-m t-lime mb-0">Conheça também</h2>${btn('Todos os produtos', '/produtos/', 'btn--outline')}</div>
  <div class="grid">${rel.map(productCard).join('')}</div>
</div></section>`,
  });
});

// INFORMATIVO
const anos = [...new Set(D.informativos.map(i => i.ano))];
add('/informativo-colamisul/', {
  title: 'Informativo Colamisul', active: '/informativo-colamisul/',
  body: () => `${banner(B.informativos)}
<section class="section" data-informativos><div class="container"><div class="grid">
  <div class="s-4 m-8 l-12 sort-row reveal"><label>Classificar por: <select class="select" data-sort><option value="recentes">Mais recente</option><option value="antigos">Mais antigos</option></select></label></div>
  <aside class="s-4 m-8 l-3 reveal"><div class="filter-panel">
    <h2>Ano de publicação</h2>
    <div class="chips chips--stack" data-filter="ano" role="group" aria-label="Filtrar por ano">
      <button class="chip" type="button" data-value="todos" aria-pressed="true">Todos</button>${anos.map(a => `<button class="chip" type="button" data-value="${a}" aria-pressed="false">${a}</button>`).join('')}</div>
  </div></aside>
  <div class="s-4 m-8 l-9"><div class="grid" data-list>${D.informativos.map(i => `<div class="s-4 m-4 l-4 reveal" data-ano="${i.ano}" data-ordem="${i.ordem}" id="${i.slug}"><article class="info-card">
    <header><span class="pill">Informativo</span><h3>${esc(i.t)}</h3></header>
    <div class="cover">${img(i.capa, 'Capa — ' + i.t)}</div>
    <a class="btn btn--primary btn--sm" href="${i.pdf}" target="_blank" rel="noopener">Leia Agora ${I.arrow}</a></article></div>`).join('')}</div></div>
</div></div></section>
${ctaParceiro()}`,
});

// PONTOS DE VENDA
add('/pontos-de-vendas/', {
  title: 'Pontos de vendas', active: '/pontos-de-vendas/',
  body: () => `${pageHero({ title: D.pontos.titulo, lead: D.pontos.d, image: B.pontos, bg: 'bg-cream' })}
<section class="full-media">${img(B.mapaPontos, 'Mapa dos pontos de venda Colamisul')}</section>
${ctaParceiro()}`,
});

// SERVIÇOS AO COOPERADO
add('/servicos-ao-cooperado/', {
  title: 'Serviços ao Cooperado', active: '/servicos-ao-cooperado/',
  body: () => { const Sv = D.servicos; return `${pageHero({ title: Sv.titulo, eyebrow: 'Serviços ao Cooperado', lead: Sv.intro, image: B.servicos, bg: 'bg-cream' })}
<section class="section bg-lime"><div class="container stack-l">
  <div class="panel reveal"><div class="grid grid--center">
    <div class="s-4 m-8 l-6">
      <h2 class="display-m t-lime">${esc(Sv.loja.t)}</h2><p class="lead">${esc(Sv.loja.d)}</p>
      <div class="grid grid--dense mt-l">
        <div class="s-4 m-4 l-6"><div class="info-box"><span class="ico">${I.pin}</span><div><h3>Endereço</h3>${Sv.loja.endereco.map(l => `<p>${esc(l)}</p>`).join('')}</div></div></div>
        <div class="s-4 m-4 l-6"><div class="info-box"><span class="ico">${I.id}</span><div><h3>CNPJ e Telefones</h3><p>${Sv.loja.contato[0]}</p>${Sv.loja.contato.slice(1).map(p => `<p><a href="${tel(p)}">${p}</a></p>`).join('')}</div></div></div>
      </div>
    </div>
    <div class="s-4 m-8 l-6"><div class="media-frame media-frame--wide">${img(B.veterinaria, 'veterinaria colamisul')}</div></div>
  </div></div>
  <div class="panel reveal"><div class="grid grid--center">
    <div class="s-4 m-8 l-6">
      <h2 class="display-m t-lime">${esc(Sv.assistencia.t)}</h2>
      <p class="lead">${esc(Sv.assistencia.d)}</p>
      <ul class="check-list" style="margin-bottom:24px">${Sv.assistencia.list.map(l => `<li>${esc(l)}</li>`).join('')}</ul>
      <p style="color:var(--ink-2)">${esc(Sv.assistencia.d2)}</p>
    </div>
    <div class="s-4 m-8 l-6"><div class="media-frame media-frame--wide">${img(B.assistencia, 'banner Serviços e Assistência Técnica')}</div></div>
  </div></div>
</div></section>
${ctaParceiro()}`; },
});

// RECEITAS
add('/receitas/', {
  title: 'Receitas', active: '/receitas/',
  body: () => `${banner(B.receitas)}<h1 class="sr-only">Receitas</h1>
<section class="section bg-cream"><div class="container"><div class="grid">${RECEITAS.map(r => recipeCard(r)).join('')}</div></div></section>`,
});

// RECEITA SINGLE
RECEITAS.forEach(r => {
    add('/_receitas/' + r.slug + '/', {
    title: r.tituloCompleto || r.nome, active: '/receitas/', desc: 'Receita com produtos Colamisul: ' + r.nome,
    body: () => `<section class="page-hero">
  <div class="page-hero__media">${img(r.img, '', 'fetchpriority="high"')}</div>
  <div class="container inner"><div class="grid" style="width:100%"><div class="s-4 m-7 l-8">
    ${crumbs([['Início', '/'], ['Receitas', '/receitas/'], [r.nome]])}
    <span class="eyebrow on-dark">Receita Colamisul</span><h1 class="display-l">${esc(r.tituloCompleto || r.nome)}</h1>
    ${r.meta ? `<div class="recipe-meta"><span>Preparo: ${r.meta.tempo}</span><span>Rendimento: ${r.meta.rendimento}</span></div>` : ''}
  </div></div></div>
</section>
<section class="section"><div class="container"><div class="grid">
  <aside class="s-4 m-8 l-4 reveal"><div class="ingredients"><h2>Ingredientes</h2>
    ${r.ingredientes.map(g => `${g.t ? `<h3>${esc(g.t)}</h3>` : ''}<ul>${g.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul>`).join('')}
  </div></aside>
  <div class="s-4 m-8 l-7 l-start-6 steps reveal"><h2>Modo de preparo</h2>
    ${r.preparo.map(g => `${g.t ? `<h3>${esc(g.t)}</h3>` : ''}<ol>${g.steps.map(s => `<li><span>${esc(s)}</span></li>`).join('')}</ol>`).join('')}
    ${r.info ? `<div class="callout">${r.meta ? '<p><strong>Informações adicionais:</strong></p>' : ''}${r.info.map(i => `<p>${esc(i)}</p>`).join('')}</div>` : ''}
    ${r.fonte ? `<p class="source">Fonte: <a href="${r.fonte}" target="_blank" rel="noopener nofollow">${esc(r.fonte)}</a></p>` : ''}
  </div>
</div></div></section>
${mapSection('')}
${instagramBand()}`,
  });
});

// CONTATO
add('/contato/', {
  title: 'Contato', active: '/contato/',
  body: () => `${banner(B.contato)}<h1 class="sr-only">Contato</h1>
${contactSection(true)}`,
});

// POLÍTICA
add('/politica-de-privacidade/', {
  title: 'Política de Privacidade', active: '',
  body: () => `${pageHero({ title: 'Política de Privacidade', eyebrow: 'LGPD', image: B.privacidade })}
<section class="section"><div class="container"><div class="grid"><article class="s-4 m-8 l-8 l-start-3 prose">${PRIVACIDADE}</article></div></div></section>
${instagramBand()}`,
});

// 404
add('/404/', {
  file: '404.html', title: 'Página não encontrada', active: '',
  body: () => `<section class="section error-page"><div class="container"><div class="grid"><div class="s-4 m-6 m-start-2 l-6 l-start-4">
  ${img(B.erro, '')}<h1 class="display-l t-lime">Ops! Página não encontrada</h1><p class="lead">A página que você está procurando foi movida, removida, renomeada ou nunca existiu.</p><div class="mt-l">${btn('Página Inicial', '/')}</div>
</div></div></div></section>
${instagramBand()}`,
});

/* ---------------- Escrita ---------------- */
function write(file, content) { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, content); }
fs.rmSync(OUT, { recursive: true, force: true });

for (const p of pages) {
  const depthPath = p.file ? '' : p.route;
  const html = page({ title: p.title, desc: p.desc, active: p.active, depthPath, body: '' }); // define profundidade
  currentDepth = depthPath.split('/').filter(Boolean).length;
  const body = p.body();
  const out = page({ title: p.title, desc: p.desc, active: p.active, depthPath, body });
  const file = p.file ? path.join(OUT, p.file) : path.join(OUT, p.route, 'index.html');
  write(file, out);
}
write(path.join(OUT, 'assets/css/grid.css'), gridCSS());
fs.cpSync(path.join(SRC, 'assets'), path.join(OUT, 'assets'), { recursive: true });

// Redirecionamento das URLs antigas de produto/presidente/informativo (para .htaccess)
const redirects = [
  ...D.presidentes.map(p => `Redirect 301 /_presidente/${p.slug}/ /presidentes/#${p.slug}`),
  ...PRODUTOS.map(p => `Redirect 301 /_produtos/${p.slug}/ /produtos/${p.slug}/`),
  ...D.informativos.map(i => `Redirect 301 /informativos/${i.slug}/ /informativo-colamisul/#${i.slug}`),
  'Redirect 301 /noticias /informacoes-gerais/',
];
write(path.join(OUT, '.htaccess'), `ErrorDocument 404 /404.html\n${redirects.join('\n')}\n`);

// Sitemap
write(path.join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.filter(p => !p.file).map(p => `  <url><loc>https://colamisul.coop.br${p.route}</loc></url>`).join('\n')}\n</urlset>\n`);

console.log(`✔ ${pages.length} páginas geradas em dist/ (${RELATIVE ? 'links relativos' : 'URLs limpas'})`);
