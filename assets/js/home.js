(function(){
  function qs(id){ return document.getElementById(id); }
  function escapeHtml(s){ return String(s).replace(/[&<>\"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c])); }

  const classes = [
    {
      id: 'weight_lifting',
      href: 'classes.html?goal=muscle&class=weight_lifting',
      title: 'Weight Lifting',
      img: 'class-1.jpg', icon: 'class-icon-1.png',
      text: 'Suspendisse nisi libero, cursus ac magna sit amet, fermentum imperdiet nisi.',
      full: 85
    },
    {
      id: 'cardio_strength',
      href: 'classes.html?goal=endurance&class=cardio_strength',
      title: 'Cardio & Strenght',
      img: 'class-2.jpg', icon: 'class-icon-2.png',
      text: 'Suspendisse nisi libero, cursus ac magna sit amet, fermentum imperdiet nisi.',
      full: 70
    },
    {
      id: 'power_yoga',
      href: 'classes.html?goal=mobility&class=power_yoga',
      title: 'Power Yoga',
      img: 'class-3.jpg', icon: 'class-icon-3.png',
      text: 'Suspendisse nisi libero, cursus ac magna sit amet, fermentum imperdiet nisi.',
      full: 90
    },
    {
      id: 'fitness_pack',
      href: 'classes.html?goal=general&class=fitness_pack',
      title: 'The Fitness Pack',
      img: 'class-4.jpg', icon: 'class-icon-4.png',
      text: 'Suspendisse nisi libero, cursus ac magna sit amet, fermentum imperdiet nisi.',
      full: 60
    }
  ];

  const blog = [
    {
      href: 'blog.html?post=1',
      title: 'Going to the gym for the first time',
      img: 'blog-1.jpg',
      date: '2022-07-07', dateText: '7 July 2022',
      text: 'Praesent id ipsum pellentesque lectus dapibus condimentum curabitur eget risus quam. In hac habitasse platea dictumst.'
    },
    {
      href: 'blog.html?post=2',
      title: 'Parturient accumsan cacus pulvinar magna',
      img: 'blog-2.jpg',
      date: '2022-07-07', dateText: '7 July 2022',
      text: 'Praesent id ipsum pellentesque lectus dapibus condimentum curabitur eget risus quam. In hac habitasse platea dictumst.'
    },
    {
      href: 'blog.html?post=3',
      title: 'Risus purus namien parturient accumsan cacus',
      img: 'blog-3.jpg',
      date: '2022-07-07', dateText: '7 July 2022',
      text: 'Praesent id ipsum pellentesque lectus dapibus condimentum curabitur eget risus quam. In hac habitasse platea dictumst.'
    }
  ];

  function renderClasses(){
    const root = qs('home-classes');
    if(!root) return;
    root.innerHTML = classes.map(c => `
      <li class="scrollbar-item">
        <div class="class-card">
          <figure class="card-banner img-holder" style="--width: 416; --height: 240;">
            <img src="./assets/images/${c.img}" width="416" height="240" loading="lazy" alt="${escapeHtml(c.title)}" class="img-cover">
          </figure>
          <div class="card-content">
            <div class="title-wrapper">
              <img src="./assets/images/${c.icon}" width="52" height="52" aria-hidden="true" alt="" class="title-icon">
              <h3 class="h3">
                <a href="${c.href}" class="card-title">${escapeHtml(c.title)}</a>
              </h3>
            </div>
            <p class="card-text">${escapeHtml(c.text)}</p>
            <div class="card-progress">
              <div class="progress-wrapper">
                <p class="progress-label">Class Full</p>
                <span class="progress-value">${c.full}%</span>
              </div>
              <div class="progress-bg">
                <div class="progress-bar" style="width: ${c.full}%"></div>
              </div>
            </div>
          </div>
        </div>
      </li>
    `).join('');
  }

  function renderBlog(){
    const root = qs('home-blog');
    if(!root) return;
    root.innerHTML = blog.map(b => `
      <li class="scrollbar-item">
        <div class="blog-card">
          <div class="card-banner img-holder" style="--width: 440; --height: 270;">
            <img src="./assets/images/${b.img}" width="440" height="270" loading="lazy" alt="${escapeHtml(b.title)}" class="img-cover">
            <time class="card-meta" datetime="${b.date}">${escapeHtml(b.dateText)}</time>
          </div>
          <div class="card-content">
            <h3 class="h3"><a href="#" class="card-title">${escapeHtml(b.title)}</a></h3>
            <p class="card-text">${escapeHtml(b.text)}</p>
            <a href="${b.href}" class="btn-link has-before">Read More</a>
          </div>
        </div>
      </li>
    `).join('');
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', function(){ renderClasses(); renderBlog(); });
  } else {
    renderClasses();
    renderBlog();
  }
})();
