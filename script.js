/* ================================================================
   BIRTHDAY WEBSITE — Firna → Fatra
   JavaScript: Interactions, Animations, Confetti, Music
   ================================================================ */

// ── Current Screen ─────────────────────────────────────────────
let currentScreen = 1;
const TOTAL_SCREENS = 7;

// ── Custom Cursor ───────────────────────────────────────────────
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top  = e.clientY + 'px';
});
document.querySelectorAll('button, .love-card, .gift-box, .dot').forEach(el => {
  el.addEventListener('mouseenter', () => cursorGlow.classList.add('big'));
  el.addEventListener('mouseleave', () => cursorGlow.classList.remove('big'));
});

// ── Floating Particles ──────────────────────────────────────────
const PARTICLES = ['🌸','❤️','✨','🌷','💕','🌺','💫','🌼','🩷'];
function createParticle() {
  const p = document.createElement('span');
  p.classList.add('particle');
  p.textContent = PARTICLES[Math.floor(Math.random() * PARTICLES.length)];
  p.style.left   = Math.random() * 100 + 'vw';
  p.style.fontSize = (0.6 + Math.random() * 0.8) + 'rem';
  const dur = 8 + Math.random() * 12;
  p.style.animationDuration = dur + 's';
  p.style.animationDelay    = Math.random() * 6 + 's';
  document.getElementById('particlesContainer').appendChild(p);
  setTimeout(() => p.remove(), (dur + 6) * 1000);
}
setInterval(createParticle, 1200);
for (let i = 0; i < 8; i++) createParticle();

// ── Falling Petals on Screen 2 ─────────────────────────────────
function createPetal() {
  const p = document.createElement('span');
  p.classList.add('petal');
  p.textContent = ['🌸','🌺','🌷','🩷'][Math.floor(Math.random() * 4)];
  p.style.left = Math.random() * 100 + 'vw';
  const dur = 6 + Math.random() * 8;
  p.style.animationDuration = dur + 's';
  p.style.animationDelay    = Math.random() * 4 + 's';
  document.getElementById('petalsBg').appendChild(p);
  setTimeout(() => p.remove(), (dur + 4) * 1000);
}

// ── Progress Dots ───────────────────────────────────────────────
function updateDots(screenNum) {
  document.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.toggle('active', i + 1 === screenNum);
  });
}

// ── Screen Transitions ──────────────────────────────────────────
function goToScreen(num) {
  const prev = document.getElementById('screen' + currentScreen);
  const next = document.getElementById('screen' + num);
  if (!prev || !next || num === currentScreen) return;

  prev.classList.add('exit');
  setTimeout(() => {
    prev.classList.remove('active', 'exit');
  }, 800);

  setTimeout(() => {
    next.classList.add('active');
    currentScreen = num;
    updateDots(num);
    onScreenEnter(num);
  }, 400);

  // Click sound
  playClick();
}

function onScreenEnter(num) {
  if (num === 2) startPetals();
  if (num === 3) startTypewriter();
  if (num === 4) revealLoveCards();
  if (num === 5) revealTimeline();
  if (num === 7) startFinalScene();
}

// ── Music ───────────────────────────────────────────────────────
const music = document.getElementById('bgMusic');
const musicBtn  = document.getElementById('musicBtn');
const musicIcon = document.getElementById('musicIcon');
const musicPlayer = document.getElementById('musicPlayer');
let musicPlaying = false;

music.volume = 0.35;

musicBtn.addEventListener('click', toggleMusic);
musicPlayer.addEventListener('click', toggleMusic);

function toggleMusic() {
  if (musicPlaying) {
    music.pause();
    musicIcon.textContent = '♪';
    musicPlayer.classList.remove('playing');
  } else {
    music.play().catch(() => {});
    musicIcon.textContent = '❚❚';
    musicPlayer.classList.add('playing');
  }
  musicPlaying = !musicPlaying;
}

