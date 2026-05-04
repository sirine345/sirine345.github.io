/* =============================================
   PORTFOLIO — script.js
   ============================================= */

/* --- LOADER --------------------------------- */
window.addEventListener('load', () => {
  const loaderInit = document.getElementById('loader-init');
  const loaderSub  = document.getElementById('loader-sub');
  const loaderLine = document.getElementById('loader-line');

  // Déclenche les animations du loader
  setTimeout(() => {
    loaderInit.classList.add('show');
    loaderSub.classList.add('show');
    loaderLine.classList.add('show');
  }, 100);

  // Cache le loader après 2,8 secondes
  setTimeout(() => {
    document.getElementById('loader').classList.add('hide');
  }, 2800);
});

/* --- HEADER AU SCROLL ----------------------- */
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  revealOnScroll();
});

/* --- SMOOTH SCROLL (ancres) ---------------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* --- MENU HAMBURGER (mobile) --------------- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

function closeMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
}

/* --- REVEAL AU SCROLL ---------------------- */
function revealOnScroll() {
  const elements = document.querySelectorAll('.reveal');
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      el.classList.add('visible');
    }
  });
}

// Délai progressif (stagger) pour les éléments enfants dans les grilles
const staggerParents = document.querySelectorAll(
  '.projets-grid, .formation-grid, .apropos-grid, .timeline'
);

staggerParents.forEach(parent => {
  const children = [...parent.querySelectorAll('.reveal')];
  children.forEach((el, index) => {
    el.style.transitionDelay = `${index * 0.1}s`;
  });
});

// Lancement initial (éléments déjà visibles au chargement)
revealOnScroll();

/* --- FORMULAIRE DE CONTACT ----------------- */
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const btn = this.querySelector('.submit-btn');
    const originalText = btn.textContent;

    // Feedback visuel
    btn.textContent = 'Message envoyé ✓';
    btn.style.background = '#4CAF50';
    btn.disabled = true;

    // Réinitialisation après 3 secondes
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3000);
  });
}

emailjs.init('f_Kvy0CG7gXj6iJ1X');

document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    emailjs.sendForm('service_y7qyke6', 'template_xjofwec', this)
        .then(() => {
            alert('Message envoyé !');
            this.reset();
        })
        .catch(() => {
            alert('Erreur, réessaie.');
        });
});