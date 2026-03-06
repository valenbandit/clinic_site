// =============================================================
//  CLINIC SITE — SHARED JAVASCRIPT
//  Covers: index.html, teens.html, relationships.html,
//          young-adults.html, fatherhood.html, depression-anxiety.html
//
//  Sections:
//    1. Navbar — Scroll Effect
//    2. Navbar — Parallax Hero (homepage only, runs inside scroll handler)
//    3. Navbar — Mobile Hamburger Menu
//    4. Navbar — Dropdown (keyboard toggle + outside-click close)
//    5. Scroll Reveal (IntersectionObserver)
//    6. Contact Form — Async Submit (homepage only)
// =============================================================
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
        if (heroParallaxImg && window.innerWidth > 1024) {
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
//  Toggles the full-screen overlay (#mobile-menu) and animates
//  the hamburger icon into an ×. Also closes on Escape key.
// ─────────────────────────────────────────────────────────────

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileClose = document.getElementById('mobile-close');

function openMenu() {
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => mobileMenu.classList.contains('open') ? closeMenu() : openMenu());
mobileClose.addEventListener('click', closeMenu);
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });


// ─────────────────────────────────────────────────────────────
//  5. NAVBAR — DROPDOWN
//  Keyboard-accessible toggle: click the button to open/close.
//  Clicking anywhere outside the dropdown closes it.
// ─────────────────────────────────────────────────────────────

document.querySelectorAll('.nav-dropdown-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
        btn.closest('.nav-dropdown').classList.toggle('dropdown-open', !expanded);
    });

    btn.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            btn.click();
        }
    });
});

// Close any open dropdown when clicking outside it
document.addEventListener('click', e => {
    document.querySelectorAll('.nav-dropdown').forEach(dd => {
        if (!dd.contains(e.target)) {
            dd.classList.remove('dropdown-open');
            dd.querySelector('.nav-dropdown-toggle').setAttribute('aria-expanded', 'false');
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

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


// ─────────────────────────────────────────────────────────────
//  7. CONTACT FORM — ASYNC SUBMIT (homepage only)
//  Posts to Formspree via fetch. Hides the form and shows a
//  success message on a 2xx response. Exposed as a global so the
//  inline onsubmit="handleSubmit(event)" attribute still works.
// ─────────────────────────────────────────────────────────────

async function handleSubmit(e) {
    e.preventDefault();

    const form = document.getElementById('contact-form');
    const btn = document.getElementById('submit-btn');
    const feedback = document.getElementById('form-feedback');

    if (!form || !btn || !feedback) return; // not on homepage — bail silently

    btn.disabled = true;
    btn.textContent = 'שולח...';

    try {
        const res = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
            form.classList.add('hidden');
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
}
