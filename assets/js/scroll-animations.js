// Scroll reveal animations
document.addEventListener('DOMContentLoaded', function() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with animate-on-scroll class
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(el => {
    observer.observe(el);
  });

  // Add stagger animation to grid items
  const grids = document.querySelectorAll('.features-grid, .quick-links, .components-grid, .community-grid');
  grids.forEach(grid => {
    const items = grid.querySelectorAll('.feature-card, .quick-link-card, .component-card, .community-channel');
    items.forEach((item, index) => {
      item.classList.add('animate-on-scroll');
      item.classList.add(`delay-${Math.min(index + 1, 6)}`);
      observer.observe(item);
    });
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.06)';
    navbar.style.backgroundColor = 'rgba(250, 251, 252, 0.95)';
  } else {
    navbar.style.boxShadow = 'none';
    navbar.style.backgroundColor = 'rgba(250, 251, 252, 0.8)';
  }
  
  lastScroll = currentScroll;
});

