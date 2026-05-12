// =============================================================
//  CLINIC SITE — SHARED JAVASCRIPT
//  Covers: index.html, teens.html, relationships.html,
//          young-adults.html, fatherhood.html, depression-anxiety.html
//
//  Sections:
//    1. Navbar — Scroll Effect
//    3. Navbar — Parallax Hero (homepage only)
//    4. Navbar — Mobile Hamburger Menu
//    5. Navbar — Dropdown (hover + keyboard toggle)
//    6. Scroll Reveal (IntersectionObserver)
//    7. Contact Form — Async Submit (homepage only)
//    8. Lazy Load SVG Objects
//
//  NOTE — Tailwind config is NOT here. It must be an inline <script>
//  in each page's <head> before the Tailwind CDN tag so the design
//  tokens are available when Tailwind initialises.


// ─────────────────────────────────────────────────────────────
//  1. NAVBAR — SCROLL EFFECT
//  Adds `.scrolled` class after 40 px to trigger the solid
//  background and box-shadow defined in shared.css
// ─────────────────────────────────────────────────────────────

const navbar = document.getElementById('navbar');
const heroParallaxImg = document.getElementById('hero-parallax-img'); // null on inner pages
let scrollTicking = false;

function onScroll() {
    if (scrollTicking) return;
    scrollTicking = true;

    requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        // Toggle scrolled state
        navbar.classList.toggle('scrolled', scrollY > 40);

        // ── 3. NAVBAR — PARALLAX HERO (homepage only) ──────────
        // Only runs when #hero-parallax-img exists and on desktop
        // to avoid wasting CPU on mobile/tablet.
        if (heroParallaxImg && window.innerWidth > 1024 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            heroParallaxImg.style.transform = `translateY(${scrollY * 0.4}px)`;
        }

        scrollTicking = false;
    });
}

window.addEventListener('scroll', onScroll, { passive: true });
// Run once immediately so navbar/parallax are correct before first scroll
onScroll();


// ─────────────────────────────────────────────────────────────
//  4. NAVBAR — MOBILE HAMBURGER MENU
//  Toggles a compact dropdown panel below the navbar.
//  Hamburger animates into ×. Closes on: hamburger re-tap,
//  outside click, Escape key, or nav link activation.
//  `inert` manages tab order + accessibility (replaces aria-hidden).
// ─────────────────────────────────────────────────────────────

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

// ── Open / Close ─────────────────────────────────────────────
function openMobileMenu() {
    mobileMenu.classList.add('open');
    mobileMenu.removeAttribute('inert');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
}

function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('inert', '');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.querySelectorAll('.mobile-accordion-panel.open').forEach(panel => {
        panel.classList.remove('open');
        panel.setAttribute('inert', '');
        panel.previousElementSibling.setAttribute('aria-expanded', 'false');
    });
    hamburger.focus();
}

hamburger.addEventListener('click', () =>
    mobileMenu.classList.contains('open') ? closeMobileMenu() : openMobileMenu()
);

// Close on outside click
document.addEventListener('click', e => {
    if (mobileMenu.classList.contains('open') &&
        !mobileMenu.contains(e.target) &&
        !hamburger.contains(e.target)) {
        closeMobileMenu();
    }
});

// Close on Escape
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        closeMobileMenu();
    }
});

// Close when a nav link is activated
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileMenu));

// ── Accordion ────────────────────────────────────────────────
mobileMenu.querySelectorAll('.mobile-accordion').forEach(item => {
    const btn = item.querySelector('button');
    const panel = item.querySelector('.mobile-accordion-panel');

    btn.addEventListener('click', () => {
        const open = panel.classList.toggle('open');
        btn.setAttribute('aria-expanded', String(open));
        open ? panel.removeAttribute('inert') : panel.setAttribute('inert', '');
    });
});


// ─────────────────────────────────────────────────────────────
//  5. NAVBAR — DROPDOWN
//  Mouse hover is handled entirely by CSS (:hover on .nav-dropdown).
//  JS manages .dropdown-open for keyboard and touch: click toggles,
//  focusout / outside-click / Escape close it.
// ─────────────────────────────────────────────────────────────

function openDD(dd) {
    document.querySelectorAll('.nav-dropdown').forEach(other => {
        if (other !== dd) closeDD(other);
    });
    dd.classList.add('dropdown-open');
    dd.querySelector('button').setAttribute('aria-expanded', 'true');
}

function closeDD(dd) {
    dd.classList.remove('dropdown-open');
    dd.querySelector('button').setAttribute('aria-expanded', 'false');
}

document.querySelectorAll('.nav-dropdown').forEach(dd => {
    dd.querySelector('button').addEventListener('click', () => {
        dd.classList.contains('dropdown-open') ? closeDD(dd) : openDD(dd);
    });

    dd.addEventListener('focusout', e => {
        if (!dd.contains(e.relatedTarget)) closeDD(dd);
    });
});

document.addEventListener('click', e => {
    if (!e.target.closest('.nav-dropdown'))
        document.querySelectorAll('.nav-dropdown').forEach(closeDD);
});

document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.nav-dropdown.dropdown-open').forEach(dd => {
        closeDD(dd);
        dd.querySelector('button').focus();
    });
});


