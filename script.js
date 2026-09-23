/* =========================================================
     CERTIFICATIONS DATA
     Add your own certificate images or PDFs here.
     - src: path to your image (jpg/png) or PDF file
     - if src is left empty (""), a placeholder icon shows instead
     - PDFs open in the lightbox as an embedded viewer
     ========================================================= */
  var certifications = [
    { title: "Excellence Award", issuer: "APEC Schools Sta. Rita", date: "August 2022", src: "assets/Excellence_Award.png", category: "Academic" },
    { title: "Meritorious Award in Filipino", issuer: "APEC Schools Sta. Rita", date: "August 2022", src: "assets/Meritorious_Award_in_Filipino.png", category: "Academic" },
    { title: "Intro to Programming — GDSC Study Jam", issuer: "FEU Alabang", date: "January 2024", src: "assets/GDSC_Certificate.PNG", category: "Event" },
    { title: "Sensors to Decisions — Embedded ML Webinar", issuer: "FEU Alabang", date: "May 2024", src: "assets/Certificate_of_Participation.png", category: "Event" },
    { title: "Top Performing Student, S.Y. 2023–2024", issuer: "FEU Alabang", date: "August 2024", src: "assets/Certificate_of_Recognition__1st_Year_.png", category: "Academic" },
    { title: "Dean's Bronze Certificate", issuer: "FEU Alabang, 1st Term S.Y. 2024–2025", date: "February 2025", src: "assets/Dean_s_Bronze_Certificate.png", category: "Academic" },
    { title: "Networking — IT Specialist Certification", issuer: "Certiport / CertNexus / Pearson VUE", date: "March 2025", src: "assets/Networking_Certification.png", category: "Technical" },
    { title: "Certificate of Membership", issuer: "Junior Philippine Computer Society (JPCS), FEU Alabang Chapter", date: "2026", src: "assets/JPCS_Certificate_of_Membership.jpg", category: "Organization" },
    { title: "CyberOps Associate", issuer: "Cisco Networking Academy, FEU Alabang", date: "July 2026", src: "assets/Gutierrez_CyberOps_Associate_certificate_Gutierez.png", category: "Technical" }
  ];

  var categoryColors = {
    Academic: "var(--teal)",
    Technical: "var(--coral)",
    Event: "var(--amber)",
    Organization: "var(--coral)"
  };

  var certIconSVG = '<svg class="cert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4"/><path d="M9.5 13l1.7 1.7L14.5 11"/></svg>';
  var eyeIconSVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12z"/><circle cx="12" cy="12" r="3"/></svg>';

  function isPdf(src){ return /\.pdf($|\?)/i.test(src); }

  var activeCategory = 'All';

  function buildCertFilters(){
    var wrap = document.getElementById('certFilters');
    if (!wrap) return;
    var categories = ['All'];
    certifications.forEach(function(c){
      if (c.category && categories.indexOf(c.category) === -1) categories.push(c.category);
    });
    wrap.innerHTML = '';
    categories.forEach(function(cat){
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'cert-filter' + (cat === activeCategory ? ' active' : '');
      btn.textContent = cat;
      btn.addEventListener('click', function(){
        activeCategory = cat;
        wrap.querySelectorAll('.cert-filter').forEach(function(b){ b.classList.remove('active'); });
        btn.classList.add('active');
        buildCertGrid();
      });
      wrap.appendChild(btn);
    });
  }

  function buildCertGrid(){
    var grid = document.getElementById('certGrid');
    grid.innerHTML = '';

    var countEl = document.getElementById('certCount');
    if (countEl) countEl.textContent = certifications.length;

    var visible = certifications.filter(function(c){
      return activeCategory === 'All' || c.category === activeCategory;
    });

    visible.forEach(function(cert, i){
      var card = document.createElement('button');
      card.type = 'button';
      card.className = 'cert-card';
      card.setAttribute('aria-haspopup', 'dialog');
      card.style.setProperty('--cat-color', categoryColors[cert.category] || 'var(--teal)');
      card.style.setProperty('--stagger', i);

      var thumbHTML;
      if (cert.src && !isPdf(cert.src)) {
        thumbHTML = '<div class="cert-thumb"><img src="' + cert.src + '" alt="" loading="lazy" ' +
          'onerror="this.parentElement.innerHTML=\'' + certIconSVG.replace(/'/g,"\\'") + '\'">' +
          '<div class="cert-overlay">' + eyeIconSVG + '<span>View certificate</span></div></div>';
      } else if (cert.src && isPdf(cert.src)) {
        thumbHTML = '<div class="cert-thumb">' + certIconSVG + '<div class="cert-overlay">' + eyeIconSVG + '<span>View certificate</span></div></div>';
      } else {
        thumbHTML = '<div class="cert-thumb">' + certIconSVG + '</div>';
      }

      card.innerHTML = thumbHTML +
        '<div class="cert-body">' +
          (cert.category ? '<span class="cert-tag">' + cert.category + '</span>' : '') +
          '<p class="cert-title">' + cert.title + '</p>' +
          '<p class="cert-meta">' + cert.issuer + '</p>' +
          '<p class="cert-date">' + cert.date + '</p>' +
        '</div>';

      card.addEventListener('click', function(){ openLightbox(cert, card); });
      grid.appendChild(card);
    });
  }

  var lightbox = document.getElementById('lightbox');
  var lightboxMediaWrap = document.getElementById('lightboxMediaWrap');
  var lightboxTitle = document.getElementById('lightboxTitle');
  var lightboxMeta = document.getElementById('lightboxMeta');
  var lastFocused = null;

  function openLightbox(cert, trigger){
    lastFocused = trigger;
    lightboxTitle.textContent = cert.title;
    lightboxMeta.innerHTML = cert.issuer + '<br>' + cert.date;

    if (cert.src && isPdf(cert.src)) {
      lightboxMediaWrap.innerHTML = '<embed class="lightbox-media embed" src="' + cert.src + '" type="application/pdf">';
    } else if (cert.src) {
      lightboxMediaWrap.innerHTML = '<img class="lightbox-media" src="' + cert.src + '" alt="' + cert.title + '" ' +
        'onerror="this.replaceWith(Object.assign(document.createElement(\'div\'),{className:\'lightbox-media\',style:\'display:flex;align-items:center;justify-content:center;color:#8891a0;font-family:IBM Plex Mono, monospace;font-size:.85rem;height:220px\',textContent:\'File not added yet — replace src in the certifications array\'}))">';
    } else {
      lightboxMediaWrap.innerHTML = '<div class="lightbox-media" style="display:flex;align-items:center;justify-content:center;color:#8891a0;font-family:\'IBM Plex Mono\',monospace;font-size:.85rem;height:220px">File not added yet — replace src in the certifications array</div>';
    }

    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    document.getElementById('lightboxClose').focus();
  }

  function closeLightbox(){
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lightboxMediaWrap.innerHTML = '';
    if (lastFocused) lastFocused.focus();
  }

  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function(e){ if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox(); });

  buildCertFilters();
  buildCertGrid();

  /* =========================================================
     PROJECTS DATA
     Images live in projects/<folder>/ ; links open Google Drive.
     ========================================================= */
  var projects = [
    { title:"Game-Tight with Loctite", cat:"var(--amber)", glyph:"loctite/hackathon",
      desc:"Creator-led TikTok growth campaign pitch for Loctite Philippines, built for the Henkel Hackathon. Designed the Facebook and TikTok profile mockups.",
      tags:["Canva","UI/UX","Social Campaign"], role:"UI/UX Mockup Designer",
      groups:[{ label:"Profile mockups", dir:"projects/henkel_mockups/", files:["1.png","2.png"] }],
      links:[{ label:"Mockups on Drive", url:"https://drive.google.com/drive/folders/1fEtQkt8rva06B1-CvDpbBFAt2gvHbjyt?usp=sharing" }] },

    { title:"Baylo", cat:"var(--teal)", glyph:"baylo/mobile-app", thumbMode:"strip",
      desc:"Barter web and mobile application built as a capstone research project, evaluated using the ISO/IEC 25010 quality framework.",
      tags:["Firebase","UI/UX","Research"], role:"Capstone Mobile App Project Developer, Researcher",
      groups:[{ label:"App screens", dir:"projects/baylo_mobileapp/", files:["baylo_login.png","baylo_signup.png","baylo_homepage.png","baylo_homepage_products.png","baylo_searchscreen.png","baylo_productdetails.png","baylo_tradeoffer_request.png","baylo_aimatching.png","baylo_posting1.png","baylo_posting2.png","baylo_inbox1.png","baylo_inbox2.png"] }],
      cover:["baylo_login.png","baylo_homepage_products.png","baylo_productdetails.png"],
      links:[
        { label:"Screenshots on Drive", url:"https://drive.google.com/drive/folders/1j7ismrOhl1FhpEXXtWpzQHkBuP81-4H8?usp=sharing" },
        { label:"Download working app", url:"https://drive.google.com/uc?export=download&id=1hSCu5VD8a7Ey8tcOhzaDKYmmkYcsV0KQ" },
        { label:"Alt. link (tinyurl)", url:"https://tinyurl.com/BayloAppSystem" }
      ] },

    { title:"Homio", cat:"var(--coral)", glyph:"homio/e-business",
      desc:"E-business proposal and WordPress/WooCommerce prototype (localhost) for an online home appliance store, with a product catalogue for Hanabishi, 3D Appliances, and IKEA, plus a brand logo designed in Canva.",
      thumb:"projects/homio_thumbnail.png", videoUrl:"https://drive.google.com/file/d/1WLVvHWysTI2QSYDN50Qbe_SkfYsI23BH/view?usp=sharing",
      tags:["WordPress","WooCommerce","Canva"], role:"E-Business Proposal Developer, WordPress & WooCommerce Developer, Logo Designer",
      groups:[{ label:"Logo", dir:"projects/homio_logo/", files:["1.png","2.png"] }],
      links:[
        { label:"Website video", url:"https://drive.google.com/file/d/1WLVvHWysTI2QSYDN50Qbe_SkfYsI23BH/view?usp=sharing" },
        { label:"View logo", modal:true },
        { label:"Logo on Drive", url:"https://drive.google.com/drive/folders/1u4mi_c5tlNzAhNjLpvx8ocYZ5XRs0aVU?usp=sharing" }
      ] },

    { title:"Sproutify", cat:"var(--teal)", glyph:"sproutify/e-commerce",
      desc:"Client e-commerce website for a plants and gardening business, built as a WordPress/WooCommerce prototype (localhost).",
      thumb:"projects/sproutify_thumbnail.png", videoUrl:"https://drive.google.com/file/d/1GjkBTEC3xda1QWgXWCRc9QzUr9MbB7du/view?usp=sharing",
      tags:["WordPress","WooCommerce"], role:"Freelance WordPress & WooCommerce Developer",
      groups:[],
      links:[{ label:"Website video", url:"https://drive.google.com/file/d/1GjkBTEC3xda1QWgXWCRc9QzUr9MbB7du/view?usp=sharing" }] },

    { title:"UCP IT Department Brochure", cat:"var(--amber)", glyph:"ucp/brochure",
      desc:"Commissioned tri-fold brochure designed in Canva for Universal College of Parañaque's IT Department, promoting their BSIT and ACT programs.",
      tags:["Canva","Graphic Design"], role:"Freelance Graphic Designer",
      groups:[{ label:"Brochure", dir:"projects/ucp_brochure/", files:["Front.png","Back.png"] }],
      links:[{ label:"Brochure on Drive", url:"https://drive.google.com/drive/folders/1zZ5s6Wqn8gfYSlt3ppk_rvmdJv0NNKcp?usp=sharing" }] },

    { title:"CON.SOUL Mood Board — Advanced Interface Design (IT0059)", cat:"var(--coral)", glyph:"con.soul/moodboard",
      desc:"Group branding concept for an eyewear brand. Designed Mood Board 1, \"fashion meets art and technology,\" in Canva.",
      tags:["Canva","Branding","Mood Board"], role:"Mood Board Designer",
      groups:[{ label:"Mood board", dir:"projects/consoul_moodboard/", files:["CON.SOUL Mood Board.png"] }],
      links:[{ label:"Mood board on Drive", url:"https://drive.google.com/drive/folders/1HGGi-Vr8eCNtBI4-KvPRoNPbxToZz46S?usp=sharing" }] },

    { title:"CON.SOUL App Wireframes — Advanced Interface Design (IT0059)", cat:"var(--coral)", glyph:"con.soul/wireframe", thumbMode:"strip",
      desc:"Wireframed the e-commerce app screens for the group's eyewear brand — Home, Product Listings, Product Details, Cart, Checkout, and Payment — in Adobe Illustrator.",
      tags:["Adobe Illustrator","Wireframing","UI/UX"], role:"Wireframe Designer",
      groups:[{ label:"Wireframes", dir:"projects/consoul_wireframe/", files:["consoul_homescreen.png","consoul_productlistings.png","consoul_productdetails.png","consoul_shoppingcart.png","consoul_checkout.png","consoul_payment.png"] }],
      cover:["consoul_homescreen.png","consoul_productdetails.png","consoul_checkout.png"],
      links:[{ label:"Wireframes on Drive", url:"https://drive.google.com/drive/folders/1FVWeohjJf_FZvAdS9hV5BhSUlGJ_BBRX?usp=sharing" }] },

    { title:"CON.SOUL — Basic Interface Design (IT0001)", cat:"var(--coral)", glyph:"con.soul/it0001",
      desc:"Three brand mockups designed in Canva for the group's eyewear concept — business card, apparel, and product packaging.",
      tags:["Canva","Branding","Mockups"], role:"Mockup Designer",
      groups:[{ label:"Mockups", dir:"projects/consoul_mockups/", files:["mockup1.png","mockup2.png","mockup3.png"] }],
      links:[{ label:"Mockups on Drive", url:"https://drive.google.com/drive/folders/1cUprlsbA6MXwdqwVisH8Tg_9L4UcIiFP?usp=sharing" }] }
  ];

  function pSrc(g, f){ return encodeURI(g.dir + f); }
  function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); }

  function buildProjects(){
    var grid = document.getElementById('projGrid');
    if (!grid) return;
    projects.forEach(function(p, idx){
      var total = p.groups.reduce(function(n,g){ return n + g.files.length; }, 0);
      var g0 = p.groups[0];
      var thumbInner;
      if (p.thumb) {
        thumbInner = '<img src="' + p.thumb + '" alt="" loading="lazy">';
      } else if (!total) {
        thumbInner = esc(p.glyph);
      } else if (p.cover) {
        thumbInner = p.cover.map(function(f){ return '<img src="' + pSrc(g0, f) + '" alt="" loading="lazy">'; }).join('');
      } else {
        thumbInner = '<img src="' + pSrc(g0, g0.files[0]) + '" alt="" loading="lazy">';
      }
      var cls = 'proj-thumb' + (p.thumbMode ? ' ' + p.thumbMode : '');
      var thumbHTML = p.videoUrl
        ? '<a class="' + cls + '" href="' + p.videoUrl + '" target="_blank" rel="noopener" aria-label="Watch ' + esc(p.title) + ' website video">' + thumbInner +
          '<span class="proj-play" aria-hidden="true">&#9654;</span><span class="proj-count">Watch video</span></a>'
        : total
        ? '<button type="button" class="' + cls + '" data-idx="' + idx + '" aria-label="View ' + esc(p.title) + ' images">' + thumbInner +
          '<span class="proj-count">' + total + (total === 1 ? ' image' : ' images') + '</span></button>'
        : '<div class="' + cls + '">' + thumbInner + '</div>';
      var linksHTML = p.links.map(function(l){
        if (l.modal) return '<a href="#" class="proj-modal-link" data-idx="' + idx + '">' + esc(l.label) + '</a>';
        return '<a href="' + l.url + '" target="_blank" rel="noopener">' + esc(l.label) + '</a>';
      }).join('');

      var card = document.createElement('div');
      card.className = 'proj-card';
      card.style.setProperty('--cat', p.cat);
      card.innerHTML = thumbHTML +
        '<div class="proj-body"><h3>' + esc(p.title) + '</h3><p>' + esc(p.desc) + '</p>' +
        '<div class="proj-tags">' + p.tags.map(function(t){ return '<span>' + esc(t) + '</span>'; }).join('') + '</div>' +
        '<div class="proj-links">' + linksHTML + '</div>' +
        '<p class="proj-role">' + esc(p.role) + '</p></div>';
      grid.appendChild(card);
      var ml = card.querySelector('.proj-modal-link');
      if (ml) ml.addEventListener('click', function(e){ e.preventDefault(); openProject(p, ml); });
      var btn = card.querySelector('button.proj-thumb');
      if (btn) btn.addEventListener('click', function(){ openProject(p, btn); });
    });
  }

  var pm = document.getElementById('projModal');
  var pmState = { p:null, g:0, i:0, trigger:null };
  function pmRender(){
    var p = pmState.p, g = p.groups[pmState.g];
    var tabs = document.getElementById('pmTabs');
    tabs.innerHTML = '';
    if (p.groups.length > 1) {
      p.groups.forEach(function(grp, gi){
        var b = document.createElement('button');
        b.type = 'button'; b.textContent = grp.label;
        if (gi === pmState.g) b.className = 'active';
        b.addEventListener('click', function(){ pmState.g = gi; pmState.i = 0; pmRender(); });
        tabs.appendChild(b);
      });
    }
    var img = document.getElementById('pmImg');
    img.src = pSrc(g, g.files[pmState.i]);
    img.alt = p.title + ' — ' + g.label + ' ' + (pmState.i + 1);
    var strip = document.getElementById('pmStrip');
    strip.innerHTML = '';
    if (g.files.length > 1) {
      g.files.forEach(function(f, fi){
        var b = document.createElement('button');
        b.type = 'button'; b.setAttribute('aria-label', 'Image ' + (fi + 1));
        if (fi === pmState.i) b.className = 'active';
        b.innerHTML = '<img src="' + pSrc(g, f) + '" alt="">';
        b.addEventListener('click', function(){ pmState.i = fi; pmRender(); });
        strip.appendChild(b);
      });
    }
    var multi = g.files.length > 1;
    document.getElementById('pmPrev').style.display = multi ? '' : 'none';
    document.getElementById('pmNext').style.display = multi ? '' : 'none';
    document.getElementById('pmTitle').textContent = p.title;
    document.getElementById('pmMeta').textContent = p.role + (multi ? '  ·  ' + (pmState.i + 1) + ' / ' + g.files.length : '');
    document.getElementById('pmLinks').innerHTML = p.links.map(function(l){
      return '<a href="' + l.url + '" target="_blank" rel="noopener">' + esc(l.label) + ' ↗</a>';
    }).join('');
  }
  function pmStep(d){
    var g = pmState.p.groups[pmState.g], n = g.files.length;
    pmState.i = (pmState.i + d + n) % n; pmRender();
  }
  function openProject(p, trigger){
    pmState = { p:p, g:0, i:0, trigger:trigger };
    pmRender();
    pm.classList.add('open');
    document.body.style.overflow = 'hidden';
    document.getElementById('pmClose').focus();
  }
  function closeProject(){
    pm.classList.remove('open');
    document.body.style.overflow = '';
    document.getElementById('pmImg').removeAttribute('src');
    if (pmState.trigger) pmState.trigger.focus();
  }
  document.getElementById('pmClose').addEventListener('click', closeProject);
  document.getElementById('pmPrev').addEventListener('click', function(){ pmStep(-1); });
  document.getElementById('pmNext').addEventListener('click', function(){ pmStep(1); });
  pm.addEventListener('click', function(e){ if (e.target === pm) closeProject(); });
  document.addEventListener('keydown', function(e){
    if (!pm.classList.contains('open')) return;
    if (e.key === 'Escape') closeProject();
    else if (e.key === 'ArrowLeft') pmStep(-1);
    else if (e.key === 'ArrowRight') pmStep(1);
  });
  buildProjects();

  /* ---------- light/dark theme toggle ---------- */
  (function(){
    var root = document.documentElement;
    var toggle = document.getElementById('themeToggle');
    var mq = window.matchMedia('(prefers-color-scheme: dark)');

    function isDark(){
      var explicit = root.getAttribute('data-theme');
      if (explicit === 'dark') return true;
      if (explicit === 'light') return false;
      return mq.matches;
    }
    function updateButton(){
      var dark = isDark();
      toggle.setAttribute('aria-pressed', String(dark));
      toggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    }

    toggle.addEventListener('click', function(){
      var next = isDark() ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch(e) {}
      updateButton();
    });

    updateButton();
  })();

  /* ---------- scroll progress ruler ---------- */
  var rulerFill = document.getElementById('rulerFill');
  function updateRuler(){
    var h = document.documentElement;
    var scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    rulerFill.style.width = (scrolled || 0) + '%';
  }

  /* ---------- active nav link on scroll ---------- */
  var links = document.querySelectorAll('.navlinks a');
  var sections = Array.from(links).map(function(a){ return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
  function updateActiveLink(){
    var y = window.scrollY + 110;
    var current = sections[0];
    sections.forEach(function(sec){ if (sec.offsetTop <= y) current = sec; });
    links.forEach(function(a){ a.classList.toggle('active', a.getAttribute('href') === '#' + current.id); });
  }

  window.addEventListener('scroll', function(){ updateRuler(); updateActiveLink(); }, { passive:true });
  updateRuler(); updateActiveLink();

  /* ---------- hero spotlight follows cursor ---------- */
  var hero = document.getElementById('heroSection');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasHover = window.matchMedia('(hover: hover)').matches;
  if (hero && hasHover && !reduceMotion) {
    hero.addEventListener('mousemove', function(e){
      var r = hero.getBoundingClientRect();
      hero.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      hero.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  }

  /* ---------- magnetic buttons ---------- */
  if (hasHover && !reduceMotion) {
    document.querySelectorAll('.magnetic').forEach(function(btn){
      btn.addEventListener('mousemove', function(e){
        var r = btn.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * 0.25;
        var y = (e.clientY - r.top - r.height / 2) * 0.4;
        btn.style.transform = 'translate(' + x + 'px,' + y + 'px)';
      });
      btn.addEventListener('mouseleave', function(){ btn.style.transform = ''; });
    });
  }

  /* ---------- typewriter role cycler ---------- */
  var roles = ["Web Developer", "Mobile App Developer", "UI/UX Designer", "Backend Tinkerer (Firebase)"];
  var roleTextEl = document.getElementById('roleText');
  if (reduceMotion) {
    roleTextEl.textContent = roles.join(' · ');
  } else {
    (function typewriter(){
      var roleIndex = 0, charIndex = 0, deleting = false;
      function tick(){
        var word = roles[roleIndex];
        if (!deleting) {
          charIndex++;
          roleTextEl.textContent = word.slice(0, charIndex);
          if (charIndex === word.length) { deleting = true; setTimeout(tick, 1400); return; }
        } else {
          charIndex--;
          roleTextEl.textContent = word.slice(0, charIndex);
          if (charIndex === 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; }
        }
        setTimeout(tick, deleting ? 35 : 65);
      }
      tick();
    })();
  }