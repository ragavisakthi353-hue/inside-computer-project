gsap.registerPlugin(ScrollTrigger);

/* SCROLL */
gsap.utils.toArray(".section").forEach(sec => {
  gsap.fromTo(sec,
    { opacity: 0, y: 100 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: sec,
        start: "top 90%"
      }
    }
  );
});

/* HERO ANIMATION */
gsap.from(".hero h1", { y: -50, opacity: 0, duration: 1 });
gsap.from(".hero p", { opacity: 0, delay: 0.5 });

/* PROGRESS */
window.addEventListener("scroll", () => {
  let scroll = window.scrollY;
  let height = document.body.scrollHeight - window.innerHeight;
  document.getElementById("progressBar").style.width =
    (scroll / height) * 100 + "%";
});

/* INFO */
function showInfo(type) {
  const box = document.getElementById("infoBox");

  if (type === "cpu")
    box.innerHTML = "<h2>CPU</h2><p>Executes instructions</p>";
  else if (type === "ram")
    box.innerHTML = "<h2>RAM</h2><p>Stores temporary data</p>";
  else
    box.innerHTML = "<h2>GPU</h2><p>Handles graphics</p>";
}

/* CPU */
function activateCore(el) {
  el.classList.toggle("active");
}

/* PROGRAM */
const steps = ["input","cpuStep","ramStep","gpuStep","output"];

function runProgram() {
  steps.forEach(id => {
    document.getElementById(id).classList.remove("active");
  });

  const messages = [
    "Receiving input...",
    "Processing...",
    "Loading memory...",
    "Rendering...",
    "Output ready!"
  ];

  steps.forEach((id, i) => {
    setTimeout(() => {
      document.getElementById(id).classList.add("active");
      typeText(messages[i]);
    }, i * 800);
  });
}

/* TYPE */
function typeText(text) {
  let i = 0;
  const el = document.getElementById("typingText");
  el.innerHTML = "";

  let inter = setInterval(() => {
    el.innerHTML += text.charAt(i);
    i++;
    if (i >= text.length) clearInterval(inter);
  }, 30);
}

/* POWER */
let power = false;
function togglePower() {
  power = !power;
  document.getElementById("powerStatus").innerText = power ? "ON" : "OFF";
}

/* PARTICLES */
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
for (let i = 0; i < 80; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2,
    dx: Math.random() - 0.5,
    dy: Math.random() - 0.5
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.x += p.dx;
    p.y += p.dy;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

animate();

/* 3D EFFECT */
document.addEventListener("mousemove", e => {
  let x = (window.innerWidth/2 - e.clientX)/25;
  let y = (window.innerHeight/2 - e.clientY)/25;
  document.querySelector(".hero").style.transform =
    `rotateY(${x}deg) rotateX(${y}deg)`;
});