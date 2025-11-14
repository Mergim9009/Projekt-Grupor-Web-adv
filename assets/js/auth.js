(function(){
  function el(tag, attrs, html){
    const e = document.createElement(tag);
    if(attrs){ for(const [k,v] of Object.entries(attrs)){ if(v!=null) e.setAttribute(k,v); } }
    if(html!=null) e.innerHTML = html;
    return e;
  }

  function injectModal(){
    if(document.getElementById('login-modal')) return;
    const modal = el('div', { id:'login-modal', class:'video-modal', 'aria-hidden':'true' });
    const backdrop = el('div', { class:'video-modal-backdrop', 'data-login-close':'' });
    const dialog = el('div', { class:'video-modal-dialog', role:'dialog', 'aria-modal':'true', 'aria-label':'Login' });
    const closeBtn = el('button', { class:'video-modal-close', 'aria-label':'Close login', 'data-login-close':'' }, '&times;');
    const title = el('h2', { class:'h2 card-title' }, 'Log In');
    const form = el('form', { id:'login-form', style:'display:flex; flex-direction:column; gap:12px; margin-top:8px;' });
    const email = el('input', { type:'email', id:'login-email', placeholder:'Email', required:'', class:'input-field' });
    const pass = el('input', { type:'password', id:'login-password', placeholder:'Password', required:'', class:'input-field' });
    const submit = el('button', { type:'submit', class:'btn btn-primary' }, 'Log In');
    const alt = el('div', { class:'section-text', style:'font-size: 14px; opacity:0.9;' }, "Don't have an account? <a href='signup.html' class='btn-link has-before'>Create one</a>.");
    form.append(email, pass, submit, alt);
    dialog.append(closeBtn, title, form);
    modal.append(backdrop, dialog);
    document.body.appendChild(modal);
  }

  function openModal(){
    const modal = document.getElementById('login-modal');
    if(!modal) return;
    modal.removeAttribute('aria-hidden');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    const email = document.getElementById('login-email');
    if(email) setTimeout(()=>email.focus(), 100);
  }

  function closeModal(){
    const modal = document.getElementById('login-modal');
    if(!modal) return;
    modal.setAttribute('aria-hidden','true');
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function bindHandlers(){
    document.querySelectorAll('[data-login-open]').forEach(btn=>{
      btn.addEventListener('click', function(e){ e.preventDefault(); openModal(); });
    });
    document.addEventListener('click', function(e){
      const t = e.target;
      if(t && (t.hasAttribute('data-login-close') || t.id === 'login-modal')){ closeModal(); }
    });
    document.addEventListener('keydown', function(e){ if(e.key === 'Escape'){ closeModal(); }});
    const form = document.getElementById('login-form');
    if(form){
      form.addEventListener('submit', function(e){
        e.preventDefault();
        const email = /** @type {HTMLInputElement} */(document.getElementById('login-email'));
        const pass = /** @type {HTMLInputElement} */(document.getElementById('login-password'));
        if(!email || !pass) return;
        if(!email.value || !pass.value){ return; }
        localStorage.setItem('fitlife_user', JSON.stringify({ email: email.value, ts: Date.now() }));
        closeModal();
        alert('Logged in as ' + email.value);
      });
    }
  }

  function init(){
    injectModal();
    bindHandlers();
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
