const catalogo = [
  { id: 1, cat: "masculino", tag: "MAIS VENDIDO", rating: "4.9 (312)", nome: "Moletom Heavyweight Black Edition", desc: "Algodão 420g peluciado com modelagem boxy streetwear e capuz duplo.", precoAntigo: 289.90, preco: 219.90, tamanhos: ["P", "M", "G", "GG"], img: "img/akatsuki.jpg" },
  { id: 2, cat: "masculino", tag: "-25% OFF", rating: "4.8 (198)", nome: "Sweatshirt Oversized Charcoal", desc: "Moletom careca lavado em estonagem mineral com gola canelada reforçada.", precoAntigo: 249.90, preco: 189.90, tamanhos: ["P", "M", "G", "GG"], img: "img/bleach.jpg" },
  { id: 3, cat: "masculino", tag: "ESSENCIAL", rating: "4.9 (540)", nome: "Camiseta Pima Cotton Premium", desc: "Malha peruana ultra macia que não desbota e mantém o caimento impecável.", precoAntigo: 139.90, preco: 99.90, tamanhos: ["P", "M", "G", "GG"], img: "img/onepiece.jpg" },
  { id: 4, cat: "masculino", tag: "LANÇAMENTO", rating: "5.0 (87)", nome: "Jaqueta Bomber Corta-Vento Urban", desc: "Tecido tecnológico repelente à água com bolsos cargo e zíper selado.", precoAntigo: 359.90, preco: 279.90, tamanhos: ["M", "G", "GG"], img: "img/dbz.jpg" },
  { id: 5, cat: "feminino", tag: "DESTAQUE", rating: "4.9 (264)", nome: "Conjunto Urban Cropped & Cargo", desc: "Peças estruturadas de alta gramatura para composições urbanas modernas.", precoAntigo: 239.90, preco: 179.90, tamanhos: ["PP", "P", "M", "G"], img: "img/sailor.jpg" },
  { id: 6, cat: "feminino", tag: "-20% OFF", rating: "4.8 (175)", nome: "Moletom Oversized Off-White Studio", desc: "Modelagem ampla com ombros deslocados e toque aveludado.", precoAntigo: 249.90, preco: 199.90, tamanhos: ["PP", "P", "M", "G"], img: "img/sakura.jpg" },
  { id: 7, cat: "feminino", tag: "BEST SELLER", rating: "4.9 (410)", nome: "T-Shirt Boxy Vintage Wash", desc: "Estonagem artesanal exclusiva com gola alta ribana e corte contemporâneo.", precoAntigo: 149.90, preco: 109.90, tamanhos: ["PP", "P", "M", "G"], img: "img/nezuko.jpg" },
  { id: 8, cat: "masculino", tag: "KIT ECONÔMICO", rating: "4.9 (620)", nome: "Pack 3 Camisetas Urban Basics", desc: "Trio versátil nas cores neutras essenciais do guarda-roupa streetwear.", precoAntigo: 239.90, preco: 179.90, tamanhos: ["P", "M", "G", "GG"], img: "img/jujutsu.jpg" },
  { id: 9, cat: "calcados", tag: "DROP LIMITADO", rating: "5.0 (143)", nome: "Sneaker Runner Crimson Pro", desc: "Amortecimento responsivo de alta densidade e cabedal respirável.", precoAntigo: 499.90, preco: 389.90, tamanhos: ["39", "40", "41", "42", "43"], img: "img/sneaker1.jpg" },
  { id: 10, cat: "calcados", tag: "CLÁSSICO", rating: "4.8 (290)", nome: "Tênis Court Leather Low White", desc: "Couro sintético premium minimalista com solado caixa costurado.", precoAntigo: 379.90, preco: 299.90, tamanhos: ["37", "38", "39", "40", "41", "42"], img: "img/sneaker2.jpg" },
  { id: 11, cat: "acessorios", tag: "TECH GEAR", rating: "4.9 (215)", nome: "Mochila Antifurto Notebook 16\"", desc: "Compartimento acolchoado para laptop, porta USB externa e tecido impermeável.", precoAntigo: 299.90, preco: 229.90, tamanhos: ["Único"], img: "img/mochila.jpg" },
  { id: 12, cat: "acessorios", tag: "-30% OFF", rating: "4.7 (184)", nome: "Boné Dad Hat Sarja Estonada", desc: "Fecho strapback metálico ajustável e aba curva estruturada.", precoAntigo: 99.90, preco: 69.90, tamanhos: ["Único"], img: "img/bone.jpg" }
];

let estado = {
  categoria: "todos",
  busca: "",
  ordem: "destaque",
  tamanhosSelecionados: {},
  carrinho: [],
  descontoCupom: 0
};

function brl(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function mostrarToast(msg) {
  const t = document.getElementById("toast");
  t.innerText = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2500);
}

function selecionarTamanho(prodId, tam, el) {
  estado.tamanhosSelecionados[prodId] = tam;
  el.parentElement.querySelectorAll(".size-pill").forEach(p => p.classList.remove("selected"));
  el.classList.add("selected");
}

