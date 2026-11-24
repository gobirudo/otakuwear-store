const catalogo = [
  { id: 1, cat: "masculino", catLabel: "Masculino", tag: "MAIS VENDIDO", rating: "4.9", nome: "Moletom Heavyweight Black", desc: "Algodão 420g peluciado com modelagem boxy streetwear.", precoAntigo: 289.90, preco: 219.90, tamanhos: ["P", "M", "G", "GG"], img: "img/akatsuki.jpg" },
  { id: 2, cat: "masculino", catLabel: "Masculino", tag: "-25% OFF", rating: "4.8", nome: "Sweatshirt Oversized Charcoal", desc: "Moletom careca lavado em estonagem mineral.", precoAntigo: 249.90, preco: 189.90, tamanhos: ["P", "M", "G", "GG"], img: "img/bleach.jpg" },
  { id: 3, cat: "masculino", catLabel: "Masculino", tag: "ESSENCIAL", rating: "4.9", nome: "Camiseta Pima Cotton Premium", desc: "Malha peruana ultra macia de alta durabilidade.", precoAntigo: 139.90, preco: 99.90, tamanhos: ["P", "M", "G", "GG"], img: "img/onepiece.jpg" },
  { id: 4, cat: "masculino", catLabel: "Masculino", tag: "LANÇAMENTO", rating: "5.0", nome: "Jaqueta Bomber Corta-Vento", desc: "Tecido repelente à água com bolsos utilitários.", precoAntigo: 359.90, preco: 279.90, tamanhos: ["M", "G", "GG"], img: "img/dbz.jpg" },
  { id: 5, cat: "feminino", catLabel: "Feminino", tag: "DESTAQUE", rating: "4.9", nome: "Conjunto Urban Cropped & Cargo", desc: "Caimento estruturado para composições urbanas modernas.", precoAntigo: 239.90, preco: 179.90, tamanhos: ["PP", "P", "M", "G"], img: "img/sailor.jpg" },
  { id: 6, cat: "feminino", catLabel: "Feminino", tag: "-20% OFF", rating: "4.8", nome: "Moletom Oversized Off-White", desc: "Modelagem ampla com ombros deslocados e toque suave.", precoAntigo: 249.90, preco: 199.90, tamanhos: ["PP", "P", "M", "G"], img: "img/sakura.jpg" },
  { id: 7, cat: "feminino", catLabel: "Feminino", tag: "BEST SELLER", rating: "4.9", nome: "T-Shirt Boxy Vintage Wash", desc: "Estonagem artesanal exclusiva com gola alta ribana.", precoAntigo: 149.90, preco: 109.90, tamanhos: ["PP", "P", "M", "G"], img: "img/nezuko.jpg" },
  { id: 8, cat: "masculino", catLabel: "Masculino", tag: "KIT 3 PEÇAS", rating: "4.9", nome: "Pack Camisetas Urban Basics", desc: "Trio versátil nas cores neutras essenciais.", precoAntigo: 239.90, preco: 179.90, tamanhos: ["P", "M", "G", "GG"], img: "img/jujutsu.jpg" },
  { id: 9, cat: "gear", catLabel: "Sneakers & Gear", tag: "DROP LIMITADO", rating: "5.0", nome: "Sneaker Runner Crimson Pro", desc: "Amortecimento responsivo e cabedal respirável.", precoAntigo: 499.90, preco: 389.90, tamanhos: ["39", "40", "41", "42"], img: "img/sneaker1.jpg" },
  { id: 10, cat: "gear", catLabel: "Sneakers & Gear", tag: "CLÁSSICO", rating: "4.8", nome: "Tênis Court Leather White", desc: "Couro sintético minimalista com solado costurado.", precoAntigo: 379.90, preco: 299.90, tamanhos: ["38", "39", "40", "41", "42"], img: "img/sneaker2.jpg" },
  { id: 11, cat: "gear", catLabel: "Sneakers & Gear", tag: "TECH GEAR", rating: "4.9", nome: "Mochila Antifurto Laptop 16\"", desc: "Compartimento acolchoado e tecido impermeável.", precoAntigo: 299.90, preco: 229.90, tamanhos: ["Único"], img: "img/mochila.jpg" },
  { id: 12, cat: "gear", catLabel: "Sneakers & Gear", tag: "-30% OFF", rating: "4.7", nome: "Boné Dad Hat Sarja Estonada", desc: "Fecho metálico ajustável e aba curva estruturada.", precoAntigo: 99.90, preco: 69.90, tamanhos: ["Único"], img: "img/bone.jpg" }
];

let estado = { categoria: "todos", busca: "", ordem: "destaque", tamanhosSelecionados: {}, carrinho: [], descontoCupom: 0 };

function brl(v) { return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }); }

function mostrarToast(msg) {
  const t = document.getElementById("toast");
  t.innerText = msg; t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2200);
}

function selecionarTamanho(id, tam, el) {
  estado.tamanhosSelecionados[id] = tam;
  el.parentElement.querySelectorAll(".size-pill").forEach(p => p.classList.remove("selected"));
  el.classList.add("selected");
}

