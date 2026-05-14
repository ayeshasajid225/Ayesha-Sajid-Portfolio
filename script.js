/* ============================================================
   ALEX NOVA PORTFOLIO — script.js
   Pure JavaScript for all interactive features
   ============================================================ */

'use strict';

/* ============================================================
   1. LOADING SCREEN
   Hides after 2.2 seconds once assets are ready
   ============================================================ */
window.addEventListener('load', function () {
  const loader = document.getElementById('loader');
  setTimeout(function () {
    loader.classList.add('hidden');
    // Trigger hero animations after loader hides
    document.querySelectorAll('.hero-content .reveal, .hero-avatar-wrap.reveal').forEach(function (el) {
      el.classList.add('revealed');
    });
  }, 2200);
});


/* ============================================================
   2. STICKY NAVBAR
   Adds 'scrolled' class for glass effect + active link tracking
   ============================================================ */
(function () {
  const nav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', function () {
    // Scrolled class
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Active nav link based on scroll position
    let currentSection = '';
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentSection) {
        link.classList.add('active');
      }
    });
  });

  // Smooth close navbar on mobile link click
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      const navCollapse = document.getElementById('navbarNav');
      if (navCollapse && navCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });
})();


/* ============================================================
   3. TYPING TEXT ANIMATION
   Cycles through roles with a typing/deleting effect
   ============================================================ */
(function () {
  const roles = [
    'Graphic Designer',
    'Front-End Developer',
    'UI/UX Designer',
    'Brand Strategist',
    'Creative Thinker'
  ];

  const typedEl = document.getElementById('typedText');
  if (!typedEl) return;

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typedEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typedEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 110;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at end of word
      typingSpeed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  // Start typing after loader
  setTimeout(type, 2500);
})();


/* ============================================================
   4. SCROLL REVEAL ANIMATIONS
   Pure JS IntersectionObserver for fade-in on scroll
   ============================================================ */
(function () {
  const revealElements = document.querySelectorAll('.reveal');

  if (!revealElements.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Unobserve after reveal to save resources
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(function (el) {
    observer.observe(el);
  });
})();


/* ============================================================
   5. ANIMATED COUNTERS
   Animates stat numbers when they enter the viewport
   ============================================================ */
(function () {
  const counters = document.querySelectorAll('[data-target]');

  if (!counters.length) return;

  const animateCounter = function (el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(function () {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current);
    }, 16);
  };

  const counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(function (counter) {
    counterObserver.observe(counter);
  });
})();


/* ============================================================
   6. SKILL BAR ANIMATIONS
   Animates progress bars when skills section is visible
   ============================================================ */
(function () {
  const skillFills = document.querySelectorAll('.skill-fill');

  if (!skillFills.length) return;

  const skillObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const targetWidth = entry.target.getAttribute('data-width') + '%';
        // Slight delay for visual effect
        setTimeout(function () {
          entry.target.style.width = targetWidth;
        }, 200);
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  skillFills.forEach(function (fill) {
    skillObserver.observe(fill);
  });
})();


/* ============================================================
   7. PROJECT FILTER
   Filters project cards by category
   ============================================================ */
(function () {
  const filterBtns = document.querySelectorAll('.project-filters .filter-btn');
  const projectItems = document.querySelectorAll('.project-item');

  if (!filterBtns.length) return;

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      // Update active button
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectItems.forEach(function (item) {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.classList.remove('hidden');
          // Re-trigger reveal animation
          item.classList.remove('revealed');
          setTimeout(function () { item.classList.add('revealed'); }, 10);
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
})();

/* ============================================================
   8. DESIGN GALLERY FILTER
   Filters graphic design items by category
   ============================================================ */
(function () {
  const gFilterBtns = document.querySelectorAll('.design-filters .filter-btn');
  const designItems = document.querySelectorAll('.design-item');

  if (!gFilterBtns.length) return;

  gFilterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      gFilterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      const gFilter = btn.getAttribute('data-gfilter');

      designItems.forEach(function (item) {
        if (gFilter === 'all' || item.getAttribute('data-gcat') === gFilter) {
          item.classList.remove('hidden');
          item.style.display = '';
        } else {
          item.classList.add('hidden');
          item.style.display = 'none';
        }
      });
    });
  });
})();


/* ============================================================
   9. BACK TO TOP BUTTON
   Shows/hides and scrolls to top smoothly
   ============================================================ */
(function () {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


/* ============================================================
   10. CONTACT FORM HANDLER
   Shows success message on submit
   ============================================================ */
(function () {
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Simple validation: check required fields
    const nameInput = form.querySelector('input[type="text"]');
    const emailInput = form.querySelector('input[type="email"]');

    if (!nameInput.value.trim() || !emailInput.value.trim()) {
      // Shake effect on invalid
      form.style.animation = 'shake 0.4s ease';
      setTimeout(function () { form.style.animation = ''; }, 400);
      return;
    }

    // Simulate submission (replace with real API call)
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Sending...';
    submitBtn.disabled = true;

    setTimeout(function () {
      form.style.display = 'none';
      successMsg.style.display = 'block';
    }, 1500);
  });
})();


