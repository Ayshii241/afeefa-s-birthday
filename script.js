// Confetti animation (simple, performant)
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let W, H;
let confetti = [];
const confettiCount = 150;
const colors = ['#ff00cc', '#00ffff', '#ffd700', '#ff69b4', '#00ffea'];

function resize() {
  W = window.innerWidth;
  H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;
}

class Confetti {
  constructor() {
    this.x = Math.random() * W;
    this.y = Math.random() * H - H;
    this.r = Math.random() * 6 + 4;
    this.d = Math.random() * confettiCount;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.tilt = Math.floor(Math.random() * 10) - 10;
    this.tiltAngleIncrement = (Math.random() * 0.07) + 0.05;
    this.tiltAngle = 0;
  }
  update() {
    this.tiltAngle += this.tiltAngleIncrement;
    this.y += (Math.cos(this.d) + 3 + this.r / 2) / 2;
    this.x += Math.sin(this.d);
    this.tilt = Math.sin(this.tiltAngle) * 15;

    if (this.y > H) {
      this.x = Math.random() * W;
      this.y = -10;
      this.tilt = Math.floor(Math.random() * 10) - 10;
    }
  }
  draw() {
    ctx.beginPath();
    ctx.lineWidth = this.r / 2;
    ctx.strokeStyle = this.color;
    ctx.moveTo(this.x + this.tilt + this.r / 4, this.y);
    ctx.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 4);
    ctx.stroke();
  }
}

function initConfetti() {
  confetti = [];
  for (let i = 0; i < confettiCount; i++) {
    confetti.push(new Confetti());
  }
}

function draw() {
  ctx.clearRect(0, 0, W, H);
  for (let c of confetti) {
    c.draw();
    c.update();
  }
  requestAnimationFrame(draw);
}

window.addEventListener('resize', () => {
  resize();
  initConfetti();
});

resize();
initConfetti();
draw();

// Countdown Timer
const countdownEl = document.getElementById('countdown');
// Set Afeefa's birthday date here (YYYY-MM-DD)
const birthdayDate = new Date('2025-08-15T00:00:00');

function updateCountdown() {
  const now = new Date();
  let diff = birthdayDate - now;

  // If birthday passed this year, count down to next year
  if (diff < 0) {
    birthdayDate.setFullYear(birthdayDate.getFullYear() + 1);
    diff = birthdayDate - now;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  countdownEl.textContent = `🎂 ${days}d ${hours}h ${minutes}m ${seconds}s until your big day!`;
}
setInterval(updateCountdown, 1000);
updateCountdown();

// Typewriter effect for quote
const typedMessage = document.getElementById('typedMessage');
const message = "Life's better with you around, Afeefa!";
let idx = 0;

function typeWriter() {
  if (idx < message.length) {
    typedMessage.textContent += message.charAt(idx);
    idx++;
    setTimeout(typeWriter, 90);
  }
}
typeWriter();

// Music toggle
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
let isPlaying = false;

musicToggle.addEventListener('click', () => {
  if (isPlaying) {
    bgMusic.pause();
    musicToggle.textContent = '🔊 Play Music';
  } else {
    bgMusic.play();
    musicToggle.textContent = '🔇 Pause Music';
  }
  isPlaying = !isPlaying;
});

// Wish Wall Logic
const wishForm = document.getElementById('wishForm');
const wishList = document.getElementById('wishList');

wishForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = wishForm.querySelector('input').value.trim();
  const wish = wishForm.querySelector('textarea').value.trim();

  if (!name || !wish) return;

  const p = document.createElement('p');
  p.innerHTML = `<strong>${name}:</strong> ${wish}`;
  wishList.prepend(p);

  wishForm.reset();
});