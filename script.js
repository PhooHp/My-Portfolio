/* Phoo Wai Thaw — QS Portfolio scripts */
document.documentElement.classList.add("js");

// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Nav scroll state
const nav = document.querySelector(".nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 30);
});

// Mobile menu toggle
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", open);
});
document.querySelectorAll(".nav-link").forEach((l) =>
  l.addEventListener("click", () => {
    links.classList.remove("open");
    toggle.classList.remove("open");
  })
);

// Active nav highlight on scroll
const sections = document.querySelectorAll("section[id], header[id]");
const navLinks = document.querySelectorAll(".nav-link");
const setActive = () => {
  const y = window.scrollY + 120;
  sections.forEach((sec) => {
    if (y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight) {
      navLinks.forEach((l) => l.classList.remove("active"));
      const active = document.querySelector(`.nav-link[href="#${sec.id}"]`);
      if (active) active.classList.add("active");
    }
  });
};
window.addEventListener("scroll", setActive);

// Reveal on scroll
const revealEls = document.querySelectorAll(
  ".section, .skill-card, .project, .stat, .edu-card, .contact-card"
);
revealEls.forEach((el) => el.classList.add("reveal"));
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach((el) => io.observe(el));

// Animated stat counters
const counters = document.querySelectorAll(".stat-num");
const counterIO = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.target;
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 40));
      const tick = () => {
        current += step;
        if (current >= target) {
          el.textContent = target;
        } else {
          el.textContent = current;
          requestAnimationFrame(tick);
        }
      };
      tick();
      counterIO.unobserve(el);
    });
  },
  { threshold: 0.5 }
);
counters.forEach((c) => counterIO.observe(c));

// Cursor glow on skill cards
document.querySelectorAll(".skill-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  });
});