/* ============================================================
   11. SMOOTH SCROLLING FOR ANCHOR LINKS
   Handles all nav links and CTA buttons
   ============================================================ */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const offset = 80; // Navbar height
        const targetTop = targetEl.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    });
  });
})();


/* ============================================================
   12. MOUSE PARALLAX ON HERO SHAPES
   Subtle parallax movement on background shapes
   ============================================================ */
(function () {
  const shapes = document.querySelectorAll('.shape');
  if (!shapes.length) return;

  document.addEventListener('mousemove', function (e) {
    const mx = (e.clientX / window.innerWidth - 0.5) * 2;
    const my = (e.clientY / window.innerHeight - 0.5) * 2;

    shapes.forEach(function (shape, i) {
      const speed = (i + 1) * 8;
      const x = mx * speed;
      const y = my * speed;
      shape.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    });
  });
})();


/* ============================================================
   13. CARD TILT EFFECT
   Subtle 3D tilt on glass cards on hover
   ============================================================ */
(function () {
  const cards = document.querySelectorAll('.glass-card');

  cards.forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      const tiltX = ((y - cy) / cy) * 6;
      const tiltY = ((x - cx) / cx) * -6;

      card.style.transform = 'translateY(-4px) rotateX(' + tiltX + 'deg) rotateY(' + tiltY + 'deg)';
      card.style.transition = 'transform 0.1s ease';
    });

    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
      card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  });
})();


/* ============================================================
   14. NEWSLETTER FORM
   Simple subscriber feedback
   ============================================================ */
(function () {
  const newsletterBtn = document.querySelector('.newsletter-form .btn');
  const newsletterInput = document.querySelector('.newsletter-form input');

  if (!newsletterBtn) return;

  newsletterBtn.addEventListener('click', function () {
    if (!newsletterInput.value.trim() || !newsletterInput.value.includes('@')) {
      newsletterInput.style.borderColor = 'rgba(239,68,68,0.5)';
      setTimeout(function () { newsletterInput.style.borderColor = ''; }, 2000);
      return;
    }
    newsletterBtn.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i>Subscribed!';
    newsletterBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    newsletterInput.value = '';
    newsletterInput.disabled = true;
    newsletterBtn.disabled = true;
  });
})();


/* ============================================================
   15. CUSTOM CURSOR + GLOWING BLUE TRAIL (desktop only)
   - Custom ring cursor that follows the mouse
   - Small dot at exact pointer position
   - Spawns glowing trail particles on mousemove
   - Cursor morphs on hovering links/buttons
   ============================================================ */
