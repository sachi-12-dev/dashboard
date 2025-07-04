// dashboard.js — Enhanced Interactivity for EWSC Dashboard

document.addEventListener('DOMContentLoaded', function () {
  // ===== Dark Mode Toggle with Persistence =====
  const darkToggle = document.getElementById('darkToggle');
  const currentTheme = localStorage.getItem('ews-theme');
  if (currentTheme === 'dark') document.body.classList.add('dark');

  darkToggle?.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem('ews-theme', isDark ? 'dark' : 'light');
  });

  // ===== Reveal On Scroll Animation =====
  function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    reveals.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < windowHeight * 0.85) {
        el.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  // ===== Chart.js Setup =====
  const costChart = document.getElementById('costChart');
  if (costChart) {
    new Chart(costChart, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'AWS Spend ($)',
          data: [300, 420, 380, 460, 580, 540],
          borderColor: '#D4AF37',
          backgroundColor: 'rgba(212, 175, 55, 0.2)',
          tension: 0.3,
          fill: true,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
      },
    });
  }

  const ec2Chart = document.getElementById('ec2Chart');
  if (ec2Chart) {
    new Chart(ec2Chart, {
      type: 'bar',
      data: {
        labels: ['us-east-1', 'us-west-2', 'eu-west-1'],
        datasets: [{
          label: 'EC2 Instances',
          data: [12, 9, 6],
          backgroundColor: '#D4AF37',
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
      },
    });
  }

  // ===== Simulated Login Redirect (Optional Future Enhancement) =====
  if (window.location.pathname.includes('login.html')) {
    const form = document.querySelector('form');
    form?.addEventListener('submit', function (e) {
      e.preventDefault();
      window.location.href = 'dashboard.html';
    });
  }
});
