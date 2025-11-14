'use strict';

(function () {
  const form = document.getElementById('workout-form');
  const planSection = document.getElementById('plan');
  const planOutput = document.getElementById('plan-output');
  const resetBtn = document.getElementById('reset-plan');

  if (!form || !planSection || !planOutput) return;

  const templates = {
    warmup: (duration, focus) => `5-${duration >= 45 ? 10 : 5} min light warm-up (${focus === 'cardio' ? 'row/bike/jog' : 'treadmill/elliptical'}) + dynamic mobility`,
    cooldown: `5-10 min easy cooldown + stretching (hamstrings, hip flexors, pecs)`,
    rest: `Rest or 20-30 min easy walk (Zone 1-2)`,
  };

  const blocks = {
    muscle: {
      split3: [
        { name: 'Upper', focus: ['Chest', 'Back', 'Shoulders', 'Arms'] },
        { name: 'Lower', focus: ['Quads', 'Hamstrings', 'Glutes', 'Calves'] },
        { name: 'Full Body', focus: ['Compounds + Core'] },
      ],
      split4: [
        { name: 'Upper A', focus: ['Chest', 'Back'] },
        { name: 'Lower A', focus: ['Quads', 'Hamstrings'] },
        { name: 'Upper B', focus: ['Shoulders', 'Arms'] },
        { name: 'Lower B', focus: ['Glutes', 'Calves', 'Core'] },
      ],
    },
    fat_loss: {
      split3: [
        { name: 'Full Body + HIIT', focus: ['Compounds', 'Intervals'] },
        { name: 'Cardio + Core', focus: ['Zones 2-3', 'Core'] },
        { name: 'Full Body + HIIT', focus: ['Supersets', 'Intervals'] },
      ],
      split4: [
        { name: 'Upper + HIIT', focus: ['Push/Pull', 'Intervals'] },
        { name: 'Cardio Steady', focus: ['Zone 2'] },
        { name: 'Lower + Core', focus: ['Legs', 'Core'] },
        { name: 'Cardio Intervals', focus: ['HIIT'] },
      ],
    },
    endurance: {
      split3: [
        { name: 'Run/Cycle Intervals', focus: ['VO2/Tempo'] },
        { name: 'Mobility + Core', focus: ['Core Stability'] },
        { name: 'Long Steady', focus: ['Zone 2'] },
      ],
      split4: [
        { name: 'Intervals', focus: ['VO2/Threshold'] },
        { name: 'Strength (Light)', focus: ['Full Body'] },
        { name: 'Tempo', focus: ['LT/Tempo'] },
        { name: 'Long Steady', focus: ['Zone 2'] },
      ],
    },
    general: {
      split3: [
        { name: 'Full Body A', focus: ['Push', 'Pull', 'Hinge', 'Squat'] },
        { name: 'Cardio + Core', focus: ['Mixed'] },
        { name: 'Full Body B', focus: ['Lunge', 'Carry', 'Core'] },
      ],
      split4: [
        { name: 'Upper', focus: ['Push/Pull'] },
        { name: 'Cardio', focus: ['Mixed Zones'] },
        { name: 'Lower', focus: ['Hinge/Squat'] },
        { name: 'Full Body', focus: ['Mixed'] },
      ],
    }
  };

  const equipmentMap = {
    full_gym: ['Barbell', 'Dumbbells', 'Machines', 'Cables', 'Bodyweight'],
    dumbbells: ['Dumbbells', 'Bench', 'Bodyweight'],
    bands: ['Bands', 'Bodyweight'],
    bodyweight: ['Bodyweight']
  };

  // Catalog of exercises by tool and emphasis
  const catalog = {
    Barbell: {
      upper: ['Barbell Bench Press', 'Barbell Row', 'Overhead Press'],
      lower: ['Back Squat', 'Romanian Deadlift', 'Front Squat'],
      full: ['Deadlift', 'Barbell Hip Thrust']
    },
    Dumbbells: {
      upper: ['DB Incline Press', 'One-Arm DB Row', 'DB Shoulder Press', 'DB Fly'],
      lower: ['Goblet Squat', 'DB RDL', 'DB Split Squat'],
      full: ['DB Thruster', 'DB Farmer Carry']
    },
    Machines: {
      upper: ['Chest Press Machine', 'Seated Row Machine', 'Lat Pulldown'],
      lower: ['Leg Press', 'Leg Curl', 'Leg Extension', 'Calf Raise Machine'],
      full: ['Assisted Dip', 'Assisted Pull-Up']
    },
    Cables: {
      upper: ['Cable Row', 'Cable Fly', 'Face Pull', 'Triceps Pushdown', 'Cable Curl'],
      lower: [],
      full: []
    },
    Bands: {
      upper: ['Band Row', 'Band Press', 'Band Pull-Apart'],
      lower: ['Band Good Morning', 'Band Squat'],
      full: []
    },
    Bodyweight: {
      upper: ['Push-Up', 'Inverted Row'],
      lower: ['Bodyweight Squat', 'Reverse Lunge', 'Hip Bridge'],
      full: ['Plank', 'Hollow Hold']
    }
  };

  const focusAddOns = {
    balanced: [],
    upper: ['Add extra sets for Chest/Back/Shoulders'],
    lower: ['Add extra sets for Quads/Hamstrings/Glutes'],
    cardio: ['Include longer steady-state or intervals'],
    core: ['Add 2-3 extra core moves per session']
  };

  function volumeByExperience(exp, goal) {
    if (exp === 'beginner') return { sets: 3, reps: goal === 'muscle' ? '8-12' : goal === 'fat_loss' ? '10-15' : '6-12', rest: 90, rpe: '6-7', tempo: '2-0-2' };
    if (exp === 'intermediate') return { sets: 4, reps: goal === 'muscle' ? '6-12' : goal === 'fat_loss' ? '10-15' : '5-10', rest: 90, rpe: '7-8', tempo: '3-0-2' };
    return { sets: 5, reps: goal === 'muscle' ? '5-10' : goal === 'fat_loss' ? '8-12' : '4-8', rest: 120, rpe: '8-9', tempo: '3-1-2' };
  }

  function cardioPrescription(goal, duration) {
    if (goal === 'endurance') return `${duration >= 45 ? 40 : 25}-${duration} min aerobic (Zones 2-3)`;
    if (goal === 'fat_loss') return `${duration >= 45 ? 12 : 8} x 30s hard / 90s easy (HIIT) or ${duration - 10} min Zone 2`;
    return `${duration - 10} min mixed cardio (Zone 2-3)`;
  }

  function pickExercises(equip, emphasis, count) {
    const pool = [];
    for (const tool of equip) {
      const group = catalog[tool];
      if (!group) continue;
      if (emphasis === 'upper') pool.push(...(group.upper || []));
      if (emphasis === 'lower') pool.push(...(group.lower || []));
      if (emphasis === 'full') pool.push(...(group.full || []));
    }
    const unique = Array.from(new Set(pool)).filter(Boolean);
    // simple shuffle
    for (let i = unique.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [unique[i], unique[j]] = [unique[j], unique[i]];
    }
    return unique.slice(0, count);
  }

  function buildStrengthBlock(equip, vol, emphasis) {
    const mainLifts = emphasis === 'lower' ? pickExercises(equip, 'lower', 2) : emphasis === 'upper' ? pickExercises(equip, 'upper', 2) : pickExercises(equip, 'full', 2);
    const accessories = [
      ...pickExercises(equip, emphasis === 'lower' ? 'lower' : 'upper', 2),
      ...pickExercises(equip, 'full', 1)
    ].slice(0, 3);

    const mk = (name, sets = vol.sets, reps = vol.reps, tempo = vol.tempo, rpe = vol.rpe, rest = vol.rest) => ({ name, sets, reps, tempo, rpe, rest });
    const items = [];
    mainLifts.forEach(n => items.push(mk(n)));
    accessories.forEach(n => items.push(mk(n, vol.sets - 1, vol.reps, '2-0-2', vol.rpe, Math.max(60, vol.rest - 30))));
    return items;
  }

  function buildSchedule(goal, days) {
    const use = blocks[goal] || blocks.general;
    if (days <= 3) return use.split3.slice(0, days);
    if (days === 4) return use.split4;
    if (days === 5) return [...use.split4, { name: 'Conditioning', focus: ['Cardio/Core'] }];
    return [...use.split4, { name: 'Conditioning', focus: ['Cardio/Core'] }, { name: 'Full Body', focus: ['Mixed'] }];
  }

  function renderPlan({ goal, experience, days, equipment, focus, duration }) {
    const vol = volumeByExperience(experience, goal);
    const equip = equipmentMap[equipment] || equipmentMap.bodyweight;
    const addOns = focusAddOns[focus] || [];
    const schedule = buildSchedule(goal, days);

    const html = [];
    html.push(`<p class="section-text">Goal: <strong>${label(goal)}</strong> · Experience: <strong>${label(experience)}</strong> · Days/Week: <strong>${days}</strong> · Session: <strong>${duration} min</strong></p>`);
    html.push(`<p class="section-text">Equipment: <strong>${equip.join(', ')}</strong>${addOns.length ? ` · Focus: <strong>${addOns.join('; ')}</strong>` : ''}</p>`);

    schedule.forEach((d, i) => {
      html.push(`<div class="blog-card" style="margin-top:20px;">`);
      html.push(`<div class="card-content">`);
      html.push(`<h3 class="h3">Day ${i + 1}: ${d.name}</h3>`);
      html.push(`<p class="card-text"><strong>Warm-up:</strong> ${templates.warmup(duration, focus)}</p>`);

      const nameLower = d.name.toLowerCase();
      const isCardioDay = goal === 'endurance' || nameLower.includes('cardio');
      if (isCardioDay) {
        html.push(`<p class="card-text"><strong>Primary Cardio:</strong> ${cardioPrescription(goal, duration)}</p>`);
        html.push(`<p class="card-text"><strong>Accessory Strength (optional):</strong> 2-3 moves · ${vol.sets - 1} sets x ${vol.reps} · RPE 6-7</p>`);
      } else {
        // Choose emphasis from schedule focus
        const emphasis = nameLower.includes('lower') ? 'lower' : nameLower.includes('upper') ? 'upper' : 'full';
        const block = buildStrengthBlock(equip, vol, emphasis);
        html.push(`<p class="card-text"><strong>Strength Block:</strong></p>`);
        html.push(`<ul class="section-text" style="margin-left: 18px;">`);
        block.forEach(ex => {
          html.push(`<li>${ex.name} — ${ex.sets} sets × ${ex.reps} reps · Tempo ${ex.tempo} · Rest ${ex.rest}s · RPE ${ex.rpe}</li>`);
        });
        html.push(`</ul>`);
        const finisher = goal === 'muscle' ? 'Loaded carry or sled push 3 x 40m' : goal === 'fat_loss' ? 'HIIT 8-12 min (20s on / 40s off)' : 'Core circuit 8-10 min';
        html.push(`<p class="card-text"><strong>Finisher:</strong> ${finisher}</p>`);
      }

      html.push(`<p class="card-text"><strong>Cooldown:</strong> ${templates.cooldown}</p>`);
      html.push(`<p class="card-text"><em>Progression:</em> Aim to add 1 rep per set or +2.5-5kg weekly on main lifts while keeping RPE in target. Deload every 4-6 weeks.</p>`);
      if (i === schedule.length - 1) {
        html.push(`<p class="card-text">Tip: Log sessions. If you cannot meet the target reps at the prescribed RPE, keep weight the same next week.</p>`);
      }
      html.push(`</div></div>`);
    });

    planOutput.innerHTML = html.join('');
    planSection.style.display = 'block';
    window.scrollTo({ top: planSection.offsetTop - 80, behavior: 'smooth' });
  }

  function label(v) {
    const map = { muscle: 'Build Muscle', fat_loss: 'Lose Fat', endurance: 'Endurance', general: 'General Fitness', beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' };
    return map[v] || v;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const goal = document.getElementById('goal').value;
    const experience = document.getElementById('experience').value;
    const days = parseInt(document.getElementById('days').value, 10);
    const equipment = document.getElementById('equipment').value;
    const focus = document.getElementById('focus').value;
    const duration = parseInt(document.getElementById('duration').value, 10);

    renderPlan({ goal, experience, days, equipment, focus, duration });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      form.reset();
      planOutput.innerHTML = '';
      planSection.style.display = 'none';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
