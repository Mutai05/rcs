(function(){
  'use strict';

  // Configure base path for static linking when browsing subdirectories
  var pathParts = location.pathname.split('/').filter(Boolean);
  var projectRootIndex = pathParts.indexOf('revenue-system-frontend');
  var base = '/';
  if (projectRootIndex >= 0) {
    base = '/' + pathParts.slice(0, projectRootIndex + 1).join('/');
  }
  window.__BASE_PATH__ = base === '/' ? '' : base;

  // Dynamically load header, sidebar, footer, notifications into placeholders
  function injectPartial(selector, partialPath) {
    var el = document.querySelector(selector);
    if (!el) return Promise.resolve();
    return fetch(window.__BASE_PATH__ + partialPath).then(function(res){return res.text();}).then(function(html){ el.innerHTML = html; });
  }

  function initRoleVisibility() {
    var role = localStorage.getItem('activeRole'); // citizen|officer|admin|finance
    if (!role) return;
    document.querySelectorAll('[data-roles]').forEach(function(el){
      var roles = (el.getAttribute('data-roles') || '').split(',').map(function(r){return r.trim();});
      var visible = roles.includes(role);
      if (!visible) { el.classList.add('d-none'); }
    });
  }

  function initAuthUI() {
    var userJson = localStorage.getItem('activeUser');
    var isLoggedIn = !!userJson;
    var profileMenu = document.getElementById('profileMenu');
    var navUserName = document.getElementById('navUserName');
    document.querySelectorAll('a[data-href="/auth/login.html"]').forEach(function(l){ l.closest('li') && (l.closest('li').style.display = isLoggedIn ? 'none' : ''); });
    document.querySelectorAll('a[data-href="/auth/register.html"]').forEach(function(l){ l.closest('li') && (l.closest('li').style.display = isLoggedIn ? 'none' : ''); });
    if (profileMenu) { profileMenu.classList.toggle('d-none', !isLoggedIn); }
    if (isLoggedIn && navUserName) {
      try { navUserName.textContent = JSON.parse(userJson).name || 'User'; } catch(e) {}
    }
    var logout = document.getElementById('logoutLink');
    if (logout) {
      logout.addEventListener('click', function(e){
        e.preventDefault();
        localStorage.removeItem('activeUser');
        window.location.href = window.__BASE_PATH__ + '/index.html';
      });
    }
  }

  function showAlert(message, type) {
    var container = document.getElementById('alertContainer');
    if (!container) return;
    var wrapper = document.createElement('div');
    wrapper.innerHTML = '<div class="alert alert-' + (type || 'info') + ' alert-dismissible fade show" role="alert">' +
      message +
      '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' +
    '</div>';
    container.appendChild(wrapper.firstChild);
  }
  window.showAlert = showAlert;

  // Initialize after DOM ready and partials loaded
  document.addEventListener('DOMContentLoaded', function(){
    Promise.all([
      injectPartial('#app-header', '/partials/header.html'),
      injectPartial('#app-sidebar', '/partials/sidebar.html'),
      injectPartial('#app-footer', '/partials/footer.html'),
      injectPartial('#app-notifications', '/partials/notifications.html')
    ]).then(function(){
      initRoleVisibility();
      initAuthUI();
    });
  });
})();

