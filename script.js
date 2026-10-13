// Muhammed Rabeeh N — Portfolio Scripts

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Toggle
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  
  // Check persisted theme or default to dark
  const savedTheme = localStorage.getItem('rabeeh_theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('rabeeh_theme', next);
      updateThemeIcon(next);
    });
  }

  function updateThemeIcon(theme) {
    if (themeToggle) {
      themeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
      themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
  }

  // 2. Reading / Scroll Progress Bar & Nav Scroll Effect
  const progressBar = document.getElementById('progress');
  const nav = document.querySelector('nav');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    
    if (progressBar) {
      progressBar.style.width = scrollPercent + '%';
    }

    if (nav) {
      if (scrollTop > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }

    if (backToTop) {
      if (scrollTop > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }

    updateActiveNavLink();
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 3. Mobile Hamburger Menu
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.innerHTML = navLinks.classList.contains('open') ? '✕' : '☰';
    });

    // Close menu when clicking link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.innerHTML = '☰';
      });
    });
  }

  // 4. Typewriter Effect
  const typeElement = document.querySelector('.type');
  const roles = [
    'Educational Researcher',
    'Full-Stack Web Developer',
    'State A-Grade Public Speaker',
    'Creative Video Editor & Videographer',
    'Robotics & Tech Innovator'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeEffect() {
    if (!typeElement) return;

    const currentRole = roles[roleIndex];
    if (isDeleting) {
      typeElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      typeElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 1800; // pause at completion
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 450; // pause before next word
    }

    setTimeout(typeEffect, typingSpeed);
  }
  typeEffect();

  // 5. Active Nav Spy on Scroll
  const sections = document.querySelectorAll('header, section');
  const navItems = document.querySelectorAll('.nav-links a');

  function updateActiveNavLink() {
    let currentId = '';
    const scrollPosition = window.scrollY + 180;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${currentId}`) {
        item.classList.add('active');
      }
    });
  }

  // 6. Animate Skill Bars & Counters on Scroll
  const skillBars = document.querySelectorAll('.bar i');
  const statNumbers = document.querySelectorAll('.stat b');
  let animatedStats = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate skills
        if (entry.target.classList.contains('skills-wrapper') || entry.target.classList.contains('skills')) {
          skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width') || '85%';
            bar.style.width = width;
          });
        }

        // Animate stat counters
        if (entry.target.classList.contains('stats') && !animatedStats) {
          animatedStats = true;
          statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'), 10);
            const suffix = stat.getAttribute('data-suffix') || '';
            let current = 0;
            const increment = Math.max(1, Math.floor(target / 40));
            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              stat.textContent = current + suffix;
            }, 30);
          });
        }
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.skills-wrapper, .skills, .stats').forEach(el => observer.observe(el));

  // 7. Project Category Filters
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.proj-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 8. Certificate Modal Interactivity
  const modal = document.getElementById('certModal');
  const modalClose = document.getElementById('modalClose');
  const modalTitle = document.getElementById('modalTitle');
  const modalMeta = document.getElementById('modalMeta');
  const modalBody = document.getElementById('modalBody');
  const modalSeal = document.getElementById('modalSeal');
  const modalOrg = document.getElementById('modalOrg');
  const modalYear = document.getElementById('modalYear');
  const modalGrade = document.getElementById('modalGrade');

  const certData = {
    'speech': {
      title: 'State A Grade — Speech & Oratory',
      meta: 'Kerala State School Youth Festival • Higher Secondary',
      body: 'Awarded State A Grade for outstanding mastery of Malayalam & English rhetoric, persuasive oratory, thematic depth, and vocal dynamics in competitive state-level forensics.',
      seal: '🏆',
      org: 'General Education Department, Govt. of Kerala',
      year: 'State Youth Festival',
      grade: 'State A Grade (Distinction)'
    },
    'robotics': {
      title: 'District A Grade — Robotics & Tech Innovation',
      meta: 'District Science & Mathematics Fair',
      body: 'Designed, prototyped, and programmed an autonomous sensor-driven smart robotics arm and telemetry system, securing District First-Class A Grade honors against top competitors.',
      seal: '🤖',
      org: 'District Educational Office (DEO) & Science Fair Committee',
      year: 'District Level Fair',
      grade: 'District A Grade'
    },
    'booktest': {
      title: 'District A Grade — Book Test & Literary Criticism',
      meta: 'District Reading & Literary Analysis Conclave',
      body: 'Demonstrated exceptional literary critique, thematic comprehension, speed reading synthesis, and scholarly essay evaluation, achieving prestigious District A Grade status.',
      seal: '📖',
      org: 'State Library Council & District Reading Forum',
      year: 'District Literary Conclave',
      grade: 'District A Grade'
    },
    'sslc': {
      title: 'Academic Distinction — SSLC 9 A+ Grades',
      meta: 'Secondary School Leaving Certificate (SSLC) Board Examination',
      body: 'Graduated secondary education with extraordinary academic merit, scoring A+ grades across 9 core disciplines including Mathematics, Physics, Chemistry, Social Sciences, and Languages.',
      seal: '🌟',
      org: 'Board of Public Examinations, Govt. of Kerala',
      year: 'SSLC Examination',
      grade: '9 A+ Distinction'
    },
    'collabs': {
      title: '50+ Verified Brand Collaborations & Media Reels',
      meta: 'Commercial Videography & Digital Creative Production',
      body: 'Delivered high-converting visual assets, promotional campaigns, commercial video edits, and content creation for regional and national consumer brands, academies, and creators.',
      seal: '🎥',
      org: 'Various Commercial & Digital Media Brands',
      year: '2022 — Present',
      grade: 'Verified Creator Portfolio'
    },
    'web': {
      title: 'Web Engineering & Full-Stack Prototyping',
      meta: 'Modern Frontend & Web Systems Development',
      body: 'Proficiency in architecting responsive web interfaces, modern JavaScript standards, responsive CSS layout paradigms, and client-side system engineering.',
      seal: '💻',
      org: 'Open Source Community & Independent Clients',
      year: 'Continuous',
      grade: '100+ Delivered Deliverables'
    }
  };

  document.querySelectorAll('.cert-view-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const id = button.getAttribute('data-cert');
      const data = certData[id];

      if (data && modal) {
        modalTitle.textContent = data.title;
        modalMeta.textContent = data.meta;
        modalBody.textContent = data.body;
        modalSeal.textContent = data.seal;
        modalOrg.textContent = data.org;
        modalYear.textContent = data.year;
        modalGrade.textContent = data.grade;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (modalClose && modal) {
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // 9. Interactive Contact Form with Validation & Toast
  const contactForm = document.getElementById('contactForm');
  const toast = document.getElementById('toast');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('userName').value.trim();
      const email = document.getElementById('userEmail').value.trim();
      const subject = document.getElementById('userSubject').value.trim();
      const message = document.getElementById('userMessage').value.trim();

      if (!name || !email || !message) {
        showToast('⚠️ Please fill in all required fields.', '#ff7675');
        return;
      }

      // Format mailto link for direct sending fallback
      const mailtoLink = `mailto:muhammedrabeehn@gmail.com?subject=${encodeURIComponent(subject || 'Inquiry from Portfolio')}&body=${encodeURIComponent(`Hi Rabeeh,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
      
      showToast('🚀 Thank you Muhammed Rabeeh will get back to you shortly!', '#00d4b3');
      contactForm.reset();

      // Open email client after short friendly prompt
      setTimeout(() => {
        window.location.href = mailtoLink;
      }, 1000);
    });
  }

  function showToast(text, color) {
    if (!toast) return;
    toast.textContent = text;
    if (color) toast.style.borderColor = color;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }
});
