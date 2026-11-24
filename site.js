// A.R Systems — o pouco de JavaScript do site. Sem ele, a página continua inteira
// (todas as janelas aparecem abertas, uma embaixo da outra, e os prints abrem como imagem).
const config = window.AR_CONFIG || {};

// Contatos vindos do config.js
function preencherContatos() {
  const links = {
    whatsapp: config.whatsapp && `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(config.mensagem || "")}`,
    instagram: config.instagram && `https://instagram.com/${config.instagram}`,
    github: config.github && `https://github.com/${config.github}`,
  };
  for (const a of document.querySelectorAll("[data-link]")) {
    const href = links[a.dataset.link];
    if (href) a.href = href;
  }
  const ano = document.querySelector("[data-ano]");
  if (ano) ano.textContent = new Date().getFullYear();
}

// Janelas que deslizam. Em cada nível fica uma aberta só: "Quem somos" ou "Nossos serviços",
// e, dentro de serviços, um dos quatro. O endereço guarda a janela (#sobre, #fluxograma...),
// para dar para mandar o link direto. Os nomes do endereço não são id de elemento de propósito:
// assim o navegador não rola as janelas sozinho.
function janelas() {
  const todas = [...document.querySelectorAll("[data-janela]")];
  if (!todas.length) return;
  const porNome = new Map(todas.map((j) => [j.dataset.janela, j]));
  const PADRAO = "agendamento";
  const mae = (j) => j.parentElement.closest("[data-janela]");
  const irmas = (j) => todas.filter((x) => mae(x) === mae(j));
  const celular = matchMedia("(max-width: 899.98px)");
  const calmo = matchMedia("(prefers-reduced-motion: reduce)");

  function marcar(j, aberta) {
    j.classList.toggle("aberta", aberta);
    j.querySelector(":scope > .janela__cabeca .janela__aba").setAttribute("aria-expanded", String(aberta));
    j.querySelector(":scope > .janela__conteudo").inert = !aberta; // o que está fechado não pega foco
  }

  function abrir(nome) {
    let j = porNome.get(nome) || porNome.get(PADRAO);
    // Abrir o grupo mantém o serviço que já estava aberto dentro dele
    const filhas = todas.filter((x) => mae(x) === j);
    if (filhas.length && !filhas.some((f) => f.classList.contains("aberta"))) {
      for (const f of filhas) marcar(f, f === (porNome.get(PADRAO) || filhas[0]));
    }
    // Abre a janela e as janelas-mãe dela; fecha as irmãs em cada nível
    for (; j; j = mae(j)) for (const i of irmas(j)) marcar(i, i === j);
  }

  // Ordem das entradas: as janelas na carga (--i) e as peças de cada uma quando ela abre (--n)
  for (const j of todas) {
    j.style.setProperty("--i", irmas(j).indexOf(j) + (mae(j) ? 2 : 0));
    const pecas = j.querySelector(":scope > .janela__conteudo").querySelectorAll(".entra");
    pecas.forEach((p, n) => { if (p.closest("[data-janela]") === j) p.style.setProperty("--n", Math.min(n, 6)); });
  }

  // Na carga, tudo fechado menos o caminho até a janela do endereço
  for (const j of todas) marcar(j, false);
  abrir(location.hash.slice(1));
  document.documentElement.classList.add("janelas-ok");
  requestAnimationFrame(() => requestAnimationFrame(() => document.documentElement.classList.remove("sem-transicao")));

  document.addEventListener("click", (e) => {
    const botao = e.target.closest(".janela__aba");
    if (!botao) return;
    const j = botao.closest("[data-janela]");
    if (j.classList.contains("aberta")) return; // sempre fica uma aberta em cada nível
    const nome = j.dataset.janela;
    // No endereço vai o serviço aberto (ou "sobre")
    const aberto = j.querySelector("[data-janela].aberta");
    abrir(nome);
    history.replaceState(null, "", `#${(j.querySelector("[data-janela].aberta") || aberto || j).dataset.janela}`);
    // No celular, a janela de cima fechou e a página subiu: traz a que abriu para a vista
    if (celular.matches) {
      setTimeout(() => {
        const topo = botao.getBoundingClientRect().top;
        if (topo < 0 || topo > innerHeight * 0.5) botao.scrollIntoView({ block: "start", behavior: calmo.matches ? "auto" : "smooth" });
      }, calmo.matches ? 0 : 450);
    }
  });
  addEventListener("hashchange", () => abrir(location.hash.slice(1)));
}

// Print ampliado num <dialog>
function zoom() {
  const caixa = document.querySelector("[data-zoom]");
  if (!caixa || typeof caixa.showModal !== "function") return;
  const img = caixa.querySelector(".zoom__img");
  const legenda = caixa.querySelector(".zoom__legenda");
  document.addEventListener("click", (e) => {
    const link = e.target.closest("[data-ampliar]");
    if (!link) return;
    e.preventDefault();
    const original = link.querySelector("img");
    img.src = link.href;
    img.alt = original ? original.alt : "";
    legenda.textContent = original ? original.alt : "";
    caixa.showModal();
  });
  // Clique fora da imagem fecha
  caixa.addEventListener("click", (e) => { if (e.target === caixa) caixa.close(); });
}

preencherContatos();
janelas();
zoom();
