function enviarWhatsApp() {
  const nome = document.getElementById("nome").value.trim();
  const empresa = document.getElementById("empresa").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();

  if (!nome || !telefone || !mensagem) {
    alert("Por favor preencha todos os campos!");
    return;
  }

  // Monta mensagem formatada
  const texto = `
  👤 *Nome:* ${nome}\n
  🏢 *Empresa:* ${empresa}\n
  📱 *WhatsApp:* ${telefone}\n
  ✉️ *Mensagem:* ${mensagem}
  `;

  // Número da empresa com código do país
  const numeroEmpresa = "5531997604789";

  // Link para abrir WhatsApp com mensagem pronta
  const link = `https://wa.me/${numeroEmpresa}?text=${encodeURIComponent(
    texto
  )}`;

  window.open(link, "_blank");
}
(function () {
  const spans = document.querySelectorAll(".resultado-span");

  if (!spans.length) return;

  const startCounter = (el) => {
    const finalValue = parseInt(el.dataset.value, 10);
    let current = 0;
    const duration = 1500;
    const stepTime = 16;
    const increment = finalValue / (duration / stepTime);

    const counter = () => {
      current += increment;
      if (current < finalValue) {
        el.textContent = Math.ceil(current) + "%";
        requestAnimationFrame(counter);
      } else {
        el.textContent = finalValue + "%";
      }
    };

    counter();
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  spans.forEach((span) => observer.observe(span));
})();

const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav a");

function closeMenu() {
  nav.classList.remove("active");
  toggle.classList.remove("active");
  document.body.style.overflow = "";
}

toggle.addEventListener("click", () => {
  nav.classList.toggle("active");
  toggle.classList.toggle("active");
  document.body.style.overflow = nav.classList.contains("active")
    ? "hidden"
    : "";
});

// Fecha ao clicar em qualquer link
navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Fecha com ESC (desktop / acessibilidade)
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});
nav.addEventListener("click", (e) => {
  if (e.target === nav) {
    closeMenu();
  }
});

const cards = document.querySelectorAll(".about-card");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.2 }
);

cards.forEach((card) => observer.observe(card));

const solutionCards = document.querySelectorAll(".solution-card");

const newObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

solutionCards.forEach((card) => newObserver.observe(card));

const sectorCards = document.querySelectorAll(".sector-card");

const sectorObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        sectorObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

sectorCards.forEach((card) => sectorObserver.observe(card));
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");
  const icon = item.querySelector(".icon");

  question.addEventListener("click", () => {
    const isOpen = item.classList.contains("active");

    faqItems.forEach((i) => {
      i.classList.remove("active");
      i.querySelector(".faq-answer").style.maxHeight = null;
      i.querySelector(".icon").textContent = "+";
    });

    if (!isOpen) {
      item.classList.add("active");
      answer.style.maxHeight = answer.scrollHeight + "px";
      icon.textContent = "−";
    }
  });
});

const sectorImages = [
  "./assets/sectors/agro.png",
  "./assets/sectors/construcao.png",
  "./assets/sectors/energia.png",
  "./assets/sectors/governo.png",
];

const section = document.querySelector(".sectors-slider");
let currentIndex = 0;

function changeBackground() {
  section.style.backgroundImage = `url(${sectorImages[currentIndex]})`;
  currentIndex = (currentIndex + 1) % sectorImages.length;
}

// imagem inicial
changeBackground();

// troca a cada 5 segundos
setInterval(changeBackground, 5000);
