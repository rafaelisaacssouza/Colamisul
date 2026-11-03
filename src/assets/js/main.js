(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const gsap = !reduced && window.gsap && window.ScrollTrigger ? window.gsap : null;
  const ST = gsap ? window.ScrollTrigger : null;
  if (gsap) gsap.registerPlugin(ST);

  /* ---------- Smooth scroll (Lenis) ---------- */
  let lenis = null;
  if (!reduced && window.Lenis) {
    lenis = new window.Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1 });
    if (gsap) {
      lenis.on('scroll', ST.update);
      gsap.ticker.add(t => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }

  const header = $('.site-header');
  const headerOffset = () => -((header ? header.offsetHeight : 0) + 16);
  const scrollToTarget = (target, focus) => {
    if (lenis) lenis.scrollTo(target, { offset: typeof target === 'number' ? 0 : headerOffset(), duration: 1.2 });
    else if (typeof target === 'number') window.scrollTo({ top: target, behavior: reduced ? 'auto' : 'smooth' });
    else target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
    if (focus && target.focus) {
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
  };

  // Links âncora (#tabela, pular para o conteúdo…) passam pelo Lenis
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href*="#"]');
    if (!a || a.target === '_blank') return;
    const url = new URL(a.href, location.href);
    if (url.pathname !== location.pathname || !url.hash || url.hash === '#') return;
    const el = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!el) return;
    e.preventDefault();
    scrollToTarget(el, true);
    history.pushState(null, '', url.hash);
  });

  /* ---------- Header fixo: ganha sombra ao rolar ---------- */
  const toTop = $('.fa-top');
  const mnav = $('.mobile-nav');
  const onScroll = () => {
    const y = window.scrollY;
    header && header.classList.toggle('is-scrolled', y > 10);
    toTop && toTop.classList.toggle('show', y > 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  toTop && toTop.addEventListener('click', () => scrollToTarget(0));

  /* ---------- Dropdown (clique / teclado) ---------- */
  $$('.has-sub > button').forEach(btn => {
    btn.addEventListener('click', () => {
      const li = btn.parentElement;
      const open = li.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
    });
  });
  document.addEventListener('click', e => {
    $$('.has-sub.open').forEach(li => { if (!li.contains(e.target)) { li.classList.remove('open'); li.firstElementChild.setAttribute('aria-expanded', 'false'); } });
  });

  /* ---------- Menu mobile ---------- */
  const openBtn = $('.menu-toggle');
  const closeBtn = $('.mobile-nav .close');
  const setMenu = open => {
    mnav.classList.toggle('open', open);
    mnav.setAttribute('aria-hidden', !open);
    openBtn.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
    if (lenis) open ? lenis.stop() : lenis.start();
    if (open) closeBtn.focus(); else openBtn.focus();
    if (open && gsap) gsap.from($$('.mobile-nav > ul > li', mnav), { x: 40, opacity: 0, duration: .5, stagger: .05, ease: 'power3.out', delay: .15, clearProps: 'all' });
  };
  openBtn && openBtn.addEventListener('click', () => setMenu(true));
  closeBtn && closeBtn.addEventListener('click', () => setMenu(false));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && mnav && mnav.classList.contains('open')) setMenu(false); });

  /* ---------- Animações ---------- */
  const showReveal = els => {
    if (gsap) gsap.to(els, { opacity: 1, y: 0, duration: .6, stagger: .04, ease: 'power2.out', overwrite: true });
    else els.forEach(el => el.classList.add('in'));
  };

  if (gsap) {
    // Título da home: entra palavra por palavra
    $$('[data-split]').forEach(el => {
      const words = el.textContent.trim().split(/\s+/);
      el.setAttribute('aria-label', el.textContent.trim());
      el.innerHTML = words.map(w => `<span class="w" aria-hidden="true"><span>${w.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</span></span>`).join(' ');
      gsap.from($$('.w > span', el), { yPercent: 115, duration: 1.1, stagger: .07, ease: 'power4.out', delay: .2 });
    });

    // Banner da home: zoom de entrada + parallax
    const heroImg = $('.hero picture img');
    if (heroImg) {
      gsap.from(heroImg, { scale: 1.12, duration: 1.8, ease: 'power3.out' });
      gsap.to(heroImg, { yPercent: 14, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    }

    // Heros das páginas internas
    $$('.page-hero').forEach(hero => {
      const img = $('.page-hero__media img', hero);
      if (img) {
        gsap.from(img, { scale: 1.15, duration: 1.8, ease: 'power3.out' });
        gsap.to(img, { yPercent: 18, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
      }
      gsap.from($$('.inner .grid > div > *', hero), { y: 30, opacity: 0, duration: .9, stagger: .08, ease: 'power3.out', delay: .1 });
    });

    // Banners das páginas internas (arte em imagem): zoom de entrada + parallax
    $$('.banner:not(.banner--video)').forEach(banner => {
      const img = $('img', banner);
      if (!img) return;
      gsap.from(img, { scale: 1.1, duration: 1.8, ease: 'power3.out' });
      gsap.to(img, { yPercent: 12, ease: 'none', scrollTrigger: { trigger: banner, start: 'top top', end: 'bottom top', scrub: true } });
    });

    // Bloco de título abaixo do banner
    $$('.page-intro').forEach(intro => gsap.from($$('.grid > div > *', intro), { y: 24, opacity: 0, duration: .9, stagger: .08, ease: 'power3.out', delay: .2 }));

    // Linha do tempo vertical: bolinhas "acendem" ao chegar
    $$('.vtimeline .dot').forEach(dot => gsap.from(dot, { scale: 0, duration: .6, ease: 'back.out(2)', scrollTrigger: { trigger: dot, start: 'top 85%', once: true } }));

    // Fotos em moldura: parallax suave dentro do quadro
    $$('.media-frame img').forEach(img => {
      gsap.fromTo(img, { yPercent: -6, scale: 1.14 }, { yPercent: 6, scale: 1.14, ease: 'none', scrollTrigger: { trigger: img.closest('.media-frame'), start: 'top bottom', end: 'bottom top', scrub: true } });
    });

    // Foto que percorre a coluna: acompanha a rolagem, mais devagar que o texto, até a base encostar no fim do texto
    gsap.matchMedia().add('(min-width: 1024px)', () => {
      $$('.travel-media').forEach(frame => {
        const col = frame.parentElement;
        const dist = () => Math.max(0, col.getBoundingClientRect().height - frame.offsetHeight);
        gsap.to(frame, { y: dist, ease: 'none', scrollTrigger: { trigger: col, start: () => 'top ' + (document.querySelector('.site-header').offsetHeight + 32), end: 'bottom bottom', scrub: true, invalidateOnRefresh: true } });
      });
    });

    // Blocos .reveal entram em grupo, escalonados
    ST.batch('.reveal', {
      start: 'top 88%',
      once: true,
      onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, duration: .9, stagger: .12, ease: 'power3.out', overwrite: true }),
    });

    // Listas que aparecem item a item
    [['.timeline', 'li'], ['.principles', 'li'], ['.check-list', 'li'], ['.steps ol', 'li'], ['.hero-stats', 'li']].forEach(([wrap, item]) => {
      $$(wrap).forEach(w => gsap.from($$(item, w), { x: -24, opacity: 0, duration: .7, stagger: .08, ease: 'power3.out', scrollTrigger: { trigger: w, start: 'top 85%', once: true } }));
    });

    // Números contando (70+, 13, 90 m, 50 mil L…)
    $$('.hero-stats strong, .stat strong').forEach(el => {
      const m = el.textContent.trim().match(/^(\d+)(.*)$/);
      if (!m) return;
      const end = +m[1], suffix = m[2], o = { v: 0 };
      el.setAttribute('aria-label', el.textContent.trim());
      el.textContent = '0' + suffix;
      gsap.to(o, { v: end, duration: 1.6, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true }, onUpdate: () => { el.textContent = Math.round(o.v) + suffix; } });
    });

    // Foto do produto flutuando de leve
    $$('.product-figure img').forEach(img => gsap.to(img, { y: -10, duration: 3, ease: 'sine.inOut', repeat: -1, yoyo: true }));

    // Círculo decorativo das faixas de CTA acompanha a rolagem
    $$('.cta-band').forEach(band => gsap.fromTo(band, { '--blob': '0px' }, { '--blob': '-60px', ease: 'none', scrollTrigger: { trigger: band, start: 'top bottom', end: 'bottom top', scrub: true } }));

    // Fontes e imagens mudam a altura da página: recalcula os gatilhos
    document.fonts && document.fonts.ready.then(() => ST.refresh());
  } else if ('IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver(entries => entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -8% 0px' });
    $$('.reveal').forEach(el => io.observe(el));
  } else $$('.reveal').forEach(el => el.classList.add('in'));

  const afterFilter = items => {
    showReveal(items.filter(it => !it.classList.contains('is-hidden')));
    if (ST) ST.refresh();
    if (lenis) lenis.resize();
  };

  /* ---------- Filtro de produtos por categoria ---------- */
  const prodFilter = $('[data-filter="produtos"]');
  if (prodFilter) {
    const items = $$('[data-cat]');
    prodFilter.addEventListener('click', e => {
      const chip = e.target.closest('.chip'); if (!chip) return;
      $$('.chip', prodFilter).forEach(c => c.setAttribute('aria-pressed', c === chip));
      const cat = chip.dataset.value;
      items.forEach(it => it.classList.toggle('is-hidden', cat !== 'todos' && it.dataset.cat !== cat));
      afterFilter(items);
    });
  }

  /* ---------- Informativos: ano + ordenação ---------- */
  const infoWrap = $('[data-informativos]');
  if (infoWrap) {
    const list = $('[data-list]', infoWrap);
    const items = $$('[data-ano]', list);
    const yearBox = $('[data-filter="ano"]', infoWrap);
    const sortSel = $('[data-sort]', infoWrap);
    let ano = 'todos';
    const apply = () => {
      items.forEach(it => it.classList.toggle('is-hidden', ano !== 'todos' && it.dataset.ano !== ano));
      const dir = sortSel.value === 'antigos' ? 1 : -1;
      items.sort((a, b) => dir * (a.dataset.ordem - b.dataset.ordem)).forEach(it => list.appendChild(it));
      afterFilter(items);
    };
    yearBox.addEventListener('click', e => {
      const chip = e.target.closest('.chip'); if (!chip) return;
      $$('.chip', yearBox).forEach(c => c.setAttribute('aria-pressed', c === chip));
      ano = chip.dataset.value; apply();
    });
    sortSel.addEventListener('change', apply);
  }

  /* ---------- Formulário de contato (sem backend: abre o e-mail com os dados preenchidos) ---------- */
  $$('form[data-contact]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const d = Object.fromEntries(new FormData(form));
      const body = `Nome: ${d.nome}\nTelefone: ${d.telefone}\nE-mail: ${d.email}\n\n${d.mensagem}`;
      window.location.href = `mailto:${form.dataset.contact}?subject=${encodeURIComponent(d.assunto || 'Contato pelo site')}&body=${encodeURIComponent(body)}`;
      const st = $('.form-status', form); if (st) st.textContent = 'Abrimos seu aplicativo de e-mail com a mensagem pronta para envio.';
    });
  });

  // Ano no rodapé
  $$('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
})();
