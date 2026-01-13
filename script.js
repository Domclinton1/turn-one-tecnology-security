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
