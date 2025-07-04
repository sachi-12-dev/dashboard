// dashboard.js - Behavior only for dashboard.html

document.addEventListener('DOMContentLoaded', () => {
  // Highlight active sidebar link based on URL hash
  const currentHash = window.location.hash || '#overview';
  document.querySelectorAll('.sidebar ul li a').forEach(link => {
    if (link.getAttribute('href') === currentHash) {
      link.classList.add('active');
    }
  });

  // Initialize Chart.js charts if canvas elements exist
  const costEl = document.getElementById('costChart');
  if (costEl) {
    new Chart(costEl.getContext('2d'), {
      type: 'line',
      data: {
        labels: ['Feb','Mar','Apr','May','Jun','Jul'],
        datasets: [{
          label: 'Monthly Spend ($)',
          data: [800,950,1200,1100,1450,1920],
          borderColor: '#d4af37',
          backgroundColor: 'rgba(212,175,55,0.2)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true } },
        plugins: { legend: { display: false } }
      }
    });
  }

  const ec2El = document.getElementById('ec2Chart');
  if (ec2El) {
    new Chart(ec2El.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['us-east-1','us-west-2','eu-central-1'],
        datasets: [{
          label: 'Running Instances',
          data: [12,9,6],
          backgroundColor: '#d4af37'
        }]
      },
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true } },
        plugins: { legend: { display: false } }
      }
    });
  }
});