// Auto-start music on first interaction
function startMusicOnFirstTouch() {
  if (!musicPlaying) {
    music.play().catch(() => {});
    musicIcon.textContent = '❚❚';
    musicPlayer.classList.add('playing');
    musicPlaying = true;
  }
  document.removeEventListener('touchstart', startMusicOnFirstTouch);
  document.removeEventListener('click', startMusicOnFirstTouch);
}
document.addEventListener('touchstart', startMusicOnFirstTouch, { once: true });
document.addEventListener('click', startMusicOnFirstTouch, { once: true });

// ── Click Sound (tiny oscillator) ──────────────────────────────
let audioCtx;
function playClick() {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.frequency.value = 600;
    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
    osc.start(); osc.stop(audioCtx.currentTime + 0.15);
  } catch(e) {}
}

// ── Screen 1 — Open button ─────────────────────────────────────
document.getElementById('btnOpen').addEventListener('click', () => {
  document.getElementById('envelope').style.animation = 'envPop 0.5s ease reverse forwards';
  setTimeout(() => goToScreen(2), 400);
});

// ── Screen 2 — Petals ──────────────────────────────────────────
function startPetals() {
  for (let i = 0; i < 10; i++) setTimeout(createPetal, i * 200);
  setInterval(createPetal, 1800);
}
document.getElementById('btnScreen2').addEventListener('click', () => goToScreen(3));

// ── Screen 3 — Typewriter ──────────────────────────────────────
const MESSAGE = `Fatra, selamat ulang tahun ya! 🌸

Aku nulis ini bukan karena kewajiban, tapi karena aku emang mau kamu tau betapa berartinya kamu.

Kamu itu orang yang asli. Nggak banyak yang kayak gitu sekarang. Setiap ngobrol sama kamu selalu ada aja hal yang bikin aku ketawa, mikir, atau malah ngangguk-ngangguk sendiri.

Di usiamu yang baru ini, aku harap kamu terus jadi versi terbaik dari diri kamu sendiri — bukan versi yang orang lain mau lihat, tapi yang beneran kamu.

Semoga hari ini jadi awal dari hal-hal indah yang udah nunggu kamu. 💫`;

let typewriterDone = false;
function startTypewriter() {
  const el = document.getElementById('typewriterText');
  const btn = document.getElementById('btnScreen3');
  el.textContent = '';
  typewriterDone = false;
  let i = 0;
  const speed = 28;

  function type() {
    if (i < MESSAGE.length) {
      el.textContent += MESSAGE[i];
      i++;
      // Auto scroll box if needed
      el.parentElement.scrollTop = el.parentElement.scrollHeight;
      setTimeout(type, speed);
    } else {
      typewriterDone = true;
      btn.style.opacity = '1';
      btn.style.pointerEvents = 'all';
    }
  }
  setTimeout(type, 600);

  // Allow skipping typewriter
  document.getElementById('typewriterText').addEventListener('click', () => {
    if (!typewriterDone) {
      el.textContent = MESSAGE;
      typewriterDone = true;
      btn.style.opacity = '1';
      btn.style.pointerEvents = 'all';
    }
  });
}
document.getElementById('btnScreen3').addEventListener('click', () => goToScreen(4));

// ── Screen 4 — Love Cards ──────────────────────────────────────
const LOVE_ITEMS = [
  { emoji: '😂', text: 'Bikin ketawa padahal nggak ada yang lucu' },
  { emoji: '🧠', text: 'Pinter banget, tapi nggak sok pinter' },
  { emoji: '💬', text: 'Enak diajak ngobrol apa aja' },
  { emoji: '🫂', text: 'Supportif tanpa diminta' },
  { emoji: '✨', text: 'Aura positifnya nular ke semua orang' },
  { emoji: '🎯', text: 'Tau apa yang dia mau dalam hidup' },
  { emoji: '🌊', text: 'Tenang tapi dalemnya dalam banget' },
  { emoji: '💪', text: 'Kuat menghadapi tantangan' },
  { emoji: '🌸', text: 'Baik hati tapi nggak lebay' },
];

