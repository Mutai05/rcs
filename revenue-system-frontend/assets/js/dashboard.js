(function(){
  'use strict';

  function mockKpis(){
    var elms = document.querySelectorAll('[data-kpi]');
    elms.forEach(function(el){
      var key = el.getAttribute('data-kpi');
      var value = 0;
      if (key === 'todayCollections') value = 123456;
      if (key === 'arrears') value = 789012;
      if (key === 'activePermits') value = 4321;
      if (key === 'violations') value = 27;
      el.textContent = new Intl.NumberFormat().format(value);
    });
  }

  function initCharts(){
    if (!window.Chart) return;
    var ctx = document.getElementById('collectionsChart');
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
          datasets: [{ label: 'Collections', data: [120, 90, 140, 200, 180, 220, 160], borderColor: '#0d6efd'}]
        },
        options: { responsive: true, maintainAspectRatio: false }
      });
    }
  }

  document.addEventListener('DOMContentLoaded', function(){
    mockKpis();
    initCharts();
  });
})();