function renderizarVitrine() {
  const grid = document.getElementById("produtos-grid");
  let lista = [...catalogo];

  if (estado.categoria !== "todos") lista = lista.filter(p => p.cat === estado.categoria);
  if (estado.busca.trim() !== "") {
    const q = estado.busca.toLowerCase();
    lista = lista.filter(p => p.nome.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));
  }
  if (estado.ordem === "menor") lista.sort((a, b) => a.preco - b.preco);
  if (estado.ordem === "maior") lista.sort((a, b) => b.preco - a.preco);

  grid.innerHTML = lista.map(p => {
    const tamAtual = estado.tamanhosSelecionados[p.id] || p.tamanhos[0];
    estado.tamanhosSelecionados[p.id] = tamAtual;
    return `
      <article class="card">
        <div class="card-media">
          <span class="badge-promo">${p.tag}</span>
          <span class="badge-rating">★ ${p.rating}</span>
          <img src="${p.img}" alt="${p.nome}" />
        </div>
        <div class="card-body">
          <div>
            <div class="cat-tag">${p.catLabel}</div>
            <h3>${p.nome}</h3>
            <p>${p.desc}</p>
            <div class="sizes">
              ${p.tamanhos.map(t => `<button type="button" class="size-pill ${t === tamAtual ? 'selected' : ''}" onclick="selecionarTamanho(${p.id}, '${t}', this)">${t}</button>`).join("")}
            </div>
          </div>
          <div class="price-block">
            <div>
              <span class="old-price">${brl(p.precoAntigo)}</span>
              <span class="price">${brl(p.preco)}</span>
              <span class="installments">6x de ${brl(p.preco / 6)} s/ juros</span>
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

function buscarProdutos(v) { estado.busca = v; renderizarVitrine(); }
function ordenarProdutos(v) { estado.ordem = v; renderizarVitrine(); }

function adicionarAoCarrinho(id) {
  const prod = catalogo.find(p => p.id === id);
  const tam = estado.tamanhosSelecionados[id] || prod.tamanhos[0];
  const ex = estado.carrinho.find(i => i.id === id && i.tam === tam);
  if (ex) ex.qtd += 1; else estado.carrinho.push({ ...prod, tam, qtd: 1 });
  atualizarCarrinhoUI();
  mostrarToast(`✓ ${prod.nome} (${tam}) na sacola!`);
}

function alterarQtd(idx, delta) {
  estado.carrinho[idx].qtd += delta;
  if (estado.carrinho[idx].qtd <= 0) estado.carrinho.splice(idx, 1);
  atualizarCarrinhoUI();
}

function aplicarCupom() {
  const code = document.getElementById("coupon-input").value.trim().toUpperCase();
  if (code === "PRIMEIRA10") { estado.descontoCupom = 0.10; mostrarToast("Cupom PRIMEIRA10 (10% OFF)!"); }
  else if (code === "DEVOPS20") { estado.descontoCupom = 0.20; mostrarToast("Cupom DEVOPS20 (20% OFF)!"); }
  else { estado.descontoCupom = 0; mostrarToast("Cupom inválido."); }
  atualizarCarrinhoUI();
}

function atualizarCarrinhoUI() {
  document.getElementById("cart-badge").innerText = estado.carrinho.reduce((a, i) => a + i.qtd, 0);
  const body = document.getElementById("drawer-body");
  body.innerHTML = estado.carrinho.length === 0
    ? `<p style="color:var(--muted); text-align:center; padding:2.5rem 0;">Sua sacola está vazia.</p>`
    : estado.carrinho.map((item, idx) => `
      <div class="cart-row">
        <img src="${item.img}" alt="${item.nome}" />
        <div class="cart-row-info">
          <h4>${item.nome}</h4>
          <small style="color:var(--muted);">Tam: ${item.tam}</small><br/>
          <span>${brl(item.preco * item.qtd)}</span>
        </div>
        <div class="qty-controls">
          <button class="qty-btn" onclick="alterarQtd(${idx}, -1)">-</button>
          <strong>${item.qtd}</strong>
          <button class="qty-btn" onclick="alterarQtd(${idx}, 1)">+</button>
        </div>
      </div>`).join("");

  const sub = estado.carrinho.reduce((a, i) => a + (i.preco * i.qtd), 0);
  const desc = sub * estado.descontoCupom;
  const frete = sub === 0 || (sub - desc) >= 249 ? 0 : 19.90;
  document.getElementById("sum-subtotal").innerText = brl(sub);
  document.getElementById("sum-discount").innerText = `- ${brl(desc)}`;
  document.getElementById("sum-shipping").innerText = frete === 0 ? "GRÁTIS" : brl(frete);
  document.getElementById("sum-total").innerText = brl(Math.max(0, sub - desc + frete));
}

function abrirDrawer() { atualizarCarrinhoUI(); document.getElementById("cart-drawer").classList.add("open"); }
function fecharDrawer() { document.getElementById("cart-drawer").classList.remove("open"); }
function finalizarCompra() {
  if (!estado.carrinho.length) return;
  alert("Pedido #UW-2026 confirmado via esteira CI/CD Azure!");
  estado.carrinho = []; estado.descontoCupom = 0; atualizarCarrinhoUI(); fecharDrawer();
}

document.addEventListener("DOMContentLoaded", () => { renderizarVitrine(); atualizarCarrinhoUI(); });
