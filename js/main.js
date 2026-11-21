// Theme Management
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const target = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', target);
  localStorage.setItem('caddy-knowledge-theme', target);
}

(function initTheme() {
  const saved = localStorage.getItem('caddy-knowledge-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
})();

// Copy to Clipboard
function copyText(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const originalText = btn.innerText;
    btn.innerText = '✓ Copied!';
    btn.style.color = '#34d399';
    btn.style.borderColor = '#34d399';
    setTimeout(() => {
      btn.innerText = originalText;
      btn.style.color = '';
      btn.style.borderColor = '';
    }, 2000);
  });
}

// Client-side search filtering
function filterContent(query) {
  const q = query.trim().toLowerCase();
  const searchableItems = document.querySelectorAll('.card, .sidebar-nav li, table tbody tr, .searchable');
  if (!q) {
    searchableItems.forEach(el => el.style.display = '');
    return;
  }
  searchableItems.forEach(el => {
    const text = el.innerText.toLowerCase();
    el.style.display = text.includes(q) ? '' : 'none';
  });
}

// Auto highlight active sidebar link
document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;
  const links = document.querySelectorAll('.sidebar-nav a');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    // Normalize comparison
    if (currentPath.endsWith(href) || (href !== '/' && href !== '../index.html' && currentPath.includes(href.replace('../', '')))) {
      link.classList.add('active');
    }
  });
});
