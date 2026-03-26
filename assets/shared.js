// =============================================================
//  CLINIC SITE — SHARED JAVASCRIPT
//  Covers: index.html, teens.html, relationships.html,
//          young-adults.html, fatherhood.html, depression-anxiety.html
//
//  Sections:
//    1. Navbar — Scroll Effect
//    3. Navbar — Parallax Hero (homepage only)
//    4. Navbar — Mobile Hamburger Menu
//    5. Navbar — Dropdown (keyboard toggle + outside-click close)
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
//  Focus is trapped inside while open, released on close.
// ─────────────────────────────────────────────────────────────

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

// ── Focus trap ───────────────────────────────────────────────
let _trapHandler = null;

function trapFocus(container) {
    const focusable = Array.from(
        container.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
    ).filter(el => !el.closest('[inert]'));
    if (!focusable.length) return;
    focusable[0].focus();

    _trapHandler = e => {
        if (e.key !== 'Tab') return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
            if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
            if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
    };
    document.addEventListener('keydown', _trapHandler);
}

function releaseFocus() {
    if (_trapHandler) {
        document.removeEventListener('keydown', _trapHandler);
        _trapHandler = null;
    }
}

// ── Open / Close ─────────────────────────────────────────────
function openMobileMenu() {
    mobileMenu.removeAttribute('inert');
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    trapFocus(mobileMenu);
}

function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    mobileMenu.setAttribute('inert', '');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    releaseFocus();
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
mobileMenu.querySelectorAll('.mobile-accordion-chevron').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Prevent click from bubbling if needed, though they don't overlap with the link
        e.stopPropagation();
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
        // The panel is the next sibling of the .mobile-accordion-header
        const header = btn.closest('.mobile-accordion-header');
        if (header && header.nextElementSibling) {
            header.nextElementSibling.classList.toggle('open', !expanded);
        }
    });
});


// ─────────────────────────────────────────────────────────────
//  5. NAVBAR — DROPDOWN
//  Mouse: opens on hover (mouseenter/mouseleave on the [data-dropdown] li).
//  Keyboard: click the chevron [data-dropdown-toggle] button to toggle.
//  Only one dropdown can be open at a time.
// ─────────────────────────────────────────────────────────────

function closeAllDropdowns(except) {
    document.querySelectorAll('[data-dropdown]').forEach(dd => {
        if (dd === except) return;
        dd.classList.remove('dropdown-open');
        const toggle = dd.querySelector('[data-dropdown-toggle]');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
}

// ── Hover (mouse users) ──────────────────────────────────────
document.querySelectorAll('[data-dropdown]').forEach(dd => {
    dd.addEventListener('mouseenter', () => {
        closeAllDropdowns(dd);
        dd.classList.add('dropdown-open');
        const toggle = dd.querySelector('[data-dropdown-toggle]');
        if (toggle) toggle.setAttribute('aria-expanded', 'true');
    });

    dd.addEventListener('mouseleave', () => {
        dd.classList.remove('dropdown-open');
        const toggle = dd.querySelector('[data-dropdown-toggle]');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
});

// ── Click-toggle (keyboard / chevron button users) ───────────
// Requires [data-dropdown-toggle] attribute on the chevron button in HTML
document.querySelectorAll('[data-dropdown-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
        const dd = btn.closest('[data-dropdown]');
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        if (!expanded) closeAllDropdowns(dd);
        btn.setAttribute('aria-expanded', String(!expanded));
        dd.classList.toggle('dropdown-open', !expanded);
    });

    btn.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            btn.click();
        }
    });
});

// ── Outside click — closes all ───────────────────────────────
document.addEventListener('click', e => {
    if (!e.target.closest('[data-dropdown]')) {
        closeAllDropdowns(null);
    }
});

// ── Tab away — close that specific dropdown ──────────────────
document.querySelectorAll('[data-dropdown]').forEach(dd => {
    dd.addEventListener('focusout', e => {
        if (!dd.contains(e.relatedTarget)) {
            dd.classList.remove('dropdown-open');
            const toggle = dd.querySelector('[data-dropdown-toggle]');
            if (toggle) toggle.setAttribute('aria-expanded', 'false');
        }
    });
});

// ── Escape — close all, return focus to chevron ──────────────
document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('[data-dropdown].dropdown-open').forEach(dd => {
        dd.classList.remove('dropdown-open');
        const toggle = dd.querySelector('[data-dropdown-toggle]');
        if (toggle) {
            toggle.setAttribute('aria-expanded', 'false');
            toggle.focus();
        }
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
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

// Requires [data-reveal] attribute on elements in HTML
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
//  8. LAZY LOAD SVG OBJECTS
//  Linked to: .lazy-object, [data-src]
//  Uses IntersectionObserver to swap data-src to data when in
//  viewport. Replaces <object> with static <img> for Safari
//  to avoid rendering bugs with complex SVGs.
// ─────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    const lazySVGs = document.querySelectorAll('.lazy-svg');
    if (!lazySVGs.length) return;

    const svgObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                const el = entry.target;

                fetch(el.dataset.src)
                    .then(r => r.text())
                    .then(svg => {
                        el.innerHTML = svg;
                        const svgEl = el.querySelector('svg');
                        svgEl?.removeAttribute('width');
                        svgEl?.removeAttribute('height');
                    });
                svgObserver.unobserve(el);
            });
        },
        {
            threshold: 0.5
        }
    );

    lazySVGs.forEach(target => svgObserver.observe(target));
});
