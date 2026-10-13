(function () {
  'use strict';

  document.documentElement.classList.add('js');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO = 'IntersectionObserver' in window;

  /* ---------- Header + menu ---------- */
  var header = document.getElementById('header');
  var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 30); };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
  }
  burger.addEventListener('click', function () { setMenu(burger.getAttribute('aria-expanded') !== 'true'); });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  var links = [].slice.call(nav.querySelectorAll('a[href^="#"]:not(.btn)'));
  if (hasIO) {
    var navIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['top', 'services', 'platform', 'how', 'verticals', 'about', 'contact'].forEach(function (id) {
      var el = document.getElementById(id); if (el) navIO.observe(el);
    });
  }

  /* ---------- Reveal ---------- */
  var targets = document.querySelectorAll('.section .kicker, .section .h2, .section .lead, .tile, .detail, .model, .panel, .vcards li, .verticals__media, .about__media, .tabs, .tabpanel, .band__copy, .values, .contact__list');
  [].forEach.call(targets, function (el) {
    el.classList.add('reveal');
    var sibs = [].filter.call(el.parentElement.children, function (c) { return c.classList.contains('reveal'); });
    var i = sibs.indexOf(el);
    if (i > 0) el.style.setProperty('--d', Math.min(i * 0.05, 0.3) + 's');
  });
  if (hasIO && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -6% 0px' });
    [].forEach.call(targets, function (el) { io.observe(el); });
  } else {
    [].forEach.call(targets, function (el) { el.classList.add('is-in'); });
  }

  /* ---------- Services selector (copy from bkmcorp.com.mx/services) ---------- */
  var SERVICES = [
    ['Execution & Project Delivery', 'Turnkey Project Execution', 'We take a project from concept to operational reality. That means structuring, procurement, installation, clinical commissioning, and handover – managed as a single end-to-end responsibility. You don’t coordinate multiple vendors. You coordinate BKM.'],
    ['Execution & Project Delivery', 'Medical Technology Lifecycle Management', 'After deployment, the work continues. We provide scheduled maintenance, corrective service, spare parts access, and performance tracking for the equipment we deploy, so institutions aren’t left managing complex technology alone.'],
    ['Execution & Project Delivery', 'Digital Health & AI Solutions', 'Design and deployment of clinical software, AI-assisted diagnostic platforms, and integrated health information systems — built for Mexico’s institutional environment and regulatory framework.'],
    ['Market Access & Commercialization', 'Regulatory Holding & Market Entry', 'For international manufacturers entering Mexico, we provide regulatory structure, COFEPRIS compliance management, and a commercialization framework — so products reach the market without the institutional friction of building from scratch.'],
    ['Market Access & Commercialization', 'Selective Distribution', 'We represent a curated portfolio of medical technology brands where we can guarantee proper deployment, clinical support, and market positioning. We don’t list products. We operate them.'],
    ['Strategic & Financial Partnerships', 'Brand Integration Model', 'Technology manufacturers who want their products correctly deployed in Mexican institutions — not just sold — work with BKM to manage the clinical, operational, and commercial execution layer. You focus on innovation. We make sure it works in the field.'],
    ['Strategic & Financial Partnerships', 'Project Financing & Structured Partnerships', 'For projects that require capital structure, co-investment models, or long-term financial alliances, BKM builds the frameworks that make deployment feasible — connecting institutional needs with investment models designed for healthcare.']
  ];
  var tiles = [].slice.call(document.querySelectorAll('.tile'));
  var detail = document.getElementById('svc-detail');
  function showService(i) {
    var s = SERVICES[i];
    tiles.forEach(function (t, k) { t.classList.toggle('is-active', k === i); t.setAttribute('aria-selected', String(k === i)); });
    document.getElementById('svc-group').textContent = s[0];
    document.getElementById('svc-title').textContent = s[1];
    document.getElementById('svc-text').textContent = s[2];
    detail.classList.remove('is-swap'); void detail.offsetWidth; detail.classList.add('is-swap');
  }
  tiles.forEach(function (t) { t.addEventListener('click', function () { showService(Number(t.getAttribute('data-svc'))); }); });

  /* ---------- Engines diagram (copy from bkmcorp.com.mx/our-philosophy) ---------- */
  var ENGINES = [
    'A project without viable financing isn’t a project — it’s a wish. Our capital arm structures the financial models that make medical technology deployment feasible for institutions that need it, without forcing them to absorb all the risk upfront.',
    'Market access in Mexico requires more than a product. It requires regulatory positioning, sourcing intelligence, and a commercialization structure that actually reaches institutions. BKM Trade is how technology enters the system correctly.',
    'This is where most partners stop and where BKM starts. End-to-end project execution — supply chain, installation, clinical commissioning, and full lifecycle management — under a single operational responsibility.'
  ];
  var nodes = [].slice.call(document.querySelectorAll('.node'));
  var engineText = document.getElementById('engine-text');
  nodes.forEach(function (n) {
    n.addEventListener('click', function () {
      var i = Number(n.getAttribute('data-engine'));
      nodes.forEach(function (m) { m.classList.toggle('is-active', m === n); });
      engineText.textContent = ENGINES[i];
    });
  });

  /* ---------- Tabs ---------- */
  var tabs = [].slice.call(document.querySelectorAll('.tab'));
  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      tabs.forEach(function (o) {
        var on = o === t;
        o.classList.toggle('is-active', on);
        o.setAttribute('aria-selected', String(on));
        document.getElementById(o.getAttribute('aria-controls')).hidden = !on;
      });
    });
  });

  /* ---------- Hero video ---------- */
  var video = document.querySelector('.hero__video');
  if (video) {
    if (reduceMotion) { video.removeAttribute('autoplay'); video.pause(); }
    else if (hasIO) {
      new IntersectionObserver(function (en) {
        var p = en[0].isIntersecting ? video.play() : video.pause();
        if (p && p.catch) p.catch(function () {});
      }).observe(video);
    }
  }

  /* ---------- Contact form (mailto) ---------- */
  var form = document.getElementById('contact-form');
  var note = document.getElementById('form-note');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true;
    ['first', 'email', 'message'].forEach(function (n) {
      var input = form.elements[n];
      var v = input.value.trim();
      var valid = v !== '' && (n !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
      input.closest('.field').classList.toggle('is-invalid', !valid);
      if (!valid) ok = false;
    });
    if (!ok) { note.textContent = 'Please add your first name, a valid email and your message.'; return; }
    var f = form.elements;
    var name = (f.first.value.trim() + ' ' + f.last.value.trim()).trim();
    var subject = f.subject.value.trim() || 'Project inquiry · ' + name;
    var body = ['Name: ' + name, 'Email: ' + f.email.value.trim(), 'Phone: ' + (f.phone.value.trim() || '—'), '', f.message.value.trim()].join('\n');
    window.location.href = 'mailto:contact@bkm.com.mx?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    note.textContent = 'Thank you. Your email app should open with the message ready to send.';
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
