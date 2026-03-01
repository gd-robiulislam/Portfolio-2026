// LOADER
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").style.opacity = "0";
    setTimeout(() => {
      document.getElementById("loader").style.display = "none";
    }, 1000);
  }, 1500);
});

// CUSTOM CURSOR
if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {

  const cursor = document.querySelector(".cursor");

  document.addEventListener("mousemove", e => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

}

// FILTER FIXED
const buttons = document.querySelectorAll(".filters button");
const cards = document.querySelectorAll(".card");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.getAttribute("data-filter");

    // active button style
    buttons.forEach(b => b.classList.remove("active-btn"));
    btn.classList.add("active-btn");

    cards.forEach(card => {
      if (filter === "all" || card.classList.contains(filter)) {
        card.classList.remove("hide");
      } else {
        card.classList.add("hide");
      }
    });
  });
});

// SCROLL REVEAL FIXED
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    } else {
      entry.target.classList.remove("active");
    }
  });
}, {
  threshold: 0.25
});

document.querySelectorAll(".reveal").forEach(el => {
  observer.observe(el);
});

window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = (scrollTop / scrollHeight) * 100;

  document.querySelector(".progress-bar").style.width = progress + "%";
});

const toggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("nav ul");

toggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// SAFE MAGNETIC BUTTON
document.querySelectorAll("button, .filters button").forEach(btn => {

  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const moveX = (x - rect.width / 2) * 0.15;
    const moveY = (y - rect.height / 2) * 0.15;

    btn.style.transition = "transform 0.1s ease";
    btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transition = "transform 0.3s ease";
    btn.style.transform = "translate(0,0)";
  });

});

// TYPEWRITER EFFECT
const roles = [
  "Visual Designer",
  "Logo Specialist",
  "Brand Identity Expert",
  "Motion Graphics (Upcoming)"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const el = document.getElementById("typewriter");
  const current = roles[roleIndex];

  if (!deleting) {
    el.textContent = current.substring(0, charIndex++);
    if (charIndex > current.length) {
      deleting = true;
      setTimeout(typeLoop, 1200);
      return;
    }
  } else {
    el.textContent = current.substring(0, charIndex--);
    if (charIndex < 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeLoop, deleting ? 40 : 70);
}

typeLoop();

// 3D TILT EFFECT
document.querySelectorAll(".card").forEach(card => {

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 12;
    const rotateY = (x - centerX) / 12;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0) scale(1)";
  });

});

const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".card").forEach(card => {

  card.addEventListener("click", () => {
    const title = card.querySelector("h3")?.innerText || "Project";
    const desc = card.querySelector("p")?.innerText || "Project description here.";

    modalTitle.textContent = title;
    modalDesc.textContent = desc;

    modal.classList.add("active");
  });

});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});

document.addEventListener("DOMContentLoaded", function () {

  const modal = document.getElementById("modal");
  const closeModal = document.getElementById("closeModal");
  const cards = document.querySelectorAll(".card");

  if (!modal || !closeModal || cards.length === 0) {
    return; // stop if elements don't exist
  }

  cards.forEach(card => {
    card.addEventListener("click", function () {
      modal.style.display = "flex";
    });
  });

  closeModal.addEventListener("click", function () {
    modal.style.display = "none";
  });

  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

});