function revealLoveCards() {
  const grid = document.getElementById('loveCardsGrid');
  grid.innerHTML = '';
  LOVE_ITEMS.forEach((item, i) => {
    const card = document.createElement('div');
    card.classList.add('love-card');
    card.innerHTML = `<span class="love-card-emoji">${item.emoji}</span><p class="love-card-text">${item.text}</p>`;
    grid.appendChild(card);
    setTimeout(() => card.classList.add('revealed'), 200 + i * 180);
  });

  const btn = document.getElementById('btnScreen4');
  setTimeout(() => {
    btn.style.opacity = '1';
    btn.style.pointerEvents = 'all';
  }, 200 + LOVE_ITEMS.length * 180 + 400);
}
document.getElementById('btnScreen4').addEventListener('click', () => goToScreen(5));

// ── Screen 5 — Timeline ────────────────────────────────────────
const MEMORIES = [
  {
    icon: '🌅',
    title: 'Pertemuan pertama yang nggak terlupakan',
    desc: 'Waktu itu kita ketemu dan aku pikir, "orang ini pasti seru." Dan beneran sih, nggak salah tebak. 😄'
  },
  {
    icon: '💬',
    title: 'Obrolan panjang yang nggak ada habisnya',
    desc: 'Nggak tau gimana ceritanya, tapi ngobrol sama kamu itu bisa dari topik serius sampe hal receh yang bikin ngakak.'
  },
  {
    icon: '🤣',
    title: 'Momen nggak sengaja jadi lucu',
    desc: 'Kamu tau lah momen itu. Yang waktu itu kita ketawa sampe nggak bisa napas. Masih inget nggak? 😂'
  },
  {
    icon: '🌟',
    title: 'Waktu kamu nunjukin siapa diri kamu sebenarnya',
    desc: 'Di situ aku baru sadar, kamu tuh beneran orang baik. Bukan pura-pura, bukan perform. Beneran.'
  },
  {
    icon: '🎂',
    title: 'Dan hari ini...',
    desc: 'Hari ini aku pengen kamu tau bahwa orang-orang sekitarmu beruntung banget punya kamu. Termasuk aku. 💕'
  },
];

function revealTimeline() {
  const tl = document.getElementById('timeline');
  tl.innerHTML = '';
  MEMORIES.forEach((mem, i) => {
    const item = document.createElement('div');
    item.classList.add('timeline-item');
    item.innerHTML = `
      <div class="timeline-dot">
        <div class="timeline-icon">${mem.icon}</div>
      </div>
      <div class="timeline-body">
        <div class="timeline-title">${mem.title}</div>
        <div class="timeline-desc">${mem.desc}</div>
      </div>
    `;
    tl.appendChild(item);
    setTimeout(() => item.classList.add('revealed'), 300 + i * 250);
  });

  const btn = document.getElementById('btnScreen5');
  setTimeout(() => {
    btn.style.opacity = '1';
    btn.style.pointerEvents = 'all';
  }, 300 + MEMORIES.length * 250 + 400);
}
document.getElementById('btnScreen5').addEventListener('click', () => goToScreen(6));

// ── Screen 6 — Surprise / Reveal ───────────────────────────────
let revealed = false;
document.getElementById('btnReveal').addEventListener('click', () => {
  if (revealed) return;
  revealed = true;

  // Animate gift box
  const gift = document.getElementById('giftBox');
  gift.style.animation = 'none';
  gift.style.transform = 'scale(1.3) rotate(15deg)';
  setTimeout(() => { gift.style.transform = 'scale(0)'; }, 400);

  // Burst particles
  for (let i = 0; i < 15; i++) {
    setTimeout(createParticle, i * 80);
  }

  // Show hidden message
  const msg = document.getElementById('hiddenMessage');
  msg.style.display = 'block';
  setTimeout(() => msg.classList.add('visible'), 50);

  // Show next btn
  const btn = document.getElementById('btnScreen6');
  setTimeout(() => {
    btn.style.opacity = '1';
    btn.style.pointerEvents = 'all';
  }, 1200);
});
document.getElementById('giftBox').addEventListener('click', () => {
  document.getElementById('btnReveal').click();
});
document.getElementById('btnScreen6').addEventListener('click', () => goToScreen(7));

