(function(){
  'use strict';

  function filterByStatus(){
    var select = document.getElementById('violationStatusFilter');
    if (!select) return;
    var status = select.value;
    document.querySelectorAll('[data-violation-status]').forEach(function(row){
      var match = status === 'all' || row.getAttribute('data-violation-status') === status;
      row.style.display = match ? '' : 'none';
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    var select = document.getElementById('violationStatusFilter');
    if (select) select.addEventListener('change', filterByStatus);
  });
})();

