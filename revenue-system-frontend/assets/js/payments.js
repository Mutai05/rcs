(function(){
  'use strict';

  function simulatePayment(event){
    event.preventDefault();
    var form = event.target;
    var amount = parseFloat(form.querySelector('[name="amount"]').value || '0');
    if (amount <= 0) { window.showAlert && window.showAlert('Enter a valid amount', 'warning'); return; }
    window.showAlert && window.showAlert('Simulated payment of KES ' + amount.toFixed(2) + ' successful. Receipt generated.', 'success');
  }

  function init(){
    var makePaymentForm = document.getElementById('makePaymentForm');
    if (makePaymentForm) makePaymentForm.addEventListener('submit', simulatePayment);
  }

  document.addEventListener('DOMContentLoaded', init);
})();

