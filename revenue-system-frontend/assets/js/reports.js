(function(){
  'use strict';

  function generateReport(event){
    event && event.preventDefault();
    var tableBody = document.getElementById('reportTableBody');
    if (!tableBody) return;
    tableBody.innerHTML = '';
    for (var i=0; i<10; i++){
      var tr = document.createElement('tr');
      tr.innerHTML = '<td>INV-' + (1000+i) + '</td><td>Citizen ' + (i+1) + '</td><td>KES ' + (Math.round(Math.random()*10000)) + '</td><td>' + new Date().toLocaleDateString() + '</td>';
      tableBody.appendChild(tr);
    }
  }

  document.addEventListener('DOMContentLoaded', function(){
    generateReport();
    var form = document.getElementById('reportFiltersForm');
    if (form) form.addEventListener('submit', generateReport);
  });
})();