(function () {
  // Only run on desktop (pointer device)
  if (window.innerWidth < 768 || !window.matchMedia('(pointer: fine)').matches) return;

  /* --- Inject cursor CSS --- */
  const cursorStyle = document.createElement('style');
  cursorStyle.textContent = `
    /* Hide native cursor site-wide */
    * { cursor: none !important; }

    /* Outer ring */
    #cx-ring {
      position: fixed;
      top: 0; left: 0;
      width: 36px; height: 36px;
      border: 2px solid rgba(0, 183, 255, 0.7);
      border-radius: 50%;
      pointer-events: none;
      z-index: 99999;
      transform: translate(-50%, -50%);
      transition: width 0.25s ease, height 0.25s ease,
                  border-color 0.25s ease, background 0.25s ease,
                  opacity 0.3s ease;
      will-change: transform;
      mix-blend-mode: screen;
    }
    #cx-ring.hovering {
      width: 54px; height: 54px;
      border-color: rgba(0, 229, 255, 1);
      background: rgba(0, 183, 255, 0.08);
      box-shadow: 0 0 18px rgba(0, 183, 255, 0.5),
                  0 0 40px rgba(0, 183, 255, 0.2);
    }
    #cx-ring.clicking {
      width: 22px; height: 22px;
      background: rgba(0, 183, 255, 0.25);
      border-color: rgba(0, 229, 255, 1);
    }
    #cx-ring.hidden { opacity: 0; }

    /* Inner dot */
    #cx-dot {
      position: fixed;
      top: 0; left: 0;
      width: 6px; height: 6px;
      background: #00e5ff;
      border-radius: 50%;
      pointer-events: none;
      z-index: 100000;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 8px rgba(0, 229, 255, 0.9),
                  0 0 16px rgba(0, 183, 255, 0.6);
      will-change: transform;
      transition: opacity 0.3s ease, transform 0.1s ease;
    }
    #cx-dot.hovering {
      transform: translate(-50%, -50%) scale(0);
    }
    #cx-dot.hidden { opacity: 0; }

    /* Trail particle */
    .cx-trail {
      position: fixed;
      border-radius: 50%;
      pointer-events: none;
      z-index: 99998;
      transform: translate(-50%, -50%) scale(1);
      animation: trailFade 0.7s ease forwards;
      mix-blend-mode: screen;
    }
    @keyframes trailFade {
      0%   { opacity: 0.9; transform: translate(-50%, -50%) scale(1); }
      100% { opacity: 0;   transform: translate(-50%, -50%) scale(0.1); }
    }
  `;
  document.head.appendChild(cursorStyle);

  /* --- Create cursor elements --- */
  const ring = document.createElement('div');
  ring.id = 'cx-ring';
  document.body.appendChild(ring);

  const dot = document.createElement('div');
  dot.id = 'cx-dot';
  document.body.appendChild(dot);

  /* --- State --- */
  let mouseX = -200, mouseY = -200;
  let ringX = -200, ringY = -200;
  let isHovering = false;
  let frameId;

  // Trail particle pool settings
  const TRAIL_COUNT = 18;       // max particles alive at once
  const TRAIL_INTERVAL = 30;    // ms between spawns
  let lastTrailTime = 0;
  let trailIndex = 0;

  // Pre-create a pool of trail particles for performance
  const trailPool = [];
  for (let i = 0; i < TRAIL_COUNT; i++) {
    const p = document.createElement('div');
    p.className = 'cx-trail';
    p.style.opacity = '0';
    document.body.appendChild(p);
    trailPool.push(p);
  }

  /* --- Smooth ring follow via RAF --- */
  function animateCursor() {
    // Lerp ring toward actual mouse position
    ringX += (mouseX - ringX) * 0.14;
    ringY += (mouseY - ringY) * 0.14;

    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';

    // Dot snaps directly
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';

    frameId = requestAnimationFrame(animateCursor);
  }
  animateCursor();

  /* --- Spawn a trail particle --- */
  function spawnTrail(x, y) {
    const now = Date.now();
    if (now - lastTrailTime < TRAIL_INTERVAL) return;
    lastTrailTime = now;

    const p = trailPool[trailIndex % TRAIL_COUNT];
    trailIndex++;

    // Randomise size & colour slightly for organic feel
    const size = 6 + Math.random() * 10;
    const hue  = 185 + Math.random() * 30;  // cyan-blue range
    const alpha = 0.55 + Math.random() * 0.3;
    const dur   = 0.55 + Math.random() * 0.3;

    p.style.cssText = `
      position: fixed;
      border-radius: 50%;
      pointer-events: none;
      z-index: 99998;
      mix-blend-mode: screen;
      left: ${x}px;
      top:  ${y}px;
      width:  ${size}px;
      height: ${size}px;
      background: radial-gradient(circle,
        hsla(${hue}, 100%, 70%, ${alpha}) 0%,
        hsla(${hue}, 100%, 55%, 0) 70%);
      box-shadow: 0 0 ${size * 1.5}px hsla(${hue}, 100%, 65%, 0.6);
      animation: trailFade ${dur}s ease forwards;
    `;

    // Re-trigger animation by cloning trick
    p.style.animation = 'none';
    // Force reflow
    void p.offsetWidth;
    p.style.animation = `trailFade ${dur}s ease forwards`;
  }

  /* --- Mouse move --- */
  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    spawnTrail(mouseX, mouseY);
  });

  /* --- Mouse enter/leave window --- */
  document.addEventListener('mouseenter', function () {
    ring.classList.remove('hidden');
    dot.classList.remove('hidden');
  });
  document.addEventListener('mouseleave', function () {
    ring.classList.add('hidden');
    dot.classList.add('hidden');
  });

  /* --- Hover detection on interactive elements --- */
  const hoverTargets = 'a, button, .filter-btn, .tech-badge, .social-link, .glass-card, input, select, textarea, label';

  document.addEventListener('mouseover', function (e) {
    if (e.target.closest(hoverTargets)) {
      isHovering = true;
      ring.classList.add('hovering');
      dot.classList.add('hovering');
    }
  });
  document.addEventListener('mouseout', function (e) {
    if (e.target.closest(hoverTargets)) {
      isHovering = false;
      ring.classList.remove('hovering');
      dot.classList.remove('hovering');
    }
  });

  /* --- Click burst effect --- */
  document.addEventListener('mousedown', function () {
    ring.classList.add('clicking');
    // Burst: spawn several particles at once
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const radius = 12 + Math.random() * 10;
      setTimeout(function () {
        spawnTrail(
          mouseX + Math.cos(angle) * radius,
          mouseY + Math.sin(angle) * radius
        );
      }, i * 18);
    }
    lastTrailTime = 0; // force spawn even if interval hasn't elapsed
  });
  document.addEventListener('mouseup', function () {
    ring.classList.remove('clicking');
  });
})();


/* ============================================================
   16. SHAKE ANIMATION (CSS injection for form validation)
   ============================================================ */
(function () {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-8px); }
      40% { transform: translateX(8px); }
      60% { transform: translateX(-6px); }
      80% { transform: translateX(6px); }
    }
  `;
  document.head.appendChild(style);
})();

