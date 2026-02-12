// ===== DELKO WEB - Main Script =====
document.addEventListener('DOMContentLoaded', () => {

  // --- Navbar Scroll Effect ---
  const navbar = document.querySelector('.navbar');
  const handleScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });

  // --- Mobile Menu ---
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileClose = document.querySelector('.mobile-close');
  const mobileLinks = document.querySelectorAll('.mobile-menu a');

  hamburger?.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  const closeMobile = () => {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  };

  mobileClose?.addEventListener('click', closeMobile);
  mobileLinks.forEach(link => link.addEventListener('click', closeMobile));

  // --- Smooth Scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = navbar.offsetHeight + 10;
        const pos = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: pos, behavior: 'smooth' });
      }
    });
  });

  // --- Scroll Reveal ---
  const revealElements = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    const trigger = window.innerHeight * 0.88;
    revealElements.forEach(el => {
      if (el.getBoundingClientRect().top < trigger) {
        el.classList.add('active');
      }
    });
  };
  window.addEventListener('scroll', revealOnScroll, { passive: true });
  revealOnScroll(); // initial check

  // --- Counter Animation ---
  const counters = document.querySelectorAll('[data-count]');
  let countersAnimated = false;

  const animateCounters = () => {
    if (countersAnimated) return;
    const statsSection = document.querySelector('.hero-stats');
    if (!statsSection) return;
    if (statsSection.getBoundingClientRect().top < window.innerHeight) {
      countersAnimated = true;
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'), 10);
        const suffix = counter.getAttribute('data-suffix') || '';
        const prefix = counter.getAttribute('data-prefix') || '';
        let current = 0;
        const increment = Math.max(1, Math.ceil(target / 60));
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          counter.textContent = prefix + current + suffix;
        }, 25);
      });
    }
  };
  window.addEventListener('scroll', animateCounters, { passive: true });
  animateCounters();

  // --- Staggered Card Reveal ---
  const staggerCards = (selector) => {
    const cards = document.querySelectorAll(selector);
    cards.forEach((card, index) => {
      card.style.transitionDelay = `${index * 0.1}s`;
    });
  };
  staggerCards('.service-card');
  staggerCards('.portfolio-card');
  staggerCards('.testimonial-card');
  staggerCards('.plan-card');
  staggerCards('.process-step');

  // --- Parallax Glow Effect on Hero ---
  const hero = document.querySelector('.hero');
  if (hero && window.innerWidth > 768) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
      hero.style.setProperty('--mx', `${x}px`);
      hero.style.setProperty('--my', `${y}px`);
    });
  }

  // --- Active nav link highlight ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  const highlightNav = () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = 'var(--white)';
          }
        });
      }
    });
  };
  window.addEventListener('scroll', highlightNav, { passive: true });

  // --- Contact Form ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const wrapper = contactForm.closest('.contact-form-wrapper');
      wrapper.innerHTML = `
        <div class="form-success">
          <div class="success-icon">✓</div>
          <h3>¡Mensaje enviado!</h3>
          <p>Recibimos tu solicitud. Te responderemos en menos de 2 horas con una propuesta personalizada.</p>
        </div>
      `;
    });
  }

});
