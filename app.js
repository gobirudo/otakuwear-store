const produtos = [
  { categoria: "shonen", anime: "Naruto Shippuden", nome: "Camiseta Oversized Akatsuki Cloud", desc: "Algodão pesado 100% fio 30.1 com estampa bordada da nuvem vermelha.", preco: "R$ 119,90", img: "img/naruto.svg" },
  { categoria: "shonen", anime: "Bleach", nome: "Moletom Soul Reaper — Bankai", desc: "Moletom canguru flanelado preto com detalhe minimalista Shinigami.", preco: "R$ 219,90", img: "img/bleach.svg" },
  { categoria: "shonen", anime: "One Piece", nome: "Camiseta Gear 5 — Chapéu de Palha", desc: "Edição especial Grand Line com estampa frontal em silk de alta definição.", preco: "R$ 109,90", img: "img/onepiece.svg" },
  { categoria: "shonen", anime: "Dragon Ball Z", nome: "Jaqueta Corta-Vento Capsule Corp", desc: "Impermeável leve com patch oficial da Corporação Cápsula no peito.", preco: "R$ 249,90", img: "img/dragonball.svg" },
  { categoria: "shojo", anime: "Sailor Moon", nome: "Cropped Crystal Star Brooch", desc: "Modelagem justa em malha canelada premium com detalhe dourado lunar.", preco: "R$ 99,90", img: "img/sailormoon.svg" },
  { categoria: "shojo", anime: "Sakura Card Captors", nome: "Moletom Pastel Clow Cards", desc: "Rosa pastel com asas bordadas nas mangas e estampa do Báculo Estrelado.", preco: "R$ 229,90", img: "img/sakura.svg" },
  { categoria: "shojo", anime: "Demon Slayer (Nezuko)", nome: "Camiseta Estampada Kimono Asanoha", desc: "Estampa geométrica tradicional inspirada no kimono da Nezuko Kamado.", preco: "R$ 114,90", img: "img/nezuko.svg" }
];

function renderizarCatalogo() {
  const shonenGrid = document.getElementById("grid-shonen");
  const shojoGrid = document.getElementById("grid-shojo");

  produtos.forEach(p => {
    const isShonen = p.categoria === "shonen";
    const card = `
      <div class="card">
        <div class="art"><img src="${p.img}" alt="${p.nome}"></div>
        <div class="card-body">
          <div>
            <div class="anime-tag ${isShonen ? 'shonen-tag' : 'shojo-tag'}">${p.anime}</div>
            <h3>${p.nome}</h3>
            <p>${p.desc}</p>
          </div>
          <div class="price-row">
            <span class="price">${p.preco}</span>
            <button onclick="alert('Adicionado ao carrinho: ${p.nome}')">Comprar</button>
          </div>
        </div>
      </div>
    `;
    if (isShonen) shonenGrid.innerHTML += card;
    else shojoGrid.innerHTML += card;
  });
}

document.addEventListener("DOMContentLoaded", renderizarCatalogo);