function renderizarVitrine() {
  const grid = document.getElementById("produtos-grid");
  let lista = [...catalogo];

  if (estado.categoria !== "todos") {
    lista = lista.filter(p => p.cat === estado.categoria);
  }
  if (estado.busca.trim() !== "") {
    const q = estado.busca.toLowerCase();
    lista = lista.filter(p => p.nome.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));
  }
  if (estado.ordem === "menor") lista.sort((a, b) => a.preco - b.preco);
  if (estado.ordem === "maior") lista.sort((a, b) => b.preco - a.preco);

  if (lista.length === 0) {
    grid.innerHTML = `<p style="color:var(--muted); grid-column:1/-1; text-align:center; padding:3rem 0;">Nenhum produto encontrado para essa busca.</p>`;
    return;
  }

  grid.innerHTML = lista.map(p => {
    const tamAtual = estado.tamanhosSelecionados[p.id] || p.tamanhos[0];
    estado.tamanhosSelecionados[p.id] = tamAtual;
    const parcela = brl(p.preco / 6);

    return `
      <article class="card">
        <div class="card-media">
          <span class="badge-promo">${p.tag}</span>
          <span class="badge-rating">★ ${p.rating}</span>
          <img src="${p.img}" alt="${p.nome}" loading="lazy" />
        </div>
        <div class="card-body">
          <div>
            <div class="cat-tag">${p.cat}</div>
            <h3>${p.nome}</h3>
            <p>${p.desc}</p>
            <div class="sizes">
              ${p.tamanhos.map(t => `
                <button type="button" class="size-pill ${t === tamAtual ? 'selected' : ''}"
                  onclick="selecionarTamanho(${p.id}, '${t}', this)">${t}</button>
              `).join("")}
            </div>
          </div>
          <div class="price-block">
            <div>
              <span class="old-price">${brl(p.precoAntigo)}</span>
              <span class="price">${brl(p.preco)}</span>
              <span class="installments">ou 6x de ${parcela} s/ juros</span>
            </div>
            <button class="add-btn" onclick="adicionarAoCarrinho(${p.id})">+ Comprar</button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function filtrarCategoria(cat, btn) {
  estado.categoria = cat;
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  renderizarVitrine();
}

function buscarProdutos(valor) {
  estado.busca = valor;
  renderizarVitrine();
}

function ordenarProdutos(valor) {
  estado.ordem = valor;
  renderizarVitrine();
}

function adicionarAoCarrinho(id) {
  const prod = catalogo.find(p => p.id === id);
  const tam = estado.tamanhosSelecionados[id] || prod.tamanhos[0];
  const existente = estado.carrinho.find(i => i.id === id && i.tam === tam);

  if (existente) {
    existente.qtd += 1;
  } else {
    estado.carrinho.push({ ...prod, tam, qtd: 1 });
  }

  atualizarCarrinhoUI();
  mostrarToast(`✓ ${prod.nome} (${tam}) adicionado!`);
}

function alterarQtd(idx, delta) {
  estado.carrinho[idx].qtd += delta;
  if (estado.carrinho[idx].qtd <= 0) {
    estado.carrinho.splice(idx, 1);
  }
  atualizarCarrinhoUI();
}

function aplicarCupom() {
  const code = document.getElementById("coupon-input").value.trim().toUpperCase();
  if (code === "PRIMEIRA10") {
    estado.descontoCupom = 0.10;
    mostrarToast("Cupom PRIMEIRA10 aplicado (10% OFF)!");
  } else if (code === "DEVOPS20") {
    estado.descontoCupom = 0.20;
    mostrarToast("Cupom DEVOPS20 aplicado (20% OFF)!");
  } else {
    estado.descontoCupom = 0;
    mostrarToast("Cupom inválido. Tente PRIMEIRA10 ou DEVOPS20.");
  }
  atualizarCarrinhoUI();
}

function atualizarCarrinhoUI() {
  const totalItens = estado.carrinho.reduce((acc, i) => acc + i.qtd, 0);
  document.getElementById("cart-badge").innerText = totalItens;

  const body = document.getElementById("drawer-body");
  if (estado.carrinho.length === 0) {
    body.innerHTML = `<p style="color:var(--muted); text-align:center; padding:3rem 0;">Seu carrinho está vazio. Aproveite os descontos da coleção!</p>`;
  } else {
    body.innerHTML = estado.carrinho.map((item, idx) => `
      <div class="cart-row">
        <img src="${item.img}" alt="${item.nome}" />
        <div class="cart-row-info">
          <h4>${item.nome}</h4>
          <small style="color:var(--muted);">Tamanho: ${item.tam}</small><br/>
          <span>${brl(item.preco * item.qtd)}</span>
        </div>
        <div class="qty-controls">
          <button class="qty-btn" onclick="alterarQtd(${idx}, -1)">-</button>
          <strong>${item.qtd}</strong>
          <button class="qty-btn" onclick="alterarQtd(${idx}, 1)">+</button>
        </div>
      </div>
    `).join("");
  }

  const subtotal = estado.carrinho.reduce((acc, i) => acc + (i.preco * i.qtd), 0);
  const desconto = subtotal * estado.descontoCupom;
  const frete = subtotal === 0 || (subtotal - desconto) >= 249 ? 0 : 19.90;
  const total = Math.max(0, subtotal - desconto + frete);

  document.getElementById("sum-subtotal").innerText = brl(subtotal);
  document.getElementById("sum-discount").innerText = `- ${brl(desconto)}`;
  document.getElementById("sum-shipping").innerText = frete === 0 ? "GRÁTIS" : brl(frete);
  document.getElementById("sum-total").innerText = brl(total);
}

function abrirDrawer() {
  atualizarCarrinhoUI();
  document.getElementById("cart-drawer").classList.add("open");
}

function fecharDrawer() {
  document.getElementById("cart-drawer").classList.remove("open");
}

function finalizarCompra() {
  if (estado.carrinho.length === 0) return;
  alert("Pedido #UW-2026 confirmado! Infraestrutura Azure + Jenkins + Docker operando em alta disponibilidade.");
  estado.carrinho = [];
  estado.descontoCupom = 0;
  atualizarCarrinhoUI();
  fecharDrawer();
}

document.addEventListener("DOMContentLoaded", () => {
  renderizarVitrine();
  atualizarCarrinhoUI();
});
