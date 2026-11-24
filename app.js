const produtos = [
  { id: 1, categoria: "masculino", linha: "Essentials", nome: "Moletom Canguru Heavyweight Black", desc: "Algodão 400g peluciado por dentro com modelagem boxy streetwear.", preco: 219.90, img: "img/akatsuki.jpg" },
  { id: 2, categoria: "masculino", linha: "Minimal", nome: "Sweatshirt Oversized Charcoal", desc: "Moletom careca sem capuz com acabamento lavado e gola canelada dupla.", preco: 189.90, img: "img/bleach.jpg" },
  { id: 3, categoria: "masculino", linha: "Basics", nome: "Camiseta Premium Fio 30.1 Pima", desc: "Corte reto clássico com toque macio e alta durabilidade.", preco: 99.90, img: "img/onepiece.jpg" },
  { id: 4, categoria: "masculino", linha: "Outerwear", nome: "Jaqueta Bomber Corta-Vento Urban", desc: "Tecido repelente à água com forro interno respirável e bolsos utilitários.", preco: 279.90, img: "img/dbz.jpg" },
  { id: 5, categoria: "feminino", linha: "Street Chic", nome: "Conjunto Urban Cropped & Cargo", desc: "Caimento estruturado moderno ideal para composições casuais.", preco: 179.90, img: "img/sailor.jpg" },
  { id: 6, categoria: "feminino", linha: "Comfort", nome: "Moletom Oversized Off-White", desc: "Malha sustentável de toque suave com ombros deslocados.", preco: 199.90, img: "img/sakura.jpg" },
  { id: 7, categoria: "feminino", linha: "Studio", nome: "T-Shirt Boxy Cotton Vintage", desc: "Lavagem estonada exclusiva com modelagem solta e confortável.", preco: 109.90, img: "img/nezuko.jpg" },
  { id: 8, categoria: "masculino", linha: "Drop Exclusivo", nome: "Pack Camisetas Urban Essentials", desc: "Kit versátil com acabamento reforçado para o dia a dia.", preco: 159.90, img: "img/jujutsu.jpg" }
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
    const isMasc = p.categoria === "masculino";
    grid.innerHTML += `
      <article class="card">
        <div class="card-banner">
          <span class="franchise-pill">${p.linha}</span>
          <img src="${p.img}" alt="${p.nome}" />
        </div>
        <div class="card-body">
          <div>
            <div class="cat-label ${isMasc ? 'shonen-color' : 'shojo-color'}">
              ${isMasc ? 'Masculino & Unissex' : 'Feminino'}
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
