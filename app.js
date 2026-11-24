const produtos = [
  { id: 1, categoria: "shonen", anime: "Naruto Shippuden", nome: "Camiseta Oversized Akatsuki Cloud", desc: "Algodão pesado 100% fio 30.1 com bordado em alto relevo da nuvem vermelha.", preco: 119.90, img: "img/akatsuki.svg" },
  { id: 2, categoria: "shonen", anime: "Bleach", nome: "Moletom Soul Reaper — Bankai", desc: "Moletom canguru flanelado preto fosco com estampa minimalista Shinigami.", preco: 219.90, img: "img/bleach.svg" },
  { id: 3, categoria: "shonen", anime: "One Piece", nome: "Camiseta Gear 5 — Grand Line", desc: "Edição especial Chapéu de Palha com silk de alta definição e gola canelada.", preco: 109.90, img: "img/onepiece.svg" },
  { id: 4, categoria: "shonen", anime: "Dragon Ball Z", nome: "Jaqueta Corta-Vento Capsule Corp", desc: "Impermeável leve com patch oficial da Corporação Cápsula no peito.", preco: 249.90, img: "img/dbz.svg" },
  { id: 5, categoria: "shojo", anime: "Sailor Moon", nome: "Cropped Crystal Star Brooch", desc: "Malha canelada premium com detalhe dourado lunar na gola.", preco: 99.90, img: "img/sailor.svg" },
  { id: 6, categoria: "shojo", anime: "Sakura Card Captors", nome: "Moletom Pastel Clow Cards", desc: "Rosa pastel com asas bordadas nas mangas e estampa do Báculo Estrelado.", preco: 229.90, img: "img/sakura.svg" },
  { id: 7, categoria: "shojo", anime: "Demon Slayer", nome: "Camiseta Kimono Asanoha — Nezuko", desc: "Estampa geométrica tradicional inspirada no kimono da Nezuko Kamado.", preco: 114.90, img: "img/nezuko.svg" },
  { id: 8, categoria: "shonen", anime: "Jujutsu Kaisen", nome: "Hoodie Expansão de Domínio", desc: "Modelagem streetwear pesada com estampa nas costas em tinta reagente.", preco: 239.90, img: "img/jujutsu.svg" }
];

let carrinho = [];

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function renderizarProdutos(filtro = "todos") {
  const grid = document.getElementById("produtos-grid");
  grid.innerHTML = "";

  const filtrados = filtro === "todos" ? produtos : produtos.filter(p => p.categoria === filtro);

  filtrados.forEach(p => {
    const isShonen = p.categoria === "shonen";
    grid.innerHTML += `
      <article class="card">
        <div class="card-banner">
          <span class="franchise-pill">${p.anime}</span>
          <img src="${p.img}" alt="${p.nome}" />
        </div>
        <div class="card-body">
          <div>
            <div class="cat-label ${isShonen ? 'shonen-color' : 'shojo-color'}">
              ${isShonen ? '⚔️ Linha Shonen' : '🌙 Linha Shojo'}
            </div>
            <h3>${p.nome}</h3>
            <p>${p.desc}</p>
          </div>
          <div class="price-row">
            <span class="price">${formatarMoeda(p.preco)}</span>
            <button class="buy-btn" onclick="adicionarCarrinho(${p.id})">+ Carrinho</button>
          </div>
        </div>
      </article>
    `;
  });
}

function filtrar(categoria, btn) {
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  renderizarProdutos(categoria);
}

function adicionarCarrinho(id) {
  const item = produtos.find(p => p.id === id);
  if (item) {
    carrinho.push(item);
    atualizarBadgeCarrinho();
  }
}

function removerCarrinho(index) {
  carrinho.splice(index, 1);
  atualizarBadgeCarrinho();
  renderizarModalCarrinho();
}

function atualizarBadgeCarrinho() {
  document.getElementById("cart-count").innerText = carrinho.length;
}

function abrirCarrinho() {
  renderizarModalCarrinho();
  document.getElementById("cart-modal").classList.add("open");
}

function fecharCarrinho() {
  document.getElementById("cart-modal").classList.remove("open");
}

function renderizarModalCarrinho() {
  const lista = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");

  if (carrinho.length === 0) {
    lista.innerHTML = `<p style="color: var(--muted); text-align:center; padding: 1.5rem 0;">Seu carrinho está vazio.</p>`;
    totalEl.innerText = "Total: R$ 0,00";
    return;
  }

  let total = 0;
  lista.innerHTML = carrinho.map((item, idx) => {
    total += item.preco;
    return `
      <div class="cart-item">
        <span>${item.nome}</span>
        <div>
          <strong style="margin-right: 0.6rem;">${formatarMoeda(item.preco)}</strong>
          <button onclick="removerCarrinho(${idx})" style="background:none;border:none;color:#ff4757;cursor:pointer;font-weight:bold;">✕</button>
        </div>
      </div>
    `;
  }).join("");

  totalEl.innerText = `Total: ${formatarMoeda(total)}`;
}

function finalizarPedido() {
  if (carrinho.length === 0) return;
  alert("Pedido simulado com sucesso! Infraestrutura validada via CI/CD.");
  carrinho = [];
  atualizarBadgeCarrinho();
  fecharCarrinho();
}

document.addEventListener("DOMContentLoaded", () => renderizarProdutos("todos"));
