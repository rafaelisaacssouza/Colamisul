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

    // Vídeo do banner (YouTube): desliga a legenda que o player liga sozinho
    $$('iframe[data-no-captions]').forEach(f => {
      const send = (func, args) => f.contentWindow?.postMessage(JSON.stringify({ event: 'command', func, args }), '*');
      f.addEventListener('load', () => {
        f.contentWindow?.postMessage(JSON.stringify({ event: 'listening' }), '*');
        // repete nos primeiros segundos, até a legenda carregar e ser desligada
        let n = 0;
        const t = setInterval(() => {
          send('unloadModule', ['captions']);
          send('setOption', ['captions', 'track', {}]);
          if (++n > 20) clearInterval(t);
        }, 500);
      });
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

  /* ---------- Nossa história: ata de fundação (sala de museu) ---------- */
  const museum = $('[data-museum]');
  if (museum) {
    const viewport = $('[data-museum-viewport]', museum);
    const track = $('[data-museum-track]', museum);
    const bar = $('[data-museum-progress]', museum);
    const frames = $$('.museum__frame', museum);
    let st = null; // ScrollTrigger enquanto a seção está presa (desktop)
    const dist = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
    const nextBtn = $('[data-museum-next]', museum);
    let prog = 0; // 0 a 1: quanto da faixa já passou
    const setBar = p => {
      prog = p;
      if (bar) bar.style.transform = `scaleX(${p})`;
      if (nextBtn) nextBtn.classList.toggle('is-end', p > .98); // na última folha a seta some
    };

    // Desktop: o painel fica preso (sticky) ao lado do texto e as folhas passam enquanto o texto rola.
    // Timeline com o topo do painel como gatilho: começa quando o painel chega na linha do sticky
    // (prende na tela) e termina quando ele solta, no fim do texto. O topo é medido pela coluna
    // (que não é sticky) + margem do painel, para a posição não mudar se recalcular já rolado.
    if (gsap) {
      gsap.matchMedia().add('(min-width: 1024px)', () => {
        museum.classList.add('is-scrub');
        const col = museum.parentElement;
        const stickTop = () => parseFloat(getComputedStyle(museum).top) || 0;   // top do sticky no CSS
        const panelOffset = () => parseFloat(getComputedStyle(museum).marginTop) || 0;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: col,
            start: () => `top+=${panelOffset()} top+=${stickTop()}`,             // topo do painel encosta no sticky
            end: () => `bottom top+=${stickTop() + museum.offsetHeight}`,        // painel solta (fim da coluna)
            scrub: true, invalidateOnRefresh: true,
            onUpdate: self => setBar(self.progress),
          },
        });
        tl.fromTo(track, { x: 0 }, { x: () => -dist(), ease: 'none' });
        st = tl.scrollTrigger;
        // recalcula quando imagens e fontes terminam de carregar (alturas mudam)
        window.addEventListener('load', () => ST.refresh(), { once: true });
        return () => { museum.classList.remove('is-scrub'); st = null; };
      });
    }
    // Celular / movimento reduzido: faixa com rolagem horizontal
    viewport.addEventListener('scroll', () => {
      if (st) return;
      const max = viewport.scrollWidth - viewport.clientWidth;
      setBar(max ? viewport.scrollLeft / max : 0);
    }, { passive: true });

    const scrollPage = y => { if (lenis) lenis.scrollTo(y, { immediate: true }); else window.scrollTo(0, y); };

    // Arrastar com o mouse ("grab"): move a página quando presa, ou a faixa quando não
    let drag = null, moved = false;
    viewport.addEventListener('pointerdown', e => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      drag = { x: e.clientX, y: window.scrollY, left: viewport.scrollLeft };
      moved = false;
    });
    window.addEventListener('pointermove', e => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      if (!moved && Math.abs(dx) < 6) return;
      if (!moved) { moved = true; museum.classList.add('is-dragging'); }
      // arrastar a folha 1px equivale a rolar a página na proporção do percurso
      if (st) { const k = dist() ? (st.end - st.start) / dist() : 0; scrollPage(Math.min(st.end, Math.max(st.start, drag.y - dx * k))); }
      else viewport.scrollLeft = drag.left - dx;
    });
    window.addEventListener('pointerup', () => {
      if (!drag) return;
      drag = null;
      museum.classList.remove('is-dragging');
      setTimeout(() => { moved = false; }, 0);
    });
    // Soltar depois de arrastar não abre a ampliação
    viewport.addEventListener('click', e => { if (moved) { e.preventDefault(); e.stopPropagation(); } }, true);

    // Seta: leva até a próxima folha (rolando a página quando o painel está preso, ou a faixa no celular)
    if (nextBtn) nextBtn.addEventListener('click', () => {
      const d = st ? dist() : viewport.scrollWidth - viewport.clientWidth;
      if (!d) return;
      const now = prog * d;
      const alvo = frames
        .map(f => { const it = f.parentElement; return it.offsetLeft + it.offsetWidth / 2 - viewport.clientWidth / 2; })
        .find(o => o > now + 8);
      const p = alvo === undefined ? 1 : Math.min(1, alvo / d);
      if (st) {
        const y = st.start + p * (st.end - st.start);
        if (lenis) lenis.scrollTo(y, { duration: .9 }); else window.scrollTo({ top: y, behavior: 'smooth' });
      } else viewport.scrollTo({ left: p * d, behavior: 'smooth' });
    });

    // Teclado: ao focar uma folha fora da tela, a rolagem leva até ela
    frames.forEach(f => f.addEventListener('focus', () => {
      if (!st || drag) return;
      const item = f.parentElement;
      const d = dist();
      const p = d ? Math.min(1, Math.max(0, (item.offsetLeft + item.offsetWidth / 2 - viewport.clientWidth / 2) / d)) : 0;
      scrollPage(st.start + p * (st.end - st.start));
    }));

    // Ampliação: tela cheia, setas, clique para aproximar e mover o mouse para percorrer a folha
    const dlg = $('[data-lightbox]');
    if (dlg && typeof dlg.showModal === 'function') {
      const data = JSON.parse($('[data-lightbox-data]', dlg).textContent);
      const im = $('[data-lightbox-img]', dlg);
      const stage = $('[data-lightbox-stage]', dlg);
      let idx = 0, opener = null;
      const unzoom = () => { dlg.classList.remove('is-zoomed'); im.style.transformOrigin = ''; };
      const show = i => {
        idx = (i + data.length) % data.length;
        unzoom();
        const d = data[idx];
        im.src = d.src;
        im.alt = 'Ata de fundação da Colamisul: ' + d.titulo;
        $('[data-lightbox-title]', dlg).textContent = d.titulo;
        $('[data-lightbox-text]', dlg).textContent = d.legenda;
        $('[data-lightbox-count]', dlg).textContent = `${idx + 1} / ${data.length}`;
        [idx + 1, idx - 1].forEach(j => { const pre = new Image(); pre.src = data[(j + data.length) % data.length].src; });
      };
      frames.forEach(f => f.addEventListener('click', () => {
        opener = f;
        show(Number(f.dataset.index));
        dlg.showModal();
        if (lenis) lenis.stop();
      }));
      dlg.addEventListener('close', () => {
        unzoom();
        if (lenis) lenis.start();
        if (opener) opener.focus({ preventScroll: true });
      });
      $('[data-lightbox-close]', dlg).addEventListener('click', () => dlg.close());
      $('[data-lightbox-prev]', dlg).addEventListener('click', () => show(idx - 1));
      $('[data-lightbox-next]', dlg).addEventListener('click', () => show(idx + 1));
      dlg.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight') { e.preventDefault(); show(idx + 1); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); show(idx - 1); }
      });
      const origin = e => {
        const r = stage.getBoundingClientRect();
        const px = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
        const py = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
        im.style.transformOrigin = `${px * 100}% ${py * 100}%`;
      };
      stage.addEventListener('click', e => {
        if (e.target !== im && !dlg.classList.contains('is-zoomed')) { dlg.close(); return; }
        origin(e);
        dlg.classList.toggle('is-zoomed');
      });
      stage.addEventListener('pointermove', e => { if (dlg.classList.contains('is-zoomed')) origin(e); });
      dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
    }
  }

  /* ---------- Formulário de contato (sem backend: abre o e-mail com os dados preenchidos) ---------- */
  // Formulário de contato: máscaras, formatação e validação com mensagens em português
  const fmt = {
    telefone: v => {
      const d = v.replace(/\D/g, '').slice(0, 11);
      if (d.length <= 2) return d.length ? '(' + d : '';
      if (d.length <= 6) return '(' + d.slice(0, 2) + ') ' + d.slice(2);
      if (d.length <= 10) return '(' + d.slice(0, 2) + ') ' + d.slice(2, 6) + '-' + d.slice(6);
      return '(' + d.slice(0, 2) + ') ' + d.slice(2, 7) + '-' + d.slice(7);
    },
    nome: v => v.replace(/\s+/g, ' ').trim().toLowerCase().split(' ')
      .map((w, i) => (i && /^(da|de|do|das|dos|e)$/.test(w)) ? w : w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    email: v => v.replace(/\s+/g, '').toLowerCase(),
    texto: v => v.replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim()
  };
  const msgErro = el => {
    const v = el.validity;
    if (v.valueMissing) return 'Preencha este campo.';
    if (el.name === 'nome' && (v.tooShort || !/\s/.test(el.value.trim()))) return 'Informe nome e sobrenome.';
    if (el.name === 'email' && (v.typeMismatch || !/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(el.value))) return 'Informe um e-mail válido.';
    if (el.name === 'telefone' && el.value && el.value.replace(/\D/g, '').length < 10) return 'Informe o telefone com DDD.';
    if (v.tooShort) return 'Escreva pelo menos ' + el.minLength + ' caracteres.';
    return '';
  };
  const checar = el => {
    const err = document.getElementById(el.id + '-erro');
    if (!err) return true;
    const m = msgErro(el);
    err.textContent = m;
    el.setAttribute('aria-invalid', m ? 'true' : 'false');
    return !m;
  };
  $$('form[data-contact]').forEach(form => {
    const campos = $$('input, textarea', form);
    campos.forEach(el => {
      const f = fmt[el.dataset.format];
      if (el.dataset.format === 'telefone') el.addEventListener('input', () => { el.value = fmt.telefone(el.value); });
      if (el.dataset.format === 'email') el.addEventListener('input', () => {
        const n = el.value.replace(/\s+/g, '');
        if (n !== el.value) el.value = n;
      });
      el.addEventListener('blur', () => { if (f && el.value) el.value = f(el.value); if (el.value || el.hasAttribute('aria-invalid')) checar(el); });
      el.addEventListener('input', () => { if (el.getAttribute('aria-invalid') === 'true') checar(el); });
    });
    const msg = $('textarea', form), cont = $('.field-count', form);
    if (msg && cont) { const upd = () => { cont.textContent = msg.value.length + '/' + msg.maxLength; }; msg.addEventListener('input', upd); upd(); }
    form.addEventListener('submit', e => {
      e.preventDefault();
      campos.forEach(el => { const f = fmt[el.dataset.format]; if (f && el.value) el.value = f(el.value); });
      if (msg && cont) cont.textContent = msg.value.length + '/' + msg.maxLength;
      const invalidos = campos.filter(el => !checar(el));
      const st = $('.form-status', form);
      if (invalidos.length) {
        invalidos[0].focus();
        if (st) { st.textContent = 'Confira os campos destacados.'; st.classList.add('is-error'); }
        return;
      }
      const d = Object.fromEntries(new FormData(form));
      const body = 'Nome: ' + d.nome + '\nTelefone: ' + (d.telefone || '-') + '\nE-mail: ' + d.email + '\n\n' + d.mensagem;
      window.location.href = 'mailto:' + form.dataset.contact + '?subject=' + encodeURIComponent(d.assunto || 'Contato pelo site') + '&body=' + encodeURIComponent(body);
      if (st) { st.classList.remove('is-error'); st.textContent = 'Abrimos seu aplicativo de e-mail com a mensagem pronta para envio.'; }
    });
  });

  // Ano no rodapé
  $$('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
})();
