// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('main-nav');
  const year = document.getElementById('year');
  if(year) year.textContent = new Date().getFullYear();

  if(toggle && nav){
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      // simple show/hide
      if(nav.style.display === 'block') nav.style.display = '';
      else nav.style.display = 'block';
    });
    // close nav when clicking links on small screens
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      if(window.innerWidth <= 600){ nav.style.display = ''; toggle.setAttribute('aria-expanded','false'); }
    }));
  }

  // simple form handling
  const form = document.getElementById('join-form');
  const msg = document.getElementById('form-msg');
  if(form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      if(!name || !email){
        msg.textContent = 'Please provide your name and email.';
        msg.style.color = 'var(--accent)';
        return;
      }
      // fake submit
      msg.textContent = 'Thanks! We received your message.';
      msg.style.color = 'lightgreen';
      form.reset();
    });
  }
});
