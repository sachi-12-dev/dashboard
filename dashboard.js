document.addEventListener('DOMContentLoaded', () => {
  // ===== Sidebar Toggle with Persistence =====
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('sidebarToggle');
  const collapsed = localStorage.getItem('ews-sidebar-collapsed');
  if (collapsed === 'true') sidebar.classList.add('collapsed');
  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    const isCollapsed = sidebar.classList.contains('collapsed');
    localStorage.setItem('ews-sidebar-collapsed', isCollapsed);
  });

  // ===== Back to Top Button =====
  const backToTop = document.createElement('button');
  backToTop.id = 'backToTop';
  backToTop.textContent = '↑';
  Object.assign(backToTop.style, {
    position: 'fixed',
    bottom: '1.5rem',
    right: '1.5rem',
    width: '3rem',
    height: '3rem',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: 'var(--primary)',
    color: 'var(--text-light)',
    fontSize: '1.5rem',
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: '1000',
  });
  document.body.appendChild(backToTop);

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', () => {
    backToTop.style.display = window.scrollY > window.innerHeight / 2 ? 'flex' : 'none';
  });

  // ===== Reveal Sections On Scroll =====
  const reveals = document.querySelectorAll('.reveal');
  const observerOptions = { threshold: 0.15 };
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  reveals.forEach(el => revealObserver.observe(el));

  // ===== Smooth Scroll & Active Link Highlight =====
  const navLinks = document.querySelectorAll('.sidebar-nav a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });

  window.addEventListener('scroll', () => {
    const fromTop = window.scrollY + 100;
    navLinks.forEach(link => {
      const section = document.querySelector(link.getAttribute('href'));
      if (section && section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  });

  // ===== Chart.js Setup =====
  const costChartEl = document.getElementById('costChart');
  if (costChartEl) {
    new Chart(costChartEl, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'AWS Spend ($)',
          data: [300, 420, 380, 460, 580, 540],
          borderColor: 'var(--primary)',
          backgroundColor: 'rgba(212, 175, 55, 0.2)',
          tension: 0.3,
          fill: true,
        }],
      },
      options: {
        responsive: true,
        animation: { duration: 1200, easing: 'easeOutQuart' },
        plugins: { legend: { display: false } },
        scales: { x: { grid: { display: false } } },
      },
    });
  }

  const ec2ChartEl = document.getElementById('ec2Chart');
  if (ec2ChartEl) {
    new Chart(ec2ChartEl, {
      type: 'bar',
      data: {
        labels: ['us-east-1', 'us-west-2', 'eu-west-1'],
        datasets: [{
          label: 'EC2 Instances',
          data: [12, 9, 6],
          backgroundColor: 'var(--primary)',
        }],
      },
      options: {
        responsive: true,
        animation: { duration: 1000, easing: 'easeOutBounce' },
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } },
      },
    });
  }

  // ===== Optional: Simulated Login Redirect =====
  if (window.location.pathname.includes('login.html')) {
    const form = document.querySelector('form');
    form?.addEventListener('submit', e => {
      e.preventDefault();
      window.location.href = 'dashboard.html';
    });
  }
});