// ── Screen 7 — Final / Confetti ────────────────────────────────
function startFinalScene() {
  setTimeout(() => {
    document.getElementById('finalMessage').style.opacity = '1';
  }, 800);
}

// Confetti engine
const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');
let confettiActive = false;
let confettiPieces = [];

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const CONFETTI_COLORS = [
  '#e8637a','#ffb3c1','#d4af72','#f5e1a4',
  '#c94b62','#fce4ec','#7c3f5e','#ff80ab',
  '#f48fb1','#ffffff',
];

function spawnConfetti() {
  for (let i = 0; i < 120; i++) {
    confettiPieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * -200,
      w: 6 + Math.random() * 8,
      h: 4 + Math.random() * 6,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      vx: (Math.random() - 0.5) * 3,
      vy: 2 + Math.random() * 4,
      rot: Math.random() * 360,
      rotV: (Math.random() - 0.5) * 6,
      opacity: 0.8 + Math.random() * 0.2,
    });
  }
}

function drawConfetti() {
  if (!confettiActive) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confettiPieces.forEach((p, i) => {
    p.x   += p.vx;
    p.y   += p.vy;
    p.rot += p.rotV;
    p.vy  += 0.05; // gravity

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot * Math.PI / 180);
    ctx.globalAlpha = p.opacity;
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    ctx.restore();

    if (p.y > canvas.height + 50) {
      confettiPieces.splice(i, 1);
    }
  });

  requestAnimationFrame(drawConfetti);
}

document.getElementById('btnCelebrate').addEventListener('click', () => {
  confettiActive = true;
  spawnConfetti();
  drawConfetti();

  // Spawn more waves
  setTimeout(spawnConfetti, 600);
  setTimeout(spawnConfetti, 1200);

  // Play success tone
  playCelebration();

  // Animate button
  const btn = document.getElementById('btnCelebrate');
  btn.textContent = '🎉 Yeayyy! Happy Birthday! 🎉';
  btn.style.background = 'linear-gradient(135deg, #d4af72, #e8637a)';

  // Shake cake
  const cake = document.getElementById('cakeContainer');
  cake.style.animation = 'cakeShake 0.5s ease';

  setTimeout(() => {
    confettiActive = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, 8000);
});

function playCelebration() {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [523, 659, 784, 1047];
    notes.forEach((freq, i) => {
      const osc  = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.frequency.value = freq;
      osc.type = 'sine';
      const t = audioCtx.currentTime + i * 0.15;
      gain.gain.setValueAtTime(0.1, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
      osc.start(t);
      osc.stop(t + 0.4);
    });
  } catch(e) {}
}

// CSS for cake shake
const style = document.createElement('style');
style.textContent = `
  @keyframes cakeShake {
    0%,100%{transform:translateX(0)}
    20%{transform:translateX(-8px) rotate(-2deg)}
    40%{transform:translateX(8px) rotate(2deg)}
    60%{transform:translateX(-5px) rotate(-1deg)}
    80%{transform:translateX(5px) rotate(1deg)}
  }
`;
document.head.appendChild(style);

// ── Scroll-friendly screens (4, 5, 7) ─────────────────────────
// Allow internal scrolling on overflow screens
[4, 5, 7].forEach(n => {
  const el = document.getElementById('screen' + n);
  if (el) {
    el.addEventListener('touchmove', e => e.stopPropagation(), { passive: true });
    el.addEventListener('wheel', e => e.stopPropagation(), { passive: true });
  }
});

// ── Swipe Detection ────────────────────────────────────────────
let touchStartY = 0;
document.addEventListener('touchstart', e => {
  touchStartY = e.touches[0].clientY;
}, { passive: true });

// ── Init ───────────────────────────────────────────────────────
updateDots(1);
document.getElementById('screen1').classList.add('active');
