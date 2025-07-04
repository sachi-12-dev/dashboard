// dashboard.js
document.addEventListener('DOMContentLoaded', () => {
  // — Sidebar collapse/expand with persistence —
  const sidebar = document.getElementById('sidebar');
  const btn = document.getElementById('sidebarToggle');
  if (localStorage.getItem('ews-sidebar-collapsed') === 'true') {
    sidebar.classList.add('collapsed');
  }
  btn.addEventListener('click', () => {
    const isCollapsed = sidebar.classList.toggle('collapsed');
    localStorage.setItem('ews-sidebar-collapsed', isCollapsed);
  });

  // — Back to Top button —
  const back = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    back.style.display = window.scrollY > window.innerHeight/2 ? 'flex' : 'none';
  });
  back.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // — Reveal-on-scroll —
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((ents, o) => {
    ents.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('active');
        o.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  reveals.forEach(r => obs.observe(r));

  // — Smooth scroll & active-link highlight —
  const links = document.querySelectorAll('.sidebar-nav a[href^="#"]');
  links.forEach(l => {
    l.addEventListener('click', e => {
      e.preventDefault();
      links.forEach(x => x.classList.remove('active'));
      l.classList.add('active');
      const sec = document.querySelector(l.getAttribute('href'));
      sec?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
  window.addEventListener('scroll', () => {
    const pos = window.scrollY + 100;
    links.forEach(l => {
      const sec = document.querySelector(l.getAttribute('href'));
      if (sec && sec.offsetTop <= pos && pos < sec.offsetTop + sec.offsetHeight) {
        l.classList.add('active');
      } else {
        l.classList.remove('active');
      }
    });
  });

  // — (Optional) Chart.js setup with animations —
  const cfg = {
    responsive: true,
    animation: { duration: 1000, easing: 'easeOutQuart' },
    plugins: { legend: { display: false }},
  };
  const costCtx = document.getElementById('costChart');
  if (costCtx) new Chart(costCtx, {
    type: 'line',
    data: {
      labels: ['Jan','Feb','Mar','Apr','May','Jun'],
      datasets: [{ data: [300,420,380,460,580,540], borderColor:'var(--primary)', tension:0.3, fill:true }]
    },
    options: cfg
  });
  const ec2Ctx = document.getElementById('ec2Chart');
  if (ec2Ctx) new Chart(ec2Ctx, {
    type: 'bar',
    data: {
      labels: ['us-east-1','us-west-2','eu-west-1'],
      datasets: [{ data: [12,9,6], backgroundColor:'var(--primary)' }]
    },
    options: cfg
  });
});
