(function(){
  const goals = {
    muscle: [
      { id: 'weight_lifting', title: 'Weight Lifting', img: 'class-1.jpg', icon: 'class-icon-1.png', desc: 'Build strength and muscle using barbells and machines.', guidance: [
        'Aim for 3-5 sessions/week focusing on compound lifts.',
        'Use progressive overload: add weight or reps weekly.',
        'Rest 60-120s between sets; eat enough protein.'
      ]},
      { id: 'fitness_pack', title: 'The Fitness Pack', img: 'class-4.jpg', icon: 'class-icon-4.png', desc: 'Mixed strength and conditioning circuits.', guidance: [
        'Great for balanced strength + cardio improvements.',
        'Keep intensity moderate; focus on form first.',
        'Track total volume to ensure progression.'
      ]}
    ],
    fat_loss: [
      { id: 'cardio_strength', title: 'Cardio & Strength', img: 'class-2.jpg', icon: 'class-icon-2.png', desc: 'Intervals combining cardio machines and light weights.', guidance: [
        '3-5 sessions/week, 20-40 minutes each.',
        'Use intervals (e.g., 1 min hard / 1 min easy).',
        'Pair with a small calorie deficit for best results.'
      ]},
      { id: 'fitness_pack', title: 'The Fitness Pack', img: 'class-4.jpg', icon: 'class-icon-4.png', desc: 'Circuit-style full-body training.', guidance: [
        'Short rests (30-60s) to keep heart rate up.',
        'Choose weights that allow smooth technique.',
        'Aim for consistency over all-out intensity.'
      ]}
    ],
    endurance: [
      { id: 'cardio_strength', title: 'Cardio & Strength', img: 'class-2.jpg', icon: 'class-icon-2.png', desc: 'Build cardiovascular capacity with strength support.', guidance: [
        'Include longer steady-state work weekly.',
        'Add tempo/threshold sets as you advance.',
        'Progress weekly duration by ~10%.'
      ]},
      { id: 'power_yoga', title: 'Power Yoga', img: 'class-3.jpg', icon: 'class-icon-3.png', desc: 'Dynamic flows to improve stamina and control.', guidance: [
        'Focus on breath pacing to sustain effort.',
        'Great low-impact complement to running or cycling.',
        'Train 2-4x/week depending on recovery.'
      ]}
    ],
    mobility: [
      { id: 'power_yoga', title: 'Power Yoga', img: 'class-3.jpg', icon: 'class-icon-3.png', desc: 'Strengthen through range and improve flexibility.', guidance: [
        'Hold positions with control; avoid bouncing.',
        'Consistency beats intensity—little and often.',
        'Pair with light strength work for joint health.'
      ]}
    ],
    general: [
      { id: 'fitness_pack', title: 'The Fitness Pack', img: 'class-4.jpg', icon: 'class-icon-4.png', desc: 'Balanced full‑body circuits for overall fitness.', guidance: [
        "Mix strength, cardio, and mobility each week.",
        'Adjust difficulty by tempo and rest times.',
        'Track how you feel; progress gradually.'
      ]},
      { id: 'power_yoga', title: 'Power Yoga', img: 'class-3.jpg', icon: 'class-icon-3.png', desc: 'Mobility and core control to support all goals.', guidance: [
        'Great active recovery choice 1-2x/week.',
        'Emphasize breathing and smooth transitions.',
        'Combine with strength or cardio days.'
      ]}
    ]
  };

  const goalEl = document.getElementById('goal');
  const expEl = document.getElementById('experience');
  const listEl = document.getElementById('class-recommendations');
  const guidanceSection = document.getElementById('class-guidance');
  const guidanceContent = document.getElementById('guidance-content');

  function renderClasses(){
    if(!goalEl || !listEl) return;
    const selected = goals[goalEl.value] || [];
    listEl.innerHTML = selected.map(c => classCardHTML(c)).join('');
    attachCardHandlers(selected);
    guidanceSection.style.display = 'none';
    guidanceContent.innerHTML = '';
  }

  function classCardHTML(cls){
    const base = './assets/images/';
    return `
      <li class="scrollbar-item">
        <div class="class-card">
          <figure class="card-banner img-holder" style="--width: 416; --height: 240;">
            <img src="${base + cls.img}" width="416" height="240" loading="lazy" alt="${escapeHtml(cls.title)}" class="img-cover">
          </figure>
          <div class="card-content">
            <div class="title-wrapper">
              <img src="${base + cls.icon}" width="52" height="52" aria-hidden="true" alt="" class="title-icon">
              <h3 class="h3">
                <a href="#" class="card-title" data-class-id="${cls.id}">${escapeHtml(cls.title)}</a>
              </h3>
            </div>
            <p class="card-text">${escapeHtml(cls.desc)}</p>
            <div class="card-progress">
              <div class="progress-wrapper">
                <p class="progress-label">Recommended</p>
                <span class="progress-value">${recommendationScore(cls)}%</span>
              </div>
              <div class="progress-bg">
                <div class="progress-bar" style="width: ${recommendationScore(cls)}%"></div>
              </div>
            </div>
          </div>
        </div>
      </li>`;
  }

  function attachCardHandlers(selected){
    listEl.querySelectorAll('[data-class-id]').forEach(a => {
      a.addEventListener('click', (e)=>{
        e.preventDefault();
        const id = a.getAttribute('data-class-id');
        const cls = selected.find(x=>x.id===id);
        if(!cls) return;
        showGuidance(cls);
      });
    });
  }

  function showGuidance(cls){
    const exp = expEl ? expEl.value : 'beginner';
    const extra = experienceTips(exp);
    const tips = (cls.guidance || []).concat(extra);
    guidanceContent.innerHTML = `
      <h3 class="h3" style="margin-bottom:8px;">${escapeHtml(cls.title)} Tips</h3>
      <ul style="list-style: disc; margin-left: 1.2rem;">
        ${tips.map(t=>`<li class="section-text" style="margin: 6px 0;">${escapeHtml(t)}</li>`).join('')}
      </ul>
      <div style="margin-top:14px;">
        <a href="workout.html" class="btn btn-primary">Generate a Full Plan</a>
      </div>
    `;
    guidanceSection.style.display = '';
    window.scrollTo({ top: guidanceSection.offsetTop - 80, behavior: 'smooth' });
  }

  function recommendationScore(cls){
    // Simple deterministic score by goal + id for UI feedback
    const seed = (goalEl.value + ':' + cls.id).length;
    return 60 + (seed % 35); // 60-94%
  }

  function experienceTips(exp){
    switch(exp){
      case 'beginner':
        return ['Start with lighter loads and perfect your form.', 'Leave 1-2 reps in the tank each set.', 'Schedule 1 rest day between hard sessions.'];
      case 'intermediate':
        return ['Use progressive overload with planned deloads every 6-8 weeks.', 'Track sets/reps/weights to ensure progress.'];
      case 'advanced':
        return ['Incorporate periodization (hypertrophy/strength blocks).', 'Monitor recovery metrics and adjust volume.'];
      default:
        return [];
    }
  }

  function escapeHtml(s){
    return String(s).replace(/[&<>\"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));
  }

  if(goalEl){
    goalEl.addEventListener('change', renderClasses);
  }
  if(expEl){
    expEl.addEventListener('change', ()=>{
      // re-show guidance to include exp tips if a class is already selected
      const shown = guidanceSection && guidanceSection.style.display !== 'none';
      if(shown){
        const active = listEl.querySelector('[data-class-id]');
        // do nothing, guidance stays – next click will refresh with exp tips
      }
    });
  }

  // Helpers for query parsing
  function findClassById(classId){
    for(const [g, arr] of Object.entries(goals)){
      const found = arr.find(x => x.id === classId);
      if(found){ return { goal: g, cls: found }; }
    }
    return null;
  }

  function applyQuery(){
    const params = new URLSearchParams(window.location.search);
    const qGoal = params.get('goal');
    const qExp = params.get('experience');
    const qClass = params.get('class');

    if(qGoal && goalEl && goals[qGoal]){
      goalEl.value = qGoal;
    }
    if(qExp && expEl){
      const allowed = ['beginner','intermediate','advanced'];
      if(allowed.includes(qExp)) expEl.value = qExp;
    }

    renderClasses();

    if(qClass){
      const within = (goals[goalEl.value]||[]).find(x=>x.id===qClass);
      if(within){
        showGuidance(within);
      } else {
        const found = findClassById(qClass);
        if(found && goalEl){
          goalEl.value = found.goal;
          renderClasses();
          showGuidance(found.cls);
        }
      }
    }
  }

  // initial render with query support
  applyQuery();
})();
