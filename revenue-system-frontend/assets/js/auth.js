(function(){
  'use strict';

  function handleLoginSubmit(event){
    event.preventDefault();
    var form = event.target;
    var email = form.querySelector('[name="email"]').value.trim();
    var password = form.querySelector('[name="password"]').value;
    if (!email || !password) {
      window.showAlert && window.showAlert('Please enter email and password', 'warning');
      return;
    }
    var user = { name: email.split('@')[0], email: email };
    localStorage.setItem('activeUser', JSON.stringify(user));
    localStorage.setItem('activeRole', 'citizen');
    window.location.href = (window.__BASE_PATH__ || '') + '/dashboards/citizen-dashboard.html';
  }

  function handleRegisterSubmit(event){
    event.preventDefault();
    var form = event.target;
    var name = form.querySelector('[name="name"]').value.trim();
    var email = form.querySelector('[name="email"]').value.trim();
    var password = form.querySelector('[name="password"]').value;
    if (!name || !email || !password) {
      window.showAlert && window.showAlert('Please fill out all fields', 'warning');
      return;
    }
    var user = { name: name, email: email };
    localStorage.setItem('activeUser', JSON.stringify(user));
    localStorage.setItem('activeRole', 'citizen');
    window.location.href = (window.__BASE_PATH__ || '') + '/dashboards/citizen-dashboard.html';
  }

  function handleResetSubmit(event){
    event.preventDefault();
    var form = event.target;
    var email = form.querySelector('[name="email"]').value.trim();
    if (!email) { window.showAlert && window.showAlert('Please enter your email', 'warning'); return; }
    window.showAlert && window.showAlert('If an account exists for ' + email + ', a reset link has been sent.', 'info');
  }

  function initProfile(){
    var nameField = document.getElementById('profileName');
    var emailField = document.getElementById('profileEmail');
    try {
      var user = JSON.parse(localStorage.getItem('activeUser') || '{}');
      if (nameField && user.name) nameField.value = user.name;
      if (emailField && user.email) emailField.value = user.email;
    } catch(e) {}
    var roleSelect = document.getElementById('roleSelect');
    if (roleSelect) {
      var role = localStorage.getItem('activeRole') || 'citizen';
      roleSelect.value = role;
      roleSelect.addEventListener('change', function(){
        localStorage.setItem('activeRole', roleSelect.value);
        window.showAlert && window.showAlert('Role set to ' + roleSelect.value + '. Navigation updated.', 'success');
      });
    }
    var profileForm = document.getElementById('profileForm');
    if (profileForm) {
      profileForm.addEventListener('submit', function(e){
        e.preventDefault();
        var updated = { name: nameField.value.trim(), email: emailField.value.trim() };
        localStorage.setItem('activeUser', JSON.stringify(updated));
        window.showAlert && window.showAlert('Profile saved', 'success');
      });
    }
  }

  function attachHandlers(){
    var loginForm = document.getElementById('loginForm');
    if (loginForm) loginForm.addEventListener('submit', handleLoginSubmit);
    var registerForm = document.getElementById('registerForm');
    if (registerForm) registerForm.addEventListener('submit', handleRegisterSubmit);
    var resetForm = document.getElementById('resetForm');
    if (resetForm) resetForm.addEventListener('submit', handleResetSubmit);
    initProfile();
  }

  document.addEventListener('DOMContentLoaded', attachHandlers);
})();