// ─────────────────────────────────────────────────────────────
//  6. SCROLL REVEAL
//  Watches every .reveal element and adds .visible once it
//  enters the viewport (threshold: 12%). Unobserves after reveal
//  so the IntersectionObserver stays lean.
// ─────────────────────────────────────────────────────────────

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Lazy-load any SVGs inside this revealed element
            entry.target.querySelectorAll('.lazy-svg[data-src]').forEach(el => {
                fetch(el.dataset.src)
                    .then(r => r.text())
                    .then(svg => {
                        el.innerHTML = svg;
                        const svgEl = el.querySelector('svg');
                        svgEl?.removeAttribute('width');
                        svgEl?.removeAttribute('height');
                    });
            });

            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

// ─────────────────────────────────────────────────────────────
//  7. CONTACT FORM — ASYNC SUBMIT (homepage only)
//  Linked to: #contact-form
//  onsubmit attribute removed from HTML — listener registered here instead
// ─────────────────────────────────────────────────────────────

const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async function handleSubmit(e) {
        e.preventDefault();

        const btn = document.getElementById('submit-btn');
        const feedback = document.getElementById('form-feedback');

        btn.disabled = true;
        btn.textContent = 'שולח...';

        try {
            const res = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { 'Accept': 'application/json' }
            });

            if (res.ok) {
                contactForm.classList.add('hidden');
                feedback.classList.remove('hidden');
                feedback.classList.add('visible');
            } else {
                throw new Error('server error');
            }
        } catch {
            btn.disabled = false;
            btn.textContent = 'שליחה';
            alert('אירעה שגיאה בשליחה. אנא נסו שנית או פנו דרך וואטסאפ.');
        }
    });
}


// ─────────────────────────────────────────────────────────────
//  9. TIMELINE COMPONENT
//  Handles scroll-linked activation of cards, numbers, and spine
//  for the Hakomi timeline section.
// ─────────────────────────────────────────────────────────────

// ── Timeline: Card Activation (all screens) + Spine/Fill/Dots (desktop only) ──
(function () {
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

    // Collect all timeline cards and map to their corresponding number elements
    const items = Array.from(document.querySelectorAll('.timeline-item__card')).map(function (card) {
        return {
            card: card,
            number: card.closest('div[class*="grid"]')?.querySelector('div.timeline-item__number'),
            span: card.querySelector('span.timeline-item__number'),
            y: 0
        };
    });

    if (!items.length) return;

    // Desktop-only elements
    const wrapper = isDesktop ? document.getElementById('timeline-wrapper') : null;
    const spine = isDesktop ? document.getElementById('timeline-spine') : null;
    const fill = isDesktop ? document.getElementById('timeline-fill') : null;
    const dots = isDesktop ? Array.from(document.querySelectorAll('.timeline-dot')) : [];

    let spineAbsTop = 0, spineHeight = 1, dotAbsYs = [];

    // Cache card centers and spine geometry on init and resize
    function init() {
        const parentRect = spine ? (spine.offsetParent || wrapper).getBoundingClientRect() : null;

        items.forEach(function (item) {
            const r = item.card.getBoundingClientRect();
            item.y = r.top + window.scrollY + r.height / 2;

            // Also compute center relative to spine parent for dot positioning
            if (parentRect) item.relY = r.top + r.height / 2 - parentRect.top;
        });

        if (spine && parentRect) {
            const top = items[0].relY;
            const height = items[items.length - 1].relY - items[0].relY;

            spine.style.top = top + 'px';
            spine.style.height = height + 'px';
            spine.style.bottom = 'auto';

            dots.forEach(function (dot, i) {
                if (items[i]) {
                    dot.style.top = (items[i].relY - top) + 'px';
                    dot.style.transform = 'translateY(-50%)';
                }
            });

            spineAbsTop = parentRect.top + window.scrollY + top;
            spineHeight = height || 1;
            dotAbsYs = items.map(item => parentRect.top + window.scrollY + item.relY);
        }

        update();
    }

    // Single scroll handler for all activation and spine fill
    function update() {
        const anchor = window.scrollY + window.innerHeight * (isDesktop ? 0.5 : 0.7);

        items.forEach(function (item, i) {
            const on = anchor > item.y;
            item.card.classList.toggle('accent-active', on);
            item.number?.classList.toggle('tl-active', on);
            item.span?.classList.toggle('tl-active', on);
        });

        if (fill) {
            const p = Math.max(0, Math.min(1, (anchor - spineAbsTop) / spineHeight));
            fill.style.height = (p * spineHeight) + 'px';
            dots.forEach(function (dot, i) {
                dot.classList.toggle('tl-active', anchor > dotAbsYs[i]);
            });
        }
    }

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', init);
    document.readyState === 'loading'
        ? document.addEventListener('DOMContentLoaded', init)
        : requestAnimationFrame(init);
})();


// ─────────────────────────────────────────────────────────────
//  10. COOKIE NOTICE
//  Shows after 1500 ms if not already dismissed.
//  JS-state class: cookie-notice--visible (not a Tailwind class).
//  Dismissal: slides out, waits for transition, then hides.
// ─────────────────────────────────────────────────────────────

(function () {
    var notice = document.getElementById('cookie-notice');
    if (!notice) return;

    // Already dismissed — stay hidden forever
    if (localStorage.getItem('cookieDismissed')) return;

    // Show after 1500 ms
    setTimeout(function () {
        notice.removeAttribute('hidden');
        // Force reflow so the transition fires from the hidden state
        notice.offsetHeight;
        notice.classList.add('cookie-notice--visible');
    }, 1500);

    // Dismiss
    document.getElementById('cookie-dismiss').addEventListener('click', function () {
        notice.classList.remove('cookie-notice--visible');
        localStorage.setItem('cookieDismissed', '1');
        // Wait for transition before hiding from accessibility tree
        setTimeout(function () { notice.setAttribute('hidden', ''); }, 400);
    });
})();