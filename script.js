
// reactive per mobile dhe ty
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('main-nav');
  const year = document.getElementById('year');
  if(year) year.textContent = new Date().getFullYear();

  if(toggle && nav){
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      if(nav.style.display === 'block') nav.style.display = '';
      else nav.style.display = 'block';
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      if(window.innerWidth <= 600){ nav.style.display = ''; toggle.setAttribute('aria-expanded','false'); }
    }));
  }

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
      msg.textContent = 'Thanks! We received your message.';
      msg.style.color = 'lightgreen';
      form.reset();
    });
  }
});
// --- Contact Form Functionality ---
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const message = document.getElementById("formMessage");
    const year = document.getElementById("year");

    // Auto-update footer year
    if (year) year.textContent = new Date().getFullYear();

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = form.name.value.trim();
            const email = form.email.value.trim();
            const msg = form.message.value.trim();

            if (!name || !email || !msg) {
                message.textContent = "Please fill in all fields.";
                message.className = "form-message error";
                return;
            }

            message.textContent = "Sending...";
            message.className = "form-message";

            setTimeout(() => {
                message.textContent = `Thanks, ${name}! We’ll contact you soon.`;
                message.className = "form-message success";
                form.reset();
            }, 1200);
        });
    }
});

